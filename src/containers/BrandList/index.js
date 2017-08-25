import React, { Component } from 'react';
import { Redirect } from 'react-router';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBlock, Button, UncontrolledTooltip } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

import { actions } from '../../reducers/brands.reducer';
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
      <div className='animated fadeIn'>
        <Row>
          <Col lg='12'>
            <Card>
              <CardHeader>
                <i className='icon-list' />Brand List
                <Link to='/brands/create' className='btn btn-primary btn-sm float-right' role='button'>
                  <i className='fa fa-plus-square' />
                  {'\u00A0 New'}
                </Link>
              </CardHeader>
              <CardBlock className='card-body'>
                <ReactTable
                  className='-striped -highlight'
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
const addDefaultSrc = (ev) => {
  ev.target.src = 'http://www.indigohealth.com.au/wp-content/themes/rheniumific/images/thumbnail.png';
};
const columns = [
  {
    Header: 'Logo',
    maxWidth: 80,
    accessor: 'logo.small',
    filterable: false,
    className: 'flex-middle text-center',
    Cell: (row) => (
      <img src={row.value} className='rounded border border-secondary' width='50' onError={addDefaultSrc} />
    )
  },
  {
    Header: 'Brand Name',
    accessor: 'name',
    className: 'flex-middle'
  },
  {
    Header: 'Transaction Type',
    accessor: 'transaction_type_cd',
    className: 'flex-middle',
    Filter: ({ filter, onChange }) => (
      <Select value={filter ? filter.value : ''} onChange={onChange}>
        <option value=''>All</option>
        <option value='POF'>Dine In</option>
        <option value='PUF'>Take Out</option>
        <option value='DLF'>Delivery</option>
      </Select>
    )
  },
  {
    Header: 'Sector',
    accessor: 'sector_cd',
    className: 'flex-middle',
    Filter: ({ filter, onChange }) => (
      <Select value={filter ? filter.value : ''} onChange={onChange}>
        <option value=''>All</option>
        <option value='RTR'>Restaurant</option>
        <option value='HTL'>Hotel</option>
        <option value='TSJ'>Tesjor</option>
      </Select>
    )
  },
  {
    Header: 'Status',
    accessor: 'status_cd',
    className: 'flex-middle',
    maxWidth: 150,
    Cell: (row) => (
      <span className='text-center flex-middle'>
        {row.value === 'ACT' ? (
          <span className='text-success'>
            <i className='fa fa-check' />&nbsp;&nbsp;Active
          </span>
        ) : (
          <span className='text-danger'>
            <i className='fa fa-times' />&nbsp;&nbsp;Delete
          </span>
        )}
      </span>
    ),
    Filter: ({ filter, onChange }) => (
      <Select value={filter ? filter.value : ''} onChange={onChange}>
        <option value=''>All</option>
        <option value='ACT'>Active</option>
        <option value='DEL'>Delete</option>
      </Select>
    )
  },
  {
    Header: 'Actions',
    className: 'flex-middle text-center',
    accessor: 'id',
    style: { overflow: 'inherit ' },
    //maxWidth: 80,
    filterable: false,
    Cell: (row) => (
      <div>
        <Button outline color='primary' size='sm' id='Edit' onClick={handleOnClick}>
          <i className='fa fa-pencil' /> Update
        </Button>
        <span className='mr-2' />
        <Button outline color='danger' size='sm' id='Delete'>
          <i className='fa fa-ban' /> Delete
        </Button>
      </div>
    )
  }
];

const handleOnClick = () => {
  this.context.router.push('/sample');
};
