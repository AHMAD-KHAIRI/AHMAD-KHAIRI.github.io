import Paho from "paho-mqtt";

// Check if the script is loaded correctly
console.log("Paho.MQTT: ", Paho.MQTT);

// Set up the MQTT client
const client = new Paho.MQTT.Client("broker.hivemq.com", 1883, "i_am_ak");

// Connect to the MQTT broker
client.connect({
  onSuccess: onConnect,
  useSSL: true,
});

// Subscribe to the temperature topic
function onConnect() {
  console.log("Connected to MQTT broker");
  client.subscribe("ak/xdk110/sensor/environment/temp");
}

// Update the temperature value on the HTML page
function onMessageArrived(message) {
  console.log("Received message: " + message.payloadString);
  document.getElementById("temperature-value").innerHTML =
    message.payloadString;
}

// Set up the MQTT message callback
client.onMessageArrived = onMessageArrived;
