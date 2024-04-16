import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Slider } from '@/components/ui/slider';


const NameAndSalary = ({ person, cName, cBBer, sliderValue, sliderC, dBBer, iBBer }) => {
    const { name, BBer } = person;
    const changeName = (e) => {
        cName(e);
    }
    const changeBBer = (e) => {
        console.log(e);
        cBBer(e);
    }

    const sliderChange = (e) => {
        sliderC(e);
    }

    const decreaseBBer = (e) => {
        dBBer(e);
    }

    const increaseBBer = (e) => {
        iBBer(e);
    }


    return (
        <>
            <h2 className="pb-2 text-2xl font-semibold tracking-tight first:mt-0">{name.toUpperCase()} BÉRÉNEK KISZÁMÍTÁSA</h2>
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
        </>
    )
}

export default NameAndSalary;