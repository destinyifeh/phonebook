import {useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchUser, loginUser} from '../Redux/userSlice';

import './User.css';

export default function Login ({showLog, setLog}){

     const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const users = useSelector(state=>state.users.users)

    const creating = useSelector(state=>state.users.creating)
    const dispatch = useDispatch();
    
  const handleEmail = (e) =>{
        setEmail(e.target.value);
  };

  
  const handlePassword = (e) =>{
    setPassword(e.target.value);
};


    const handleLog = (e) =>{
        setLog(false);
        console.log(e)
  };

  useEffect(()=>{
   dispatch(fetchUser());
}, [dispatch]);



  const onSubmit = (e) =>{
    e.preventDefault();
      
    const checkMail = users.map(user=>user.email);
       console.log(checkMail)

       if(!password || !email){
        const err = 'You cannot submit empty form';
        console.log(err)
         toast.error('You cannot submit empty form');
         return false;
    }
    if(checkMail.includes(email)){
      
        const user = {
            email,
            password,
       }
       console.log(user) 
       dispatch(loginUser(user))
  
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
                 <Fade top>
                     {showLog?   
            <form className="reg col-sm-4 d-block mx-auto" onSubmit={onSubmit}>
                <div className="d-flex justify-content-around">
            <h5 className="text-center">Login </h5>
            <i className="fa fa-times text-white" onClick={handleLog} style={{cursor: 'pointer'}}></i>
            </div>
            

            <div className="form-group">
              <label>Email</label>
              <input className="form-control" type="email" value={email} onChange={handleEmail}/>
             </div>
             <div className="form-group">
              <label>Password</label>
              <input className="form-control" type="password" value={password} onChange={handlePassword} />
             </div>
            
             <div className="form-group mt-3">
                 <button className="w-100 user-btn">{creating? <span>Please wait <i className="fa fa-spinner fa-spin"></i></span>: 'Proceed'}</button>
             </div>
             <div className="form-group d-flex justify-content-center mt-3">
                  <Link className="text-white" to="/user/forgot-password">Forgot password?</Link>
             </div>
         </form>
        : ' '}
        </Fade> 
        </>
    )
}