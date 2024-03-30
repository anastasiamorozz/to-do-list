const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const { sequelize } = require('./sequelize/models/');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());

const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes');
const roomRouter = require('./routes/room.routes');

app.get('/', (req, res) => {
    res.send("я не лох :D");
});


const connectDb = async () => {
    console.log('Checking db connection...');

    try{
        await sequelize.authenticate();
        console.log('Database connection established.');
    }catch(e){
        console.log('Database connection failed!', e);
        process.exit(1);
    }
}

app.use(express.json()); 

app.use('/user', userRouter);
app.use("/tasks", taskRouter);
app.use('/rooms', roomRouter);

app.use('/', ()=>{
    return  'я не лох :D';
})

(async () => {
    await connectDb();
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log('server running on port', port);
    });
})();
