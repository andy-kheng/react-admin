import axios from 'axios';
import moment from 'moment-timezone';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

//https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript
const baseURL = 'https://apidev.tesjor.com';
const headers = {
  'App-Type': 'client',
  'App-Version': '1.0.0',
  'Content-Type': 'application/json',
  'Device-Name': 'PC',
  'Language-code': sessionStorage.language_code || 'EN',
  'Local-Timezone': moment.tz.guess(),
  'Os-version': '10',
  'Uses-Id': 123456,
  Model: window.navigator.vendor,
  Platform: 'PC'
};
function transformResponse(res) {
  return res.data;
}

export const authtoken = {
  baseURL,
  //transformResponse,
  headers: {
    ...headers,
    'X-Auth': `Bearer ${sessionStorage.auth_token || ''}`
  }
};
export const token = {
  baseURL,
  //transformResponse,
  headers: {
    ...headers,
    Token: `Bearer ${sessionStorage.auth_token || ''}`
  }
};
export function* getToken() {
  if (!sessionStorage.token) {
    const Authorization = 'Bearer ';
    const AuthHeader = { ...headers, Authorization };
    const { data } = yield axios.post(
      '/v1/auth/authorize',
      {
        client_id: ''
      },
      { baseURL, headers: AuthHeader }
    );
    sessionStorage.token = data.token;
    sessionStorage.refresh_token = data.refresh_token;
  }
  return {
    baseURL,
    transformResponse,
    headers: { ...headers, Token: `Bearer ${sessionStorage.token}` }
  };
}
