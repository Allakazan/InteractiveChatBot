
exports.sendMessage = function (message, conversation, io, roomId) {
    var param = {};
    if (message !== '') {
        param = {
            input: { text: message },
            //context : response.context,
        };
    }
    exports.io = io;
    exports.roomId = roomId;
    conversation.message(param, exports.messageCallback);
}

exports.messageCallback = function (err, response) {
    if (err) return;

    if (response.output.text.length !== 0) {
        exports.io.in(exports.roomId).emit('newMessage', {'message':response.output.text[0], 'sender':'bot'});
    }
}