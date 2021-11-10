import { createSlice } from '@reduxjs/toolkit';
import { findIndexById } from '../helper/helpFuncs';
let lastId = 0;

const slice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    addProject: (projects, action) => {
      projects.push({
        id: ++lastId,
        description: action.payload.description,
        date: action.payload.date,
      });
    },
    removeProject: (projects, action) => {
      const { id } = action.payload;
      projects.splice(findIndexById(projects, id), 1);
    },
    updateProject: (projects, action) => {
      const { description, id } = action.payload;
      const index = findIndexById(projects, id);
      projects[index].description = description;
    },
  },
});
export default slice.reducer;
export const { addProject, updateProject, removeProject } = slice.actions;
