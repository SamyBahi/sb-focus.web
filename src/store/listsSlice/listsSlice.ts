import { createSlice } from "@reduxjs/toolkit";
import {
  addCustomListAction,
  listsState,
  setCustomListsAction,
} from "../../types/reduxStore";

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
  reducers: {
    setCustomLists(state: listsState, action: setCustomListsAction) {
      state.customLists = action.payload.customLists;
    },
    addCustomLists(state: listsState, action: addCustomListAction) {
      state.customLists.push(action.payload.list);
    },
  },
});

export const listsActions = listsSlice.actions;

export default listsSlice.reducer;
