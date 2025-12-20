import { combineReducers ,configureStore} from "@reduxjs/toolkit"
import {  useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootReducer = combineReducers({
// add reducers here
  })


  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const ReduxStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })

export default ReduxStore

type RootState = ReturnType<typeof ReduxStore.getState>
type AppDispatch = typeof ReduxStore.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;