const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Document = require("../models/document");
const User = require("../models/user");
const authcheck = require("../middleware/authCheck");

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

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
    const file = req.file
    if (!file) {
      const err = new Error('Please upload a file')
      err.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
      const document = new Document({
        _id : new mongoose.Types.ObjectId,
        name: req.body.name,
        user: req.body.user,
        meta_data: req.body.meta_data
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


    //console.log(req.file);
    
});

  
/*router.get("/",(req,res,next) =>{
    Document.find().exec().then(docs =>{
        console.log(docs);
       // if(docs.length >= 0){
            res.status(200).json(docs);
       /* }else{
            res.status(404).json({
                message: "No entries found"
            })
        }
        res.status(200).json(docs);
    }).catch(err =>{
        res.status(500).json({
            error: err
        })
    });
});*/

router.get("/:documentId",(req,res,next)=>{
    const document = req.params.documentId;
    Document.find({user: document}).exec().then(doc =>{
        console.log("From database",doc);

        if(doc){
            res.status(200).json(doc);
        } else{
            res.status(404).json({
                message: "no valid entry found for the user Id"
            })
        }
        
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    })

})



router.delete("/:documentId",(req,res,next)=>{
    const id = req.params.documentId;
    Document.deleteOne({_id: id}).exec().then(result =>{
        res.status(200).json(result);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    })
});




module.exports = router;