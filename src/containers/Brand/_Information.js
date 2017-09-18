import React, {Component} from 'react';
import SimpleInput from '../../components/Inputs/SimpleInput';
import DropDown from '../../components/Inputs/DropDown';

import {observer} from 'mobx-react';

export default observer(({form, data}) => {
  console.log(data)
  return (
    <div className="col-12 col-sm-12 col-md-6">
      <div className="card">
        <div className="card-header">
          <strong>Infomation</strong>
        </div>
        <div className="card-body card-block">
          <SimpleInput field={form.$('name')}/>
          <SimpleInput field={form.$('group_brand')}/>
          <SimpleInput field={form.$('sector')}/>
          <SimpleInput field={form.$('brand_category')}/>
          <SimpleInput field={form.$('transaction_type_cd')}/>
          <SimpleInput field={form.$('vat')}/>
          <SimpleInput field={form.$('vat_method')}/>
          <SimpleInput field={form.$('color')}/>

        </div>
      </div>
    </div>
  )
});
