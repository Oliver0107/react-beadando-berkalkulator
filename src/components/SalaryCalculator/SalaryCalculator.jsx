import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import  DialogDemo  from '../DatePickerModal';

const SalaryCalculator = ({ person, cName, cBBer, cNBer, szjaC, marryC, taxDiscountC, familyDiscountC }) => {
  if (!person) return null;

  const [name, setName] = useState(person.name);
  const [BBer, setBBer] = useState(person.BBer);
  const [sliderValue, setSliderValue] = useState(person.BBer / 5000);
  const [NBer, setNBer] = useState(person.NBer);
  const [szjaMentes, setSzjaMentes] = useState(person.szjaMentes);
  const [marry, setMarry] = useState(person.marry);
  const [taxDiscount, setTaxDiscount] = useState(person.taxDiscount);
  const [familyDiscount, setFamilyDiscount] = useState(person.familyDiscount);

  useEffect(() => {
    setName(person.name);
    setBBer(person.BBer);
    setNBer(person.NBer);
    setSliderValue(person.BBer / 5000);
    setSzjaMentes(person.szjaMentes);
    setMarry(person.marry);
    setTaxDiscount(person.taxDiscount);
    setFamilyDiscount(person.familyDiscount);

  }, [person]);
  console.log(person.BBer);

  const changeName = (e) => {
    setName(e.target.value);
    cName(person.id, e.target.value);
  };
  const changeBBer = (e) => {
    setBBer(Math.floor(e.target.value));
    setNBer(Math.floor(e.target.value) - (Math.floor(e.target.value) * 0.335));

    setSliderValue(Math.floor(e.target.value) / 5000);

    cBBer(person.id, Math.floor(e.target.value));
    cNBer(person.id, Math.floor(e.target.value));
  };

  const sliderChange = (e) => {
    setSliderValue(e);

    setBBer(e * 5000);
    setNBer(e * 5000 - (e * 5000 * 0.335));

    cBBer(person.id, e * 5000);
    cNBer(person.id, e * 5000);
  };

  const increaseBBer = (percentage) => {
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
  const marryChange = (e) => {
    setMarry(e);
    marryC(person.id, e);
    setNBer(person.NBer);

  };
  const taxDiscountChange = (e) => {
    setTaxDiscount(e);
    taxDiscountC(person.id, e);
    console.log(person.NBer);
    setNBer(person.NBer);
  };
  const familyDiscountChange = (e) => {
    setFamilyDiscount(e);
    familyDiscountC(person.id, e);

  };

  return <div className="bg-yellow-500 p-0 m-0">
    <h1>{name} bérének kiszámítása</h1>
    <div className="grid w-full max-w-sm items-center gap-1.5 mb-9">
      <Label >Név</Label>
      <Input label="Név" value={name} onChange={(e) => changeName(e)} />
      <Label >Add meg a családtag nevét!</Label>
    </div>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>Bruttó bér</Label>
      <Input label="Bér" type="number" min="0" value={BBer} onChange={(e) => changeBBer(e)} />
      <Label >Add meg a bruttó béredet!</Label>
    </div>
    <Slider value={[sliderValue]} max={100} step={1} onValueChange={(e) => sliderChange(e[0])} className="mt-10 mb-10 w-96" />
    <div>
      <Button onClick={() => decreaseBBer(1)}>-1%</Button>
      <Button onClick={() => decreaseBBer(5)}>-5%</Button>
      <Button onClick={() => increaseBBer(1)}>+1%</Button>
      <Button onClick={() => increaseBBer(5)}>+5%</Button>
    </div>

    <div>
      <h1>Kedvezmények</h1>
      <div className="flex items-center space-x-2">
        <Switch
          id="szja"
          checked={szjaMentes}
          onCheckedChange={(checked) => szjaChange(checked)}
        />
        <Label >25 év alatt SZJA mentes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="marry"
          checked={marry}
          onCheckedChange={(checked) => marryChange(checked)}
        />
        <Label>Friss házasok kedvezménye</Label>
        {marry && <DialogDemo />}
        
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="taxDiscount"
          checked={taxDiscount}
          onCheckedChange={(checked) => taxDiscountChange(checked)}
        />
        <Label >Személyi adókedvezmény</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="familyDiscount"
          checked={familyDiscount}
          onCheckedChange={(checked) => familyDiscountChange(checked)}
        />
        <Label >Családi kedvezmény</Label>
      </div>
    </div>

    <div>
      <h1>Számított nettó bér</h1>
      <div>
        <p>Nettó bér: {NBer} Ft</p>
      </div>
    </div>
  </div>;
};

export default SalaryCalculator;
