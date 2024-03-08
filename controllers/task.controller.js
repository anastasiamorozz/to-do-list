const db = require('../db');

class TaskController{
    async createTask(req, res) {
        const { title, date } = req.body;
        const userId = req.params.id;
    
        try {
            const user = await db.query('SELECT * FROM Users WHERE id = $1', [userId]);
    
            if (user.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
    
            const newTask = await db.query('INSERT INTO Task (title, day, creator_id) VALUES ($1, $2, $3) RETURNING *', [title, date, userId]);
    
            res.status(201).json(newTask.rows[0]);
        } catch (error) {
            console.error('Error during task creation:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getUserTasks(req, res){
        const userId = req.params.id;
        const selectedDate = req.query.selectedDate;
        if(selectedDate == null || selectedDate == undefined){
            return res.status(501).json({error:"Missing parameter"})}
        try {
            const tasks = await db.query(`SELECT * FROM Task WHERE creator_id = $1 AND day= $2`, [userId, selectedDate]);

            res.status(201).json({data: tasks.rows});

        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async changeSatus(req, res) {
        try {
            const { new_status } = req.body;
            const taskId = req.params.id;
    
            console.log('New Status:', new_status);
            console.log('Task ID:', taskId);
    
            const result = await db.query("UPDATE Task SET status=$1 WHERE task_id=$2", [new_status, taskId]);
    
            console.log('Update Result:', result);
    
            res.status(201).json({ message: "Success" });
        } catch (error) {
            console.error('Error:', error);
            res.status(400).json({ message: "Error!" });
        }
    }

    async deleteCompleted(req, res){
        try{
            const userId = req.params.id;
            const {day} = req.body;
            const result = await db.query('DELETE FROM Task WHERE creator_id = $1 AND day = $2 AND status = $3', [userId, day, 'Completed']);

            if (result.rowCount > 0) {
              res.status(200).json({ success: true, message: 'Completed tasks deleted successfully' });
            } else {
              res.status(404).json({ error: 'No completed tasks found for the specified user and day' });
            }
        } catch (error) {
            console.error('Error during deleteCompleted:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    
}

module.exports = new TaskController();