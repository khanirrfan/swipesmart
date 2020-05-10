import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// set up a store subscription listener
// to store the users token in localStorage

let currentState;

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage
  console.log(currentState);
  console.log(previousState);
  if (previousState && previousState.auth.Token !== currentState.auth.Token) {
    const token = currentState.auth.Token;
    token
      ? localStorage.setItem('Token', token)
      : localStorage.removeItem('Token');
  }
});

export default store;
