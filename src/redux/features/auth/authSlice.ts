import {createSlice} from "@reduxjs/toolkit";
interface IUserState {
  user: {
    token: string | null;
    email: string | null;
    id: string | null;
  };
  isLoading: boolean;
}

const initialState: IUserState = {
  user: {
    token: null,
    email: null,
    id: null,
  },
  isLoading: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const token = action?.payload?.token;
      state.user.token = token;

      // decode the logged in user
      function parseJwt(token: string) {
        if (!token) {
          return;
        }
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
      }

      // loggedin user
      const user = parseJwt(token);
      state.user.email = user?.userEmail;
      state.user.id = user?.userId;
    },
    userLoggedOut: (state) => {
      state.user.token = null;
      state.user.email = null;
      state.user.id = null;
      localStorage.removeItem("auth");
    },
  },
});

export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;
