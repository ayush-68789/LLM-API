const mongoose = require('mongoose') ;

const messageSchema = new mongoose.Schema({
    conversationId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'convo',
        required : true , 
        index : true
    },
    role : {
        type : String,
        enum : ['user', 'assistant'] ,
        required : true 
    },
    content : {
        type : String ,
        required: true,
        trim :true 
    }
}, {timestamps : true}) 

const message = mongoose.model('Message' , messageSchema) ;
module.exports = message ;