const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({'path': './.env'})

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors());

io.on('connection', (socket) => {
    socket.emit('connectionId', socket.id);

    socket.on('disconnect', () => {
        socket.brodcast.emit('call ended');
    })

    socket.on('callUser', ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit('callUser', {
            signal: signalData,
            from,
            name
        })
    })

    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})