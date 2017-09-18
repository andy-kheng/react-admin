import React from 'react';
import { observer } from 'mobx-react';
import Information from './_Information';

const $btn = 'f6 link dim bn br2 ph3 pv2 mr2 dib white bg-dark-blue';

export default observer(({ form }) => (
  <form onSubmit={form.onSubmit}>
    <Information form={form}></Information>
    <p>{form.error}</p>
  </form>
));
