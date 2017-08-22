import axios from 'axios';
import { objectToQueryString } from '../utils';

const headers = {
  Token: 'Bearer ',
  'X-Auth': 'Bearer ',
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

export function onGetBrandDetail(brand_id) {
  console.log('axios');
  return axios({
    url: `https://apidev.tesjor.com/v4/admin/brands/${brand_id}`,
    headers
  });
}

export function onGetBrandList(query) {
  const URL = `https://apidev.tesjor.com/v4/admin/brands?`;
  const queryString = objectToQueryString(query);
  console.log('queryString', queryString);
  return axios({
    url: `${URL}${queryString}`,
    headers
  });
}
