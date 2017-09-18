// -- MODULES
import React from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';

// -- COMPONENTS
import ActionButtons from './_ActionButtons';

export const columns = [
  {
    maxWidth: 60,
    accessor: 'logo.small',
    filterable: false,
    className: 'flex-middle text-center',
    Cell: (row) => (
      <img src={row.value} className='rounded border border-secondary' width='45' onError={addDefaultSrc} />
    )
  },
  {
    Header: 'Name',
    accessor: 'legal_name',
    className: 'flex-middle',
    Cell: (row) => <Link to={`${row.original.id}`}>{row.value}</Link>
  },
  {
    Header: 'Street Address',
    accessor: 'street_address',
    filterable: false,
    className: 'flex-middle',
    Cell: (row) => <Link to={`${row.original.id}`}>{row.value}</Link>
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
    className: 'flex-middle text-center',
    accessor: 'id',
    style: { overflow: 'inherit ' },
    maxWidth: 80,
    filterable: false,
    Cell: (row) => <ActionButtons row={row} />
  }
];

//================================================
// Select Filter of React Table
//================================================
const Select = ({ onChange, children }) => (
  <select onChange={(event) => onChange(event.target.value)} style={{ width: '100%' }}>
    {children}
  </select>
);

//================================================
// Default image if source image was not found
//================================================
const addDefaultSrc = (ev) => {
  ev.target.src = 'http://www.indigohealth.com.au/wp-content/themes/rheniumific/images/thumbnail.png';
};
