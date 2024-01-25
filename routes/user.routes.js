const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');


router.post('/reg', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/getUsers', userController.getUsers);
router.get('/getOneUser/:id', userController.getOneUser);
router.put('/updeteUser', userController.updeteUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.post('/updateUsername/:id', userController.updateUsername);
router.post('/updatePassword/:id', userController.updatePassword);



module.exports = router;