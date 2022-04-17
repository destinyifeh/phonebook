import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import {singleContact, deleteContact} from '../Redux/contactSlice';
import './Contacts.css';
import Header2 from '../Header2';



export default function Show(){

const {id} = useParams();

 const dispatch = useDispatch();

 const loading = useSelector(state=>state.contacts.loading);
 const deleting = useSelector(state=>state.contacts.deleting);

 const contact = useSelector(state=>state.contacts.contact);
  
 const {name, phone, _id } = contact;
 
    useEffect(()=>{
        if(id && id !== " "){
        dispatch(singleContact(id))
        }

    }, [dispatch, id]);

    let handleDelete = (id) =>{
        console.log(id)
         dispatch(deleteContact(id))
    }
    
    return(
        <>
    
  
     <Header2/>  

        <div className="container-fluid p-3 show-page my-4 border-bottom">
        {loading?<p className="text-dark text-center">Loading...</p>: ''}
        {deleting?<p className="text-dark text-center">Deleting...</p>: ''}

            {name?
             <p className="first-letter text-center d-block mx-auto">{name.charAt(0)}</p>
             : ''}
             <h5 className=""> {name} </h5>   
        </div>
        <div className="container-fluid d-md-flex justify-content-center mt-4 border-bottom">
            <div className=" col-sm-6 d-flex justify-content-around">
               <div className="text-center">
               <a className="call-link" href={`tel:${phone}`}>  
               <i className="fa fa-phone "></i>
               <p>Call</p>
               </a>

               </div>
               <div className="text-center">
               <a className="call-link" href={`sms:${phone}`}>  

               <i className="fa fa-envelope"></i>
               <p>Text</p>
               </a>

               </div>
               <div className="text-center">
               <a className="direct-link" href={`https://wa.me/234${phone?.slice(1)}`}>

               <i className="fa fa-whatsapp"></i>
               <p>Chat</p>
               </a>

               </div>

            </div>
          
        </div>
        <div className="container-fluid border-bottom p-3">
            <a className="direct-link" href={`phone:${phone}`}>

            <span className=""><i className="fa fa-phone"> Voice call {phone}</i></span>
            </a>
        </div>
        <div className="container-fluid border-bottom p-3">
            <a className="direct-link" href={`sms:${phone}`}>
            <span className=""><i className="fa fa-envelope"> Message {phone}</i></span>
             </a>
        </div>
        <div className="container-fluid border-bottom p-3">
            <a className="direct-link" href={`https://wa.me/234${phone?.slice(1)}`}>

            <span className=""><i className="fa fa-whatsapp"> Chat {phone}</i></span>
            </a>

        </div>

        <div className="container-fluid border-bottom p-3">
            <Link className="direct-link" to="#" onClick={()=>{handleDelete(_id)}}>

            <span className="text-danger"><i className="fa fa-trash"> Delete </i></span>
            </Link>

        </div>
          <div className=" d-flex justify-content-end ">
         <Link to={`/edit/contact/${_id}`} className=" pencil "><i className="fa fa-pencil text-white d-flex justify-content-center"></i></Link>
               

        </div>
     
        </>
    )
}