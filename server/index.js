const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());

const userRouter = require('./routes/user.routes');

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.use(express.json()); 

app.use('/user', userRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('server running on port', port);
});
