// MODULES
import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Row, Col, CardGroup, Card, CardBlock, Button, Form } from 'reactstrap';

// COMPONENTS
import renderField from '../../components/Input/renderField';

// ACTIONS
//import { getBrand } from './actions';
import { validate, shouldAsyncValidate } from '../../utils';

class Login extends Component {
  componentDidMount() {}

  onSubmit(values) {
    console.log('onSubmit', values);
    //this.props.createBrand(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <CardGroup className="mb-0">
                  <Card className="p-4">
                    <CardBlock className="card-body">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <Field type="text" label="Username" name="username" component={renderField} />
                      <Field type="password" label="Password" name="password" component={renderField} />
                      <Button color="primary" className="px-4" type="submit">
                        Login
                      </Button>
                    </CardBlock>
                  </Card>
                </CardGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = ({ brandDetail: { payload, loading, serverError } }, ownProps = {}) => ({
  initialValues: { username: '', password: '' },
  loading,
  serverError
});

const asyncValidate = (values) => validate(values, { username: 'email|required', password: 'required' });

export default compose(
  connect(mapStateToProps, {}),
  reduxForm({ form: 'LoginForm', asyncValidate, shouldAsyncValidate })
)(Login);
