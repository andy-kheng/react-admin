// MODULES
import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form, Alert } from 'reactstrap';

// COMPONENTS
import CustomAlert from '../../components/Alert';
import renderField from '../../components/Input/renderField';
import { Sectors, TransactionTypes, VATs, VATMethods } from '../../components/Input/data';

// ACTIONS
import { actions } from '../../ducks/brand';

import { validate } from '../../utils';

class BrandEdit extends Component {
  componentDidMount() {
    const { brand_id } = this.props.match.params;
    console.log('brand_id', brand_id);
    if (brand_id) this.props.actions.getBrand(brand_id);
    else this.props.getBrand(19);
  }

  onSubmit(values) {
    //this.props.createBrand(values);
  }

  render() {
    const { handleSubmit, brand: brandState } = this.props;
    const { brand, brand_categories, group_brands, loading, error } = brandState;
    console.log('render', brand);
    if (loading) return <Row>Loading...</Row>;
    if (error) return <CustomAlert error={error} />;
    return (
      <div className="animated fadeIn">
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
                  <Field
                    type="select"
                    label="Brand Category"
                    name="brand_category_ids"
                    options={brand_categories}
                    multi={true}
                    component={renderField}
                  />
                  <Field
                    type="select"
                    label="Group Brand"
                    name="group_brand_id"
                    options={group_brands}
                    component={renderField}
                  />

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
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });
const mapStateToProps = ({ brand }, ownProps = {}) => ({ initialValues: brand.data, brand });

const asyncValidate = (values) => {
  return validate(values, { name: 'required' });
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'BrandEditForm', asyncValidate, enableReinitialize: true })
)(BrandEdit);
