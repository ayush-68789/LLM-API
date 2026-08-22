const mongoose = require('mongoose') ;

const convoSchema = new mongoose.Schema({
    title : {
        type : String , 
        default : "New conversation" ,
        trim : true
    }, 
    systemPrompt : {
        type : String,
        default : 'You are a Helpful Ai assistant'
    }
}, {timestamps : true})

const convo = mongoose.model("convo", convoSchema) ;

module.exports = convo ;