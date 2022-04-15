import {useState} from 'react';
import Fade from 'react-reveal/Fade';
import {toast} from 'react-toastify';
import './Contacts.css';
import {useDispatch, useSelector} from 'react-redux';
import {addContact} from '../Redux/contactSlice';

export default function New ({showNew, setNew}){
    console.log(showNew)

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

     const dispatch = useDispatch();

     const loading = useSelector(state=>state.contacts.loading);
  

    const handleName = (e) =>{
        console.log(e)
        setName(e.target.value);
    };

    const handlePhone = (e) =>{
         setPhone(e.target.value)
    };

    const handleNew = () =>{
        setNew(false);
    }

        const onSubmit = (e) =>{
            e.preventDefault();
           if(!name || !phone){
            const err = 'You cannot submit empty form';
            console.log(err)
             toast.error('You cannot submit empty form');
             return false;
          }else{
            const newContact = {
                name,
                phone
            }
            console.log(newContact)
            setPhone('');
            setName('');
             dispatch(addContact(newContact))
           
            return true;
        }
     }


    return(
             <>
               <Fade top>
                     {showNew?   
            <form className="reg col-sm-4 d-block mx-auto p-3" id="add-form" onSubmit={onSubmit}>
                <div className="d-flex justify-content-around">
            <h5 className="text-center">Add Contact </h5>
            <i className="fa fa-times text-white" style={{cursor: 'pointer'}} onClick={handleNew}></i>
            </div>
             {loading? <p className="text-white text-center">Adding...</p>: ''}
          <div className="form-group">
              <label>Name</label>
              <input className="form-control" type="text" value={name} onChange={handleName} />
             </div>
             <div className="form-group">
              <label>Phone Number</label>
              <input className="form-control" type="tel" value={phone} onChange={handlePhone} />
             </div>
            
             <div className="form-group mt-3">
                 <button className="w-100 user-btn">Create</button>
             </div>
        </form>
        : ' '}
        </Fade> 
        </>
    )
}


