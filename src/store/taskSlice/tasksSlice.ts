import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";

interface taskState {
  tasks: {
    _id: String;
    title: String;
    myDay: boolean;
    important: boolean;
    completed: boolean;
    index: number;
    userId: String;
    steps: [];
    files: [];
    createdAt: any;
    updatedAt: any;
    __V: number;
  }[];
}

interface setTasksAction extends Action {
  payload: taskState["tasks"];
}

interface addTaskAction extends Action {
  payload: {
    _id: String;
    title: String;
    myDay: boolean;
    important: boolean;
    completed: boolean;
    index: number;
    userId: String;
    steps: [];
    files: [];
    createdAt: any;
    updatedAt: any;
    __V: number;
  };
}

interface updateIndexAction extends Action {
  payload: {
    oldIndex: number;
    newIndex: number;
  };
}

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
      state.tasks = action.payload
        .slice()
        .sort((a: any, b: any) => a.index - b.index);
    },
    updateIndex(state: taskState, action: updateIndexAction) {
      state.tasks[action.payload.oldIndex].index = action.payload.newIndex;
      //state.tasks.slice().sort((a: any, b: any) => a.index - b.index);
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice.reducer;
