const express = require("express");
const router = express.Router();

router.post((req,res,next)=>{
    const Document = {
        name: req.body.name,
        link: req.body.link
    }
    res.status(200).json({
        message: "Document was posted",
        postedDoc: Document
    })
})


module.exports = router;