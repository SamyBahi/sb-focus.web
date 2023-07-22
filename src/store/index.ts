import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice/tasksSlice";
import menusReducer from "./menusSlice/menusSlice";
import listsReducer from "./listsSlice/listsSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    menus: menusReducer,
    lists: listsReducer,
  },
});

export default store;
