import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "./src/slices/apiSlice.ts";
import cartSliceReducer from "./src/slices/cartSlice.ts";

export const store = configureStore({
    reducer: {[apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch