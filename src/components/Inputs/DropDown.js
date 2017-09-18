import React from 'react';
import {observer} from 'mobx-react';
import {DropdownList} from 'react-widgets';

const DropDown = observer(({field}) => (
  <div className="measure">
  dgasdgdgf
    <label htmlFor={field.id} className="f7 db mb2 mt3 light-silver">
      {field.label}
      hello
    </label>
    <DropdownList
      id={field.id}
      value={field.value}
      onChange={field.sync}
      data={field.extra}/>
  </div>
));

export default DropDown
