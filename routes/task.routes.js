const Router = require('express');
const router = new Router();
const TaskController = require('../controllers/task.controller');
const RoomContoller = require('../controllers/room.controller');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

/**
 * @swagger
 * /tasks/createTask/{id}:
 *   post:
 *     summary: Create a new task for a user
 *     description: Create a new task with a specified title and day for a user
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to create a task for
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               day:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */


router.post('/createTask/:id', TaskController.createTask);

/**
 * @swagger
 * /tasks/createTaskInRoom/{id}:
 *   post:
 *     summary: Create a new task in a room
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update the status
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *               type: object
 *           properties:
 *             roomId:
 *               type: string
 *             title:
 *               type: string
 *             day:
 *               type: string
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */

router.post('/createTaskInRoom/:id', RoomContoller.createTaskInRoom);

/**
 * @swagger
 * /tasks/allTasks/{id}:
 *   get:
 *     summary: Get all tasks for a user on a specific day
 *     description: Get all tasks for a user on a specific day
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get tasks for
 *         schema:
 *           type: integer
 *       - in: query
 *         name: selectedDate
 *         required: true
 *         description: Selected date to retrieve tasks for
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *       500:
 *         description: Internal Server Error
 */

router.get('/allTasks/:id', TaskController.getUserTasks);

/**
 * @swagger
 * /tasks/updateStatus/{id}:
 *   put:
 *     summary: Update status for a specific task
 *     description: Update the status for a task with the given ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to update the status
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Error updating status
 *       500:
 *         description: Internal Server Error
 */

router.put('/updateStatus/:id', TaskController.changeSatus);

/**
 * @swagger
 * /tasks/deleteCompleted/{id}:
 *   delete:
 *     summary: Delete completed tasks for a user on a specific day
 *     description: Delete completed tasks for a user on a specific day
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete completed tasks for
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *     responses:
 *       200:
 *         description: Completed tasks deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: No completed tasks found for the specified user and day
 *       500:
 *         description: Internal Server Error
 */

router.delete('/deleteCompleted/:id', TaskController.deleteCompleted)

module.exports = router;