import React, { useEffect, useState } from 'react'
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import DialogDemo from './DatePickerModal';
import { CirclePlus, CircleMinus } from 'lucide-react';



const Discounts = ({ person, szjaC, dateC, marryC, taxDiscountC, familyDiscountC, aEltartott, dEltartott, aKedvezmeny, dKedvezmeny, jogosult }) => {

    const { szjaMentes, marry, taxDiscount, familyDiscount, kedvezmenyNum, eltartott } = person;

    const szjaChange = (checked) => {
        szjaC(checked);
    }

    const marryChange = (checked) => {
        marryC(checked);

    }

    const dateChange = (date) => {

        dateC(date);
    }

    const taxDiscountChange = (checked) => {
        taxDiscountC(checked);
    }

    const familyDiscountChange = (checked) => {
        familyDiscountC(checked);
    }

    const addEltartott = () => {
        aEltartott();
    }

    const decreaseEltartott = () => {
        dEltartott();
    }

    const addKedvezmeny = () => {
        aKedvezmeny();
    }

    const decreaseKedvezmeny = () => {
        dKedvezmeny();
    }

    return (
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
                        <p>{eltartott}</p>
                        <Button className="h-5 w-5 rounded-3xl" variant="outline" size="icon" onClick={() => { addEltartott() }}>
                            <CirclePlus className="h-full w-full" />
                        </Button>
                    </div>
                    <p>Eltartottak, ebből kedvezményesek</p>
                    <div className='flex flex-row items-center gap-1 ml-2'>
                        <Button className="h-5 w-5 rounded-3xl" variant="outline" size="icon" onClick={() => { decreaseKedvezmeny() }}>
                            <CircleMinus className="h-full w-full" />
                        </Button>
                        <p>{kedvezmenyNum}</p>
                        <Button className="h-5 w-5 rounded-3xl" variant="outline" size="icon" onClick={() => { addKedvezmeny() }}>
                            <CirclePlus className="h-full w-full" />
                        </Button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Discounts