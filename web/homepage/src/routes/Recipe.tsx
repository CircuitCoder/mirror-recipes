import { FunctionalComponent, h, Fragment } from "preact";
import { PRESETS, RECIPES } from '../assets/data';
import style from './Recipe.scss';
import Renderer from 'mirror-recipes-renderer';
import { resolvePreset } from "../util";
import { useContext } from "preact/hooks";
import { Ctx } from "../app";

type Params = {
  id: string,
};

const Recipe: FunctionalComponent<Params> = ({ id }: Params) => {
  const recipe = RECIPES[id];
  const { state, dispatch } = useContext(Ctx);
  const preset = state.site ? (PRESETS[state.site] ?? null) : null;
  const resolved = preset ? resolvePreset(preset, id) : {};

  return (
    <>
      <div class={style.container}>
        <div class={style["title-row"]}>
          <div class={style.title}>{id}</div>
          <div class={style.sep}>/</div>
          <div class={style.preset}>
            <div class={style.hint}>Preset</div>
          </div>
        </div>

        <Renderer
          recipe={recipe}
          params={resolved}
        ></Renderer>
      </div>
    </>
  );
};

export default Recipe;
