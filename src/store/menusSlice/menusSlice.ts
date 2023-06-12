import { createSlice } from "@reduxjs/toolkit";
import { menuState } from "../../types/reduxStore";

const initialState = {
  showLeftMenu: true,
  showRightMenu: false,
};

const menusSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setLeftMenu(state: menuState) {
      state.showLeftMenu = !state.showLeftMenu;
    },
    setRightMenu(state: menuState) {
      state.showRightMenu = !state.showRightMenu;
    },
  },
});

export const MenusActions = menusSlice.actions;

export default menusSlice.reducer;
