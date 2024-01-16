import { configureStore } from "@reduxjs/toolkit";
import { userDataSlice } from "./UserDataStore";

export const store = configureStore({
    reducer:{
        "userDataSlice":userDataSlice.reducer
    },
})

