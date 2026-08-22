const express = require('express') ; 
const Router = express.Router() ; 
const askAi = require('../controllers/ai.chat.controller') ;

Router.post('/chat', askAi) ;  

module.exports = Router ; 