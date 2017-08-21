import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import ReactTable from 'react-table';

class Playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: makeData()
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" className="bg-white">
            <ReactTable data={data} columns={columns} defaultPageSize={10} className="-striped -highlight" />
          </Col>
        </Row>
      </div>
    );
  }
}

//const mapStateToProps = ({ brandList }, ownProps = {}) => ({ brandList });
//export default connect(mapStateToProps, { getBrandList })(BrandList);
export default Playground;

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: 'a',
    lastName: 'b',
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? 'relationship' : statusChance > 0.33 ? 'complicated' : 'single'
  };
};

export function makeData(len = 5553) {
  return range(len).map((d) => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        id: 'lastName',
        accessor: (d) => d.lastName
      }
    ]
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        Cell: (row) => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#dadada',
              borderRadius: '2px'
            }}
          >
            <div
              style={{
                width: `${row.value}%`,
                height: '100%',
                backgroundColor: row.value > 66 ? '#85cc00' : row.value > 33 ? '#ffbf00' : '#ff2e00',
                borderRadius: '2px',
                transition: 'all .2s ease-out'
              }}
            />
          </div>
        )
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (row) => (
          <span>
            <span
              style={{
                color: row.value === 'relationship' ? '#ff2e00' : row.value === 'complicated' ? '#ffbf00' : '#57d500',
                transition: 'all .3s ease'
              }}
            >
              &#x25cf;
            </span>{' '}
            {row.value === 'relationship' ? (
              'In a relationship'
            ) : row.value === 'complicated' ? (
              `It's complicated`
            ) : (
              'Single'
            )}
          </span>
        )
      }
    ]
  }
];
