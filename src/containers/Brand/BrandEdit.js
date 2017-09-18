import React, {Component} from 'react';
import {observer} from 'mobx-react';
import MyForm from 'mobx-react-form';


import form from './_form';
import FormEdit from './_FormEdit';

@observer(['stores'])
class BrandEdit extends Component {
  componentWillMount() {
    const {fetchGroupBrand} = this.props.stores.brandStore;
    fetchGroupBrand({limit:10});
  }

  render() {
    const {brands: data, loading, page, error} = this.props.stores.brandStore;
    return (
      <div>
        <FormEdit form={form} data={this.fetchGroupBrand}/>
      </div>
    );
  }
}

export default BrandEdit;
