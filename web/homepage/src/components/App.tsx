import { FunctionalComponent, h, createContext } from "preact";
import { useReducer } from "preact/hooks";
import { Route, Router } from "preact-router";
import style from './App.scss';

import Home from "../routes/Home";
import NotFound from "../routes/NotFound";
import Recipe from "../routes/Recipe";
import List from "../routes/List";

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
      <div class={style.inner}>
        <Ctx.Provider value={{ state, dispatch }}>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/recipe" component={List} />
            <Route path="/recipe/:id" component={Recipe} />
            <Route default component={NotFound} />
          </Router>
        </Ctx.Provider>
      </div>

      <div class={style.footer}>
        Made with &lt;3 by TUNA contributors. Contents within this site are
        distributed under the MIT License.
      </div>
    </div>
  );
};

export default App;