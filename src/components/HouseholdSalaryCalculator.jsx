import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useState } from "react";

const HouseholdSalaryCalculator = () => {
  const [people, setPeople] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const addPerson = (newPerson) => {
    setPeople(prevPeople => {
      const newPeople = [...prevPeople, newPerson];
      setActiveTab(newPeople.length-1);
      return newPeople;
    });
    
  };

  const tabChange = (tabIndex) => {
    setActiveTab(tabIndex);
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
      <main className="grid w-full grid-cols-2 gap-10 p-5">
        {activeTab >= 0 ? (
          <SalaryCalculator person={people[activeTab]} />
        ) : (
          <div>There is no people in the household</div>
        )}
        <HouseholdSummary />
      </main>
    </div>
  );
};

export default HouseholdSalaryCalculator;
