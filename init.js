
var exec = require('exec');
var async = require('async');

_settingsConfig = require('./config.json');
speaks = require("./didact/speaks.json");
didact = require("./didact.json");

var mosca = require('mosca');

var didactLoadAction=0;
var didactArraySpeaks=[];
var server = new mosca.Server(_settingsConfig.socket);
var start = false;
var wtime = 0;
var arrayMessageA = [];
var arrayMessageD = [];

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {

    objAutoCall = packet.topic.indexOf("##");
    objDirectCall = packet.topic.indexOf("#-");

    message = false;

    if (objAutoCall == 0) {
        message = getMessage(packet, "##");
        didactLoadAction=0;
        arrayMessageA.push(message);
    }

    if (objDirectCall == 0) {
        message = getMessage(packet, "#-");
        didactLoadAction=0;
        arrayMessageD.push(message);
    }

    if (message) {

        /*
        didactArraySpeaks.push(async.apply(function(data, callback){
            doDidact(data, false);
        },message));

        async.parallel(didactArraySpeaks);

        didactArraySpeaks = [];*/

        wtime=0;

    }

});

server.on('ready', setup);

function doDidact(message, t) {

    objectTopic = undefined;
    objCommand = false;

    if (t) {
        eval('objectTopic = speaks.speak.' + message);
    }

    eval('objVoice = didact.interface.speak.command.voice.' + _settingsConfig.os);
    console.log(message);
    if (objectTopic != undefined) {
        eval('objMessage = objectTopic.lang.' + _settingsConfig.language);
        objCommand = objVoice.replace("{speak}", objMessage);
    } else {
        objCommand = objVoice.replace("{speak}", message);
    }

    if (objCommand) {
        exec(objCommand, function(err, out, code) {
            if (err) {
                console.log(err);
            }
        });
    }

}

function getMessage(packet, typeCall) {
    return packet.topic.replace(typeCall,"").split(",");
}

function execCountTime() {
    while(start) {
        wtime++;
    }
}

// fired when the mqtt server is ready
function setup() {

    console.log("Didact is up and running...");

    start = true;

    //execCountTime();

    setInterval(function(){

        console.log("waiting data...");

        // A
        arrayMessageLengthA = arrayMessageA.length;
        if (arrayMessageLengthA > 0) {

            console.log("talking by code...");

            messageString = false;
            for(i=0; i < arrayMessageLengthA; i++) {
                //;
                didactArraySpeaks.push(async.apply(function(data, callback){
                    doDidact(data, true);
                },arrayMessageA[i]));
            }

            async.parallel(didactArraySpeaks);

            didactArraySpeaks = [];

            if (arrayMessageLengthA == arrayMessageA.length) {
                arrayMessageA = [];
            }

        }

        // D
        arrayMessageLengthD = arrayMessageD.length;
        if (arrayMessageLengthD > 0) {

            console.log("talking direct...");

            messageString = false;
            for(i=0; i < arrayMessageLengthD; i++) {
                messageString += ' "' + arrayMessageD[i] + '"';
            }

            doDidact(messageString, false);

            if (arrayMessageLengthD == arrayMessageD.length) {
                arrayMessageD = [];
            }

        }

    },2000);

}