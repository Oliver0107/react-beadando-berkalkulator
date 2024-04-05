import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useEffect, useState } from "react";

const HouseholdSalaryCalculator = () => {
  const [people, setPeople] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);

  const addPerson = (newPerson) => {
    setPeople(prevPeople => {
      const newPeople = [...prevPeople, newPerson];
      setActiveTab(newPeople.length - 1);
      return newPeople;
    });

  };

  const tabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const updatePersonName = (personId, data) => {
    people[personId].name = data;
    setPeople([...people]);
  };

  const updatePersonBBer = (personId, data) => {
    people[personId].BBer = data;

    people[personId].NBer = data - (data * 0.335);
  };

  const updatePersonSzja = (personId, data) => {
    people[personId].szjaMentes = data;
  };

  const updatePersonMarry = (personId, data) => {
    console.log(data)
    people[personId].marry = data;
    console.log(people[personId])
  };

  const updatePersonTaxDiscount = (personId, data) => {
    people[personId].taxDiscount = data;
  };

  const updatePersonFamilyDiscount = (personId, data) => {
    people[personId].familyDiscount = data;
  };


  return (
    <div className="w-[1500px] bg-green-500 p-0">
      <header>
        <FamilyMemberTabs
          people={people}
          activeTab={activeTab}
          onAddPerson={addPerson}
          onTabChange={tabChange}
        />
      </header>
      <main className="grid w-full grid-cols-2 gap-10 p-5">
        {activeTab >= 0 ? (
          <SalaryCalculator
            person={people[activeTab]}
            cName={updatePersonName}
            cBBer={updatePersonBBer}
            szjaC={updatePersonSzja}
            marryC={updatePersonMarry}
            taxDiscountC={updatePersonTaxDiscount}
            familyDiscountC={updatePersonFamilyDiscount}

          />
        ) : (
          <div>There is no people in the household</div>
        )}
        <HouseholdSummary />
      </main>
    </div>
  );
};

export default HouseholdSalaryCalculator;
