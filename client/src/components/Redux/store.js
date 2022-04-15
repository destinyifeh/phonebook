import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import contactReducer from './contactSlice';

export const store = configureStore({
     
    reducer:{
        users: userReducer,
        contacts: contactReducer
    }
})