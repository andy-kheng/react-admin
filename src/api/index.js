import * as Brand from './brand';
//import * as auth from './auth';
import * as GroupBrand from './group_brand';
import * as BrandCategory from './brand_category';
import * as Language from './language';

export function serverError(error) {
  const { response: { data, status, statusText } } = JSON.parse(JSON.stringify(error));
  return { data, status, statusText };
}
export default { BrandCategory, Brand, GroupBrand, Language };
