import {useState} from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {resetUser} from '../Redux/userSlice';
import './User.css';
import Header2 from '../Header2';

export default function Reset (){

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

const {id} = useParams();

const dispatch = useDispatch();

const creating = useSelector(state=>state.users.creating2);

    
  const handlePassword = (e) =>{
    setPassword(e.target.value);
};

  const handlePassword2 = (e) =>{
    setPassword2(e.target.value);
};

const onSubmit = (e) =>{
    e.preventDefault();
      
    if(!password || !password2){
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
    }else{
    const user = {
         password,
    }
    console.log(user)
      dispatch(resetUser({id:id, user:user}));
      return true;

  }
};

        return(
                 <>
            <Header2/>
               <div className="container mt-5 ">
            <form className="reset-form col-sm-4 d-block mx-auto" onSubmit={onSubmit}>
            <h5 className="text-center">Reset Password </h5>
            
            {creating? <p className="text-center text-dark">Please wait....</p>: ''}

            <div className="form-group">
              <label>New Password</label>
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
        </div>
        </>
    )
}