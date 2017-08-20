import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBrandList } from './actions';

import StatusBadge from '../../components/Badge/StatusBadge';

import { Button, Row, Col, Card, CardHeader, CardBlock, Table } from 'reactstrap';

const TR = ({ brand }) => {
  const { name, sector_cd, status_cd, logo_file_name } = brand;
  return (
    <tr>
      <td>
        <img src={`https://storage.googleapis.com/dev-tesjor-static/photo/${logo_file_name}`} width="45" height="40" />
      </td>
      <td>{name}</td>
      <td>{sector_cd}</td>
      <td>
        <StatusBadge status={status_cd} />
      </td>
    </tr>
  );
};

class BrandList extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.getBrandList();
    }, 500);
  }
  render() {
    const { brandList } = this.props;
    const { data } = brandList;
    var namesList = data.map((brand) => <TR brand={brand} key={brand.id} />);

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
                <Table responsive size="md">
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Merchant</th>
                      <th>Sector</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{namesList}</tbody>
                </Table>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ brandList }, ownProps = {}) => ({ brandList });
export default connect(mapStateToProps, { getBrandList })(BrandList);
