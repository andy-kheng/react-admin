import * as brand from './brand';
//import * as auth from './auth';
import * as group_brand from './group_brand';
import * as brand_category from './brand_category';

export function serverError(error) {
  const { response: { data, status, statusText } } = JSON.parse(JSON.stringify(error));
  return { data, status, statusText };
}
export default { brand_category, brand, group_brand };
