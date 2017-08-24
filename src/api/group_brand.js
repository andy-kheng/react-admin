import axios from 'axios';
import { authtoken } from './_config';
import { objectToQueryString } from '../utils';

export function* getList(query) {
  const queryString = objectToQueryString(query);
  const { data: group_brands } = yield axios.get(`/v4/admin/group_brands?${queryString}`, authtoken);
  return group_brands;
}
