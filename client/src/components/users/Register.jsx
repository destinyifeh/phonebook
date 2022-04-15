import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import Fade from 'react-reveal/Fade';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser, currentUser, fetchUser} from '../Redux/userSlice';
import './User.css';

export default function Register ({showReg, setReg}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const users = useSelector(state=>state.users.users)


 const creating = useSelector(state=>state.users.creating)
const dispatch = useDispatch();

 console.log('current',currentUser)

  const handleEmail = (e) =>{
        setEmail(e.target.value);
  };

  
  const handlePassword = (e) =>{
    setPassword(e.target.value);
};

const handlePassword2 = (e) =>{
    setPassword2(e.target.value);
};

  useEffect(()=>{
    dispatch(fetchUser());

  }, [dispatch]);

        const onSubmit = (e) =>{
          e.preventDefault();

          const checkMail = users.map(user=>user.email);
          console.log(checkMail)
            
          if(!email || !password || !password2){
              const err = 'You cannot submit empty form';
              console.log(err)
               toast.error('You cannot submit empty form');
               return false;
          }
          if(password.length < 4){
            const err = 'Password must be atleast 4 unique characters';
            console.log(err)
             toast.error('Password must be atleast 4 unique characters');
             return false;
          }
          if(password !== password2){
            const err = 'Password do not match';
            console.log(err)
             toast.error('Password do not match');
             return false;
          }
          if(checkMail.includes(email)){
            const err = 'user exist already';
             console.log(err)
              toast.error('User with this email already exist');
              return false;
          }else{
          const user = {
               email,
               password,
          }
          console.log(user)
          dispatch(registerUser(user))
           return true;

        }
     };



    const handleReg = (e) =>{
        setReg(false);
  };

    return(
                 <>
                 <Fade top>
                     {showReg?   
            <form className="reg col-sm-4 d-block mx-auto" onSubmit={onSubmit}>
                <div className="d-flex justify-content-around">
            <h5 className="text-center">Signup </h5>
            <i className="fa fa-times text-white" onClick={handleReg} style={{cursor: 'pointer'}}></i>
            </div>
            {creating? <p className="text-center text-white">Registering....</p>: ''}
          <div className="form-group">
              <label>Email</label>
              <input className="form-control" type="email" value={email} onChange={handleEmail}/>
             </div>
             <div className="form-group">
              <label>Password</label>
              <input className="form-control" type="password" value={password} onChange={handlePassword} />
             </div>
             <div className="form-group">
              <label>Confirm Password</label>
              <input className="form-control" type="password" value={password2} onChange={handlePassword2} />
             </div>
             <div className="form-group mt-3">
                 <button className="w-100 user-btn">Proceed</button>
             </div>
        </form>
        : ' '}
        </Fade> 
        </>
    )
}