import { createSlice } from "@reduxjs/toolkit";
import { listsState } from "../../types/reduxStore";

const initialState: listsState = {
  baseLists: [
    {
      id: "myday",
      name: "My Day",
    },
    {
      id: "important",
      name: "Important",
    },
    {
      id: "planned",
      name: "Planned",
    },
    {
      id: "inbox",
      name: "Tasks",
    },
  ],
  customLists: [],
};

const listsSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});

export const listsActions = listsSlice.actions;

export default listsSlice.reducer;
