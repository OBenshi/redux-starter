//§========================================================================================================
//§
//€  #####   #####     #####       ##  #####   ####  ######   ####         ####  ##      ##   ####  #####
//€  ##  ##  ##  ##   ##   ##      ##  ##     ##       ##    ##           ##     ##      ##  ##     ##
//€  #####   #####    ##   ##      ##  #####  ##       ##     ###          ###   ##      ##  ##     #####
//€  ##      ##  ##   ##   ##  ##  ##  ##     ##       ##       ##           ##  ##      ##  ##     ##
//€  ##      ##   ##   #####    ####   #####   ####    ##    ####         ####   ######  ##   ####  #####
//§
//§=========================================================================================================

//€ -------------------------------------------------------------------------- */
//§                                  SECTION IMPORTS                           */
//€ -------------------------------------------------------------------------- */

import { createSlice } from '@reduxjs/toolkit';
import { findIndexById } from '../helper/helpFuncs';

//§ --------------------------- END !SECTION IMPORTS ----------------------- */

//! init id for bugs don't touch
let lastId = 0;

//€ -------------------------------------------------------------------------- */
//§                          SECTION CREATE SLICE                              */
//€ -------------------------------------------------------------------------- */

const slice = createSlice({
  name: 'projects',
  initialState: [],

  //€ -------------------------------------------------------------------------- */
  //§                              SECTION REDUCERS                              */
  //€ -------------------------------------------------------------------------- */
  reducers: {
    //° ──────────────────────────────────────── STUB: ADD PROJECT ─────
    addProject: (projects, action) => {
      projects.push({
        id: ++lastId,
        description: action.payload.description,
        date: action.payload.date,
      });
    },
    //° ────────────────────────────────────── STUB: REMOVE PROJECT ─────
    removeProject: (projects, action) => {
      const { id } = action.payload;
      projects.splice(findIndexById(projects, id), 1);
    },
    //° ────────────────────────────────────── STUB: UPDATE PROJECT ─────
    updateProject: (projects, action) => {
      const { description, id } = action.payload;
      const index = findIndexById(projects, id);
      projects[index].description = description;
    },
    //§ -------------------------- END !SECTION REDUCERS ------------------------- */
  },
});
//§ ------------------------ END !SECTION CREATE SLICE ----------------------- */

//€ -------------------------------------------------------------------------- */
//§                                 SECTION EXPORTS                            */
//€ -------------------------------------------------------------------------- */

export default slice.reducer;
export const { addProject, updateProject, removeProject } = slice.actions;

//§ -------------------------- END !SECTION EXPORTS -------------------------- */
