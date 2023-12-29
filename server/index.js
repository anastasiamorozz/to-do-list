const express = require("express")
const app = express()
require('dotenv').config()


app.get('/', (req, res) => {
    res.send("Server is runing");
})

app.listen(process.env.PORT || 8080, ()=>{
    console.log('server running')});