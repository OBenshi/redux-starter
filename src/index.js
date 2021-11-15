import configureStore from './store/configureStore';

import {
  addBug,
  assignBugToUser,
  getBugsByUser,
  getUnresolvedBugs,
  loadBugs,
} from './store/bugs';

// import {
//   addProject,
//   updateProject,
//   removeProject,
//   getUnresolvedBugs,
// } from './store/projects';

import { userAdded } from './store/users';

const store = configureStore();
const unsubscribe = store.subscribe(() => {
  // console.log('storeState', store.getState());
});
store.dispatch(loadBugs());
setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);

store.dispatch(addBug({ description: 'wow2222' }));

// store.dispatch(bugAdded('bug 1'));
// store.dispatch({ type: 'error', payload: 'bug 2' });
// store.dispatch({ type: 'apiCallBegan', payload: { url: 'bugs' } });
// store.dispatch(bugAdded('bug 2'));
// store.dispatch(addUser({ name: 'bob' }));
// store.dispatch(assignTeamMember({ bugId: 1, userId: 1 }));
// store.dispatch(addBugToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved(1));
// const bob = getBugsByUser(1)(store.getState());
unsubscribe();
