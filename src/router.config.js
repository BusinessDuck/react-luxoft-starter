import React from "react";
import { AppHomeContainer } from "modules/App";
import {
  Route,
  Switch
} from "react-router";

export default (
  <Switch>
    {/* callback to handling URL where token will be retrieved */}
    <Route
      path="/"
      component={AppHomeContainer}
    />
  </Switch>
);
