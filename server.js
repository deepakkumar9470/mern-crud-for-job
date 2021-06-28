
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000
app.use(cors());

// Importing Routes
const itemRoute = require("./routes/todoRoute");
app.use(express.json());
app.use("/todo", itemRoute);



if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Connection to MongoDB here
mongoose.connect(process.env.MONGO_URL, 
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true, useFindAndModify : true})

const db = mongoose.connection
db.on("error", (err)=>{
    console.log(err);
})
db.once("open", ()=>{
    console.log("MongoDB Connection Successful..");
})



app.listen(PORT, (req, res)=>{
    console.log(`Server started on PORT ${PORT}`);
})