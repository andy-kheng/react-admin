import { all, call, put, takeEvery } from 'redux-saga/effects';
import { types, initialState } from '../reducers/brand';
import API, { serverError } from '../api';

function* getBrandDetailSaga({ payload }) {
  const log = console.log;
  try {
    // GET BRAND DETAIL
    //==================
    const { brand_id } = payload || {};
    const brand = brand_id ? yield call(API.Brand.getDetail, brand_id) : initialState.data;

    // GET RELATE DATA
    //==================
    const options = { status_cd: 'ACT', order: '-name', limit: 1000 };
    const [ { data: group_brands }, { data: brand_categories }, { data: languages } ] = yield all([
      call(API.GroupBrand.getList, options),
      call(API.BrandCategory.getList, options),
      call(API.Language.getList)
    ]);

    // SETUP BRAND LOCALES
    //====================
    log('languages', languages);
    const locales = {};
    const locale_fields = [];
    languages.forEach(({ language_name, language_code }) => {
      const { name = '' } = brand.locales[language_code] || {};
      locales[language_code] = { name, language_name };
      locale_fields.push({
        label: `Name in ${language_name}`,
        name: `locales.${language_code}.name`
      });
    });
    Object.assign(brand, { transaction_type_cd: brand.transaction_type_cd.split('|'), locales });
    log('new brand', brand);

    yield put({
      type: types.GET_BRAND_SUCCESS,
      data: brand,
      locale_fields,
      group_brands: group_brands.map((x) => ({ label: x.name, value: x.id })),
      brand_categories: brand_categories.map((x) => ({ label: x.name, value: x.id }))
    });
  } catch (error) {
    log(error);
    yield put({
      type: types.GET_BRAND_ERROR,
      error: serverError(error)
    });
  }
}

export default [ takeEvery(types.GET_BRAND_REQUEST, getBrandDetailSaga) ];
