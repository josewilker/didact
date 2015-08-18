
var exec = require('exec');

_settingsConfig = require('./config.json');
speaks = require("./didact/speaks.json");
didact = require("./didact.json");

var mosca = require('mosca');
var server = new mosca.Server(_settingsConfig.socket);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {

    objAutoCall = packet.topic.indexOf("##");
    objDirectCall = packet.topic.indexOf("#-");

    if (objAutoCall == 0) {

        message = getMessage(packet, "##");
        doDidact(message, true);

    }

    if (objDirectCall == 0) {
        message = getMessage(packet, "#-");
        doDidact(message, false);
    }


});

server.on('ready', setup);

function doDidact(message, t) {

    objectTopic = undefined;
    objCommand = false;

    if (t) {
        eval('objectTopic = speaks.speak.' + message[0]);
    }

    eval('objVoice = didact.interface.speak.command.voice.' + _settingsConfig.os);

    if (objectTopic != undefined) {

        eval('objMessage = objectTopic.lang.' + _settingsConfig.language);
        objCommand = objVoice.replace("{speak}", objMessage);

    } else {

        objCommand = objVoice.replace("{speak}", message[0]);

    }

    if (objCommand) {
        exec(objCommand, function(err, out, code) {
            console.log(out);
        });
    }

}

function getMessage(packet, typeCall) {
    return packet.topic.replace(typeCall,"").split(",");
}

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}