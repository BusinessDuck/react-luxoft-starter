import React from "react";
import { render } from "react-dom";
import { AppContainer } from "./modules/App";
import routerConfig from "router.config";
import reduxConfig from "redux.config";

render(
  <AppContainer
    store={reduxConfig.store}
    history={reduxConfig.history}
    routes={routerConfig}
  />, document.getElementById('app')
);
