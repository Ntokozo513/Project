const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

   /* const token = req.header("checkToken")
    if(!token){
        return res.status(401).send("Access cancelled")
    }*/
    try{
        const token = req.header.authorization.split(" ")[1];
        console.log(token);
        const decrypt = jwt.verify(token,process.env.AUTH_TOKEN);
        req.userData = decrypt;
        next();
    }catch(error){
        return res.status(401).json({
            message: "Authoration unsuccessful"
        });

    }
};



