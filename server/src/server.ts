import express from "express";
import {createServer} from "http";
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import * as boardsController from './controllers/boards';
import * as usersController from "./controllers/users"
import bodyParser from "body-parser";
import authMiddleware from "./middlewares/auth";
import cors from 'cors';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

/*
mongoose.set('toJSON', {
    virtuals: true,
    transform: (_, converted) => {
        delete converted._id;
    },
});
*/

app.get("/", (req, res) => {
    res.send('API created');
});

app.post('/api/users', usersController.register);
app.post('/api/users/login', usersController.login);
app.get('/api/user', authMiddleware, usersController.currentUser);
app.get('/api/boards', authMiddleware, boardsController.getBoards);

io.on('connection', () => {
    console.log("connect");
});     

mongoose.connect('mongodb://localhost:27017/petgov').then(() => {
    console.log('connected to mongodb');

    httpServer.listen(3001, () => {
        console.log('API listening on port 3001');
    });
});  

