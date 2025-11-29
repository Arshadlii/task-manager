const { DataTypes, Model } = require ('sequelize');
const sequelize = require ('../config/db');


const Task = sequelize.define('Task',{
    id:{
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true
    },
    
    title:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
    }
    },
    description:{
    type: DataTypes.TEXT
    },
    status:{
        type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
        defaultValue:'pending'
    },
    priority:{
        type:DataTypes.ENUM('LOW','MEDIUM','HIGH'),
        defaultValue:'MEDIUM'
    },
    dueDate:{
        type: DataTypes.DATE,
        validate:{
            isDate:true
        }
    },
    userId :{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'users',
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    }
    },
    {
      tableName: 'tasks',
      timestamps: true,
  indexes: [
    {
      fields: ['status']
    },
    {
      fields: ['priority']
    },
    {
        fields: ['dueDate']
    },
    {
        fields: ['userId']
    }
  ]
});

module.exports = Task;