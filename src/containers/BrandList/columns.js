// -- MODULES
import React from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';

// -- COMPONENTS
import ActionButtons from './ActionButtons';

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
    Header: 'Brand Name',
    accessor: 'name',
    className: 'flex-middle',
    Cell: (row) => <Link to={`${row.original.id}`}>{row.value}</Link>
  },
  {
    Header: 'Transaction Type',
    accessor: 'transaction_type_cd',
    className: 'flex-middle',
    Cell: (row) => <span>{setTypes(row.value, row.original.id)}</span>,
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
    Cell: (row) => <span>{setSector(row.value)}</span>,
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

//================================================
// Set sector name base on sector type
//================================================
const setSector = (sector) =>
  sector === 'RTR' ? 'Restaurant' : sector === 'TSJ' ? 'Tesjor' : sector === 'HTL' ? 'Hotel' : '';

// Set transaction image based on transaction type
const setTypes = (types, id = 0) => types.split('|').map((type, index) => setImgType(type, index, id));

const setImgType = (type, index, brand_id) => {
  const { img = '', name = '' } = transactionTypes.find((x) => x.type === type) || {};
  const target = `brand%${brand_id}%${index}`;
  return (
    <span key={index}>
      <img src={img} alt={name} style={{ width: '25px' }} id={target} />
      <UncontrolledTooltip placement='top' delay={0} target={target}>
        {name}
      </UncontrolledTooltip>
    </span>
  );
};

const transactionTypes = [
  { img: `https://tesjor.com/images/menu/dine-in.png`, type: 'POF', name: 'Dine In' },
  { img: `https://tesjor.com/images/menu/take-out.png`, type: 'PUF', name: 'Take Out' },
  { img: `https://tesjor.com/images/menu/delivery.png`, type: 'DLF', name: 'Delivery' }
];
