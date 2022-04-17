const express = require('express');
const router = express.Router();



require('../models/Contact');


router.post('/api/contact', async(req, res)=>{
    try{
      console.log(req.body)

      let newContact = {
          name: req.body.name,
          phone: req.body.phone,
          id: req.body.id,
      }

        console.log(newContact)
        let result = await Contact.create(newContact)
         return res.status(200).json(result);
 
       
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json('Error'+" "+err.message)

    }

});


router.get('/api/contacts', async(req, res)=>{
    try{

 
        let contact = await Contact.find({}).sort({createdAt:-1})
        console.log(contact)
         return res.status(200).json(contact)
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json('Error'+" "+err.message)
    }
});



router.get('/api/contact/:id', async(req, res)=>{
     try{
            let contact = await Contact.findOne({_id: req.params.id})
            return res.status(200).json(contact);

     }
     catch(err){
         console.log(err.message);
         return res.status(400).json('Error'+" "+err.message)

     }
});


router.put('/api/contact/:id', async(req, res)=>{
      try{
         let contact = await Contact.findOne({_id: req.params.id})
              contact.name = req.body.name,
              contact.phone = req.body.phone,
              contact.save()
               console.log(contact);
               return res.status(200).json(contact)
      }
      catch(err){
          console.log(err.message)
          return res.status(400).json('Error'+" "+err.message)

      }
});


router.delete('/api/contact/:id', async(req, res)=>{
    try{
                console.log(req.params)
             await Contact.deleteOne({_id: req.params.id})
             return res.status(200).json('Contact deleted')
    }
    catch(err){
        console.log(err.message)
        return res.status(400).json('Error'+" "+err.message)
    }
});



module.exports = router;