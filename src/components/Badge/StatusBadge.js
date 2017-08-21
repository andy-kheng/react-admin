import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

class StatusBadge extends Component {
  render() {
    const { color, text } = statusCode[this.props.status] || statusCode.DEL;
    return <Badge color={color}>{text}</Badge>;
  }
}

const statusCode = {
  ACT: { text: 'Active', color: 'success' },
  DEL: { text: 'Delete', color: 'danger' }
};
export default StatusBadge;

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired
};
