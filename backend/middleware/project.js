const jwt = require('jsonwebtoken');
const { User } = require('../models')

const JWT_SECRET= '8u4yf97hweijuhr87236466248';


module.exports =async (req,res,next) =>
{
    try{
        const authHeader = req.headers.authorization;

        console.log("RECIVED HEADER",authHeader)

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({status : 'fail',message :'not logged in'});
        }
            const token = authHeader.split(' ')[1];
            const decoded=jwt.verify(token,JWT_SECRET);

            const user = await User.findByPk(decoded.id);
            if(!user){
               return res.status(401).json({status:'fail',message:'user no longer exists'});
            }
            req.user = user;
            next();
    }catch(err){
        console.error(err);
        res.status(401).json({status:'fail',message:'invalid token'});

    }
};