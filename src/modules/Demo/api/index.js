import axios from "axios";

export function getUsers() {
  return axios.get('/api/v1/users')
              .then(function (response) {
                console.log(response); // eslint-disable-line no-console
                return response;
              })
              .catch(function (error) {
                console.log(error); // eslint-disable-line no-console
              });
}
