const { User } =  require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '8u4yf97hweijuhr87236466248';

exports.signup = async(req,res)=>{
    try{
        const {name,email,password } = req.body;

        const newUser =await User.create({name,email,password});

        res.status(201).json({
            status:'success',
            data:
            {
                id:newUser.id,
                name:newUser.name,
                email:newUser.email
            }
        });
    }catch(err){
        console.error(err);
        res.status(400).json({status:'fail' ,message:err.message});
    }
};


exports.login = async (req,res)=>{
    try{
        const{email,password}=req.body;

        const user=await User.findOne({ where :{email}});
        if(!user){
            return res.status(401).json({ststus:'fail' ,message:'enter a valid email'});

        }
        const correct=await user.correctPassword(password);
        if(!correct){
            return res.status(401).json({status:'fails',message : 'invalid email or password'});
        }

        const token = jwt.sign({id:user.id},JWT_SECRET,{

            expiresIn:'7d'
            });

            res.json({
                status:'success',
                token,
                data:{
                  id:user.id,
                  name:user.name,
                  email:user.email
                }
            });

    }catch(err){
        console.error(err);
        res.status(500).json({status:'erroro',message:'server error'});
    }
};