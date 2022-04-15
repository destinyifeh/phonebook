import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import {logoutUser, currentUser} from '../components/Redux/userSlice';
import {toast} from 'react-toastify';

function Header2(){

    const [show, setShow] = useState(true);
    const [remove, setRemove] = useState(false);
     const [nav, setNav] = useState(false);

    const handleShow = () =>{
           setShow(false);
           setRemove(true);
           setNav(true);
    };

    
    const handleRemove = () =>{
        setShow(true);
        setRemove(false);
        setNav(false);
 };

const handleLogout = async() =>{
     try{
          logoutUser();
          toast.success('Logged out')
          window.location.href='/';
     }
     catch(err){
       console.log(err.message)
       toast.error('Oops! An error occurred, try again')
     }
}

    return(
       <>
        <div className="container-fluid d-none d-md-flex justify-content-between header">
          <Link className="header-title" to="/">Phonebook</Link>
      

              <div className="header-nav ">
           
              {currentUser?
            <>
         <Link to="/" className="text">Home</Link>

            <Link to="/contacts" className="text">Contacts</Link>

            <Link to="#" className="text" onClick={handleLogout}>Logout</Link>
            </>
              : 
              <>
            <Link to="/" className="text">Home</Link>
            <a href="https://instagram.com" className="text"><i className="fa fa-instagram"></i></a>
            <a href="https://facebook.com" className="text"><i className="fa fa-facebook"></i></a>
            <a href="https://twitter.com" className="text"><i className="fa fa-twitter"></i></a>

            </>
            }
          
          

            </div>    
      
        </div>
        
      
<div className="container-fluid d-flex justify-content-between header d-md-none">
         
          <Link className="header-title" to="/">Phonebook</Link>
          {show?
          <i className="fa fa-reorder" onClick={handleShow}></i>
          : ' '}
           {remove?
             <i className="fa fa-times" onClick={handleRemove}></i>
             : ' '}
           </div>
           {nav?
               <Fade left>
            <div className="mobile-nav d-md-none">
            
            

            {currentUser?
            <>
         <Link to="/" className="text">Home</Link>

            <Link to="/contacts" className="text">Contacts</Link>

            <Link to="#" className="text" onClick={handleLogout}>Logout</Link>
            </>
              : 
              <>
            <Link to="/" className="text">Home</Link>
            <a href="https://instagram.com" className="text"><i className="fa fa-instagram"></i></a>
            <a href="https://facebook.com" className="text"><i className="fa fa-facebook"></i></a>
            <a href="https://twitter.com" className="text"><i className="fa fa-twitter"></i></a>

            </>
            }
          
            </div>    
            </Fade>
             : ' '}
       </>
    )
}

export default Header2;