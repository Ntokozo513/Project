const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");



const documentRoutes = require("./api/routes/documents");
const userRoutes = require("./api/routes/users")

mongoose.connect("mongodb+srv://project2DB:project2DB@cluster0.kqqwj.mongodb.net/<dbname>?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use(morgan("dev"));
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());


app.use((req,res,next) =>{
    res.header("Accesss-Control-Allow-Origin","*");
    res.header("Access-Contol-Allow-Headers","Origin, X-Requested-with,Content-Type, Accept, Authoriztion");
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }

    next();
});

app.use("/documents",documentRoutes);
app.use("/users",userRoutes)

/*app.use((error,req,res,next)=>{
    res.status(500).json({
        error:{
            message: error.message
        }
    });
});*/

app.use((req,res,next)=>{
    res.status(200).json({
        message : "It works"
    });

});

module.exports = app;