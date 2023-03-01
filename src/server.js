import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB"
import cors from 'cors';


require('dotenv').config();


let app = express();
const corsOptions = {
    origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extends:true}))
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

viewEngine(app);
initWebRoutes(app);

connectDB()

let port = process.env.PORT || 6969;
// PORT === undefined => port = 6969

app.listen(port,()=>{
    console.log("backend nodejs is running on the port:" + port)
})