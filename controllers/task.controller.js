const db = require("../db"); 
const {Task, Sequelize}=require('../sequelize/models')
const Op = Sequelize.Op;
const { calculateSimilarity, vectorizeTitle } = require('../util/vectorUtils');
 
class TaskController { 
  async createTask(req, res) { 
    const { title, day } = req.body; 
    const userId = req.params.id; 
 
    try { 
      const user = await db.query("SELECT * FROM Users WHERE id = $1", [ 
        userId, 
      ]); 
 
      if (user.rows.length === 0) { 
        return res.status(404).json({ error: "User not found" }); 
      } 
 
      const newTask = await db.query( 
        "INSERT INTO tasks (title, day, creator_id, status) VALUES ($1, $2, $3, $4) RETURNING *", 
        [title, day, userId, "To Do"] 
      ); 
 
      res.status(201).json(newTask.rows[0]); 
    } catch (error) { 
      console.error("Error during tasks creation:", error); 
      res.status(500).json({ error: "Internal Server Error" }); 
    } 
  } 
 
  async getUserTasks(req, res) { 
    const userId = req.params.id; 
    const selectedDate = req.body.selectedDate; 
    try { 
      var tasks; 
      if (selectedDate) { 
        tasks = await db.query( 
          `SELECT * FROM tasks WHERE creator_id = $1 AND day= $2`, 
          [userId, selectedDate] 
        ); 
      } else { 
        tasks = await db.query(`SELECT * FROM tasks WHERE creator_id = $1`, [ 
          userId, 
        ]); 
      } 
 
      res.status(201).json({ data: tasks.rows }); 
    } catch (error) { 
      res.status(500).json({ error: "Internal Server Error" }); 
    } 
  } 
 
  async changeSatus(req, res) { 
    try { 
      const { new_status } = req.body; 
      const taskId = req.params.id; 
 
      const result = await db.query( 
        "UPDATE tasks SET status=$1 WHERE task_id=$2", 
        [new_status, taskId] 
      ); 
 
      res.status(201).json({ message: "Success" }); 
    } catch (error) { 
      console.error("Error:", error); 
      res.status(400).json({ message: "Error!" }); 
    } 
  } 
 
  async deleteCompleted(req, res) { 
    try { 
      const userId = req.params.id; 
      const { day } = req.body; 
      const result = await db.query( 
        "DELETE FROM tasks WHERE creator_id = $1 AND day = $2 AND status = $3", 
        [userId, day, "Completed"] 
      ); 
 
      if (result.rowCount > 0) { 
        res.status(200).json({ 
          success: true, 
          message: "Completed tasks deleted successfully", 
        }); 
      } else { 
        res.status(404).json({ 
          error: "No completed tasks found for the specified user and day", 
        }); 
      } 
    } catch (error) { 
      console.error("Error during deleteCompleted:", error); 
      res.status(500).json({ error: "Internal Server Error" }); 
    } 
  } 

  async sortByKey(req, res){
    try {
        const { sortField, sortOrder } = req.query;
        let order;
        if (sortOrder === 'asc') {
          order = [[sortField, 'ASC']];
        } else {
          order = [[sortField, 'DESC']];
        }
        const sortedData = await tasks.findAll({
          order: order
        });
        res.status(200).json(sortedData);
      } catch (err) {
        console.log('Error in sorting', err);
        res.status(500).json({ error: "Internal Server Error" });
      }
  }

  async searchByDate(req, res) {
    try {
      const { fromDate, toDate } = req.query;
      
      const fromDateTime = new Date(fromDate);
      const toDateTime = new Date(toDate);
  
      const tasks = await tasks.findAll({
        where: {
          day: {
            [Op.between]: [fromDateTime, toDateTime]
          }
        }
      });
  
      res.status(200).json(tasks);
    } catch (err) {
      console.log('Error in searching by date:', err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async filterByStatus(req, res) {
    try {
      const { status } = req.query;
  
      const filteredTasks = await tasks.findAll({
        where: {
          status: {
            [Op.eq]: status
          }
        }
      });
  
      res.status(200).json(filteredTasks);
    } catch (err) {
      console.error('Error filtering tasks:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async vectorSearchByTitle(req, res) {
    try {
      const { inputTitle } = req.query;
  
      if(inputTitle != null){
        const inputTitleVector = vectorizeTitle(inputTitle);

        const allTitles = await Task.findAll({ attributes: ['title'] });
  
        const titleVectors = allTitles.map(Task => vectorizeTitle(Task.title));
    
        const similarities = titleVectors.map(titleVector =>
          calculateSimilarity(inputTitleVector, titleVector)
        );
    
        const sortedTitles = allTitles.sort((a, b) =>
          similarities[allTitles.indexOf(b)] - similarities[allTitles.indexOf(a)]
        );
    
        res.status(200).json(sortedTitles);
      }
      else{
        res.status(400).json({error: "Input title is required"});
      }
  
      
    } catch (err) {
      console.error('Error in vector search by title:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

} 
 
module.exports = new TaskController();
