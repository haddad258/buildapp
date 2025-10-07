import axios from 'axios';

// Use your API key here
const API_KEY = 'RjBEAiAt3ohCAhY2KQzVay5oeLnWUjymRcRVv9WmPsnU24ySmAIgDzNgclWSdRCL4f40uG-SQA8PAw4mY2lsanxXSm0gZLR7InUiOjEsImUiOiIyMDI1LTEwLTEzVDIzOjAwOjAwLjAwMCswMDowMCJ9';

const traccar = axios.create({
  baseURL: 'http://localhost:8082/api',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Accept': 'application/json'
  }
});

async function getDevices() {
  try {
    const resp = await traccar.get('/geofences');
    console.log('📡 Devices:', resp.data);

    const serverResp = await traccar.get('/server');
    console.log('🧠 Server Info:', serverResp.data);

  } catch (err) {
    console.error('❌ API error:', err.response?.status, err.response?.data || err.message);
  }
}

getDevices();
