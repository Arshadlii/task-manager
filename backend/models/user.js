const {  DataTypes } = require ('sequelize');
const sequelize = require ('../config/db');
const bcrypt = require('bcryptjs');


const User = sequelize.define('User',{
    id:{
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
    },
    
    name:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
    }
    },
    email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:{
        name:'unique_email',
        msg:'Email address already in use.'
    },
    validate:{
        isEmail:{msg:'Must be a valid email address'},
        notEmpty:{msg:'Email cannot be empty'}
    }
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
        notEmpty:{msg:'Password cannot be empty'}
    }
    }
    },
    {
        tableName:'users',
        timestamps:true,

        hooks:{
            beforeCreate:async(user)=>{
                if(user.password){
                    user.password=await bcrypt.hash(user.password,12);
                }
            },
            beforeUpdate:async(user)=>{

                if(user.changed('password')){
                user.password=await bcrypt.hash(user.password,12);   
            }
        }
    }
    }
    
    );



    User.prototype.correctPassword = async function(candidatePassword){
        return await bcrypt.compare(candidatePassword,this.password);
    };


    module.exports = User;