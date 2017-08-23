import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { actions } from '../../ducks/brands';
import { mapValueKeys } from '../../utils';

class BrandList extends Component {
  constructor(props) {
    super(props);
    this.fetchData = debounce(this.fetchData.bind(this), 300);
  }

  fetchData(state) {
    const { pageSize, page, filtered } = state;
    const filter = mapValueKeys(filtered, 'id', 'value');

    const { getList } = this.props.actions;
    getList({ limit: pageSize, offset: pageSize * page, ...filter });
  }

  render() {
    const { data, loading, page } = this.props.brands;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg="12">
            <Card>
              <CardHeader>
                <i className="icon-list" />Brand List
                <Link to="/brands/create" className="btn btn-primary btn-sm float-right" role="button">
                  <i className="fa fa-plus-square" />
                  {'\u00A0 New'}
                </Link>
              </CardHeader>
              <CardBlock className="card-body">
                <ReactTable
                  className="-striped -highlight"
                  columns={columns}
                  data={data}
                  defaultPageSize={15}
                  filterable
                  loading={loading}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  onFetchData={this.fetchData} // Request new data when things change
                  pageSizeOptions={[ 10, 15, 25, 50, 100 ]}
                  pages={page}
                  sortable={false}
                />
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ brands }) => ({ brands });
const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actions, dispatch) });
export default connect(mapStateToProps, mapDispatchToProps)(BrandList);

const Select = ({ onChange, children }) => (
  <select onChange={(event) => onChange(event.target.value)} style={{ width: '100%' }}>
    {children}
  </select>
);

const columns = [
  {
    Header: 'Brand Name',
    accessor: 'name'
  },
  {
    Header: 'Transaction Type',
    accessor: 'transaction_type_cd',
    Filter: ({ filter, onChange }) => (
      <Select value={filter ? filter.value : ''} onChange={onChange}>
        <option value="">All</option>
        <option value="POF">Dine In</option>
        <option value="PUF">Take Out</option>
        <option value="DLF">Delivery</option>
      </Select>
    )
  },
  {
    Header: 'Sector',
    accessor: 'sector_cd',
    Filter: ({ filter, onChange }) => (
      <Select value={filter ? filter.value : ''} onChange={onChange}>
        <option value="">All</option>
        <option value="RTR">Restaurant</option>
        <option value="HTL">Hotel</option>
        <option value="TSJ">Tesjor</option>
      </Select>
    )
  },
  {
    Header: 'Status',
    accessor: 'status_cd',
    className: 'text-center',
    Cell: (row) => (
      <span className="text-center">
        {row.value === 'ACT' ? (
          <span className="text-success">
            <i className="fa fa-check" />&nbsp;&nbsp;Active
          </span>
        ) : (
          <span className="text-danger">
            <i className="fa fa-check" />&nbsp;&nbsp;Delete
          </span>
        )}
      </span>
    ),
    Filter: ({ filter, onChange }) => (
      <Select value={filter ? filter.value : ''} onChange={onChange}>
        <option value="">All</option>
        <option value="ACT">Active</option>
        <option value="DEL">Delete</option>
      </Select>
    )
  }
];
