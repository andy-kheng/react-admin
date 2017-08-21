// MODULES
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, Alert } from 'reactstrap';

// COMPONENTS
import CustomAlert from '../../components/Alert';
import renderField from '../../components/Input/renderField';
import { Sectors, TransactionTypes, VATs, VATMethods } from '../../components/Input/data';

// ACTIONS
import { getBrand } from './actions';

import { validate } from '../../utils';

class BrandEdit extends Component {
  componentDidMount() {
    const { brand_id } = this.props.match.params;
    console.log('brand_id', brand_id);
    if (brand_id) this.props.getBrand(brand_id);
    else this.props.getBrand(19);
  }

  onSubmit(values) {
    //this.props.createBrand(values);
  }

  render() {
    const { handleSubmit, loading, serverError } = this.props;
    console.log('render');
    if (loading) return <Row>Loading...</Row>;
    if (serverError) return <CustomAlert error={serverError} />;
    return (
      <div className="animated fadeIn">
        {/* <Alert isOpen={!!this.props.brand.error}>I am an alert and I can be dismissed!</Alert> */}

        <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Row>
            <Col xs="12" sm="6">
              <Card>
                <CardHeader>
                  <strong>Infomation</strong>
                </CardHeader>
                <CardBlock className="card-body">
                  <Field type="text" label="Name in Englist" name="name" component={renderField} />
                  <Field type="text" label="Name in Khmer" name="locales.KH.name" component={renderField} />
                  <Field type="text" label="Group Brand" name="group_brand_id" component={renderField} />
                  <Field type="select" label="Sector" name="sector_cd" options={Sectors} component={renderField} />
                  <Field
                    type="select"
                    label="Transaction Type"
                    name="transaction_type_cd"
                    options={TransactionTypes}
                    multi={true}
                    component={renderField}
                  />
                  <Field type="select" label="VAT" name="vat" options={VATs} component={renderField} />
                  <Field
                    type="select"
                    label="VAT Calculation Method"
                    name="vat_method"
                    options={VATMethods}
                    component={renderField}
                  />
                  <Field type="text" label="Color" name="color" component={renderField} />
                </CardBlock>
                <CardFooter>
                  <Button type="submit" size="md" color="primary">
                    <i className="fa fa-save" /> Create
                  </Button>
                  <Button type="reset" size="md" color="secondary">
                    <i className="fa fa-ban" /> Cancel
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            {/* <Col xs="12" sm="6">
              <Card>
                <CardHeader>
                  <strong>Company</strong>
                </CardHeader>
                <CardBlock className="card-body" />
              </Card>
            </Col> */}
          </Row>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = ({ brandDetail: { payload, loading, serverError } }, ownProps = {}) => ({
  initialValues: payload,
  loading,
  serverError
});

// export default reduxForm({ form: 'BrandEditForm', validate })(
//   connect(mapStateToProps, { getBrand, createBrand })(BrandEdit)
// );

// const validate = (values) => {
//   // const { name } = values;
//   // const error = {};
//   // error.name = 'Super Error';
//   // return error;
// };

const asyncValidate = async (values) => {
  return validate(values, { name: 'required' });
};

export default compose(
  connect(mapStateToProps, { getBrand }),
  reduxForm({ form: 'BrandEditForm', asyncValidate, enableReinitialize: true })
)(BrandEdit);
