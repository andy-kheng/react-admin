import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { actions } from '../../reducers/brands.reducer';

class Playground extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this.props);
    this.props.actions.getList({x: 1, y: 2, z: [1,2,3]});


  }
  render() {
    console.log('render');
    return (
      <div className="animated fadeIn">
        <Row>
          <button onClick={this.handleClick} >A</button>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ brand }) => ({ brand });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(Playground);
