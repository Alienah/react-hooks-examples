import React from 'react';
import './../../styles/common.scss';
import './Button-style.scss'

/**
 * @deprecated Don't use this componente after 2020
 * @author [Aida Albarrán](https://github.com/Alienah)
 * @version 1.0.0
 */
function Button({children, type, onClick}) {
  let localClass = 'primary';
  if (type === 'primary') {
    localClass = 'primary';
  }
  if (type === 'secondary') {
    localClass = 'secondary';
  }
  if (type === 'disabled') {
    localClass = 'disabled';
  }
  const classes = `bg-yellow font-black vertical-pad-8 width100 radius15 ${localClass}`

  return (
  <div className="button">
    <button onClick={onClick} className={classes}>{children}</button>
  </div>
  )
}

export default Button;