import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {resetcodeUser, fetchUser} from '../Redux/userSlice';
import Header2 from '../Header2';

export default function ResetCode(){


      const [resetPasswordToken, setResetPasswordToken] = useState('');
       
      const dispatch = useDispatch();

      const users = useSelector(state=>state.users.users)
      const creating = useSelector(state=>state.users.creating2)

       console.log(users)
      let changeToken = (e) =>{
        let resetPasswordToken = e.target.value;
        setResetPasswordToken(resetPasswordToken);
    };


    
  
  useEffect(()=>{
    dispatch(fetchUser());
 }, [dispatch]);
 

    let onSubmit=(e)=>{
        e.preventDefault();

        let checkToken = users.map(user=>user.resetPasswordToken)
        if(!resetPasswordToken){
            let err ='Enter reset code';
            console.log(err)
            toast.error('Enter reset code');
            return false;
        };
        if(resetPasswordToken.length !== 6){
         let err ='Password reset code must be six digit number';
         console.log(err)
         toast.error('Password reset code must be six digit number');
         return false;
     };

       if(checkToken.includes(resetPasswordToken)){
           let success = 'resetPasswordToken found';
            console.log(success)
         let user = {
             resetPasswordToken: resetPasswordToken
         }
          console.log(user);
          dispatch(resetcodeUser(user))
           return true;

        }else{
            let err ='No reset password code found';
         console.log(err)
         toast.error('No reset password code found');
         return false;


        }
    };

    return(
        <>
       <Header2/>

        <div className="container mt-5">
   <form className="reset-form col-sm-4 d-block mx-auto" onSubmit={onSubmit}>
   <h5 className="text-center">Enter Reset Code </h5>
     {creating? <p className="text-center text-dark">Sending....</p>: ''}


    <div className="form-group text-center">
     <label className="">Enter reset-code sent to your email</label>
     <input className="form-control" type="text" value={resetPasswordToken} onChange={changeToken}/>
    </div>
   
    <div className="form-group mt-3">
        <button className="w-100 user-btn">Proceed</button>
    </div>
</form>
</div>
</>
)
}