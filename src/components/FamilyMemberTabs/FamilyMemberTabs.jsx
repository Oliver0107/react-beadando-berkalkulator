import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import SalaryCalculator from "../SalaryCalculator/SalaryCalculator";

const FamilyMemberTabs = ({ people, activeTab, onAddPerson, onTabChange }) => {
  const [active, setActive] = useState(activeTab);
  const pCounter = people.length;

  useEffect(() => {
    setActive(activeTab);
  }, [activeTab]);

  const handleAddPerson = () => {
    const personData = { id: `${pCounter}`, 
    name: `${pCounter + 1}. ember`, 
    BBer: 0, NBer: 0, 
    szjaMentes: false, 
    marry: false, mdate: null, mJogosult: null,
    taxDiscount: false, 
    familyDiscount: false };
    handleTabChange(pCounter);
    onAddPerson(personData);
  };
  const handleTabChange = (activeTab) => {
    onTabChange(activeTab);
  };





  return (
    <div>
      <Tabs value={active} className="w-full bg-red-500">
        <TabsList className="flex justify-start gap-3 bg-transparent">
          {people.map((person, index) => {
            return <TabsTrigger key={index} value={index} className="p-0 "><Button className="m-0 rounded-sm" onClick={() => handleTabChange(index)}>{person.name}</Button></TabsTrigger>
          })}
          <TabsTrigger value="add" className="p-0 "><Button className="m-0 rounded-sm" onClick={handleAddPerson}>Add</Button></TabsTrigger>
        </TabsList>
        {people.map((person, index) => {
          return <TabsContent key={index} value={index} className="m-0 p-0"><SalaryCalculator personId={person.id} activeTab={index} /></TabsContent>
        })}
      </Tabs>
    </div>
  );
};

export default FamilyMemberTabs;