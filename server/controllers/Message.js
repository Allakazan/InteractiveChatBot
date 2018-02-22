
exports.sendMessage = function (message, conversation, callback) {
    var param = {};
    if (message !== '') {
        param = {
            input: { text: message },
            //context : response.context,
        };
    }
    conversation.message(param, callback);
}