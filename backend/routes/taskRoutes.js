const express = require('express');
const protect = require('../middleware/project');

const {
    createTask,
    getMyTask,
    updateTask,
    deleteTask, 
    getTask
}= require('../controllers/taskController');


const router = express.Router();


router.use(protect);


router 
    .route('/')
    .get(getMyTask)
    .post(createTask);
router
    .route('/:id')
    .get(getTask)
    .patch(updateTask)
    .delete(deleteTask);

module.exports = router;



