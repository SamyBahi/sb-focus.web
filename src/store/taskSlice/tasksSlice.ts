import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [{}],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{}>) {
      state.tasks.push(action.payload);
    },
    setTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export default tasksSlice.reducer;
