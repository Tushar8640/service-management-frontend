import {configureStore} from "@reduxjs/toolkit";
import {api} from "./api/apiSlice";
import activeLinkSlice from "./features/activeLink/activeLinkSlice";
import filterSlice from "./features/filter/filterSlice";
import authSlice from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    active: activeLinkSlice,
    filter: filterSlice,
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
