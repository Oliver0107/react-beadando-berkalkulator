import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import DialogDemo from './components/DatePickerModal';
import { CirclePlus, CircleMinus, CaseUpper } from 'lucide-react';
import { set } from 'date-fns';

const SalaryCalculator = ({ person, cName, cBBer, cNBer, szjaC, marryC, marryDateC, mJogosultC, taxDiscountC, familyDiscountC, aEltartottak, dEltartottak, aKedvezmeny, dKedvezmeny }) => {
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
      setJogosult(true);
      mJogosultC(person.id, true);
      marryDateC(person.id, e);
    } else {
      if (person.mJogosult == true) {
        marryC(person.id, false);
        setNBer(person.NBer);
        setJogosult(false);
        mJogosultC(person.id, false);
        marryDateC(person.id, e);
      } else {
        if (jogosult) {
          marryC(person.id, false);
          setNBer(person.NBer);
        }
        setJogosult(false);
        mJogosultC(person.id, false);
      }

    }

  };

  const marryChange = (e) => {
    setMarry(e);
    if (!e) {

      marryDateC(person.id, null);
      if (person.mJogosult == true) {
        console.log("nem jogosult");
        marryC(person.id, e);
        setNBer(person.NBer);


      }
      setJogosult(null);
      mJogosultC(person.id, null);
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
    <h2 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">{name} BÉRÉNEK KISZÁMÍTÁSA</h2>
    <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
      <Label className="font-semibold">Családtag neve</Label>
      <Input label="Név" value={name} onChange={(e) => changeName(e)} />
      <Label className="text-muted-foreground">Add meg a családtag nevét!</Label>
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className="font-semibold">Bruttó bér</Label>
      <Input label="Bér" type="number" min="20000" value={BBer} onChange={(e) => changeBBer(e)} />
      <Label className="text-muted-foreground">Add meg a bruttó béredet!</Label>
    </div>
    <Slider value={[sliderValue]} max={100} step={1} min={4} onValueChange={(e) => sliderChange(e[0])} className="mt-5 mb-5 w-96" />
    <div className='w-96 flex justify-center align-middle gap-2'>
      <Button className="bg-slate-600 w-fit p-2" onClick={() => decreaseBBer(1)}>-1%</Button>
      <Button className="bg-slate-600 w-fit p-2" onClick={() => decreaseBBer(5)}>-5%</Button>
      <Button className="bg-slate-600 w-fit p-2" onClick={() => increaseBBer(1)}>+1%</Button>
      <Button className="bg-slate-600 w-fit p-2" onClick={() => increaseBBer(5)}>+5%</Button>
    </div>

    <div className='mt-8'>
      <h1 className='font-semibold'>Kedvezmények</h1>
      <div className="flex items-center space-x-2">
        <Switch
          id="szja"
          checked={szjaMentes}
          onCheckedChange={(checked) => szjaChange(checked)}
        />
        <Label className='font-semibold'>25 év alatt SZJA mentes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="marry"
          checked={marry}
          onCheckedChange={(checked) => marryChange(checked)}
        />
        <Label className='font-semibold'>Friss házasok kedvezménye</Label>
        {marry && <DialogDemo gDate={dateChange} />}
        {jogosult != null && marry && (jogosult ? <Badge className="bg-green-600 w-28 justify-center pointer-events-none font-bold">Jogosult</Badge> : <Badge className="bg-red-600 w-28 justify-center pointer-events-none font-bold">Nem jogosult</Badge>)}
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="taxDiscount"
          checked={taxDiscount}
          onCheckedChange={(checked) => taxDiscountChange(checked)}
        />
        <Label className='font-semibold' >Személyi adókedvezmény</Label>
      </div>
      <div className="flex flex-col">
        <div className='space-x-2 flex items-center mb-1.5'>
          <Switch
            id="familyDiscount"
            checked={familyDiscount}
            onCheckedChange={(checked) => familyDiscountChange(checked)}
          />
          <Label className='font-semibold m-0 p-0' >Családi kedvezmény</Label>
        </div>
        {familyDiscount && <div className='flex items-center'>
          <div className='flex flex-row items-center gap-1 mr-2'>
            <Button className="h-5 w-5 rounded-3xl" variant="outline" size="icon" onClick={() => { decreaseEltartott() }}>
              <CircleMinus className="h-full w-full" />
            </Button>
            <p>{eltartottak}</p>
            <Button className="h-5 w-5 rounded-3xl" variant="outline" size="icon" onClick={() => { addEltartott() }}>
              <CirclePlus className="h-full w-full" />
            </Button>
          </div>
          <p>Eltartottak, ebből kedvezményesek</p>
          <div className='flex flex-row items-center gap-1 ml-2'>
            <Button className="h-5 w-5 rounded-3xl" variant="outline" size="icon" onClick={() => { decreaseKedvezmeny() }}>
              <CircleMinus className="h-full w-full" />
            </Button>
            <p>{kedvezmeny}</p>
            <Button className="h-5 w-5 rounded-3xl" variant="outline" size="icon" onClick={() => { addKedvezmeny() }}>
              <CirclePlus className="h-full w-full" />
            </Button>
          </div>
        </div>}
      </div>
    </div>

    <div className='mt-20 w-full flex flex-col items-center'>
      <h1 className=' font-semibold font-2xl'>Számított nettó bér:</h1>
      <div className='  bg-slate-800 w-fit p-3 rounded-md m-3'>
        <p className='font-semibold text-white'>{NBer} Ft</p>
      </div>
    </div>
  </div >;
};

export default SalaryCalculator;
