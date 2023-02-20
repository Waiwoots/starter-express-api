

var mqtt = require('mqtt');

// Your Channel access token (long-lived) 
const CH_ACCESS_TOKEN = 'cJCAjP1zeYCba76/WBwiY0ij0bzm0P0cOQfgeTovGlTJNCRKAtqBiozfETso6Ky694a25yPWH1A9ckyNPW2PMaNdqHcg13uvwMBCEv8jBvgo3wNKxOF/DTOPFfWWzNyRkzdNXG/kdcfTDXdObWHq7AdB04t89/1O/w1cDnyilFU=';

// MQTT Host
var mqtt_host = 'tailor.cloudmqtt.com';

// MQTT Topic
var mqtt_topic = '/ESP8266';

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

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})
app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {cJCAjP1zeYCba76/WBwiY0ij0bzm0P0cOQfgeTovGlTJNCRKAtqBiozfETso6Ky694a25yPWH1A9ckyNPW2PMaNdqHcg13uvwMBCEv8jBvgo3wNKxOF/DTOPFfWWzNyRkzdNXG/kdcfTDXdObWHq7AdB04t89/1O/w1cDnyilFU=};
}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}






function sendText (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'กรุณาพิมพ์ : on | off | เปิด | ปิด เท่านั้น'
      }
    ]
  }
  request({
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+CH_ACCESS_TOKEN+''
    },
    url: 'https://api.line.me/v2/bot/message/reply',
    method: 'POST',
    body: data,
    json: true
  }, function (err, res, body) {
    if (err) console.log('error')
    if (res) console.log('success')
    if (body) console.log(body)
  })
}

function inFo (sender, text) {
  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'uid: '+sender
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


function ledOn (sender, text) {
  var client = mqtt.connect(mqtt_host, options);
  client.on('connect', function() { // When connected
      console.log('MQTT connected');
      // subscribe to a topic
      client.subscribe(mqtt_topic, function() {
          // when a message arrives, do something with it
          client.on('message', function(topic, message, packet) {
              console.log("Received '" + message + "' on '" + topic + "'");
          });
      });
      

      // publish a message to a topic
      client.publish(mqtt_topic, 'on', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });
    

  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'เปิดประตูแล้วครับ'
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

function ledOff (sender, text) {
  var client = mqtt.connect(mqtt_host, options);
  client.on('connect', function() { // When connected
      console.log('MQTT connected');
      // subscribe to a topic
      client.subscribe(mqtt_topic, function() {
          // when a message arrives, do something with it
          client.on('message', function(topic, message, packet) {
              console.log("Received '" + message + "' on '" + topic + "'");
          });
      });
      

      // publish a message to a topic
      client.publish(mqtt_topic, 'off', function() {
          console.log("Message is published");
          client.end(); // Close the connection when published
      });
      
  });

  let data = {
    to: sender,
    messages: [
      {
        type: 'text',
        text: 'ปิดประตูแล้วครับ'
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