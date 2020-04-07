import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ name, type, value, placeholder, actionFn }) => {
  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={actionFn}
      ></input>
    </>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

Input.defaultProps = {};

export default Input;
