import React from 'react';

// interface MyExampleComInterface {
//   name: string;
// }
// Se pueden usar ambas opciones: interface o type

type MyExampleComType = {
  name: string,
  gender: 'M' | 'F',
  isMarried?: boolean,
  flexible?: any,
  [key:string]: any
}

type PersonType = {
  firstName: string,
  lastName: string,
}

const person: PersonType = {
  firstName: 'Aida',
  lastName: 'Albarrán'
}

function isOld(age: number): boolean {
  return (age > 80) || false;
}

function myExampleComp({name, gender, isMarried, flexible, whatever}: MyExampleComType) {
  return <>
      <div>{name}</div>
      <div>{gender}</div>
      <div>{flexible}</div>
      <div>{whatever}</div>
    </>
}

export default myExampleComp;