// Set up AWS IoT SDK
const iotData = new AWS.IotData({
  endpoint: "a2r7ix46laktaq-ats.iot.ap-southeast-1.amazonaws.com",
  region: "ap-southeast-1",
  accessKeyId: "AKIAVLF75VNYRXEQHW5R",
  secretAccessKey: "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",
});

// Subscribe to the temperature topic
iotData.subscribe(
  {
    topic: "ak/xdk110/sensor/environment/temp",
    qos: 1,
  },
  (err, data) => {
    if (err) console.log(err);
    else console.log(data);
  }
);

// Update the temperature value on the HTML page
function onMessageArrived(message) {
  console.log("Received message: " + message.payloadString);
  document.getElementById("temperature-value").innerHTML =
    "<span>Temperature:</span> " + message.payloadString + " &#8451;";
}

// Set up the MQTT message callback
iotData.on("message", (topic, payload) => {
  console.log("Received message:", payload.toString());
  onMessageArrived(payload.toString());
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
