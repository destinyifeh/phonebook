const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ContactSchema = new Schema({
           
                name:{type: String},
               phone:{type: String},
               createdAt:{type: Date, default: Date.now}

   });

   module.exports = Contact = mongoose.model('contacts', ContactSchema);