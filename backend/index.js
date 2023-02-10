const express = require("express");



const morgan = require("morgan");
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator")



dotenv.config()

const port = process.env.PORT || 4005;

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


mongoose.connect(process.env.MONGO_URL,{

    useNewUrlParser : true
}).then(()=>{
    console.log("database connected")
})


//import routes

const userRoutes = require("./routes/users")
const employeeRoutes = require("./routes/employees")
const projectRoutes = require("./routes/projects")
const taskRoutes = require("./routes/tasks")
const timeRoutes = require("./routes/times")


//midelwares
app.use(cors({ origin: true }));

app.use(express.json({ extended: false, limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))

app.use(cookieParser());
app.use(expressValidator())

app.use(morgan("common"));

io.on('connection', (socket) => { 


    console.log('connect')

    socket.on('currentWin', (currentWin) => { 


        console.log(currentWin)
     });
 });




//routes midelware



app.use("/api/users",userRoutes)
app.use("/api/employees",employeeRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/tasks",taskRoutes)
app.use("/api/times",timeRoutes)


 
 server.listen(port, () => console.log(`Listening on port ${port}`));