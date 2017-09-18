import React from 'react';
import {observer} from 'mobx-react';
import {DropdownList} from 'react-widgets';

// styles
const $input = 'form-control';
const $label = 'form-control-label';
const $small = 'text-danger form-control-feedback';

export default observer(({
  field,
  type = 'text',
  placeholder = null
}) => {
  switch (field.type) {
    case 'text':
      return (
        <div className="form-group">
          <label htmlFor={field.id} className={$label}>
            {field.label}
          </label>
          <input {...field.bind({ type, placeholder }) } className={$input}/>
          <small className={$small}>
            {field.error}
          </small>
        </div>
      );
      break;
    case 'select':
      console.log('seleted');
      return (
        <div className="form-group">
          <label htmlFor={field.id} className={$label}>
            {field.label}
          </label>
          <select {...field.bind({ placeholder }) } className={$input}>
            {field.extra.map(x => renderOption(x))}
          </select>
          <small className={$small}>
            {field.error}
          </small>
        </div>
      );

  }
});

function renderOption({value, label}){
  return (<option key={value} value={value}>{label}</option>);
}
