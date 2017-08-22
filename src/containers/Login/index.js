// MODULES
import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Row, Col, CardGroup, Card, CardBlock, Button, Form, Alert } from 'reactstrap';

// COMPONENTS
import renderField from '../../components/Input/renderField';

// ACTIONS
import * as actions from './actions';
import { validate, shouldAsyncValidate } from '../../utils';

class Login extends Component {
  componentDidMount() {}

  onSubmit(values) {
    const { requestLogin, history } = this.props.actions;
    requestLogin(values);
  }

  render() {
    const { handleSubmit, message } = this.props;
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
                      {message ? <Alert color="danger">{message}</Alert> : ''}
                      <Field type="text" label="Email" name="email" component={renderField} />
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

const asyncValidate = (values) => validate(values, { email: 'email|required', password: 'required' });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });
const mapStateToProps = ({ authUser }) => ({
  initialValues: { email: '', password: '' },
  message: authUser.message
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'LoginForm', asyncValidate, shouldAsyncValidate })
)(Login);
