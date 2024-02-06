const Router = require('express');
const router = new Router();
const RoomContoller = require('../controllers/room.controller');

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API for managing rooms
 */

/**
 * @swagger
 * /rooms/createRoom:
 *   post:
 *     summary: Create a new room
 *     description: Create a new room with a specified name and creator
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomName:
 *                 type: string
 *               creatorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Successfully created a new room
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/createRoom', RoomContoller.createRoom);

/**
 * @swagger
 * /rooms/addUser:
 *   post:
 *     summary: Add a user to a room
 *     description: Add a user to a room with a specified username and room ID
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               roomId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User added to the room successfully
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
 *         description: User not found or Room not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/addUser', RoomContoller.addUserToRoom);

/**
 * @swagger
 * /rooms/getUsersRooms/{id}:
 *   get:
 *     summary: Get rooms created by the user and rooms the user is added to
 *     description: Get rooms created by the user and rooms the user is added to with a specified user ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to get rooms for
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Successfully retrieved user's rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dataCr:
 *                   type: array
 *                   items:
 *                 dataAdd:
 *                   type: array
 *                   items:
 *       500:
 *         description: Internal Server Error
 */

router.get('/getUsersRooms/:id', RoomContoller.getUsersRoom);

/**
 * @swagger
 * /rooms/delete/{id}:
 *   delete:
 *     summary: Delete rooms
 *     description: Delete rooms
 *     tags: [Rooms]
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
 *     responses:
 *       200:
 *         description: Room deleted successfully
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

router.delete('/delete/:id', RoomContoller.deleteRoom);

/**
 * @swagger
 * /rooms/tasks/{roomId}:
 *   get:
 *     summary: Get tasks in a room
 *     tags: [Rooms]
 *     description: Get all tasks in a specific room
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks in the room
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   task_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   day:
 *                     type: string
 *                   room_id:
 *                     type: integer
 *                   creator_id:
 *                     type: integer
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.get('/tasks/:id', RoomContoller.getTasksInRoom);

module.exports = router;