const { Task } = require ('../models');

exports.createTask = async(req,res)=>
{
    try{
        const {title,description,status,priority,dueDate }=req.body;
        const task=await Task.create({
            title,description,status,priority,dueDate,
            userId:req.user.id
        });
        res.status(201).json({status:'success',data: task}); 

    }catch(err){
        console.error(err);
        res.status(401).json({status:'fail',Message:err.message});

    }
};


exports.getMyTask = async(req,res)=>{
    try{
        const task = await Task.findAll({
        where:{userId:req.user.id},
        order: [['createdAt','DESC']]
        });

        res.status(201).json({result: task.length,data: task}); 
    }catch(err){

         console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });

    }
};

exports.updateTask = async(req,res)=>{
    try{
        const {id} = req.params;

        const task = await Task.findOne({
        where:{id,userId:req.user.id},
        });

        if(!task){
            return res.status(401).json({status:'fail',Message:'task not found'});
        }

        await task.update(req.body);

        res.json({status:'success',Message:task});

        
    }catch(err){

         console.error(err);
    res.status(400).json({ status: 'error', message: err.message });

    }
};



exports.getTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            where: { id, userId: req.user.id }
        });

        if (!task) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }

        res.status(200).json({ status: 'success', data: task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};

exports.deleteTask = async(req,res)=>{
    try{

        const {id} = req.params;

        const task = await Task.findOne({
        where:{id,userId:req.user.id},
        });

        if(!task)
        {
            return res.status(401).json({status:'fail',Message:'task not found'}); 
        }


        await task.destroy();

        res.status(204).json({result: 'success',data: null}); 
    }catch(err){

         console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });

    }
};