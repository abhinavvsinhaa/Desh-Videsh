const express = require('express');
const cors = require('cors');

const translate = require('translate-google');

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

    // event call user
    socket.on("callUser", ({ from, to, signal }) => {
        io.to(to).emit("callUser", {
            from, 
            signal
        })
    })

    socket.on("callAccepted", ({ to, signal }) => {
        io.to(to).emit("acceptCall", signal);
    })

    socket.on("message", ({ to, message }) => {
        translate(message, { to: 'hi' })
        .then(res => {
            io.to(to).emit("recieve-message", { message: res });
        })
        .catch(console.log)
        
        // io.to(to).emit("recieve-message", { message });
    }) 
})

const PORT = process.env.PORT;

httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})