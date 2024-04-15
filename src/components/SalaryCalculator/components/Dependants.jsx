import React, { useEffect, useState } from 'react'
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Switch } from '../../ui/switch';
import { CirclePlus, CircleMinus } from 'lucide-react';

const Dependants = ({ person, familyDiscountC, aEltartott, dEltartott, aKedvezmeny, dKedvezmeny }) => {
    const { familyDiscount, eltartott, kedvezmenyNum } = person;

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
    )
}

export default Dependants