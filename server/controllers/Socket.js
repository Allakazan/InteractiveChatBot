var BaseController = require("./Base");
var Bot = require("./Bot");

module.exports = BaseController.extend({
    name: 'Socket',
    content: null,
    handleSocket: function(io) {
        io.on('connection', function(client) {
            console.log("Connected to Socket!!"+ client.id);

            client.on('disconnect', function() {
                console.log("disconnected")
            });
            client.on('joinRoom', function(data) {
                client.join(data.roomId);
                console.log(' Client '+data.roomId+' joined the room and client id is '+ client.id);
            });
            client.on('sendUserMessage', function(data) {
                io.in(data.roomId).emit('newMessage', {'message':data.message, 'sender':'user'});
                var botMessage = Bot.getBotMessage();
                setTimeout(function () {
                    io.in(data.roomId).emit('newMessage', {'message':botMessage.message, 'sender':'bot'});
                }, 300);
            });
        });
    }
});