import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const HouseholdSalaryCalculator = () => {
  const [people, setPeople] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);

  const addPerson = (newPerson) => {
    setPeople(prevPeople => [...prevPeople, newPerson]);
  };
  const tabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const findPerson = () => {
 
    return people[activeTab];
  };



  return (
    <div className="w-[1500px]">
      <header className="bg-slate-400">
        <FamilyMemberTabs
          people={people}
          activeTab={activeTab}
          onAddPerson={addPerson}
          onTabChange={tabChange}
        />
      </header>
      <main className="grid w-full grid-cols-2 gap-10">
        {activeTab > -1 ? (
          <SalaryCalculator
            activeTab={activeTab}
            fPerson={findPerson}
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
