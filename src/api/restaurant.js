import axios from 'axios';
import { objectToQueryString } from '../utils';
import { authtoken } from './_config';

export async function getRestaurantList(query) {
  const queryString = objectToQueryString(query);
  const { data: result } = await axios.get(`/v4/admin/merchants?${queryString}`, authtoken);
  return result;
}
