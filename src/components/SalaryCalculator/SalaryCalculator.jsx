import React from 'react';

const SalaryCalculator = ({ person }) => {
  if (!person) return null;
  
  return <div className="bg-yellow-500"><h1>{person.name}</h1></div>;
};

export default SalaryCalculator;
