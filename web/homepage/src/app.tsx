import { FunctionalComponent, h, createContext } from "preact";
import { useReducer } from "preact/hooks";
import { Route, Router } from "preact-router";

import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Recipe from "./routes/Recipe";
import List from "./routes/List";

type SiteRef = string;

type State = {
  site: SiteRef | null,
}

type Action = SetSiteAction

type SetSiteAction = {
  type: 'SetSite',
  site: SiteRef | null,
};

function reducer(state: State, action: Action): State {
  if(action.type === 'SetSite')
    return {
      ...state,
      site: action.site,
    }
  return state;
}

const initState: State = {
  site: null,
};

export const Ctx = createContext<{ state: State, dispatch: (a: Action) => void }>({
  state: initState,
  dispatch: (() => {}),
});

const App: FunctionalComponent = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div id="app">
      <Ctx.Provider value={{ state, dispatch }}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/recipe" component={List} />
          <Route path="/recipe/:id" component={Recipe} />
          <Route default component={NotFound} />
        </Router>
      </Ctx.Provider>
    </div>
  );
};

export default App;