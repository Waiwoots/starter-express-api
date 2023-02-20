/*
const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Hello World!')
})
app.listen(process.env.PORT || 3000)
*/
var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()

const mqtt = require('mqtt');

// Your Channel access token (long-lived) 
const CH_ACCESS_TOKEN = 'CVixUkxvqKNl3JcYFW4Y9ojXKsGhDci4GSTzAiKK/r2qiSmOQHqx9sHLqs+ztdCVLvUHRzc8HArdGUQL4N+3h0ShmhgCzdw5t5iRZQrZ6V1XSbmnffnvZBz8pYQ6gXKVzIZ0n0KsYvheCRks0bx1mwdB04t89/1O/w1cDnyilFU=';

// MQTT Host
var mqtt_host = 'mqtt://tailor.cloudmqtt.com';

// MQTT Topic
var mqtt_topic = 'esp8266'; 
var mqtt_topic2 = 'command'; 


// MQTT Config
var options = {
    port: 11539,
    host: 'tailor.cloudmqtt.com',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'qokbyssi',
    password: 'NU3_l58fyf6W',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};


app.use(bodyParser.json())

app.set('port', (process.env.PORT || 4000))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


  var client = mqtt.connect(mqtt_host, options);
   client.on('connect', function() { // When connected
      console.log("Connect To MQTT Server Cloude.com");
       
         // subscribe to a topic
        client.subscribe(mqtt_topic2,function() {
         console.log("client has subscribe successful");

            // when a message arrives, do something with it
            client.on('message',function(topic,message,packet){
              console.log("message:..") ; 
              console.log("Received message: " + message + ", Topic : '" + topic + "'") ;
        
                  var message_reply = (message.toString()) ;
       
                  if (message_reply === 'notify'){
                     console.log("Replty Loop...") ; 

                     var Sender1 = "U2960159cd8a9675a29b067a801bd961b";
                   // notify(Sender1,message_reply);
                    //publish a message to a topic
                      // client.publish(mqtt_topic2, 'OK', function() {
                         //  console.log("Command notify To Set OK.") ;   
                         //  client.end(); // Close the connection when published
                      
                      
                      
                      
                       // }); 
                   }
             });
          });

          
     });

  //3000;
/*
            client.publish( mqtt_topic2,'Command OK',function() {
            //client.end(); // Close the connection when published
              var Sender1 = "U2960159cd8a9675a29b067a801bd961b";
           });
         */
  function notify(Sender1,message_reply) {
  /*  var client = mqtt.connect(mqtt_host, options);
      client.on('connect', function() { // When connected
      console.log("Connect To MQTT Server Cloude.com");
       */

        // publish a message to a topic
            client.publish(mqtt_topic2, 'OK', function() {
            console.log("Command notify To Set OK.") ;   
          //  client.end(); // Close the connection when published
        });
        
     // });
     var Sender1 = 'U2960159cd8a9675a29b067a801bd961b';
     let data = {
      to : Sender1,
      messages: [
        {
          type: 'text',
          text: message_reply
        }
      ]
    }
    request({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
      },
      url: 'https://api.line.me/v2/bot/message/push',
      method: 'POST',
      body: data,
      json: true
    }, function (err, res, body) {
      if (err) console.log('error')
      if (res) console.log('success')
      if (body) console.log(body)
    })
 
 
 
 
 
    }


  app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'))
  })
  
