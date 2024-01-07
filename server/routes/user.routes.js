const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');


router.post('/reg', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/getUsers', userController.getUsers);
router.get('/getOneUser/:id', userController.getOneUser);
router.put('/updeteUser', userController.updeteUser);
router.delete('/deleteUser/:id', userController.deleteUser);



module.exports = router;