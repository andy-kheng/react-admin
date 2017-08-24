import axios from 'axios';
import { authtoken } from './_config';
import { objectToQueryString } from '../utils';

export function* getList(query) {
  const queryString = objectToQueryString(query);
  const { data: brand_categories } = yield axios.get(`/v4/admin/brand_categories?${queryString}`, authtoken);
  return brand_categories;
}
