import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify';




export const registerUser = createAsyncThunk(
     'users/registerUser', async(user, {rejectWithValue})=>{
          try{
               let response = await axios.post('/api/user/register', user)
               sessionStorage.setItem('currentUser', JSON.stringify(response.data));
                toast.success('success')
                 setTimeout(()=>{
                   window.location.href='/contacts';
                 }, 1000)
                return response.data;

          }
          catch(err){
               toast.error('Oops!, An error occurred, try again')
               return rejectWithValue(err.response)
          }
     }
);


export const loginUser = createAsyncThunk(
     'users/loginUser', async(user, {rejectWithValue})=>{
          try{
               let response = await axios.post('/api/user/login', user)
               if(response.data === 'Incorrect password'){
                    toast.error('Oops!, Incorrect password');
                    return false;

                }
                sessionStorage.setItem('currentUser', JSON.stringify(response.data));
                toast.success('success')
                 setTimeout(()=>{
                   window.location.href='/contacts';
                 }, 1000)               
                return response.data;

          }
          catch(err){
               toast.error('Oops!, An error occurred, try again')
               return rejectWithValue(err.response)
          }
     }
);



export const forgotUser = createAsyncThunk(
     'users/forgotUser', async(user, {rejectWithValue})=>{
          try{
               let response = await axios.post('/api/user/forgot', user)
               toast.success('success')

                setTimeout(()=>{
               window.location.href='/user/password-code';
                }, 1000)
                return response.data;

          }
          catch(err){
               toast.error('Oops!, An error occurred, try again')
               return rejectWithValue(err.response)
          }
     }
);



export const resetcodeUser = createAsyncThunk(
     'users/resetcodeUser', async(user, {rejectWithValue})=>{
          try{
               let response = await axios.post('/api/reset-password-code', user)

               if(response.data === 'Password reset token is invalid or has expired'){
                    toast.error('Password reset token is invalid or has expired');
                    return false;
                }else{
                    toast.success('Valid');
                    let userId = response.data._id;
                    console.log(userId)
                    setTimeout(()=>{
                  window.location.href='/user/reset-password/'+userId;
                  }, 1000)
                  return response.data;

                }

          }
          catch(err){
               toast.error('Oops!, An error occurred, try again')
               return rejectWithValue(err.response)
          }
     }
);



export const resetUser = createAsyncThunk(
     'users/resetUser', async(resetPassword, {rejectWithValue})=>{
          const {id, user} = resetPassword;
          try{
               let response = await axios.post('/api/reset-password/'+id, user)
               toast.success('Password changed')
               setTimeout(()=>{
                    window.locaton.href='/contacts'
               })
                return response.data;

          }
          catch(err){
               toast.error('Oops!, An error occurred, try again')
               return rejectWithValue(err.response)
          }
     }
);


export const fetchUser = createAsyncThunk(
     'users/fetchUser', async()=>{
          try{
               let response = await axios.get('/api/users')
                return response.data;

          }
          catch(err){
               toast.error('Oops!, An error occurred, try again')
               return console.log(err.response)
          }
     }
);


export const deleteUser = createAsyncThunk(
     'users/deleteUser', async(id, {rejectWithValue})=>{
          try{
               let response = await axios.delete('/api/user/delete', id)
               toast.success('success')
               if(response.data === 'User deleted'){
                    return id;
               }
                

          }
          catch(err){
               toast.error('Oops!, An error occurred, try again')
               return rejectWithValue(err.response)
          }
     }
);



const user = sessionStorage.getItem('currentUser');
export const currentUser = JSON.parse(user);

export const logoutUser = async() =>{
      sessionStorage.removeItem('currentUser')
};


const initialState ={
     users: [],
     user:[],
     status: null ,
     creating: false,
     creating2: false
};


 const userSlice = createSlice({

    name: 'users',
    initialState,
    reducers:{ },

    extraReducers:{

       [registerUser.pending]:(state)=>{
            state.status = 'pending';
            state.creating = true;
       },

       [registerUser.fulfilled]:(state, {payload})=>{
          state.status = 'fulfilled';
          state.creating = false;
          state.user = 
          state.users = payload;
     },

     [registerUser.rejected]:(state)=>{
          state.status = 'rejected';
          state.creating = false;
     },

     [loginUser.pending]:(state)=>{
          state.status = 'pending';
          state.creating = true;
     },

     [loginUser.fulfilled]:(state, {payload})=>{
        state.status = 'fulfilled';
        state.creating = false;
        state.user = payload;
   },

   [loginUser.rejected]:(state)=>{
        state.status = 'rejected';
        state.creating = false;
   },

   [forgotUser.pending]:(state)=>{
     state.status = 'pending';
     state.creating2 = true;
},

  [forgotUser.fulfilled]:(state, {payload})=>{
   state.status = 'fulfilled';
   state.creating2 = false;
    console.log(payload);
},

  [forgotUser.rejected]:(state)=>{
   state.status = 'rejected';
   state.creating2 = false;
},

[fetchUser.pending]:(state)=>{
     state.status = 'pending';
     state.creating = true;
},

[fetchUser.fulfilled]:(state, {payload})=>{
   state.status = 'fulfilled';
   state.creating = false;
   state.users = payload;
},

[fetchUser.rejected]:(state)=>{
   state.status = 'rejected';
   state.creating = false;
},

[deleteUser.pending]:(state)=>{
     state.status = 'pending';
     state.creating = true;
},

[deleteUser.fulfilled]:(state, {payload})=>{
   state.status = 'fulfilled';
   state.creating = false;
   state.users = state.users.filter(user=>user._id !== payload._id);
},

[deleteUser.rejected]:(state)=>{
   state.status = 'rejected';
   state.creating = false;
},

[resetcodeUser.pending]:(state)=>{
     state.status = 'pending';
     state.creating2 = true;
},

[resetcodeUser.fulfilled]:(state, {payload})=>{
   state.status = 'fulfilled';
   state.creating2 = false;
   state.user = payload;
},

[resetcodeUser.rejected]:(state)=>{
   state.status = 'rejected';
   state.creating2 = false;
},



[resetUser.pending]:(state)=>{
     state.status = 'pending';
     state.creating2 = true;
},

[resetUser.fulfilled]:(state, {payload})=>{
   state.status = 'fulfilled';
   state.creating2 = false;
   state.contacts.map(user=>{
     if(user._id === payload._id){
      user.password = payload.password
     }
      return null;
   })
},

[resetUser.rejected]:(state)=>{
   state.status = 'rejected';
   state.creating2 = false;
},

 }
})

export default userSlice.reducer;