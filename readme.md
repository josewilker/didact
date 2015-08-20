#Didact

**Didact** is a component using **NodeJS** for speak a voice **remotelly** using a PC. The speak code are maded by a sequence of six chars with combinations from A-Z_0-9.

##Install
You can install didact using basically NPM (Node Package Manager).

```npm install -i```

##Required modules
- async
- mosca
- mqtt

##Setup
Setup the environment using your preferences.

###Extend
You can setup your didact installation to do a lot of things using the voice code. So, you maybe want extend didact operations you can create a lot of interfaces. See a example below:

**Execution** preferences:

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

**Basic** preferences:

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

--
created by **José Wilker** <jose.wilker@smartapps.com.br>