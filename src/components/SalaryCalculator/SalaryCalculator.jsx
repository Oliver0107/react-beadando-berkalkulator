
import React from 'react';

const SalaryCalculator = ({ activeTab,fPerson }) => {
  const tabId = activeTab;
  console.log(activeTab);
  const person =fPerson(activeTab);
  console.log(person);

  return <div className="bg-yellow-500">{person.name}</div>;
};

export default SalaryCalculator;