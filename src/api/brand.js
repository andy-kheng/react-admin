import axios from 'axios';
import { objectToQueryString } from '../utils';
import { authtoken } from './_config';

export async function getBrandList(query) {
  const queryString = objectToQueryString(query);
  const { data: result } = await axios.get(`/v4/admin/brands?${queryString}`, authtoken);
  return result;
}

export async function getDetail(brand_id) {
  const { data: brand } = await axios.get(`/v4/admin/brands/${brand_id}`, authtoken);
  return brand;
}

export async function remove(brand_id) {
  const { data: brand } = await axios.delete(`/v4/admin/brands/${brand_id}`, authtoken);
  return brand;
}
