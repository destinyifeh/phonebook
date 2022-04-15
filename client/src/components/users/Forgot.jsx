import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';

import {fetchUser, forgotUser} from '../Redux/userSlice';
import './User.css';
import Header2 from '../Header2';


export default function Forgot(){

    const [email, setEmail] = useState('');

    const users = useSelector(state=>state.users.users)

    const creating = useSelector(state=>state.users.creating2)
    const dispatch = useDispatch();

  const handleEmail = (e) =>{
        setEmail(e.target.value);
  };


  
  useEffect(()=>{
    dispatch(fetchUser());
 }, [dispatch]);
 
  
  const onSubmit = (e) =>{
    e.preventDefault();
      
    const checkMail = users.map(user=>user.email);
       console.log(checkMail)

      
    if(checkMail.includes(email)){
      
        const user = {
            email,
       }
       console.log(user) 
       dispatch(forgotUser(user))
  
        return true;
    }else{
        const err = 'No user found';
        console.log(err)
         toast.error('No user with this email found');
         return false;
    }

  
};


    return(
             <>
              <Header2/>  


             <div className="container mt-5">
            <form className="reset-form col-sm-4 d-block mx-auto" onSubmit={onSubmit}>
            <h5 className="text-center">Enter Account Email </h5>
            {creating? <p className="text-center text-dark">Sending....</p>: ''}

         
             <div className="form-group">
              <label>Email</label>
              <input className="form-control" type="email" value={email} onChange={handleEmail}/>
             </div>
            
             <div className="form-group mt-3">
                 <button className="w-100 user-btn">Proceed</button>
             </div>
        </form>
        </div>
        </>
    )
}