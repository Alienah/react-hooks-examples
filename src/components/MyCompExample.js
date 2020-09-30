import React from 'react';
import PropTypes from 'prop-types';

function MyCompExample({str, onClick, obj}) {
  console.log(obj)
  return <div onClick={onClick}>{str}</div>
}

MyCompExample.propTypes = {
  str: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  obj: PropTypes.exact({
    age: PropTypes.number.isRequired,
    name: PropTypes.string,
    gender: PropTypes.oneOf(['M', 'F']),
    birthdate: PropTypes.instanceOf(Date)
  })
}

export default MyCompExample;