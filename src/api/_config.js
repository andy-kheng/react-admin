import axios from 'axios';
import moment from 'moment-timezone';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

//https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-
//and-operating-system-using-javascript
const baseURL = 'https://apidev.tesjor.com';
const headers = {
  "Uses-Id": "wmcblfdueuiDnrnAFuiz",
  "Local-Timezone": "Asia\/Phnom_Penh",
  "Device-Name": "pc",
  "Platform": "Website",
  "Os-Version": "10",
  "App-Version": "10",
  "Model": "website",
  "App-Type": "admin"
};
function transformResponse(res) {
  return res.data;
}

export const authtoken = {
  baseURL,
  //transformResponse,
  headers: {
    ...headers,
    'X-Auth': `Bearer ${sessionStorage.auth_token || 'NDJmODU1OTJhYjFkNDU2YmJkNDJiZjFjMWI0NDA5X2FkbWluNGJlODY3NDY3M2QwNDM4ZTk2MDFkMDEy' +
        'MDQ2NjExOGU4YzE4OTM0MGRiMGVlOGRmY2M5NmRiNGNjYWJlOGNmNDg5ZTY4NDk3OjEyMzQ1Ng=='}`
  }
};
export const token = {
  baseURL,
  //transformResponse,
  headers: {
    ...headers,
    Token: `Bearer ${sessionStorage.auth_token || 'ee71ed388119beb1a7d07eef5206528da0f9b89c'}`
  }
};
export function * getToken() {
  if (!sessionStorage.token) {
    const Authorization = 'Bearer ';
    const AuthHeader = {
      ...headers,
      Authorization
    };
    const {data} = yield axios.post('/v1/auth/authorize', {
      client_id: ''
    }, {baseURL, headers: AuthHeader});
    sessionStorage.token = data.token;
    sessionStorage.refresh_token = data.refresh_token;
  }
  return {
    baseURL,
    transformResponse,
    headers: {
      ...headers,
      Token: `Bearer ${sessionStorage.token}`
    }
  };
}
