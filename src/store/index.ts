import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice/tasksSlice";
import menusReducer from "./menusSlice/menusSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    menus: menusReducer,
  },
});

export default store;
