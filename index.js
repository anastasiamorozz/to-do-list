const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();
const YAML = require( 'yamljs');                                                  
const swaggerUi = require( 'swagger-ui-express');                               
const ExpressSwaggerGenerator = require( 'express-swagger-generator');          
const swiggerOptions = require( './config/swigger.options.js');

const __dirname = dirname(fileURLToPath(import.meta.url));

const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'docs.yaml'));

if (config.get("doc.swagger2") === true) {
    const expressSwaggerGenerator = ExpressSwaggerGenerator(app);
    expressSwaggerGenerator(swiggerOptions(__dirname));
}

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

const userRouter = require('./routes/user.routes');
const taskRouter = require('./routes/task.routes');
const roomRouter = require('./routes/room.routes');

app.get('/', (req, res) => {
    res.send("Server is running");
});



app.use(express.json()); 

app.use('/user', userRouter);
app.use("/tasks", taskRouter);
app.use('/rooms', roomRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('server running on port', port);
});
