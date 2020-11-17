const express = require("express");
const app = express();
const morgan = require("morgan");

const documentRoutes = require("./api/routes/documents")

app.use("/documents",documentRoutes);
app.use(morgan("dev"));

app.use((error,req,res,next)=>{
    res.status(500).json({
        error:{
            message: error.message
        }
    });
});

/*app.use((req,res,next)=>{
    res.status(200).json({
        message : "It works"
    });

});*/

module.exports = app;