import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice/tasksSlice";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    //... si on a d'autres slices
  },
});

export default store;
