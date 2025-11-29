const sequelize =require('../config/db');
const user =require('./user');
const task =require('./task');

// defining assciations hello dear me

user.hasMany(task,{foreignKey:'userId',as:'tasks',onDelete :'CASCADE', onUpdate:'CASCADE'});

task.belongsTo(user,{foreignKey:'userId',as:'user',onUpdate:'CASCADE',onDelete:'CASCADE'});


const models = { sequelize, User:user, Task:task };

module.exports = models;