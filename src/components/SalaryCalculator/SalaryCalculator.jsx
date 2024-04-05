import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

const SalaryCalculator = ({ person, cName, cBBer, szjaC, marryC, taxDiscountC, familyDiscountC }) => {
  if (!person) return null;

  const [name, setName] = useState(person.name);
  const [BBer, setBBer] = useState(person.BBer);
  const [NBer, setNBer] = useState(person.NBer);
  const [szjaMentes, setSzjaMentes] = useState(person.szjaMentes);
  const [marry, setMarry] = useState(person.marry);
  const [taxDiscount, setTaxDiscount] = useState(person.taxDiscount);
  const [familyDiscount, setFamilyDiscount] = useState(person.familyDiscount);

  useEffect(() => {
    setName(person.name);
    setBBer(person.BBer);
    setNBer(person.NBer);
    setSzjaMentes(person.szjaMentes);
    setMarry(person.marry);
    setTaxDiscount(person.taxDiscount);
    setFamilyDiscount(person.familyDiscount);
  }, [person]);
  console.log(person.name);

  const changeName = (e) => {
    setName(e.target.value);
    cName(person.id, e.target.value);
  };
  const changeBBer = (e) => {
    setBBer(e.target.value);
    cBBer(person.id, e.target.value);
  };

  const szjaChange = (e) => {
    setSzjaMentes(e);
    szjaC(person.id, e);
  };
  const marryChange = (e) => {
    setMarry(e);
    marryC(person.id, e);
  };
  const taxDiscountChange = (e) => {
    setTaxDiscount(e);
    taxDiscountC(person.id, e);
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
    <Slider defaultValue={[50]} max={100} step={1} className="mt-10 mb-10 w-96" />
    <div>
      <Button>-1%</Button>
      <Button>-5%</Button>
      <Button>+1%</Button>
      <Button>+5%</Button>
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
