import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { UserListReducer } from "modules/Demo";

const rootReducer = combineReducers({
  routing: routerReducer,
  demo: UserListReducer
});

export default rootReducer;
