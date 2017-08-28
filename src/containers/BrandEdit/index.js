// MODULES
import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Datetime from 'react-datetime';
import { Row, Col, Button, Card, CardHeader, CardFooter, CardBlock, Form } from 'reactstrap';

// COMPONENTS
import CustomAlert from '../../components/Alert';
import renderField from '../../components/Input/renderField';
import { Sectors, TransactionTypes, VATs, VATMethods } from '../../components/Input/data';

// ACTIONS
import { actions } from '../../reducers/brand';

import { validate } from '../../utils';

class BrandEdit extends Component {
  componentDidMount() {
    const { match: { params }, actions: { getBrand } } = this.props;
    const { brand_id } = params;
    getBrand({ brand_id });
  }

  onSubmit(values) {
    //this.props.createBrand(values);
  }

  render() {
    const { handleSubmit, brand } = this.props;
    const { locale_fields, brand_categories, group_brands, loading, meal_times, error } = brand;
    console.log(brand);
    if (loading) return <Row>Loading...</Row>;
    if (error) return <CustomAlert error={error} />;
    return (
      <div className='animated fadeIn'>
        <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Row>
            <Col xs='12' sm='12' md='6'>
              <Card>
                <CardHeader>
                  <strong>Infomation</strong>
                </CardHeader>
                <CardBlock className='card-body'>
                  <Field type='text' label='Name' name='name' component={renderField} />
                  <Field
                    type='select'
                    label='Group Brand'
                    name='group_brand_id'
                    options={group_brands}
                    component={renderField}
                  />
                  <Field type='select' label='Sector' name='sector_cd' options={Sectors} component={renderField} />
                  <Field
                    type='select'
                    label='Brand Category'
                    name='brand_category_ids'
                    options={brand_categories}
                    multi={true}
                    component={renderField}
                  />
                  <Field
                    type='select'
                    label='Transaction Type'
                    name='transaction_type_cd'
                    options={TransactionTypes}
                    multi={true}
                    component={renderField}
                  />

                  <Row>
                    <Col md='6'>
                      <Field type='select' label='VAT' name='vat' options={VATs} component={renderField} />
                    </Col>
                    <Col md='6'>
                      <Field
                        type='select'
                        label='VAT Method'
                        name='vat_method'
                        options={VATMethods}
                        component={renderField}
                      />
                    </Col>
                  </Row>
                  <Field type='text' label='Color' name='color_code' component={renderField} />
                </CardBlock>
                {/* <CardFooter>
                  <Button type='submit' size='md' color='primary'>
                    <i className='fa fa-save' /> Create
                  </Button>
                  <Button type='reset' size='md' color='secondary'>
                    <i className='fa fa-ban' /> Cancel
                  </Button>
                </CardFooter> */}
              </Card>
            </Col>
            <Col xs='12' sm='12' md='6'>
              <Row>
                <Col xs='12'>
                  <Card>
                    <CardHeader>
                      <strong>Locales</strong>
                    </CardHeader>
                    <CardBlock className='card-body'>
                      {locale_fields.map(({ name, label }, index) => (
                        <Field key={index} type='text' label={label} name={name} component={renderField} />
                      ))}
                    </CardBlock>
                  </Card>
                </Col>

                <Col xs='12'>
                  <Card>
                    <CardHeader>
                      <strong>Meal Time</strong>
                    </CardHeader>
                    <CardBlock className='card-body'>
                      {meal_times.map(({ label_start, name_start, label_end, name_end }, index) => (
                        <Row key={index}>
                          <Col md='6'>
                            <Field type='time' label={label_start} name={name_start} component={renderField} />
                          </Col>
                          <Col md='6'>
                            <Field type='time' label={label_end} name={name_end} component={renderField} />
                          </Col>
                        </Row>
                      ))}
                    </CardBlock>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs='12' sm='12' md='12'>
              <Card>
                <CardHeader>
                  <strong>Images</strong>
                </CardHeader>
                <CardBlock className='card-body'>
                  <Row>
                    <Col sm='6'>
                      <img
                        src={brand.data.logo.large}
                        height='200'
                        className='rounded border border-dark float-right'
                        alt='...'
                      />
                    </Col>
                    <Col sm='6'>
                      <img
                        src={brand.data.banner.large}
                        height='200'
                        className='rounded border border-dark float-left'
                        alt='...'
                      />
                    </Col>
                  </Row>
                </CardBlock>
              </Card>
            </Col>
            <Col xs='12'>
              <Card>
                <CardBlock>
                  <div className='float-right'>
                    <Button type='submit' size='md' color='primary'>
                      <i className='fa fa-save' /> Create
                    </Button>{' '}
                    <Button type='reset' size='md' color='light'>
                      <i className='fa fa-ban' /> Cancel
                    </Button>
                  </div>
                </CardBlock>
              </Card>
            </Col>
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
