const db = require('../db');

class RoomContoller{
    async createRoom(req, res){
      try{
        const { roomName, creatorId } = req.body;

        const checkUser = await db.query('SELECT * FROM Users WHERE id = $1', [creatorId]);
        if (checkUser.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const createRoomQuery = 'INSERT INTO Rooms (name, creator_id) VALUES ($1, $2) RETURNING *';
        const createRoomValues = [roomName, creatorId];
        const createdRoom = await db.query(createRoomQuery, createRoomValues);
    
        res.status(201).json({ data: createdRoom.rows[0] });
      } catch (error) {
        console.error('Error during room creation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    async addUserToRoom(req, res) {
      const { username, roomId } = req.body;
    
      try {
        const getUserIdQuery = 'SELECT id FROM Users WHERE username = $1';
        const getUserIdValues = [username];
        const getUserIdResult = await db.query(getUserIdQuery, getUserIdValues);
    
        if (getUserIdResult.rows.length === 0) {
          return res.json({ success: false, error: 'User not found' });
        }
    
        const userId = getUserIdResult.rows[0].id;
    
        const checkUser = await db.query('SELECT * FROM Users WHERE id = $1', [userId]);
        const checkRoom = await db.query('SELECT * FROM Rooms WHERE room_id = $1', [roomId]);
    
        if (checkUser.rows.length === 0) {
          return res.json({ success: false, error: 'User not found' });
        }
    
        if (checkRoom.rows.length === 0) {
          return res.json({ success: false, error: 'Room not found' });
        }
    
        const checkUserInRoom = await db.query('SELECT * FROM UsersInRoom WHERE user_id = $1 AND room_id = $2', [userId, roomId]);
    
        if (checkUserInRoom.rows.length > 0) {
          return res.json({ success: false, error: 'User is already in the room' });
        }
    
        const addUserQuery = 'INSERT INTO UsersInRoom (user_id, room_id) VALUES ($1, $2)';
        const addUserValues = [userId, roomId];
        await db.query(addUserQuery, addUserValues);
    
        res.json({ success: true, message: 'User added to the room successfully' });
      } catch (error) {
        console.error('Error during adding user to room:', error);
        res.json({ success: false, error: 'Internal Server Error' });
      }
    }

    async getUsersRoom(req, res){
      const userId = req.params.id;
      try {
          const roomsCreator = await db.query(`SELECT * FROM Rooms WHERE creator_id = $1`, [userId]);
          const roomsAdded = await db.query(`SELECT * FROM UsersInRoom WHERE user_id = $1`, [userId] );

          res.status(201).json({dataCr: roomsCreator.rows, dataAdd: roomsAdded.rows});

      }catch(error){
          res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    
}

module.exports= new RoomContoller();