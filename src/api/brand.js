import axios from 'axios';
import { objectToQueryString } from '../utils';
import { authtoken } from './_config';

export function getBrandList(query) {
  const queryString = objectToQueryString(query);
  return axios.get(`/v4/admin/brands?${queryString}`, authtoken);
}

export function* getDetail(brand_id) {
  const { data: brand } = yield axios.get(`/v4/admin/brands/${brand_id}`, authtoken);
  return brand;
}
