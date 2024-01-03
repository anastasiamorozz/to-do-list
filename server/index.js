const express = require("express")
const app = express()
require('dotenv').config()

const userRouter = require('./routes/user.routes')

const bodyParser = require('body-parser')

app.get('/', (req, res) => {
    res.send("Server is runing");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json())
app.use('/user', userRouter)

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log('server running on port', port)});