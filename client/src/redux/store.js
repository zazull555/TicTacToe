import { createStore } from "redux";
import { gameReducer } from "./reducer";

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(gameReducer, enableReduxDevTools);
  return store;
}
