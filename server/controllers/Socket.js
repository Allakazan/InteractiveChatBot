var Message = require("./Message");

module.exports = class Socket {

    constructor(){}

    static handleSocket(io, conversation) {
        io.on('connection', function(client) {
            console.log("Connected to Socket!!"+ client.id);

            client.on('disconnect', function() {
                console.log("disconnected")
            });
            client.on('joinRoom', function(data) {
                client.join(data.roomId);
                console.log(' Client '+data.roomId+' joined the room and client id is '+ client.id);
                Message.sendMessage('', conversation, io, data.roomId);
            });
            client.on('sendUserMessage', function(data) {
                io.in(data.roomId).emit('newMessage', {'message':data.message, 'sender':'user'});
                Message.sendMessage(data.message, conversation, io, data.roomId);
            });
        });
    }
};