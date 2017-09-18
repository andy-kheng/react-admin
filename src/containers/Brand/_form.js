import MyForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const plugins = {
  dvr: validatorjs
};

const fields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Insert Name',
    rules: 'required|string'
  }, {
    name: 'group_brand',
    label: 'Group_brand',
    placeholder: 'Selete Group Brand',
    rules: 'required',
    type: 'select',
    extra: [
      {
        label: 'abc',
        value: 'des'
      },{
        label: 'aa',
        value: 'desaa'
      }
    ]
  }, {
    name: 'sector',
    label: 'Sector',
    placeholder: 'Selete Sector',
    rules: 'required'
  }, {
    name: 'brand_category',
    label: 'Brand Category',
    placeholder: 'Selete Brand Category',
    rules: 'required'
  }, {
    name: 'transaction_type_cd',
    label: 'Transation Type',
    placeholder: 'Selete Transaction Type',
    rules: 'required'
  }, {
    name: 'vat',
    label: 'VAT',
    placeholder: 'Selete VAT',
    rules: 'required'
  }, {
    name: 'vat_method',
    label: 'VAT Method',
    placeholder: 'Selete VAT Method',
    rules: 'required'
  }, {
    name: 'color',
    label: 'Color',
    placeholder: 'Selete Color',
    rules: 'required'
  }
];

const hooks = {
  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  },
  onError(form) {
    alert('Form has errors!');
    // get all form errors
    console.log('All form errors', form.errors());
  }
}

export default new MyForm({
  fields
}, {plugins, hooks});
