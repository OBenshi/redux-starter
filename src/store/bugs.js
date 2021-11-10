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

//§ --------------------------- END !SECTION IMPORTS ----------------------- */

//! init id for bugs don't touch
let lastId = 0;

//€ -------------------------------------------------------------------------- */
//§                          SECTION CREATE SLICE                              */
//€ -------------------------------------------------------------------------- */

const slice = createSlice({
  name: 'bugs',
  initialState: [],

  //€ -------------------------------------------------------------------------- */
  //§                             SECTION REDUCERS                               */
  //€ -------------------------------------------------------------------------- */
  reducers: {
    //° ──────────────────────────────────────────── STUB: BUG ADDED ─────
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload,
        resolved: false,
        teamMember: null,
      });
    },

    //° ───────────────────────────────────────── STUB: BUG REMOVED ─────
    bugRemoved: (bugs, action) => {
      bugs.splice(findIndexB(bugs, action.payload.id), 1);
    },

    //° ──────────────────────────────────────── STUB: BUG RESOLVED ─────
    bugResolved: (bugs, action) => {
      const index = findIndexById(bugs, action.payload);
      bugs[index].resolved = true;
    },

    //° ────────────────────────────────── STUB: ASSIGN TEAM MEMBER ─────
    assignTeamMember: (bugs, action) => {
      const { bugId, userId } = action.payload;
      // const userIndex = findIndexById(users, userId);
      const bugIndex = findIndexById(bugs, bugId);
      // users[userIndex].bugs.push(bugs[bugIndex]);
      bugs[bugIndex].teamMember = userId;
    },

    //§ -------------------------- END !SECTION REDUCERS ---------------------- */
  },
});

//§ ------------------------ END !SECTION CREATE SLICE -------------------- */

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
export const { bugAdded, bugRemoved, bugResolved, assignTeamMember } =
  slice.actions;
//§ -------------------------- END !SECTION EXPORTS -------------------------- */
