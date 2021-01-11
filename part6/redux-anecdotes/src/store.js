import { createStore } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";

const store = createStore(
  anecdoteReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
