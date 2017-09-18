import {action, observable} from 'mobx'
import {getRestaurantList} from '../api/restaurant'

class RestaurantStore {
  @observable loading = false;
  @observable number = 0;
  @observable merchants = [];
  @observable page = 1;

  @action fetchRestaurants = async(query) => {
    this.loading = true
    try {
      const {data, metadata: {total, limit}} = await getRestaurantList(query);
      console.log('================', data);
      this.loading = false
      this.merchants = data
      this.page = Math.ceil(total / limit)
    } catch (error) {
      this.loading = false
      // alert('')
    }

  }

}

export default RestaurantStore
