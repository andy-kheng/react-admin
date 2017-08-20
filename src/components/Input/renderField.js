import React from 'react';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';

import { TesjorSelect } from './TesjorSelect';

export default function(fields) {
  const { input, label, type, meta: { touched, error, warning } } = fields;
  return (
    <FormGroup>
      <Label>{label}</Label>
      {rederField(fields)}
      {/* <Input {...input} type={type} className={touched && error ? 'is-invalid' : ''} /> */}
      <FormFeedback className="text-danger">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </FormFeedback>
    </FormGroup>
  );
}

const rederField = ({ input, type, options, multi, meta: { touched, error } }) => {
  switch (type) {
    case 'select':
      return <TesjorSelect type={type} options={options} multi={multi} {...input} className={touched && error ? 'is-invalid' : ''} />;
    default:
      return <Input {...input} type={type} className={touched && error ? 'is-invalid' : ''} />;
  }
};
