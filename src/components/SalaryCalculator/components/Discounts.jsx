import React from 'react'
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import Dependants from './Dependants';
import NewlyMarried from './NewlyMarried';



const Discounts = ({ person, szjaC, dateC, marryC, taxDiscountC, familyDiscountC, aEltartott, dEltartott, aKedvezmeny, dKedvezmeny, jogosult }) => {

    const { szjaMentes, taxDiscount } = person;

    const szjaChange = (checked) => {
        szjaC(checked);
    }

    const marryChange = (checked) => {
        marryC(checked);
        console.log(checked)

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
            <h1 className='font-semibold text-xl mb-2'>Kedvezmények</h1>
            <div className="flex items-center space-x-2">
                <Switch
                    id="szja"
                    checked={szjaMentes}
                    onCheckedChange={(checked) => szjaChange(checked)}
                />
                <Label className='font-semibold'>25 év alatt SZJA mentes</Label>
            </div>

            <NewlyMarried person={person} marryC={marryChange} dateC={dateChange} />

            <div className="flex items-center space-x-2">
                <Switch
                    id="taxDiscount"
                    checked={taxDiscount}
                    onCheckedChange={(checked) => taxDiscountChange(checked)}
                />
                <Label className='font-semibold' >Személyi adókedvezmény</Label>
            </div>

            <Dependants
                person={person}
                familyDiscountC={familyDiscountChange}
                aEltartott={addEltartott}
                dEltartott={decreaseEltartott}
                aKedvezmeny={addKedvezmeny}
                dKedvezmeny={decreaseKedvezmeny}
            />

        </div>
    )
}

export default Discounts