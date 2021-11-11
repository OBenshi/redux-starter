//§======================================================================================
//§
//€        #####   ##   ##   ####     ####         ####  ##      ##   ####  #####
//€        ##  ##  ##   ##  ##       ##           ##     ##      ##  ##     ##
//€        #####   ##   ##  ##  ###   ###          ###   ##      ##  ##     #####
//€        ##  ##  ##   ##  ##   ##     ##           ##  ##      ##  ##     ##
//€        #####    #####    ####    ####         ####   ######  ##   ####  #####
//§
//§======================================================================================

//€ -------------------------------------------------------------------------- */
//§                                  SECTION IMPORTS                           */
//€ -------------------------------------------------------------------------- */

import { createSelector } from 'reselect';
import { createSlice } from '@reduxjs/toolkit';
import { findIndexById } from '../helper/helpFuncs';
import { apiCallBegan } from './api';
//§ --------------------------- END !SECTION IMPORTS ----------------------- */

//! init id for bugs don't touch
let lastId = 0;

//€ -------------------------------------------------------------------------- */
//§                          SECTION CREATE SLICE                              */
//€ -------------------------------------------------------------------------- */

const slice = createSlice({
  name: 'bugs',
  initialState: { list: [], loading: false, lastFetch: null },

  //€ -------------------------------------------------------------------------- */
  //§                             SECTION REDUCERS                               */
  //€ -------------------------------------------------------------------------- */
  reducers: {
    //° ──────────────────────────────────────────── STUB: BUG ADDED ─────
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload,
        resolved: false,
        teamMember: null,
      });
    },

    //° ───────────────────────────────────────── STUB: BUG REMOVED ─────
    bugRemoved: (bugs, action) => {
      bugs.list.splice(findIndexB(bugs.list, action.payload.id), 1);
    },

    //° ──────────────────────────────────────── STUB: BUG RESOLVED ─────
    bugResolved: (bugs, action) => {
      const index = findIndexById(bugs.list, action.payload);
      bugs.list[index].resolved = true;
    },

    //° ────────────────────────────────── STUB: ASSIGN TEAM MEMBER ─────
    assignTeamMember: (bugs, action) => {
      const { bugId, userId } = action.payload;
      // const userIndex = findIndexById(users, userId);
      const bugIndex = findIndexById(bugs.list, bugId);
      // users[userIndex].bugs.push(bugs[bugIndex]);
      bugs.list[bugIndex].teamMember = userId;
    },

    //° ──────────────────────────────────────── STUB: BUGS RECEIVED ─────
    bugsReceived: (bugs, action) => {
      action.payload.map((bug) => bugs.list.push(bug));
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    //° ────────────────────────────────────── STUB: BUGS REQUESTED ─────
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    //° ───────────────────────────────── STUB: BUGS REQUEST FAILED ─────
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    //§ -------------------------- END !SECTION REDUCERS ---------------------- */
  },
});

//§ ------------------------ END !SECTION CREATE SLICE -------------------- */

//€ -------------------------------------------------------------------------- */
//§                          SECTION ACTION CREATORS                           */
//€ -------------------------------------------------------------------------- */

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  if (Math.floor((Date.now() - lastFetch) / 60000) < 10) return;
  return dispatch(
    apiCallBegan({
      url: 'bugs',
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};
//§ ---------------------- END !SECTION ACTION CREATORS ---------------------- */

//€ -------------------------------------------------------------------------- */
//§                              SECTION SELECTORS                             */
//€ -------------------------------------------------------------------------- */

//° ─────────────────────────────────────────────── STUB: GET UNRESOLVED BUGS ─────
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

//° ─────────────────────────────────────────────────── STUB: GET BUGS BY USER ─────
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.teamMember === userId)
  );

//§ ------------------------- END !SECTION SELECTORS ------------------------- */

//€ -------------------------------------------------------------------------- */
//§                                 SECTION EXPORTS                            */
//€ -------------------------------------------------------------------------- */

export default slice.reducer;
export const {
  bugAdded,
  bugRemoved,
  bugResolved,
  assignTeamMember,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
//§ -------------------------- END !SECTION EXPORTS -------------------------- */
