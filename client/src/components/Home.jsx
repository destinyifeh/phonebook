import React, {useState} from 'react';
//import {Link} from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Roll from 'react-reveal/Roll';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Header from './Header';
//import Footer from './Footer';
import Register from './users/Register';
import Login from './users/Login';
import img1 from '../images/pics/cloud.png';
import img2 from '../images/pics/cus1.png';
import img3 from '../images/pics/img3.png';
import { toast } from 'react-toastify';

function Home(){
      
    const [showReg, setReg] = useState(false);
    const [showLog, setLog] = useState(false);
    const [firstName, setfirstName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);



    
    const login = useSelector(state=>state.users.user)
    console.log(login)


    const changeEmail = (e) =>{
         setEmail(e.target.value);
    };

    const changeName = (e) =>{
        setfirstName(e.target.value);
   };

   const changeMessage = (e) =>{
       console.log(e.target)
    setMessage(e.target.value);
};

const handleClick = (e) => {
      setReg(true)
};
    
        const onSubmit = async(e) =>{
            try{
            e.preventDefault();

               if(!firstName){
                   let err = 'Add your name';
                   console.log(err);
                   toast.error(err)
                   return false;
               }

               if(!email){
                let err = 'Add your email';
                console.log(err);
                toast.error(err)
                return false;
            }

            if(!message){
                let err = 'Add your message';
                console.log(err);
                toast.error(err)
                return false;
            }else{
                  
                let messageBody = {
                     firstName,
                     email,
                     message
                }
                console.log(messageBody);
                setSending(true)
               let res = await axios.post('/api/message', messageBody)
                 console.log(res.data);
                 setEmail('');
                 setMessage('');
                 setfirstName('');
                 setSending(false)

                toast.success('Message delivered');
          
                 
            }
        }
         catch(err){
            console.log(err.message)
            toast.error('Oops! An error occurred, try again')
            setSending(false)

         }
        }

    return(
     
            <>
            <Header showReg={showReg} setReg={setReg} showLog={showLog} setLog={setLog} />
             <div className="container-fluid image-content">
                 {showReg?
                <Register showReg={showReg} setReg={setReg}/>
                :''}

                {showLog?
                <Login showLog={showLog} setLog={setLog}/>
                : ' '}
               
            <div className="container head-info">
               <h4 className="text-center">Giving You The Best</h4>
               <p className="text-center"> We provides million of users a secure, accessible and user friendly platform to store and backup their phone contacts</p>
               </div>
        </div>

       
         <div className="container info my-4">
              <div className="row">
              
                  <div className="col-lg-4 infos">
                    <Fade bottom >

                      <h5 className="text-center my-3 ">Lets Manage Your Contact Storage</h5>
                      </Fade>
                      <Fade bottom>
                      <img className="d-block mx-auto" src={img1} alt=""/>
                      </Fade>
                      <Fade left>
                      <p>Are you worried about low storage and security? worry no more because
                         phonebook is here for you. We provides free unlimited storage capacity to our active users world wide.</p>
                         </Fade>

                  </div>
                
                  <div className="col-lg-4 infos">
                       <Fade bottom >

                      <h5 className="text-center my-3">247 Customer Support Service</h5>
                      </Fade>
                      <Fade bottom>
                      <img className="d-block mx-auto" src={img2} alt=""/>
                      </Fade>
                      <Fade left>
                        <p> We are always available for you anytime you need our help. Our customer support representatives will
                         always make sure you are attended to and help to find solution to any difficulties you encountered on this platform. </p>
                         </Fade>
                    </div>
                  <div className="col-lg-4 infos">
                     <Fade bottom >

                      <h5 className="text-center my-3">Connect With Your Contacts</h5>
                      </Fade>
                      <Fade bottom>
                      <img className="d-block mx-auto" src={img3} alt=""/>
                      </Fade>  
                      <Fade left>  
                          <p>Dial and connect with you saved contacts, We help you to manage thousand of your contacts without any cost attached to it. 
                           Connect with your loved ones and family right here</p>
                         </Fade>
                  </div>
              </div>
         </div>
               <div className="container-fluid map">
                   <Fade bottom >

                   <h5 className="text-center">1,000,000+</h5>
                   <h5 className="text-center">Monthly Active Users</h5>
                   <p className="text-center">Million of users are using this platform for storing and backing up their mobile contacts. Our active users are mostly from African countries such as Nigeria, Ghana, and Cameroon</p>
                   
                   <div className="d-flex justify-content-around">
                     <div className="continent">
                         <p className="text-center"> Africa</p>
                         <h5 className="">700,000+</h5>
                     </div>
                     <div className="continent">
                         <p className="text-center"> Europe</p>
                         <h5 className="">200,000+</h5>
                     </div>
                     <div className="continent">
                         <p className="text-center"> Asia</p>
                         <h5 className="">100,000+</h5>
                     </div>  
                     </div>
                     <p className="text-center">Active users by geography</p>
                     </Fade> 
                   </div>
                   
                   <div className="container reviews my-4" id="review">
                     <Fade bottom >
                      <h5 className="text-center review-num">500,000+</h5> 
                      <h5 className="text-center">Total User Reviews</h5> 
                      <p className="">Our aim is to ensure we continue providing quality and exceptional services to our users. The heart warmed reviews the users of this platform write every day does not only motivate us but put smile on our faces . We are happy that you are happy!</p>
                       
                         <div className="d-flex justify-content-center rating">
                        <i className="fa fa-star text-center"></i>
                        <i className="fa fa-star text-center"></i>
                        <i className="fa fa-star text-center"></i>
                        <i className="fa fa-star text-center"></i>
                        <i className="fa fa-star text-center"></i>

                        </div>
                        
                        <h5 className="text-center pass"><span className="pass-one">5.0</span><span className="pass-two"> / 5.0</span></h5>
                        <p className="text-center percent">100 % user rating </p>
                        </Fade>
                        <Fade bottom >

                        <div className="">
                            <h5 className="text-center">Some Of The Reviews By Our Users</h5>
                            <div className="row">
                                <div className="col-lg-6 mt-3">
                            <div className="d-flex justify-content-center">
                        <i className="fa fa-star text-center user-rate"></i>
                        <i className="fa fa-star text-center user-rate"></i>
                        <i className="fa fa-star text-center user-rate"></i>
                        <i className="fa fa-star text-center user-rate"></i>
                        <i className="fa fa-star text-center user-rate"></i>

                        <p className="rate-text"><span className="percent">By </span>Donatus</p>
                        </div>
                        <p className="text-center">User friendly</p>
                        <p className="">Since i started using this platform to store my contacts it has been very easy for me. This platform is actually the best unlike others i was using in the past. It has been great experience and haven't for once being disappointed or regret using this platform to store and backup my mobile contacts.  </p>
                        </div>
                      
                        <div className="col-lg-6 mt-3">
                            <div className="d-flex justify-content-center">
                            <i className="fa fa-star text-center user-rate"></i>
                        <i className="fa fa-star text-center user-rate"></i>
                        <i className="fa fa-star text-center user-rate"></i>
                        <i className="fa fa-star text-center user-rate"></i>
                        <i className="fa fa-star text-center user-rate"></i>

                        <p className="rate-text"><span className="percent">By </span> Jerusha</p>
                        </div>
                        <p className="text-center">I'm Loving It</p>
                        <p className="">This platform was recommended to me by a friend and i created user account here just few days ago, and am beginning to love it. This site is very interactive and easy to navigate, good job and thumbs up to the developers of this site. I have started recommending family and friends just the way it was recommended to me and i know they won't be disappointed.</p>
                        </div>
                         
                        </div>


                        </div>
                        </Fade>
                   </div>
                  

         <div className="container-fluid about-us" id="about-us">
            <Fade bottom >

             <h5 className="text-center">About Us</h5>
             <p> Phonebook is a secure and user friendly platform for storing and backing up mobile contacts. Our aim is to ensure our users mobile contacts are highly secured and accessible by them at any time. </p>
              <p className="text-center">Join million of active users that uses this platfom</p>
             <a href="#top" className="create d-flex justify-content-center" onClick={handleClick}>Create account now</a>
             </Fade >
         </div>
          
          <div className="container inquiry my-5 p-4 text-white" id="contact">
              <div className="row">
                  <div className="col-lg-6 ">
                      <Roll>
                      <h5 className="p-3">Write To Us</h5>
                      </Roll>
                      <Fade left>
                      <form className="" onSubmit={onSubmit}>
                      <div className="form-group">
                          <label>Name</label>
                      <input type="text" className="form-control" value={firstName} onChange={changeName} />
                         </div>
                          <div className="form-group">
                          <label>Email</label>
                      <input type="email" className="form-control" vale={email} onChange={changeEmail} />
                         </div>
                         <div className="form-group">
                             <label>Message</label>
                           <textarea className="form-control" rows="5" placeholder="your message here..." value={message} onChange={changeMessage} />
                         </div>
                         <div className="form-group my-3">
                         <button className="btn w-100 contact-btn" type="submit">{sending? <span>Sending message <i className="fa fa-spinner fa-spin"></i></span>: 'Submit message'}</button>

                         </div>
                      </form>
                      </Fade>
                  </div>
                  <div className="col-lg-6">
                      <Fade bottom>
                      <h5 className="text-center p-3">Other Inquiries</h5>
                      <p className="text-center">For media inquiries please do not hesitate to contact us using our email address <span className="address">phonebook@gmail.com</span></p>
              <p className="text-center">For support and help please do contact us using our support email address <span className="address">phonebook.support@gmail.com</span></p>
              <p className="text-center">You can follow our social media handles<span className="address"> @phonebook</span> to get recent updates from us <span className="address">Facebook, Twitter, Instagram</span></p>
                     </Fade>
                  </div>
              </div>
          </div>

          <div className="container-fluid footer pb-2">
              <p className="text-center pt-5">Copyright &copy; Phonebook, 2022. All rights reserved</p>
              
          </div>

        </>
    )
}



export default Home;