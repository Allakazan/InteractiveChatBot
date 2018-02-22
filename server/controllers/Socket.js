var Message = require("./Message");

exports.handleSocket = function (io, conversation) {
    io.on('connection', function(client) {
        console.log("Connected to Socket!!"+ client.id);

        client.on('disconnect', function() {
            console.log("disconnected")
        });
        client.on('joinRoom', function(data) {
            client.join(data.roomId);
            console.log(' Client '+data.roomId+' joined the room and client id is '+ client.id);
            Message.sendMessage('', conversation, function (err, response) {
                if (err) return;

                if (response.output.text.length !== 0) {
                    io.in(data.roomId).emit('newMessage', {'message':response.output.text[0], 'sender':'bot'});
                }
            })
        });
        client.on('sendUserMessage', function(data) {
            io.in(data.roomId).emit('newMessage', {'message':data.message, 'sender':'user'});
            Message.sendMessage(data.message, conversation, function (err, response) {
                if (err) return;

                if (response.output.text.length !== 0) {
                    io.in(data.roomId).emit('newMessage', {'message':response.output.text[0], 'sender':'bot'});
                }
            });
        });
    });
}