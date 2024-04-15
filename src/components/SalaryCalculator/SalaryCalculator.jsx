import React, { useEffect, useState } from 'react';
import NameAndSalary from './components/NameAndSalary';
import Discounts from './components/Discounts';

const SalaryCalculator = ({ person, cName, cBBer, cNBer, szjaC, marryC, marryDateC, mJogosultC, taxDiscountC, familyDiscountC, aEltartottak, dEltartottak, aKedvezmeny, dKedvezmeny, update }) => {
  if (!person) return null;

  const [name, setName] = useState(person.name);
  const [BBer, setBBer] = useState(person.BBer);
  const [sliderValue, setSliderValue] = useState(person.BBer / 5000);
  const [NBer, setNBer] = useState(person.NBer);
  const [szjaMentes, setSzjaMentes] = useState(person.szjaMentes);
  const [marry, setMarry] = useState(person.marry);
  const [date, setDate] = useState(person.mDate);
  const [jogosult, setJogosult] = useState(person.mJogosult);
  const [taxDiscount, setTaxDiscount] = useState(person.taxDiscount);
  const [familyDiscount, setFamilyDiscount] = useState(person.familyDiscount);

  const [eltartottak, setEltartottak] = useState(person.eltartott);
  const [kedvezmeny, setKedvezmenyNum] = useState(person.kedvezmenyNum);



  useEffect(() => {
    setName(person.name);
    setBBer(person.BBer);
    setNBer(person.NBer);
    setSliderValue(person.BBer / 5000);
    setSzjaMentes(person.szjaMentes);
    setMarry(person.marry);
    setDate(person.mDate);
    setJogosult(person.mJogosult);
    setTaxDiscount(person.taxDiscount);
    setFamilyDiscount(person.familyDiscount);
    setEltartottak(person.eltartott);
    setKedvezmenyNum(person.kedvezmenyNum);

  }, [person]);

  const zero = () => {
    setSzjaMentes(false);
    setMarry(false);
    setDate(null);
    setJogosult(null);
    setTaxDiscount(false);
    setFamilyDiscount(false);
    setEltartottak(0);
    setKedvezmenyNum(0);

    szjaC(person.id, false);
    marryC(person.id, false);
    marryDateC(person.id, null);
    mJogosultC(person.id, null);
    taxDiscountC(person.id, false);
    familyDiscountC(person.id, false);




  }

  const changeName = (e) => {
    setName(e.target.value);
    cName(person.id, e.target.value);
  };
  const changeBBer = (e) => {

    zero();

    setBBer(Math.floor(e.target.value));
    setNBer(Math.floor(e.target.value) - (Math.floor(e.target.value) * 0.335));

    setSliderValue(Math.floor(e.target.value) / 5000);

    cBBer(person.id, Math.floor(e.target.value));
    cNBer(person.id, Math.floor(e.target.value));
  };

  const sliderChange = (e) => {
    zero();
    setSliderValue(e);

    setBBer(e * 5000);
    setNBer(e * 5000 - (e * 5000 * 0.335));

    cBBer(person.id, e * 5000);
    cNBer(person.id, e * 5000);
  };

  const increaseBBer = (percentage) => {
    zero();
    setBBer((currentBBer) => {
      const newBBer = currentBBer * (1 + percentage / 100);
      setNBer(Math.round(newBBer - (newBBer * 0.335)));
      cNBer(person.id, Math.round(newBBer));
      cBBer(person.id, Math.round(newBBer));
      return Math.floor(newBBer);
    });
    setSliderValue(person.BBer / 5000);
  };

  const decreaseBBer = (percentage) => {
    zero();
    setBBer((currentBBer) => {
      const newBBer = currentBBer * (1 - percentage / 100);
      setNBer(Math.round(newBBer - (newBBer * 0.335)));
      cNBer(person.id, Math.round(newBBer));
      cBBer(person.id, Math.floor(newBBer));
      return Math.floor(newBBer);
    });
    setSliderValue(person.BBer / 5000);
  };

  const szjaChange = (e) => {
    setSzjaMentes(e);
    szjaC(person.id, e);
    setNBer(person.NBer);
  };

  const dateChange = (e) => {
    setDate(e);
    const now = new Date();
    const pickedDate = new Date(e);

    const differenceInMilliseconds = now.getTime() - pickedDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    if (differenceInDays < 2 * 365 && differenceInDays > 30) {
      marryC(person.id, true);
      setNBer(person.NBer);
      jogosultChange(true)
      marryDateC(person.id, e);
    } else {
      if (person.mJogosult == true) {
        marryC(person.id, false);
        setNBer(person.NBer);
        jogosultChange(false);
        marryDateC(person.id, e);
      } else {
        if (jogosult) {
          marryC(person.id, false);
          setNBer(person.NBer);
        }
        jogosultChange(false)
      }

    }

  };

  const marryChange = (e) => {

    setMarry(e);
    marryC(person.id, e);

    if (!e) {
      marryDateC(person.id, null);
      if (person.mJogosult == true) {
        jogosultChange(person.id, e);
        setNBer(person.NBer);
      }
      jogosultChange(person.id, null);
    }


    // setMarry(e);
    // marryC(person.id, e);

    // if (!e) {
    //   marryDateC(person.id, null);
    //   if (person.mJogosult == true) {
    //     jogosultChange(person.id, e);
    //     setNBer(person.NBer);


    //   }
    //   setJogosult(null);
    //   mJogosultC(person.id, null);
    // }

    // jogosultChange(person.id, e);


  };

  const jogosultChange = (e) => {
    if (jogosult == false && e || jogosult == true && !e) {
      setJogosult(e);
      mJogosultC(person.id, e);
      setNBer(person.NBer);
    }
    if (e == null) {
      setJogosult(e);
      mJogosultC(person.id, e);
      setNBer(person.NBer);
    }

  };

  const taxDiscountChange = (e) => {
    setTaxDiscount(e);
    taxDiscountC(person.id, e);
    setNBer(person.NBer);
  };
  const familyDiscountChange = (e) => {
    setFamilyDiscount(e);
    setKedvezmenyNum(0);
    setEltartottak(0);
    familyDiscountC(person.id, e);
    setNBer(person.NBer);

  };

  const addEltartott = () => {
    setEltartottak((current) => {
      const newEltartott = current + 1;
      aEltartottak(person.id, newEltartott);
      setEltartottak(newEltartott);
      setNBer(person.NBer);
      return newEltartott;
    });
  };

  const decreaseEltartott = () => {

    if (eltartottak > 0) {

      setEltartottak((current) => {
        const newEltartott = current - 1;
        aEltartottak(person.id, newEltartott);
        aKedvezmeny(person.id, person.kedvezmenyNum, newEltartott);
        setEltartottak(newEltartott);

        setNBer(person.NBer);
        return newEltartott;
      });
      if (eltartottak <= kedvezmeny) {
        decreaseKedvezmeny();
      }
    }

  };

  const addKedvezmeny = () => {
    const maxKedvezmeny = Math.min(eltartottak, 3);
    if (kedvezmeny < maxKedvezmeny) {
      setKedvezmenyNum((current) => {
        const newKezdemeny = current + 1;
        aKedvezmeny(person.id, newKezdemeny, person.eltartott);
        setKedvezmenyNum(newKezdemeny);
        setNBer(person.NBer);
        return newKezdemeny;
      });
    }
  };

  const decreaseKedvezmeny = () => {
    if (kedvezmeny > 0) {
      setKedvezmenyNum((current) => {
        const newKezdemeny = current - 1;
        aKedvezmeny(person.id, newKezdemeny);
        setKedvezmenyNum(newKezdemeny);
        setNBer(person.NBer);
        return newKezdemeny;
      });
    }
  };

  return <div className=" bg-slate-300 rounded-xl p-6">

    <NameAndSalary
      person={person}
      cName={changeName}
      cBBer={changeBBer}
      sliderC={sliderChange}
      sliderValue={sliderValue}
      dBBer={decreaseBBer}
      iBBer={increaseBBer}

    />

    <Discounts
      szjaC={szjaChange}
      marryC={marryChange}
      dateC={dateChange}
      taxDiscountC={taxDiscountChange}
      familyDiscountC={familyDiscountChange}
      person={person}
      aEltartott={addEltartott}
      dEltartott={decreaseEltartott}
      aKedvezmeny={addKedvezmeny}
      dKedvezmeny={decreaseKedvezmeny}
      jogosult={jogosult}

    />

    <div className='mt-20 w-full flex flex-col items-center'>
      <h1 className=' font-semibold font-2xl'>Számított nettó bér:</h1>
      <div className='  bg-slate-800 w-fit p-3 rounded-md m-3'>
        <p className='font-semibold text-white'>{Math.floor(NBer)} Ft</p>
      </div>
    </div>
  </div >;
};

export default SalaryCalculator;
