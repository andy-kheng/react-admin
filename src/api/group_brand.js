import axios from 'axios';
import { authtoken } from './_config';
import { objectToQueryString } from '../utils';

export async function getList(query) {
  const queryString = objectToQueryString(query);
  const { data: result } = await axios.get(`/v4/admin/group_brands?${queryString}`, authtoken);
  return result;
}
