import { createSlice } from "@reduxjs/toolkit";


type state ={
    logedInUser:object[];
}

const initialState = {
    logedInUserMail:"",
    loggedInUserId:"",
    loggedInUserName:""
}




export const userDataSlice = createSlice({
    name:"userDataSlice",
    initialState:initialState,
    reducers:{setLogedInUser(state, action) {
        const payloadString = JSON.stringify(action.payload);
        state.logedInUserMail = action.payload.loggedInUserMail;
        state.loggedInUserId = action.payload.loggedInUserId;
        state.loggedInUserName = action.payload.loggedInUserName;
        localStorage.setItem("activeUser", payloadString);
    }
    }
})
export const userDataSliceActions = userDataSlice.actions