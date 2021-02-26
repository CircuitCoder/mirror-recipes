import { FunctionalComponent, h } from "preact";

type Params = {
  recipe: object;
  params: Record<string, string>;
};

const Renderer: FunctionalComponent<Params> = ({ recipe, params }: Params) => {
  return null;
};

export default Renderer;