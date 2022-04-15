import {useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {updateContact} from '../Redux/contactSlice';
import './Contacts.css';
import Header2 from '../Header2';



export default function Edit(){


    const [name, setName] = useState('');
   const [phone, setPhone] = useState('');

     const dispatch = useDispatch();


    const {id} = useParams();

    const updating = useSelector(state=>state.contacts.updating);


   


    const handleName = (e) =>{
        setName(e.target.value);
    };

    const handlePhone = (e) =>{
         setPhone(e.target.value);
    };



      let handleCancel = () =>{
            window.location.href='/contacts';
      };


       

      useEffect(()=>{

        
        if(id && id !== " "){
            axios.get('/api/contact/'+id)
            .then(res=>{
                console.log(res.data)
                setName(res.data.name);
                setPhone(res.data.phone);
            })
            .catch(err=>{
                console.log(err.response)
            })
        }

    }, [dispatch, id]);
    

      const onSubmit = (e) =>{
          e.preventDefault();
          if(!name || !phone){
            const err = 'You can not submit empty form';
            console.log(err);
            toast.error('You can not submit empty form')
            return false;
          }
           
           let update = {
               name,
               phone,
           }
          dispatch(updateContact({id:id, update:update}))

      }
    return(
        <>
         <Header2/>
        <div className="container mt-4">
        <form className="reg col-sm-4 d-block mx-auto p-3" id="add-form" onSubmit={onSubmit}>
                <div className="d-flex justify-content-around">
            <h5 className="text-center">Update Contact </h5>
            <i className="fa fa-times text-white" style={{cursor: 'pointer'}} onClick={handleCancel}></i>
            </div>
            {updating?<p className="text-white text-center">Updating...</p>: ''}

            <div className="form-group">
              <label>Name</label>
              <input className="form-control" type="text" value={name} onChange={handleName} />
             </div>
             <div className="form-group">
              <label>Phone Number</label>
              <input className="form-control" type="tel" value={phone} onChange={handlePhone} />
             </div>
            
             <div className="form-group mt-3">
                 <button className="w-100 user-btn">Update</button>
             </div>
        </form>
        </div>
        </>
    )
}