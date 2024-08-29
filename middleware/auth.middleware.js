const jwt =require('jsonwebtoken')
const authenticateToken=(req,res,next)=>{
    const token =req.headers.authorization.split(' ')[1]
    if(!token){
         return res.sendStatus(401); 
    }else{
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if (err) return res.sendStatus(403); 
            req.user=decoded;
            next()
        })
    }

}
module.exports= authenticateToken