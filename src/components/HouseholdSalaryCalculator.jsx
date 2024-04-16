import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";
import { useEffect, useState } from "react";

const HouseholdSalaryCalculator = () => {
  const [people, setPeople] = useState([]);
  const [activeTab, setActiveTab] = useState(-1);



  const update = () => {
    [...people]
  };

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
    setPeople([...people]);
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

      if (people[personId].familyDiscount) {
        const kedvezmenyErtekek = {
          1: 10000,
          2: 20000,
          3: 33000,
        };
        people[personId].NBer += kedvezmenyErtekek[people[personId].kedvezmenyNum] * people[personId].eltartott;

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
      if (people[personId].familyDiscount) {
        updatePersonNBer(personId, people[personId].BBer);
        const kedvezmenyErtekek = {
          1: 10000,
          2: 20000,
          3: 33000,
        };
        people[personId].NBer += kedvezmenyErtekek[people[personId].kedvezmenyNum] * people[personId].eltartott;
      }
    }
    setPeople([...people]);
  };

  const adjustEltartottak = (personId, newEltartottak) => {
    const person = people.find(p => p.id === personId);
    const oldEltartottak = person.eltartott;
    const kedvezmenyErtekek = {
      1: 10000,
      2: 20000,
      3: 33000,
    };

    // Eltávolítjuk a korábbi kedvezményeket

    if (person.kedvezmenyNum > 0 && kedvezmenyErtekek[person.kedvezmenyNum]) {
      person.NBer -= kedvezmenyErtekek[person.kedvezmenyNum] * oldEltartottak;
    }

    // Beállítjuk az új eltartottak számát
    person.eltartott = newEltartottak;

    // Újra kiszámoljuk a kedvezményeket
    person.kedvezmenyNum = Math.min(person.kedvezmenyNum, person.eltartott, 3); // Ellenőrizzük, hogy a kedvezményezett szám nem haladja meg az eltartottak számát
    if (person.kedvezmenyNum > 0 && kedvezmenyErtekek[person.kedvezmenyNum]) {
      person.NBer += kedvezmenyErtekek[person.kedvezmenyNum] * person.eltartott;
    }

    setPeople([...people]); // Frissítjük az állapotot
  };


  const adjustKedvezmenyNum = (personId, newData) => {
    const person = people.find(p => p.id === personId);
    const oldData = person.kedvezmenyNum;
    const kedvezmenyErtekek = {
      1: 10000,
      2: 20000,
      3: 33000,
    };

    // Eltávolítjuk a korábbi kedvezményt az előző eltartottak száma alapján
    if (oldData > 0 && kedvezmenyErtekek[oldData]) {
      person.NBer -= kedvezmenyErtekek[oldData] * person.eltartott;
    }

    // Új kedvezmény hozzáadása az új adatok alapján
    person.kedvezmenyNum = Math.min(newData, person.eltartott, 3); // A legkisebb érték a megengedett maximum

    if (person.kedvezmenyNum > 0 && kedvezmenyErtekek[person.kedvezmenyNum]) {
      person.NBer += kedvezmenyErtekek[person.kedvezmenyNum] * person.eltartott;
    }

    setPeople([...people]); // Frissítjük az állapotot az új értékekkel
  };


  const updatePersonMarry = (personId, data) => {
    people[personId].marry = data;
    if (data == false) {
      if (people[personId].mJogosult == true) {
        people[personId].NBer -= 5000;
      }
      people[personId].mJogosult = null;
    }
    setPeople([...people]);

  };

  const updatePersonMarryDate = (personId, data) => {
    people[personId].mDate = data;
  };

  const updatePersonMarryJogosult = (personId, data) => {

    if (people[personId].mJogosult == null) {
      people[personId].mJogosult = data;
      if (data == true) {
        people[personId].NBer += 5000;
      }
    } else if (people[personId].mJogosult != data) {
      people[personId].mJogosult = data;
      if (data == true) {
        people[personId].NBer += 5000;
      } else if (data == false) {
        people[personId].NBer -= 5000;
      }
    }
    setPeople([...people]);

  };

  const updatePersonTaxDiscount = (personId, data) => {
    people[personId].taxDiscount = data;
    if (data) {
      console.log(people[personId].NBer);

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
      if (people[personId].familyDiscount) {
        updatePersonNBer(personId, people[personId].BBer);
        const kedvezmenyErtekek = {
          1: 10000,
          2: 20000,
          3: 33000,
        };
        people[personId].NBer += kedvezmenyErtekek[people[personId].kedvezmenyNum] * people[personId].eltartott;
      }

    }
    setPeople([...people]);
  };

  const updatePersonFamilyDiscount = (personId, data) => {
    people[personId].familyDiscount = data;
    adjustEltartottak(personId, 0);
    adjustKedvezmenyNum(personId, 0);
  };


  return (

    <div className="flex flex-col items-center mt-20">
      <div className="w-[1500px]">
        <header>
          <FamilyMemberTabs
            people={people}
            update={update}
            activeTab={activeTab}
            onAddPerson={addPerson}
            onTabChange={tabChange}
          />
        </header>
        <main className="grid w-full grid-cols-2 gap-5 pt-1">
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
              aEltartottak={adjustEltartottak}
              aKedvezmeny={adjustKedvezmenyNum}


            />
          ) : (
            <div className=" h-[42rem] bg-slate-300 rounded-xl flex justify-center items-center text-3xl font-semibold">Adj hozzá egy családtagot a + gombbal :) </div>
          )}
          <HouseholdSummary
            people={people}
            setActiveTab={setActiveTab}
          />
        </main>
      </div>
    </div>
  );
};

export default HouseholdSalaryCalculator;
