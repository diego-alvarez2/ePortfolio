import express from "express";
import {createServer} from "http";
import {Server} from 'socket.io';
import mongoose from 'mongoose';


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
    res.send('API created');
});

io.on('connection', () => {
    console.log("connect");
})

httpServer.listen(3001, () => {
    console.log('API listening on port 3001');
})