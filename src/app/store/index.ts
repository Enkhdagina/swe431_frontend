import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "./slices/authSlice";
import storage from "./customStorage";
import logger from "redux-logger";
import { splashReducer } from "./slices/splashSlice";
import { basketReducer } from "./slices/basketSlice";

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

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  splash: persistReducer(splashPersistConfig, splashReducer),
  basket: persistReducer(basketPersistConfig, basketReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;