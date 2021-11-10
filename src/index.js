import configureStore from './store/configureStore';
import { bugAdded, bugRemoved, bugResolved } from './store/bugs';
import { addProject, updateProject, removeProject } from './store/projects';
const store = configureStore();
const unsubscribe = store.subscribe(() => {
  console.log('storeState', store.getState());
});
store.dispatch(
  addProject({ description: 'bug1', date: new Date().toDateString() })
);
store.dispatch(updateProject({ id: 1, description: 'wow' }));
store.dispatch(removeProject({ id: 1 }));
unsubscribe();
