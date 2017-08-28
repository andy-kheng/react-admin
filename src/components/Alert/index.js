import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const Errors = ({ error, color = 'danger' }) => {
  return (
    <Alert color={color}>
      <strong>Error:</strong> {error}
    </Alert>
  );
};

export default Errors;

Errors.propTypes = {
  error: PropTypes.string.isRequired
};
