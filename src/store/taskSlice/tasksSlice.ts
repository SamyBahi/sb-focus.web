import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskAction,
  setTasksAction,
  taskState,
  actionWithId,
  updateIndexAction,
} from "../../types/reduxStore";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state: taskState, action: addTaskAction) {
      state.tasks.unshift(action.payload);
    },
    setTasks(state: taskState, action: setTasksAction) {
      state.tasks = action.payload;
    },
    updateIndexMyDay(state: taskState, action: updateIndexAction) {
      state.tasks[
        state.tasks.map((item) => item._id).indexOf(action.payload.id)
      ].index.myDay = action.payload.newIndex;
    },
    updateIndexList(state: taskState, action: updateIndexAction) {
      state.tasks[
        state.tasks.map((item) => item._id).indexOf(action.payload.id)
      ].index.list = action.payload.newIndex;
    },
    updateCompleted(state: taskState, action: actionWithId) {
      state.tasks[
        state.tasks.map((item) => item._id).indexOf(action.payload.id)
      ].completed =
        !state.tasks[
          state.tasks.map((item) => item._id).indexOf(action.payload.id)
        ].completed;
    },
    updateImportant(state: taskState, action: actionWithId) {
      state.tasks[
        state.tasks.map((item) => item._id).indexOf(action.payload.id)
      ].important =
        !state.tasks[
          state.tasks.map((item) => item._id).indexOf(action.payload.id)
        ].important;
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;
