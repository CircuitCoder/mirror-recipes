import { FunctionalComponent, h, Fragment } from "preact";
import { useMemo, useState } from "preact/hooks";
import Step from './step';

type Params = {
  recipe: Record<string, any>;
  params: Record<string, string>;
};

const Renderer: FunctionalComponent<Params> = ({ recipe, params }: Params) => {
  const [input, setInput] = useState<Record<string, string>>({})
  const joined = useMemo(() => {
    // Default
    const defaults: Record<string, string> = Object.keys(recipe.params)
      .map((key) => [key, recipe.params[key].default])
      .filter((e) => !!e[1])
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

    // Single possibility
    const single: Record<string, string> = Object.keys(recipe.params)
      .filter((key) => {
        let pv = recipe.params[key]['possible-value']
        return Array.isArray(pv) && pv.length === 1;
      })
      .map((key) => [key, recipe.params[key]['possible-value'][0]])
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
    
    return {
      ...defaults,
      ...single,
      ...input,
      ...params,
    } as Record<string, string>;

  }, [input, recipe.params, params]);

  const tuple = Object.keys(recipe.params).map(key => {
    const param = recipe.params[key];
    const match = param['possible-value'];
    let valid = false;

    if(!joined[key]) valid = !!param.default;
    else {
      if(Array.isArray(match)) valid = match.includes(joined[key]);
      else if(typeof match === 'string') {
        const regex = new RegExp(match);
        valid = !!joined[key].match(regex);
      }
      else valid = true;
    }

    const fixed = Array.isArray(match) && match.length === 1;

    return {
      key,
      param,

      input: input[key],
      value: joined[key],

      valid,
      fixed,
    };
  });

  const changable = tuple.filter(e => !(e.key in params) && !e.fixed);

  const valid = tuple.every(e => e.valid);
  // Procedure select
  const proc = recipe.procedures.find((e: Record<string, any>) => {
    if(!e.when) return true;
    for(const key in e.when)
      if(e.when[key] !== joined[key]) return false;
    return true;
  });

  return (
    <Fragment>
      {changable.map(({ key, param, input, valid }) => {
        let inputArea;
        const pv = param["possible-value"];
        if (Array.isArray(pv))
          inputArea = (
            <select
              value={input}
              class="mr-param-select"
              onChange={(e) => {
                setInput((input) => ({
                  ...input,
                  [key]: e.currentTarget.value,
                }));
              }}
            >
              <option disabled default selected>
                Please select
              </option>
              {pv.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          );
        else
          inputArea = (
            <input
              placeholder={param.default}
              value={input}
              class="mr-param-input"
              onInput={(e) => {
                const val = e.currentTarget.value;
                console.log(val);
                setInput((input) => {
                  if (val !== "") return { ...input, [key]: val };
                  const copied = { ...input };
                  delete copied[key];
                  return copied;
                });
              }}
            ></input>
          );

        let hint = [];
        if (param["obtained-by"])
          hint.push(
            <div class="mr-hint">
              Try execute <code>{param["obtained-by"]}</code>
            </div>
          );
        if (typeof pv === "string")
          hint.push(
            <div class="mr-hint">
              Should match <code>{pv}</code>
            </div>
          );

        return (
          <div class="mr-param">
            <div class="mr-param-title">{key}</div>
            <div class="mr-param-desc">{param.description}</div>
            {inputArea}
            {hint}
          </div>
        );
      })}

      {valid && <div class="mr-sep" />}

      {valid &&
        (proc ? (
          proc.steps
            .map((e: Record<string, any>) => {
              if (e.do) return recipe.steps[e.do];
              else return e;
            })
            .map((e: Record<string, any>, idx: number) => (
              <Step
                step={e}
                params={joined}
                number={
                  <div class="mr-step-number">
                    <span class="mr-step-number-hint">Step</span>
                    {idx + 1}/{proc.steps.length}
                  </div>
                }
              />
            ))
        ) : (
          <div class="mr-failed">No applicable procedure found</div>
        ))}
    </Fragment>
  );
};

export default Renderer;