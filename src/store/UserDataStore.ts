import { createSlice } from "@reduxjs/toolkit";

type state ={
    logeInUser:string
}

const initialState = {
    logedInUser:""
}

export const userDataSlice = createSlice({
    name:"userDataSlice",
    initialState:initialState,
    reducers:{setLogedInUser(state, action) {
        console.log(action.payload);
        const payloadString = JSON.stringify(action.payload);
        state.logedInUser = action.payload;
        localStorage.setItem("activeUser", payloadString);
    }

    }
})
export const userDataSliceActions = userDataSlice.actions