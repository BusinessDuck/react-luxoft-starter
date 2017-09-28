/* global process */

import {
  applyMiddleware,
  compose,
  createStore
} from "redux";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import initialState from "./initialState";

const isProd = process.env.NODE_ENV === 'production';

export default function (history) {

  const middlewares = [
    routerMiddleware(history),
    thunk
  ];

  let composeEnhancers = compose;

  if (!isProd) {
    Array.prototype.push.apply(middlewares, [
      createLogger({
        collapsed: true
      }),
      reduxImmutableStateInvariant()
    ]);

    // add support for Redux dev tools
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./rootReducer', () => {
        const nextReducer = require('./rootReducer').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
      });
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );


  return store;
}

