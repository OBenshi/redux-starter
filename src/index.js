import configureStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved } from './store/bugs';
const store = configureStore();
const unsubscribe = store.subscribe(() => {
  console.log('storeState', store.getState());
});
store.dispatch(bugAdded('bug1'));
store.dispatch(bugResolved(1));
store.dispatch(bugRemoved(1));
unsubscribe();
