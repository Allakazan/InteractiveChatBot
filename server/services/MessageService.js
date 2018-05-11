module.exports = class MessageService {

    constructor(){}

    static sendMessage(message, conversation, io, roomId) {
        var param = {};
        if (message !== '') {
            param = {
                input: { text: message },
                //context : response.context,
            };
        }

        conversation.message(param, function (err, response){
            if (err) return;

            if (response.output.text.length !== 0) {
                io.in(roomId).emit('newMessage', {'message':response.output.text[0], 'sender':'bot'});
            }
        }.bind(this));
    }
};