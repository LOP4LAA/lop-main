import { configureStore, combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "data", "payments", "transactions", "common", "grievances"],
}

const rootReducer = combineReducers({})

const reducerProxy = (state, action) => {
  if (action?.type === "logout") {
    // Handles logout
    rootReducer({}, action)
    // clearTokenCookie()
    return
  }
  return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, reducerProxy)

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat()

const store = configureStore({
  reducer: persistedReducer,
  middleware,
})

const persistor = persistStore(store)

export { store, persistor, reducerProxy, middleware }