import {action, observable} from 'mobx'
import {getBrandList} from '../api/brand'
import {getList} from '../api/group_brand'

class BrandStore {
  @observable loading = false;
  @observable number = 0;
  @observable brands = [];
  @observable page = 1;

  @action fetchBrands = async(query) => {
    this.loading = true
    try {
      const {data, metadata: {total, limit}} = await getBrandList(query);
      console.log('================', data);
      this.loading = false
      this.brands = data
      this.page = Math.ceil(total / limit)
    } catch (error) {
      this.loading = false
      // alert('')
    }
  }

  @action fetchGroupBrand = async(query) => {
    this.loading = true
    try {
      const {data, metadata: {total, limit}} = await getList(query);
      console.log('================', data);
      this.loading = false
      this.brands = data
      this.page = Math.ceil(total / limit)
    } catch (error) {
      this.loading = false
      // alert('')
    }
  }

}

export default BrandStore
