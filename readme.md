#Didact

**Didact** is a component using **NodeJS** for speak a voice **remotelly** using a little computer, like a Raspberry Pi or Basic PC. The speak code are maded by a sequence of six chars with combinations from A-Z_0-9.

##Install
You can install didact using basically NPM (Node Package Manager).

```npm install -i```

##Required modules
- async
- mosca
- mqtt

##Setup
Setup the environment using your preferences to get the best experience.

###Extending possibilities of speak
You can setup your didact installation to do a lot of things using the voice code. So, you maybe want extend didact operations you can create a lot of interfaces. See a example below:

**Interfaces** preferences:

```
{
	"interface" : {
		"speak" : {
			"command" : {
				"voice" : {
					"linux" : "",
					"osx" : "say {speak}"
				}
			}
		}
	}
}
```
**Pay atention!** You can have **n** points of interfaces speaking the same voice. Basically, adding in the commands tree.

**Basic config** preferences:

```
{
	"name" : "DIDACT",
	"version" : "0.0.1",
	"language" : "ptBR",
	"os" : "osx",
	"socket" : {
		"port" : 1882
	}
}
```

* Supported languages
	* ptBR
	* enUS
* Operation System
	* linux
	* windows
	* osx

**Pay atention!** You maybe need open the port on your firewall.

##Speaks
You can create a custom file with a lot of codes that represents the vocabulary. You can see a example below: 

```
{
	"voice" : "default",
	"speak" : {
		"AAAA1" : {
			"lang" : {
				"enUS" : "Hello",
				"ptBR" : "Olá"
			}
		},
		"AAAA2" : {
			"lang" : {
				"enUS" : "You are welcome!",
				"ptBR" : "Seja bem vindo"
			}
		}
	}
}
```

##Running
You can run the application using basic NodeJS command, that application still a live and execute when are called.

```
node init.js
```

##Example
You can make a basic call using **MQTT** protocol to perform commands direct to your didact base with your definitions.

See a example below:

```
var mqtt = require('mqtt');

var settings = {
    host : {host},
    port : {port},
    keepalive: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: 'DIDACT'
}

if (didact.client == false) {
    didact.client = mqtt.connect("mqtt://" + host,settings);
}

didact.client.publish("##AAAA1", "##AAAA1"); // predefined message
didact.client.publish("#-Hello", "#-Hello"); // direct message

```

**Pay atention!** Look for **two types of call**, first with **##** call to a predefined message and second uses **#-** for sends a message direct from the buffer to didact base speak.

##@TODO

- Create more nodes of languages to the other countries.
- Create a buffer to perform a voice when the speaker don't receive more sequenced data and have a good answer.
- Apply bayesians filters to perform a prediction of best words to answer a question based on a code.

--
created by **José Wilker** <jose.wilker@smartapps.com.br>