const Router = require('express');
const router = new Router();
const TaskController = require('../controllers/task.controller');

router.post('/createTask/:id', TaskController.createTask);
router.get('/allTasks/:id', TaskController.getUserTasks);
router.post('/updateStatus/:id', TaskController.changeSatus);
router.delete('/deleteCompleted/:id', TaskController.deleteCompleted)

module.exports = router;