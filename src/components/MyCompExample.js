import * as React from 'react';

type MyCompExampleProps = {
  str: string,
  obj?: Object,
  onClick?: Function,
  children: React.Node
}

function MyCompExample(props: MyCompExampleProps): Function {
  console.log(props.obj)
  return (
    <div onClick={props.onClick}>
      <div>
        {props.str}
      </div>
      {props.children}
    </div>)
}

MyCompExample.defaultProps = {
  str: 'Hello',
}

export default MyCompExample;