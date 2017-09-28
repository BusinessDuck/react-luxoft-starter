import initialState from "../state";
import {
  fromJS
} from "immutable";
import * as actionTypes from "../constants";

export default function importDumpReducer(state = fromJS(initialState), action) {

  switch (action.type) {
    case actionTypes.SET_USERS:
      return state.withMutations(state => {
        state.set("users", fromJS(action.data));
        state.set("usersPending", false);
      });

    case actionTypes.GET_USERS_START:
      return state.set("usersPending", true);

    case actionTypes.GET_USERS_ERROR:
      return state.set("usersPending", false);
  }
}
