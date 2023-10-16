import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  sidebarActive: "seller",
};
export const activeLinkSlice = createSlice({
  name: "activeLink",
  initialState,
  reducers: {
    sidebarActiveChange: (state, action) => {
      state.sidebarActive = action.payload;
    },
  },
});

export const {sidebarActiveChange} = activeLinkSlice.actions;
export default activeLinkSlice.reducer;
