const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing users
 */

/**
 * @swagger
 * /user/reg:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     description: Create a new user with a unique username and email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new user
 *         content:
 *           application/json:
 *             schema:
 *       409:
 *         description: User with this username or email already exists
 *       500:
 *         description: Internal Server Error
 */

router.post('/reg', userController.createUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     description: Login user with a valid username and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: integer
 *                 username:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal Server Error
 */

router.post('/login', userController.loginUser);

/**
 * @swagger
 * /user/getUsers:
 *   get:
 *     summary: Returns a list of users
 *     tags: [User]
 *     description: Get all users from the database
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get('/getUsers', userController.getUsers);

/**
 * @swagger
 * /user/getOneUser/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     description: Get user details by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Invalid ID
 *       500:
 *         description: Internal Server Error
 */

router.get('/getOneUser/:id', userController.getOneUser);

/**
 * @swagger
 * /user/updateUsername/{id}:
 *   put:
 *     summary: Update username for a specific user
 *     tags: [User]
 *     description: Update the username for a user with the given ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update the username
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Username updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 username:
 *                   type: string
 *       404:
 *         description: User not found
 *       409:
 *         description: Username is already taken
 *       500:
 *         description: Internal Server Error
 */

router.put('/updateUsername/:id', userController.updateUsername);

/**
 * @swagger
 * /user/updatePassword/{id}:
 *   put:
 *     summary: Update password for a specific user
 *     tags: [User]
 *     description: Update the password for a user with the given ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update the password
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
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
 *         description: User not found
 *       409:
 *         description: Current password is incorrect
 *       500:
 *         description: Internal Server Error
 */

router.put('/updatePassword/:id', userController.updatePassword);



module.exports = router;