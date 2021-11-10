import configureStore from './store/configureStore';

import {
  bugAdded,
  bugRemoved,
  bugResolved,
  assignTeamMember,
  getBugsByUser,
} from './store/bugs';

import {
  addProject,
  updateProject,
  removeProject,
  getUnresolvedBugs,
} from './store/projects';

import { addUser, addBugToUser } from './store/users';

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  // console.log('storeState', store.getState());
});

store.dispatch(bugAdded('bug 1'));
store.dispatch(bugAdded('bug 2'));
store.dispatch(addUser({ name: 'bob' }));
store.dispatch(assignTeamMember({ bugId: 1, userId: 1 }));
store.dispatch(addBugToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugResolved(1));
const bob = getBugsByUser(1)(store.getState());
unsubscribe();
