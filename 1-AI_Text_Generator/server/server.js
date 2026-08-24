const express = require("express");
const app = express();
const connectDB = require('./config/db') ;

require("dotenv").config();

const aiRoute = require("./routes/ai.routes");

app.use(express.json());

app.use("/api/chat", aiRoute);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    connectDB() ;
    console.log(`Server running on ${PORT}`);
});