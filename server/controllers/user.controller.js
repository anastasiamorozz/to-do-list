const jwt = require('jsonwebtoken');
const { createSecretToken } = require('../util/SecretToken.js');
const bcrypt = require('bcrypt');
const db = require('../db')

class UserController {
    async createUser(req, res){
        try {
            const { username, email, password } = req.body;
        
            const existingUser = await db.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
        
            if (existingUser.rows.length > 0) {
              return res.status(409).json({ error: 'User with this username or email already exists' });
            }
        
            const hashedPassword = await bcrypt.hash(password, 10);
        
            const newUser = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
        
            const userId = newUser.rows[0].id;
            const token = createSecretToken(userId);

            res.status(201).json({token});
          } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    }

    async loginUser(req, res) {
        try {
          const { username, password } = req.body;
      
          const user = await db.query('SELECT * FROM users WHERE username = $1', [username]);
      
          if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      
          const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
      
          if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
          }
      
          const userId = user.rows[0].id;
          const token = createSecretToken(userId);
      
          res.status(200).json({ token });
        } catch (error) {
          console.error('Error during login:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }

    async getUsers(req, res){
        const users = await db.query('SELECT * FROM Users')
        return res.status(200).send({users: users.rows})
    }

    async getOneUser(req, res){
        const userId = parseInt(req.params.id);
        if(!userId){
            return res.status(400).send({error: 'Invalid ID'}); 
        }
        const user = await db.query("SELECT * FROM Users WHERE id=$1", [userId]);
        return res.status(200).send(user.rows);
    }

    async updeteUser(req, res){
        const userId = req.params.id;
    }

    async deleteUser(req, res){}
}

module.exports = new UserController();