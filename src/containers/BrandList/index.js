import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBrandList, setLoadingList } from './actions';
import { debounce } from 'lodash';
import { mapValueKeys } from '../../utils';

import StatusBadge from '../../components/Badge/StatusBadge';
import { TransactionTypes } from '../../components/Input/data';

import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import ReactTable from 'react-table';
import ReactSelect from 'react-select';

class BrandList extends Component {
  constructor(props) {
    super(props);
    this.fetchData = debounce(this.fetchData.bind(this), 300);
  }

  fetchData(state, instance) {
    const { pageSize, page, filtered, sorted } = state;
    const filter = mapValueKeys(filtered, 'id', 'value');

    this.props.setLoadingList();
    this.props.getBrandList({ limit: pageSize, offset: pageSize * page, ...filter });
  }

  render() {
    const { data, loading, page } = this.props.brandList;
    console.log('brandList', this.props.brandList);

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
                  defaultPageSize={10}
                  filterable
                  loading={loading}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  onFetchData={this.fetchData} // Request new data when things change
                  pageSizeOptions={[ 10, 15, 25, 50, 100 ]}
                  pages={page}
                />
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ brandList }, ownProps = {}) => ({ brandList });
export default connect(mapStateToProps, { getBrandList, setLoadingList })(BrandList);

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
        <option value="HTL">Hotle</option>
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
        {/* <StatusBadge status={row.value} /> */}
        {row.value === 'ACT' ? <span className="text-success"><i className="fa fa-check"></i>&nbsp;&nbsp;Active</span>:
        <span className="text-danger"><i className="fa fa-check"></i>&nbsp;&nbsp;Delete</span>}

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
