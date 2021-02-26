import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import Home from "../routes/Home";
import NotFound from "../routes/NotFound";
import Recipe from "../routes/Recipe";

const App: FunctionalComponent = () => {
  return (
    <div id="app">
      <Router>
        <Route path="/" component={Home} />
        <Route path="/recipe/:id" component={Recipe} />
        <Route default component={NotFound} />
      </Router>
    </div>
  );
};

export default App;
