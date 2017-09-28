import * as actionTypes from "../constants";
import * as API from "../../api";

export function getUsersStart() {
  return {
    type: actionTypes.GET_USERS_START
  };
}

export function setUsers(data) {
  return {
    type: actionTypes.SET_USERS,
    data
  };
}

export function getUsers() {
  return dispatch => {
    dispatch(getUsersStart());
    API.getUsers()
       .then(response => {
         dispatch(setUsers(response.data));
       })
       .catch(error => {
         dispatch(getUsersError(error));
       });
  };
}

export function getUsersError(error) {
  return {
    type: actionTypes.GET_USERS_ERROR,
    error
  };
}
