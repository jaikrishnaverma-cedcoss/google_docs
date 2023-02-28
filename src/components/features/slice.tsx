import { createSlice } from "@reduxjs/toolkit";

export type stateType = {
  document: {
    id:string;
    title: string;
    content: string;
  }[];
};
// initial state to hold all douments in array of 
// objects manner and a setAll for local storage handle
const initialState: stateType = {
  document: [],
};

// reducer with add delete update actions
const MyReducer = createSlice({
  name: "MyReducer",
  initialState,
  reducers: {
    setAll: (state,action)=>{
      state.document=action.payload
    },
    ADD: (state, action) => {
      state.document.push(action.payload);
    },
    DELETE: (state, action) => {
      state.document.splice(action.payload, 1);
    },
    UPDATE: (state, action) => {
      state.document[action.payload.index] = action.payload.object;
    },
  },
});

export default MyReducer.reducer;
export const { setAll, ADD, DELETE, UPDATE } = MyReducer.actions;
