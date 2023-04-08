const { Server } = require('socket.io');

class Sockets {
    constructor(){
        this.io = null;
    }

    configureSockets(server){
        this.io = new Server(server, {
            cors: {
                origin: "*",
            }
        });
        // console.log(this.io)
        this.io.on('connection', (socket) => {
            console.log(`User connected: ${socket.id}`);
        })

        this.io.on('disconnect', (socket) => {
            console.log(`User disconnected: ${socket.id}`);
        })

        this.io.on("comenzar", (data) => {
            console.log(data)
        })
        
    }

}

module.exports = Sockets;