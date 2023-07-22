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
      title: "My Day",
    },
    {
      id: "important",
      title: "Important",
    },
    {
      id: "planned",
      title: "Planned",
    },
    {
      id: "inbox",
      title: "Tasks",
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
