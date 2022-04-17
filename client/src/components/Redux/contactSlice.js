import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify';

import { currentUser} from '../Redux/userSlice';



export const addContact = createAsyncThunk(
   'contacts/addContact', async(newContact, {rejectWithValue})=>{

       try{
           let response = await axios.post('/api/contact', newContact)
           toast.success('Contact added')
           console.log(response)
           return response.data;
       }
       catch(err){
            toast.error('Oops! An error occurred, try again')
            console.log(err.response,'error')
             return rejectWithValue(err.response)   
       }
   }
);



export const fetchContacts = createAsyncThunk(
   'contacts/fetchContacts', async()=>{

       try{
           let response = await axios.get('/api/contacts')
            let data = response.data.filter(contact=>contact.id === currentUser._id)
           return data;

       }
       catch(err){
            toast.error('Oops! An error occurred, try again');
           return err.response;
       }
   }
);


export const singleContact = createAsyncThunk(
    'contacts/singleContact', async(id, {rejectWithValue})=>{
        try{
            let response = await axios.get('/api/contact/'+id)
             return response.data;
        }
        catch(err){
           toast.error('Oops! An error occurred, try again');

            return rejectWithValue(err.response);
        }
    }
);


export const updateContact = createAsyncThunk(
   'contacts/updateContact', async(updateData, {rejectWithValue})=>{
               const {id, update} = updateData;      
       try{
             let response = await axios.put('/api/contact/'+id, update) 
             toast.success('Contact updated');
             setTimeout(()=>{
               window.location.href='/contact/'+id;

             }, 1000)

            return response.data;
       }
       catch(err){
           toast.error('Oops! An error occurred, try again');

           return rejectWithValue(err.response);
       }
   }
);


export const deleteContact = createAsyncThunk(
   'contacts/deleteContact', async(id, {rejectWithValue})=>{
       try{
           let response =  await axios.delete('/api/contact/'+id)
             console.log(response)
              if(response.data ==='Contact deleted'){
                  toast.success('Contact deleted');
                  console.log(response.data)
                 setTimeout(()=>{
                     window.location.href='/contacts';
      
                   }, 1000)
                  return id;
              }
       }
       catch(err){
           toast.error('Oops! An error occurred, try again');
           return rejectWithValue(err.response)
       }
   }
);



const initialState ={
     contacts: [],
     contact:[],
     status: null ,
     loading: false,
     deleting: false,
     updating: false,
     searches:[],
     removeIt: false,
     noSearch: false,
     removeContacts: true,
};


 const contactSlice = createSlice({

    name: 'contacts',
    initialState,
    reducers:{
            addSearches: (state, {payload})=>{
                state.searches = payload;
            },

            fetchSearches: (state, {payload})=>{
               state.searches = payload;
           },

           removeSearch: (state)=>{
            state.removeIt = false;
        },
         removeSearch2: (state)=>{
            state.removeIt = true;
        },
        noSearchResult: (state)=>{
            state.noSearch = true;
        },
        
        noSearchResult2: (state)=>{
            state.noSearch = false;
        },

        removeCont: (state)=>{
            state.removeContacts = true;
        },
        
        removeCont2: (state)=>{
            state.removeContacts = false;
        },


     },
    extraReducers:{
           [addContact.pending]:(state)=>{
              state.status ='pending';
              state.loading = true;
           },
           [addContact.fulfilled]:(state, {payload})=>{
            state.status ='fulfilled';
            state.contacts.unshift(payload);
            state.loading = false;

         },
         [addContact.rejected]:(state)=>{
            state.status = 'rejected';
            state.loading = false;
         },

         [fetchContacts.pending]:(state)=>{
            state.status ='pending';
            state.loading = true;

         },
         [fetchContacts.fulfilled]:(state, {payload})=>{
          state.status ='fulfilled';
          state.contacts = payload;
          state.loading = false;
         

       },
       [fetchContacts.rejected]:(state)=>{
          state.status = 'rejected';
          state.loading = false;

       },


       [singleContact.pending]:(state)=>{
         state.status ='pending';
         state.loading = true;

      },
       [singleContact.fulfilled]:(state, {payload})=>{
       state.status ='fulfilled';
       state.contact = payload;
       state.loading = false;

    },
     [singleContact.rejected]:(state)=>{
       state.status = 'rejected';
       state.loading = false;

     },

      [updateContact.pending]:(state)=>{
      state.status ='pending';
      state.updating = true;

   },
    [updateContact.fulfilled]:(state, {payload})=>{
    state.status ='fulfilled';
    state.updating = false;

    state.contacts.map(contact=>{
       if(contact._id === payload._id){
          contact.name = payload.name;
          contact.phone = payload.phone;

       }
       return null;
    })
 }, 
   [updateContact.rejected]:(state)=>{
    state.status = 'rejected';
    state.updating = false;

  },

    [deleteContact.pending]:(state)=>{
    state.status ='pending';
    state.deleting = true;

},
     [deleteContact.fulfilled]:(state, {payload})=>{
    state.status ='fulfilled';
    state.contacts = state.contacts.filter(contact=>contact._id !== payload._id);
    state.deleting = false;

  },
   [deleteContact.rejected]:(state)=>{
    state.status = 'rejected';
    state.deleting = false;

   },

}
});

 export const {addSearches, fetchSearches, removeSearch, removeSearch2, noSearchResult, noSearchResult2, removeCont, removeCont2} = contactSlice.actions;
export default contactSlice.reducer;