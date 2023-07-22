import { createSlice } from "@reduxjs/toolkit";
import { menuState } from "../../types/reduxStore";

const initialState = {
  showLeftMenu: true,
};

const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setLeftMenu(state: menuState) {
      state.showLeftMenu = !state.showLeftMenu;
    },
  },
});

export const MenusActions = menusSlice.actions;

export default menusSlice.reducer;
