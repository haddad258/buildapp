import axios from 'axios';

// Traccar server URL
const TRACCAR_API = 'http://localahost:8082/api/positions';

// Example device ID (must match a registered device on Traccar)
const DEVICE_ID = 12345;

// Function to simulate sending GPS data
async function sendPosition() {
  const positionData = {
    deviceId: DEVICE_ID,
    latitude: 36.8065,
    longitude: 10.1815,
    altitude: 50,
    speed: 12.3,
    course: 180,
    accuracy: 5,
    battery: 87,
    event: "heartbeat",
    timestamp: new Date().toISOString(),
    network: "LTE",
    cell: "12345:67890",
    activity: "walking"
  };

  try {
    const resp = await axios.post(TRACCAR_API, positionData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Position sent successfully:', resp.status);
  } catch (err) {
    console.error('❌ Error sending position:');
    console.error('Status:', err.response?.status);
    console.error('Data:', err.response?.data || err.message);
  }
}

// Send once or periodically
sendPosition();

// Optional: send every 10 seconds
setInterval(sendPosition, 1000);
