var BaseController = require("./Base");

module.exports = BaseController.extend({
    name: 'Bot',
    content: null,
    getBotMessage: function() {
        return {'message': 'Eai mano'};
    }
});