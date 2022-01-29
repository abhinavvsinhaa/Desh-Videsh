const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    // emit socket id to the client, from which connection is established to the server
    socket.emit("established", socket.id);
})

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})