import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const CustomAlert = ({ error }) => {
  const { status, statusText, data: { message, stack } } = error;
  return (
    <div className="animated fadeIn">
      <Alert color="warning">
        <div>
          <h4 className="alert-heading">
            {`${status}:  `}
            <small>{statusText}</small>
          </h4>
          <hr />
          <strong>Error:</strong> {message}
          <br />
          <strong>Stack:</strong> {stack}
        </div>
      </Alert>
    </div>
  );
};

export default CustomAlert;

CustomAlert.propTypes = {
  error: PropTypes.object.isRequired
};
