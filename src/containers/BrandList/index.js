// -- MODULES
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

// -- COMPONENTS
import ReactTable from 'react-table';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import { columns } from './columns';

// -- ACTIONS / HELPER
import { actions } from '../../reducers/brands.reducer';
import { mapValueKeys } from '../../utils';

/**
 * Brand List Container
 * Props: [brands]
 * Actions: [getList, resetList]
 */
class BrandList extends Component {
  constructor(props) {
    super(props);
    this._fetchData = debounce(this._fetchData.bind(this), 300);
  }

  _fetchData(state) {
    const { pageSize, page, filtered } = state;
    const filter = mapValueKeys(filtered, 'id', 'value');
    this.props.actions.getList({ limit: pageSize, offset: pageSize * page, ...filter });
  }

  componentWillUnmount() {
    this.props.actions.resetList(); // RESET LIST TO DEFAULT STATE
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
                <Link to='/brands/create' className='btn btn-outline-primary btn-sm float-right' role='button'>
                  <i className='fa fa-plus-square' />
                  {'\u00A0 New'}
                </Link>
              </CardHeader>
              <CardBlock className='card-body'>
                <ReactTable
                  className='-striped -highlight'
                  columns={columns}
                  data={data}
                  defaultPageSize={10}
                  filterable
                  loading={loading}
                  manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  onFetchData={this._fetchData} // Request new data when things change
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
