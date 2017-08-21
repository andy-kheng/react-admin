import axios from 'axios';

const headers = {
  Authorization: 'Bearer 5LJGaAGttE4KcpyfY6ctvfKOofZCzpvS/L+Dl1q+vNQ=',
  'Content-Type': 'application/json',
  'Uses-Id': 123456,
  'Local-Timezone': 'Asia/Phnom_Penh',
  'App-Type': 'client',
  'App-Version': 1,
  'Device-Name': 'shit',
  Model: 'shit',
  'Os-version': 'xxx',
  Platform: '123',
  'Language-code': 'EN'
};

export function Auth() {
  console.log('axios');
  return axios({
    url: `https://apidev.tesjor.com/v1/auth/authorize`,
    headers,
    body: {
      client_id: '1234'
    }
  });
}
