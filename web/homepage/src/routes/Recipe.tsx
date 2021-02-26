import { FunctionalComponent, h } from "preact";
import { RECIPES } from '../assets/data';

type Params = {
  id: string,
};

const Recipe: FunctionalComponent<Params> = ({ id }: Params) => {
  return (
    <div>
      {JSON.stringify(RECIPES[id])}
    </div>
  );
};

export default Recipe;
