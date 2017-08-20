import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Row, Form, FormGroup, Label, Input } from 'reactstrap';


class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = { mealTime: '', transactionType: '' };
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Form>
            <FormGroup>
              <Label>XXX</Label>
              {/* <MealTimeSelect value={this.state.mealTime} onChange={(value) => this.setState({ mealTime: value })} /> */}
              {/* <TransactionTypeSelect
                value={this.state.transactionType}
                onChange={(value) => this.setState({ transactionType: value })}
              /> */}
            </FormGroup>
            <FormGroup>
              <Label>XXX</Label>
              <Input type="text" />
            </FormGroup>
          </Form>
        </Row>
      </div>
    );
  }
}

//const mapStateToProps = ({ brandList }, ownProps = {}) => ({ brandList });
//export default connect(mapStateToProps, { getBrandList })(BrandList);
export default Playground;
