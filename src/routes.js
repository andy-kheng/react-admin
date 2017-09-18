/* These are the pages you can go to.
 * They are all wrapped in the App component, which should contain the navbar etc
 *
 * Example:
 *  1: { path: '/feature/STATIC_PARAMS' }
 *  2: { path: '/feature/:DYMANIC_PARAMS' }
 *  3: { path: '/feature' }
 */

import BrandEdit from './containers/BrandEdit';
import BrandList from './containers/Brand/BrandList';
import RestaurantList from './containers/Restaurant/RestaurantList';
import Counter from './components/Counter/Counter';
import BrandEdits from './containers/Brand/BrandEdit';


const routes = [
  { path: '/brands/create', component: BrandEdit },
  { path: '/brands/:brand_id/menus/:id', component: BrandEdit },
  { path: '/brands/:brand_id', component: BrandEdit },
  { path: '/brands', component: BrandList },

  { path: '/restaurants', component: RestaurantList },
  { path: '/counter', component: Counter },

  { path: '/brand/:brand_id', component: BrandEdits },
];
export default routes;
