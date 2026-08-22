const express = require('express') ; 
const app = express() ;
const connectDB = require('./config/db') ;
require('dotenv').config() ; 

const aiRoute = require('./routes/ai.routes') ;

app.use(express.json()) ;

app.use("/ai" , aiRoute) ; 

const PORT = process.env.PORT ;
app.listen(PORT , async () => {
    await connectDB() ;
    console.log(`Server running on ${PORT}`) ; 
})