import React from 'react'
import {observer} from 'mobx-react'
import {Link} from 'react-router-dom';
import { debounce } from 'lodash';

// -- COMPONENTS
import ReactTable from 'react-table';
import {Row, Col, Card, CardHeader, CardBlock} from 'reactstrap';
import {columns} from './_columns';
import {Alert} from '../../components';

import { mapValueKeys } from '../../utils';

@observer(['stores'])
class BrandList extends React.Component {



  componentWillMount() {
    const {fetchBrands} = this.props.stores.brandStore;
    fetchBrands({limit:10})
  }

  _fetchData = (state) => {
    console.log('state:',state);
    const { pageSize, page, filtered } = state;
    const filter = mapValueKeys(filtered, 'id', 'value');
    this.props.stores.brandStore.fetchBrands({ limit: pageSize, offset: pageSize * page, ...filter });
  }

  render() {
    const {brands: data, loading, page, error} = this.props.stores.brandStore;
    return (
      <div className='animated fadeIn'>
        <Row>
          <Col lg='12'>
            {error && <Alert error={error}/>}
            <Card>
              <CardHeader>
                <i className='icon-list'/>Brand List
                <Link
                  to='/brands/create'
                  className='btn btn-outline-primary btn-sm float-right'
                  role='button'>
                  <i className='fa fa-plus-square'/> {'\u00A0 New'}
                </Link>
              </CardHeader>
              <CardBlock className='card-body'>
                <ReactTable className='-striped -highlight' columns={columns} data={data} defaultPageSize={10} filterable loading={loading} manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                  onFetchData={debounce(this._fetchData, 500)} // Request new data when things change
                  pageSizeOptions={[10, 15, 25, 50, 100]} pages={page} sortable={false}/>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BrandList
