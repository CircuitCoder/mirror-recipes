import { FunctionalComponent, h, Fragment } from "preact";
import { Ctx } from '../components/App';
import style from './List.scss';
import clsx from 'clsx';
import { useContext, useMemo, useState } from "preact/hooks";
import { PRESETS, RECIPES } from '../assets/data';
import { Link } from "preact-router";
import PresetSelect from "../components/PresetSelect";

const List: FunctionalComponent = () => {
  const { state } = useContext(Ctx);

  const sorted = useMemo(() => {
    const preset = state.site ? (PRESETS[state.site] ?? null) : null;
    const entries = Object.keys(RECIPES).map(key => ({
      key,
      applicable: preset ? !!preset.presets[key] : true,
    }));
    entries.sort((a, b) => a.key.localeCompare(b.key));
    return entries;
  }, [state.site]);

  const applicable = sorted.filter(e => e.applicable).length;

  const [shown, setShown] = useState(false);

  return (
    <Fragment>
      <div class={style.container}>
        <div class={style.breadcrumb}>
          <Link href="/">mirror-recipes</Link>
        </div>

        <div class={style["title-row"]}>
          <div class={style.title}>List</div>
          <div class={style.sep}>/</div>
          <div class={style.preset}>
            <div class={style.hint}>Preset</div>
            <PresetSelect />
          </div>

          <div class={style.counter}>
            <div class={style.hint}>Count</div>
            {state.site === null
              ? Object.keys(RECIPES).length + " recipies"
              : `${applicable}/${Object.keys(RECIPES).length}  applicable`}
          </div>
        </div>
      </div>

      <div class={style.container}>
        {state.site !== null && (
          <div class={style.warning}>
            Some recipes may not be applicable to this preset. Click{" "}
            <a onClick={() => setShown(!shown)}>here</a> to{" "}
            {shown ? "hide" : "show"} them.
          </div>
        )}

        {sorted.map(({ key, applicable }) => {
          if(!applicable && !shown) return null;
          const recipe = RECIPES[key];

          return (
            <Link href={`/recipe/${key}`} class={clsx(style.entry, {
              [style['non-applicable']]: !applicable
            })}>
              <div class={style["entry-title"]}>{key}</div>
              <div class={style["entry-desc"]}>
                {recipe.procedures.length} procedures / {Object.keys(recipe.params).length} params
              </div>
            </Link>
          );
        })}
      </div>
    </Fragment>
  );
};

export default List;