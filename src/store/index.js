import { createStore, action, thunk } from 'easy-peasy';

export const store = createStore({
  app: {
    someData: 0,
    someAction: action((state) => {
      state.someData += 1;
    }),
    someThunk: thunk(() => {})
  }
});
