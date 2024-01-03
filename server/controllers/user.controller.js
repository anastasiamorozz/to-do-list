const db = require('../db')

class UserController {
    async createUser(req, res){
        const {username, email, password} = req.body;
        //const newUser = await db.query('INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password])
        console.log(username)
        res.json("ok")
    }

    async getUsers(req, res){

    }

    async getOneUser(req, res){}

    async updeteUser(req, res){

    }

    async deleteUser(req, res){}
}

module.exports = new UserController();