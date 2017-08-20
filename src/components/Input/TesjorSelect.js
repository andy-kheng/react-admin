import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

/**
 * Tesjor Select by react-select. Check data.js for <options> fields
 * https://github.com/JedWatson/react-select/issues/1129
 */
export const TesjorSelect = ({ multi, options, onChange, value, onBlur }) => {
  //
  function handleChange(val) {
    onChange(!val ? '' : Array.isArray(val) ? val.map((x) => x.value) : val.value);
  }

  return (
    <Select
      {...this.props}
      multi={multi}
      options={options}
      value={value}
      onChange={handleChange}
      onBlur={() => onBlur(value)}
    />
  );
};

TesjorSelect.propTypes = {
  options: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};
