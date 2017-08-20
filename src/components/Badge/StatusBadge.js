import React, { Component } from 'react';
import { Badge } from 'reactstrap';

class StatusBadgeComponent extends Component {
  render() {
    const { color, text } = statusCode[this.props.status] || statusCode.DEL;
    return <Badge color={color}>{text}</Badge>;
  }
}

const statusCode = {
  ACT: { text: 'Active', color: 'success' },
  DEL: { text: 'Delete', color: 'danger' }
};
export default StatusBadgeComponent;
