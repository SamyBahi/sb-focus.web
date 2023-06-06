import { createSlice, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice/tasksSlice";
import { tasksSlice } from "./taskSlice/tasksSlice";

const store = configureStore({
  reducer: {
    counter: tasksReducer,
    //... si on a d'autres slices
  },
});

export default store;
