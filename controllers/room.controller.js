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
      // try {
      //     const roomsCreator = await db.query(`SELECT * FROM Rooms WHERE creator_id = $1`, [userId]);
      //     const roomsIDAdded = await db.query(`SELECT room_id FROM UsersInRoom WHERE user_id = $1`, [userId]);
      //     if (roomsIDAdded.rows.length > 0) {
      //       const roomIds = roomsIDAdded.rows.map(row => row.room_id);
      //       const roomsAdded = await db.query(`SELECT * FROM Rooms WHERE room_id IN (${roomIds.join(',')})`);
      //       res.status(201).json({ dataCr: roomsCreator.rows, dataAdd: roomsAdded.rows });
      //   } else {
      //       res.status(201).json({ dataCr: [], dataAdd: [] });
      //   }
  
      // } catch(error){
      //     res.status(500).json({ error: 'Internal Server Error' });
      // } 
      const roomsCreator = await db.query(`SELECT * FROM Rooms WHERE creator_id = $1`, [userId]);
      const roomsIDAdded = await db.query(`SELECT room_id FROM UsersInRoom WHERE user_id = $1`, [userId]);
      if (roomsIDAdded.rows.length > 0) {
        const roomIds = roomsIDAdded.rows.map(row => row.room_id);
        const roomsAdded = await db.query(`SELECT * FROM Rooms WHERE room_id IN (${roomIds.join(',')})`);
        res.status(201).json({ dataCr: roomsCreator.rows, dataAdd: roomsAdded.rows });
    } else {
        res.status(201).json({ dataCr: [], dataAdd: [] });
    }
  }

  async deleteRoom(req, res){
    // try{
    //   const userId = req.params.id;
    //   const {roomId} = req.body;
    //   const result = await db.query(`DELETE * FROM Rooms WHERE room_id = $1 AND creator_id=$2`, [roomId, userId]);
    //   if (result.rowCount > 0) {
    //     res.status(200).json({ success: true, message: 'Room deleted successfully' });
    //   } else {
    //     res.status(404).json({ error: 'No rooms found' });
    //   }
    // }catch(error){
    //   res.status(500).json({ error: 'Internal Server Error' });
    // }
    const userId = req.params.id;
      const {roomId} = req.body;
      const result = await db.query(`DELETE FROM Rooms WHERE room_id = $1 AND creator_id=$2`, [roomId, userId]);
      if (result.rowCount > 0) {
        res.status(200).json({ success: true, message: 'Room deleted successfully' });
      } else {
        res.status(404).json({ error: 'No rooms found' });
      }
  }

  async createTaskInRoom(req, res) { //internal server error
    const { roomId, title, day } = req.body;
    const userId = req.params.id;

    try {
        const user = await db.query('SELECT * FROM Users WHERE id = $1', [userId]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newTask = await db.query('INSERT INTO Task (title, day, room_id, creator_id) VALUES ($1, $2, $3, $4) RETURNING *', [title, day, roomId, userId]);

        res.status(201).json(newTask.rows[0]);
    } catch (error) {
        console.error('Error during task creation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  async getTasksInRoom(req, res){
    const {roomId} = req.body;
    try{
      const tasks = await db.query(`SELECT * FROM  Task WHERE room_id=$1 ORDER BY "day" ASC`, [roomId]);
      res.status(200).send(tasks.rows);
    }catch(error){
      console.log("ERROR GETTING TASKS IN ROOM", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
    
}

module.exports= new RoomContoller();