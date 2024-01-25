const Router = require('express');
const router = new Router();
const RoomContoller = require('../controllers/room.controller');

router.post('/createRoom', RoomContoller.createRoom);
router.post('/addUser', RoomContoller.addUserToRoom);
router.get('/getUsersRooms/:id', RoomContoller.getUsersRoom);

module.exports = router;