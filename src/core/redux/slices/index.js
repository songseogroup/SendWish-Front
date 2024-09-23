import { combineReducers } from '@reduxjs/toolkit';
import {reducer as SidebarReducer} from './sidebar.slice'

// Combining the reducers into a root reducer
export const rootReducers = combineReducers({
    Sidebar:SidebarReducer,
});
