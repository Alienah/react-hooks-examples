import React from 'react';

function nameTag({firstName, lastName, style}) {
  if (!firstName && !lastName) {
    return (
    <div className="name">
      <h2>Invalid name</h2>
    </div>
    )
  }
  return (
    <div className="name">
      <h2 style={style}>First name: {firstName}</h2>
      <h2 style={style}>Last name: {lastName}</h2>
      {firstName === 'Daniela' && <div style={{color: "fuchsia"}}>VIP</div>}
    </div>
  );
}

export default nameTag;