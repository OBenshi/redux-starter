import { createSlice } from '@reduxjs/toolkit';
import { findIndexById } from '../helper/helpFuncs';

//! init id for bugs don't touch
let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload,
        resolved: false,
      });
    },
    bugRemoved: (bugs, action) => {
      bugs.splice(findIndexB(bugs, action.payload.id), 1);
    },
    bugResolved: (bugs, action) => {
      const index = findIndexById(bugs, action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

export default slice.reducer;
export const { bugAdded, bugRemoved, bugResolved } = slice.actions;
