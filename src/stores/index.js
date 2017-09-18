import CounterStore from './counter.store';
import RestaurantStore from './restaurant.store'
import BrandStore from './brand.store'

export default  {
  counterStore: new CounterStore(),
  restaurantStore: new RestaurantStore(),
  brandStore: new BrandStore()
}
