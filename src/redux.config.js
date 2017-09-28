import configureStore from "./redux/configureStore";
// Create an enhanced history that syncs navigation events with the store
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const store = configureStore(history);

export default {
  history,
  store
};
