import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskAction,
  setTasksAction,
  taskState,
  actionWithId,
  updateIndexAction,
  updateCurrentListAction,
  updateTitleAction,
  updateTaskMyDayAction,
  task,
  updateTaskDueDateAction,
  updateTaskNoteAction,
  searchTaskAction,
} from "../../types/reduxStore";

const initialState = {
  tasks: [],
  currentList: "",
  currentListTitle: "",
  currentTasks: [],
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
    setCurrentTasks(state: taskState, action: updateCurrentListAction) {
      switch (action.payload) {
        case "myday":
          state.currentTasks = state.tasks.filter((task: task) => task.myDay);
          break;
        case "important":
          state.currentTasks = state.tasks.filter(
            (task: task) => task.important
          );
          break;
        case "planned":
          state.currentTasks = state.tasks.filter((task: task) => task.dueDate);
          break;
        case "inbox":
          state.currentTasks = state.tasks.filter((task: task) => !task.listId);
          break;
        default:
          state.currentTasks = state.tasks.filter(
            (task: task) => task.listId === action.payload
          );
          break;
      }
    },
    searchTask(state: taskState, action: searchTaskAction) {
      state.currentTasks = state.tasks.filter((task: task) =>
        task.title.toLowerCase().includes(action.payload.toLocaleLowerCase())
      );
    },
    updateCurrentList(state: taskState, action: updateCurrentListAction) {
      state.currentList = action.payload;
    },
    updateCurrentListTitle(state: taskState, action: updateCurrentListAction) {
      state.currentListTitle = action.payload;
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
    updateTaskTitle(state: taskState, action: updateTitleAction) {
      state.tasks[
        state.tasks.map((item) => item._id).indexOf(action.payload.id)
      ].title = action.payload.newTitle;
    },
    updateTaskMyDay(state: taskState, action: updateTaskMyDayAction) {
      state.tasks[
        state.tasks.map((item) => item._id).indexOf(action.payload.id)
      ].myDay = action.payload.myDay;
    },
    updateTaskDueDate(state: taskState, action: updateTaskDueDateAction) {
      state.tasks[
        state.tasks.map((item) => item._id).indexOf(action.payload.id)
      ].dueDate = action.payload.dueDate;
    },
    updateTaskNote(state: taskState, action: updateTaskNoteAction) {
      state.tasks[
        state.tasks.map((item) => item._id).indexOf(action.payload.id)
      ].note = action.payload.newNote;
    },
    deleteTask(state: taskState, action: actionWithId) {
      state.currentTasks = state.currentTasks.filter(
        (task) => task._id !== action.payload.id
      );
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload.id
      );
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;
