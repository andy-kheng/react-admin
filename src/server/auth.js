import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { getToken } from './_config';

export async function Login({ email, password }) {
  //https://github.com/brix/crypto-js
  const base64 = Base64.stringify(sha256(password));
  const body = { email_or_phone: email, password: base64, target_role_cd: 'SAM' };
  const token = await getToken();
  return axios.post('/v1/auth/access-token/', body, token);
}
