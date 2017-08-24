import axios from 'axios';
import { token } from './_config';
//import { objectToQueryString } from '../utils';

export function* getList() {
  const { data: languages } = yield axios.get(`/v1/utils/languages/list`, token);
  return languages;
}
