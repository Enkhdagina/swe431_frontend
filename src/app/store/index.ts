import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";

import storage from "./customStorage";

import { splashReducer } from "./slices/splashSlice";
import { basketReducer } from "./slices/basketSlice";
import { userReducer } from "./slices/userSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuth", "jid"],
};
const splashPersistConfig = {
  key: "splash",
  storage: storage,
  whitelist: ["isView", "isShow"],
};
const basketPersistConfig = {
  key: "basket",
  storage: storage,
  whitelist: ["setBasket", "updateBasket"],
};
const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["setUser"],
};

const rootReducer = combineReducers({

  splash: persistReducer(splashPersistConfig, splashReducer),
  basket: persistReducer(basketPersistConfig, basketReducer),
  // user: persistReducer(userPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
