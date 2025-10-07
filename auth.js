import axios from 'axios';

const traccar = axios.create({
  baseURL: 'http://localhost:8082/api',
  withCredentials: true, // keep session cookies
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  },
});

async function loginTraccar(email, password) {
  try {
    const resp = await traccar.post('/session', {
      email: email,
      password: password
    });
    console.log('Login successful:', resp.data);

    // Use the session cookie (axios will handle it because withCredentials = true)
    // const devices = await traccar.get('/devices');
    // console.log('Devices:', devices.data);

  } catch (err) {
    console.error('Login error:', err.response?.status, err.response?.data || err.message);
  }
}

// Example usage
loginTraccar('admin@admin.tn', 'admin@admin.tn');
