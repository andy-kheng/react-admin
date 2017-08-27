import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledButtonDropdown
} from 'reactstrap';

import { actions } from '../../reducers/brands.reducer';

class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false, backdrop: true };
    this._onToggle = this._onToggle.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }

  _onToggle() {
    this.setState({ modal: !this.state.modal });
  }

  _onDelete() {
    const { removeBrand, row } = this.props;
    removeBrand({ brand_id: row.value });
    this._onToggle();
  }

  render() {
    const { original, value, viewIndex } = this.props.row;
    const { name, limit, logo: { small } } = original; // limit is set in brands.reducer for display dropdown menu
    const link = `/brands/${value}`;
    const dropup = limit - viewIndex <= 4;

    return (
      <div>
        <UncontrolledButtonDropdown>
          <DropdownToggle color='info' size='sm' outline className='border-0'>
            <i className='fa fa-wrench' />
          </DropdownToggle>
          <DropdownMenu right className={dropup ? 'dropup' : ''}>
            <DropdownItem header>Actions</DropdownItem>
            <DropdownItem tag={Link} to={link}>
              <i className='fa fa-pencil' />Update
            </DropdownItem>
            <DropdownItem onClick={this._onToggle}>
              <i className='fa fa-ban' />Delete
            </DropdownItem>
            <DropdownItem header>Setup</DropdownItem>
            <DropdownItem>
              <i className='fa fa-shopping-cart' />Merchant
            </DropdownItem>
            <DropdownItem>
              <i className='fa fa-cutlery' />Menu
            </DropdownItem>
            <DropdownItem>
              <i className='fa fa-handshake-o' />Loyalty Program
            </DropdownItem>
            <DropdownItem>
              <i className='fa fa-money' />Tesjor Coin Program
            </DropdownItem>
            <DropdownItem>
              <i className='fa fa-credit-card' />Coupon Credit
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <Modal isOpen={this.state.modal} toggle={this._onToggle} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this._onToggle}>Delete Brand</ModalHeader>
          <ModalBody>
            <div>
              <img src={small} className='rounded border border-secondary mr-2' width='50' />
              &#9; Are you sure you want to delete {name}?
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this._onDelete}>
              Delete
            </Button>{' '}
            <Button color='light' onClick={this._onToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { removeBrand: actions.removeBrand })(ActionButtons);
