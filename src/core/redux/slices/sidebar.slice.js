import { createSlice } from '@reduxjs/toolkit'
  const initialState = {
    SidebarOpen: true
  }
  export const SidebarSlice=createSlice({
    name:'Sidebar',
    initialState,
    reducers:{
        SetSideBar:(state,action)=>{
            state.SidebarOpen = action.payload
          },
    }
  })

export const {reducer,actions} = SidebarSlice