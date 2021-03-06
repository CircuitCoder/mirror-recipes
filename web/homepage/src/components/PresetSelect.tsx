import { FunctionalComponent, h, Fragment } from "preact";
import { useContext } from "preact/hooks";
import { Ctx } from './App';
import { PRESETS } from "../assets/data";

const PresetSelect: FunctionalComponent = () => {
  const { state, dispatch } = useContext(Ctx);

  return (
    <select
      value={state.site ?? "__unset__"}
      onChange={(e) =>
        dispatch({
          type: "SetSite",
          site:
            e.currentTarget.value === "__unset__"
              ? null
              : e.currentTarget.value,
        })
      }
    >
      <option value="__unset__">Unset</option>
      <optgroup>
        {Object.keys(PRESETS).map((k) => (
          <option value={k} key={k}>
            {k}
          </option>
        ))}
      </optgroup>
    </select>
  )
};

export default PresetSelect;