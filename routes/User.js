const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config()


require('../models/User');



 
   //Register route//

   router.post('/api/user/register', async(req, res, next)=>{
       try{
          console.log(req.body)
          let setPassword = await bcrypt.genSalt(10);
          let securePassword = await bcrypt.hash(req.body.password, setPassword);
          let newUser = {
              email: req.body.email,
              password: securePassword
          }
          console.log(newUser)

              let user = await User.create(newUser)
                 console.log(user)
             passport.authenticate('local', (err, user)=>{
                console.log('user',user)
                if(err) return res.send(err);
                if(!user){
                   return res.send('Incorrect password');
                }else{
                  
        
                 req.login(user, (err)=>{
                    if(err) return res.status(400).send('Error:'+ " "+ err);
        
                     return res.send(user);
        
                })
                }
            })(req, res, next)


          }
         catch(err){
           console.log(err.message)
       }
   })


//Login route//

  router.post('/api/user/login', (req, res, next)=>{
    try{
    passport.authenticate('local', (err, user)=>{
        console.log(user)
        if(err) return res.send(err);
        if(!user){
           return res.send('Incorrect password');
        }else{
          

         req.login(user, (err)=>{
            if(err) return res.status(400).send('Error:'+ " "+ err);

             return res.send(user);

        })
        }
    })(req, res, next)

  }
  catch(err){
    console.log(err.message)
  }
}); 



//forgot password//



      router.post('/api/forgot/password', async(req, res)=>{
          try{
               console.log(req.body)
            let user = await User.findOne({email: req.body.email})
               console.log(user)
              if(!user){
                  console.log('no user')
              }else{

               let token = Math.random().toString().substr(2, 6);
                user.resetPasswordToken = token;
                user.resetPasswordExpires =  Date.now() + 3600000; // 1 hour
                  
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                      user: process.env.GMAIL_EMAIL,
                      pass: process.env.GMAIL_PASS
                    },
                    tls:{
                      rejectUnauthorized:false,
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'Phonebook <noreply.'+process.env.GMAIL_EMAIL+'>',
                    subject: 'Phonebook - Password Reset',
                    text: 'You are receiving this because you (or someone else)  have requested the reset of the password for your account on phonebook.\n\n' +
                    'Please copy the following password reset code, to complete the process:\n\n' +
                    'Password reset code: '+ " " + user.resetPasswordToken + '\n\n' +
                    'If you did not create this, please ignore this email.\n',
        
                    
                    };
                 
                  transporter.sendMail(mailOptions, function(err, info){
                    if(err){
                        console.log(err)
                        return res.status(400).send('Error:'+ " "+err);
                    }else{

                         user.save()
                         console.log('Password reset email sent' + info.response)

                          return res.status(200).json('Password reset email has been sent to your email:'+ " "+info.response+ " " +user)
                        
                    }
                })
                //Reset password email end

              }
              }
              catch(err){
                  console.log(err.message)
                  return res.status(400).json('Error'+" "+err)
              }
            
            });



       //password reset code route//
       
       router.post('/api/reset-password-code', async(req, res)=>{
         try{
           let user = await User.findOne({resetPasswordToken: req.body.resetPasswordToken, resetPasswordExpires: { $gt: Date.now() }})
           console.log(user)
           if (!user) {
            return res.send( 'Password reset token is invalid or has expired');
             
          }else{
              let resetPasswordToken = req.body.resetPasswordToken;
              console.log(resetPasswordToken)
              return res.status(200).send(user);
          }
        }
        catch(err){
          onsole.log(err.message)
          return res.status(400).json('Error'+" "+err)
        }
       });


       
       // New password route //
       
  router.post('/api/reset-password/:id', async(req, res)=>{
    try{
        console.log(req.body)
        console.log(req.params)
        let user = await User.findOne({_id: req.params.id, resetPasswordExpires: { $gt: Date.now() }})
        if (!user) {
         return res.send( 'Password reset token is invalid or has expired');
          
       }else{
           
           let setPassword = await bcrypt.genSalt(10);
           let securePassword = await bcrypt.hash(req.body.password, setPassword);
         
           user.password = securePassword;
           user.resetPasswordToken = undefined;
           user.resetPasswordExpires = undefined;
             
               await user.save( async(err, user)=>{
                 if(err) return res.status(400).send('Error:'+ err)
                
                 let transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true,
                  auth: {
                    user: process.env.GMAIL_EMAIL,
                    pass: process.env.GMAIL_PASS
                  },
                  tls:{
                    rejectUnauthorized:false,
                  }
              });
              var mailOptions = {
                  to: user.email,
                  from: 'Phonebook <noreply.'+process.env.GMAIL_EMAIL+'>',
                  subject: 'Password Successfully Changed',
                  text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
               
                transporter.sendMail(mailOptions, function(err, info){
                if(err) {
                  console.log(err);
                }else{
                 console.log('Password reset email sent' + info.response)
                }         
                                
              })
              //New password email end 
          
                   req.login(user, (err)=>{
                      if(err) return res.status(400).send('Error:'+ " "+ err);
          
                       return res.send(user)

                })
                  
            })  
           
       }
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json('Error:'+" "+err)
    }
 });
  
      
          
 router.get('/api/users', async(req, res)=>{
   try{
    let users = await User.find({})
    return res.status(200).json(users)
   }
   catch(er){
     console.log(err.message)
    return res.status(400).json('Error:'+ " "+err)
   }
});




        




router.post('/api/message', async(req,res)=>{
            console.log(req.body)
  try{
    

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS
      },
      tls:{
        rejectUnauthorized:false,
      }
  });
  var mailOptions = {
      to: process.env.GMAIL_EMAIL,
      from: req.body.email,
      subject: 'Phonebook - You have a message from '+" "+req.body.firstName,
      text: req.body.message,
      replyTo: req.body.email,
      
      };
   
    transporter.sendMail(mailOptions, function(err, info){
      if(err){
          console.log(err)
          return res.status(400).send('Error:'+ " "+err);
      }else{
             console.log('Message sent' + info.response)
        return res.status(200).json('Message sent:'+ " "+info.response)
      
          
      }
  })
  //Message email end

  }
  catch(err){
    console.log(err.message)
  }
});







  

  
module.exports = router;