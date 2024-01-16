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
    reducers:{setLogedInUser(state,action){
        console.log(action.payload)
    }

    }
})
export const userDataSliceActions = userDataSlice.actions