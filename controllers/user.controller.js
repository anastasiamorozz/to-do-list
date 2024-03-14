const { createSecretToken } = require('../util/SecretToken.js');
const bcrypt = require('bcrypt');
const db = require('../db');

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

            res.status(201).json({token, userId});
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
            return res.status(401).json({ error: 'Invalid username' });
          }
      
        //   bcrypt.hash(password, saltRounds, (error, hash) => {
        //     if (error) {
        //         console.log('Error: ', error);
        //     } else {
        //         console.log(`Your encrypted password is: ${hash}`)
        //         // here you can send hashed passwords to the database
        //         hash_pass = hash;
        //         bcrypt.compare(user.rows[0].password, hash, (error, result) => {
        //           if (error) {
        //               console.error('Error: ', error);
        //           } else {
        //               console.log('Is the password correct: ', result); // true or false
        //           }
        //         });
        //     }
        // });
        
          const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
      
          if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid password' });
          }
      
          const userId = user.rows[0].id;
          const token = createSecretToken(userId);
      
          res.status(200).json({ token, userId, username });
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

    async updateUsername(req, res){
      const { username } = req.body;
      const userId = req.params.id;
    
      try {
        const checkUsername = await db.query('SELECT * FROM Users WHERE username = $1 AND id != $2', [username, userId]);
    
        if (checkUsername.rows.length > 0) {
          return res.status(409).json({ error: 'Username is already taken' });
        }
    
        const updateResult = await db.query('UPDATE Users SET username = $1 WHERE id = $2 RETURNING *', [username, userId]);
    
        if (updateResult.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).json({ success: true, message: 'Username updated successfully', username});
      } catch (error) {
        console.error('Error during username update:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
    }

    async updatePassword(req, res){
      const { currentPassword, password } = req.body;
      const userId = req.params.id;
    
      try {
        const getOldPassword = await db.query('SELECT password FROM Users WHERE id = $1', [userId]);

        const comparePasswords = await bcrypt.compare(currentPassword, getOldPassword.rows[0].password);



        // const checkPasswords = await db.query('SELECT * FROM Users WHERE id = $1 AND password != $2', [userId, currentPassword]);
    
        if (!comparePasswords) {
          return res.status(409).json({ error: 'Curent password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const updateResult = await db.query('UPDATE Users SET password = $1 WHERE id = $2 RETURNING *', [hashedPassword, userId]);
    
        if (updateResult.rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        res.status(200).json({ success: true, message: 'Password updated successfully'});
      } catch (error) {
        console.error('Error during password update:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
    }
}

module.exports = new UserController();