import axios from 'axios';

const headers = {
  Token: 'Bearer 7a283fc9ce663fc14e0ef905c8aa5112aa08babc',
  'X-Auth':
    'Bearer NDJmODU1OTJhYjFkNDU2YmJkNDJiZjFjMWI0NDA5X2FkbWluNGJlODY3NDY3M2QwNDM4ZTk2MDFkMDEyMDQ2NjExOGU4YzE4OTM0MGRiMGVlOGRmY2M5NmRiNGNjYWJlOGNmNDg5ZTY4NDk3OjNCM0FFRDNDLUEyRDYtNDYxNC04RTYxLThFQkQxNUNERUU5NA==',

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
