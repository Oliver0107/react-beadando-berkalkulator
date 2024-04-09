import { add } from "date-fns";
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
  };

  const updatePersonNBer = (personId, data) => {
    people[personId].NBer = data - (data * 0.335);
  };
  const updatePersonSzja = (personId, data) => {
    people[personId].szjaMentes = data;
    if (data) {

      if (people[personId].BBer < 499952) {
        people[personId].NBer = Math.floor(people[personId].BBer - (people[personId].BBer * 0.185));
      } else {
        people[personId].NBer = Math.floor(people[personId].BBer - (people[personId].BBer * 0.185));
        people[personId].NBer += Math.floor((people[personId].BBer - 499952) * 0.15);
      }
      if (people[personId].marry) {
        people[personId].NBer += 5000;
      }
      if (people[personId].taxDiscount) {
        updatePersonTaxDiscount(personId, people[personId].taxDiscount);
      }
    } else {
      if (people[personId].marry) {
        updatePersonNBer(personId, people[personId].BBer);
        people[personId].NBer += 5000;
      } else {
        updatePersonNBer(personId, people[personId].BBer);
      }

      if (people[personId].taxDiscount) {
        updatePersonTaxDiscount(personId, people[personId].taxDiscount);
      }
    }
    setPeople([...people]);
  };

  const addEltartottak = (personId, data) => {
    if (people[personId].kezdemenyNum == 1) {
      people[personId].NBer -= 10000 * people[personId].eltartott;
    } else if (people[personId].kezdemenyNum == 2) {
      people[personId].NBer -= 20000 * people[personId].eltartott;
    } else if (people[personId].kezdemenyNum == 3) {
      people[personId].NBer -= 33000 * people[personId].eltartott;
    }

    people[personId].eltartott = data;

    if (people[personId].kezdemenyNum == 1) {
      people[personId].NBer += 10000 * people[personId].eltartott;
    } else if (people[personId].kezdemenyNum == 2) {
      people[personId].NBer += 20000 * people[personId].eltartott;
    } else if (people[personId].kezdemenyNum == 3) {
      people[personId].NBer += 33000 * people[personId].eltartott;
    }
  };

  const decreaseEltartottak = (personId, data) => {
    if (people[personId].kezdemenyNum == 1) {
      people[personId].NBer -= 10000 * people[personId].eltartott;
    } else if (people[personId].kezdemenyNum == 2) {
      people[personId].NBer -= 20000 * people[personId].eltartott;
    } else if (people[personId].kezdemenyNum == 3) {
      people[personId].NBer -= 33000 * people[personId].eltartott;
    }

    people[personId].eltartott = data;

    if (people[personId].kezdemenyNum == 1) {
      people[personId].NBer += 10000 * people[personId].eltartott;
    } else if (people[personId].kezdemenyNum == 2) {
      people[personId].NBer += 20000 * people[personId].eltartott;
    } else if (people[personId].kezdemenyNum == 3) {
      people[personId].NBer += 33000 * people[personId].eltartott;
    }

    console.log(people[personId].eltartott, people[personId].kezdemenyNum);
  };

  const addKedvezmenyNum = (personId, data) => {
    people[personId].kezdemenyNum = data;

    if (data == 1) {
      people[personId].NBer += 10000 * people[personId].eltartott;
    } else if (data == 2) {
      people[personId].NBer -= 10000 * people[personId].eltartott;
      people[personId].NBer += 20000 * people[personId].eltartott;
    } else if (data == 3) {
      people[personId].NBer -= 20000 * people[personId].eltartott;
      people[personId].NBer += 33000 * people[personId].eltartott;
    }
  };

  const decreaseKedvezmenyNum = (personId, data) => {
    people[personId].kezdemenyNum = data;
    const ennyiVolt = people[personId].kezdemenyNum - 1;

    if (ennyiVolt == 0) {
      people[personId].NBer -= 10000 * people[personId].eltartott;
    } else if (ennyiVolt == 1) {
      people[personId].NBer -= 20000 * people[personId].eltartott;
      people[personId].NBer += 10000 * people[personId].eltartott;
    } else if (ennyiVolt === 2) {
      people[personId].NBer -= 33000 * people[personId].eltartott;
      people[personId].NBer += 20000 * people[personId].eltartott;
    }
    console.log(people[personId].eltartott, people[personId].kezdemenyNum);
  };

  const updatePersonMarry = (personId, data) => {
    people[personId].marry = data;
    if (data) {
      people[personId].NBer += 5000;
    } else {

      people[personId].NBer -= 5000;
    }
  };

  const updatePersonMarryDate = (personId, data) => {
    people[personId].mDate = data;
  };

  const updatePersonMarryJogosult = (personId, data) => {
    people[personId].mJogosult = data;
  };

  const updatePersonTaxDiscount = (personId, data) => {
    people[personId].taxDiscount = data;
    if (data) {

      if ((people[personId].BBer - people[personId].NBer) <= 77300) {
        people[personId].NBer = people[personId].BBer;
      } else {
        people[personId].NBer += 77300;
      }
    } else {
      if (people[personId].marry) {
        updatePersonNBer(personId, people[personId].BBer);
        people[personId].NBer += 5000;


      }
      if (people[personId].szjaMentes) {
        updatePersonSzja(personId, people[personId].szjaMentes);
      } else {
        if (!people[personId].marry) {
          updatePersonNBer(personId, people[personId].BBer);
        }
      }

    }
    setPeople([...people]);
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
            cNBer={updatePersonNBer}
            szjaC={updatePersonSzja}
            marryC={updatePersonMarry}
            marryDateC={updatePersonMarryDate}
            mJogosultC={updatePersonMarryJogosult}
            taxDiscountC={updatePersonTaxDiscount}
            familyDiscountC={updatePersonFamilyDiscount}
            aEltartottak={addEltartottak}
            dEltartottak={decreaseEltartottak}
            aKedvezmeny={addKedvezmenyNum}
            dKedvezmeny={decreaseKedvezmenyNum}

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
