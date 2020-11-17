const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Document = require("../models/document");

const multer = require("multer");

const storage = multer.diskStorage({
    distination: function(req,file,cb){
        cb(null, "./uploads/");
    },

    filename: function(req,file,cb){
        cb(null, new Date().toISOString() + file.orginalname);
    }

});

/*const fileFIlter = (req,file,cb) =>{
    if(file.mimetype === "image/jpeg" || file === "image/png"){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
*/
const upload = multer({
    //dest: "uploads/",
    storage: storage,
    //setting limit your 5 mb:
   /* limits: {
        fileSize: 1024 * 1024 *5
    },*/
    //fileFilter: fileFIlter
});



router.post("/",upload.single("doc"),(req,res,next)=>{

    console.log(req.file);
    const document = new Document({
        _id : new mongoose.Types.ObjectId,
        name: req.body.name,
        link: req.body.link
    });
    
    document.save().then(result =>{
        console.log(result);
        res.status(201).json({
            message: "Handing POST requests to /documents",
            createdDocument: result
        });
    }).catch(err => {
         console.log(err),
         res.status(500).json({
             error: err
         });
        
        })
});
router.get("/",(req,res,next) =>{
    Document.find().exec().then(docs =>{
        console.log(docs);
       // if(docs.length >= 0){
            res.status(200).json(docs);
       /* }else{
            res.status(404).json({
                message: "No entries found"
            })
        }*/
        res.status(200).json(docs);
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    });
});

router.delete("/:documentId",(req,res,next)=>{
    const id = req.params.documentId;
    Document.remove({_id: id}).exec().then(result =>{
        res.status(200).json(result);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    })
});




module.exports = router;