const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
require('./config/Passport')(passport);


const server = express();

mongoose.Promise = global.Promise;

//Production//

if(process.env.NODE_ENV === 'production'){
    mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true, useNewUrlParser: true
    })
    .then(()=>console.log('Mongodb for production connected'))
    .catch(err=>console.log(err)); 
    }else{
        mongoose.connect(process.env.LOCAL_URL, {
          useUnifiedTopology: true, useNewUrlParser: true
       })
       .then(()=>console.log('Mongodb connected'))
       .catch(err=>console.log(err));
    }; 

   
    
    


server.use(express.json());

server.use(cors());

server.use(session({
     resave: false,
     secret: 'secret',
     saveUninitialized: false,

}));


server.use(passport.initialize());
server.use(passport.session());


server.use(express.static(path.join(__dirname, 'public')));


server.use('/', require('./routes/User'));
server.use('/', require('./routes/Contact'));

//Serving the build index react file to server//
server.use(express.static(path.join(__dirname, 'client/build')))

server.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,  'client', 'build', 'index.html'));
}); 
    

server.set('port', process.env.PORT || 5000);
server.listen(server.get('port'), ()=>console.log('Server is running on port'+ " "+ server.get('port')));

