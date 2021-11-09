import { store } from './store';
store.subscribe(() => {
  console.log('storeState', store.getState());
});
store.dispatch({ type: 'bugAdded', payload: { description: 'wow' } });
store.dispatch({ type: 'bugRemoved', payload: { id: 1 } });
