// import entire SDK
import AWS from "aws-sdk";
// import AWS object without services
import AWS from "aws-sdk/global";
// import individual service
import S3 from "aws-sdk/clients/s3";

document
  .getElementById("aws-config-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    // Get form input values
    const endpoint = document.getElementById("aws-endpoint").value;
    const region = document.getElementById("aws-region").value;
    const accessKeyId = document.getElementById("aws-access-key").value;
    const secretAccessKey = document.getElementById("aws-secret-key").value;
    const topic = document.getElementById("mqtt-topic").value;

    // Update iotData object with form input values
    iotData = new AWS.IotData({
      endpoint,
      region,
      accessKeyId,
      secretAccessKey,
    });

    // Unsubscribe from current topic and resubscribe with updated config
    iotData.unsubscribe({ topic }, (err) => {
      if (err) console.log(err);
      else {
        iotData.subscribe({ topic, qos: 1 }, (err, data) => {
          if (err) console.log(err);
          else console.log(data);
        });
      }
    });
  });

// // import Paho from "paho-mqtt";

// // Check if the script is loaded correctly
// console.log("Paho.MQTT: ", Paho.MQTT);

// // Set up the MQTT client
// const client = new Paho.MQTT.Client("broker.hivemq.com", 1883, "i_am_ak");

// // Connect to the MQTT broker
// client.connect({
//   onSuccess: onConnect,
//   useSSL: true,
// });

// // Subscribe to the temperature topic
// function onConnect() {
//   console.log("Connected to MQTT broker");
//   client.subscribe("ak/xdk110/sensor/environment/temp");
// }

// // Update the temperature value on the HTML page
// function onMessageArrived(message) {
//   console.log("Received message: " + message.payloadString);
//   document.getElementById("temperature-value").innerHTML =
//     message.payloadString;
// }

// // Set up the MQTT message callback
// client.onMessageArrived = onMessageArrived;
