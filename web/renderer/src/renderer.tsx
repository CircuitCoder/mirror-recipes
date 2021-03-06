import { FunctionalComponent, h, Fragment } from "preact";
import { useMemo, useState } from "preact/hooks";

type Params = {
  recipe: Record<string, any>;
  params: Record<string, string>;
};

const Renderer: FunctionalComponent<Params> = ({ recipe, params }: Params) => {
  const [input, setInput] = useState<Record<string, string>>({})
  const joined = useMemo(() => {
    // Default
    const defaults = Object.keys(recipe.params)
      .map((key) => [key, recipe.params[key].default])
      .filter((e) => !!e[1])
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

    // Single possibility
    const single = Object.keys(recipe.params)
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
    };

  }, [input, recipe.params, params]);

  const tuple = Object.keys(recipe.params).map(key => {
    const param = recipe.params[key];
    const match = param['possible-value'];
    let valid = false;

    if(!input[key]) valid = !!param.default;
    else {
      if(Array.isArray(match)) valid = match.includes(input[key]);
      else if(typeof match === 'string') {
        const regex = new RegExp(match);
        valid = !!input[key].match(regex);
      }
      else valid = true;
    }

    const fixed = Array.isArray(match) && match.length === 1;

    return {
      key,
      param,
      input: input[key],
      valid,
      fixed,
    };
  });

  const changable = tuple.filter(e => !(e.key in params) && !e.fixed);

  return <>
    {changable.map(({ key, param, input, valid }) => {
      let inputArea;
      const pv = param['possible-value'];
      if(Array.isArray(pv))
        inputArea = <select value={input} class="mr-param-select">
          {pv.map(value => <option key={value} value={value}>{value}</option>)}
        </select>;
      else 
        inputArea = <input placeholder={param.default} value={input} class="mr-param-input"></input>;
      
      return <div class="mr-param">
        <div class="mr-param-title">{key}</div>
        {inputArea}
      </div>
    })}
  </>;
};

export default Renderer;