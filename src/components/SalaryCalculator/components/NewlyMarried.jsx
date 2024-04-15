import React, { useEffect } from 'react'
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import DatePicker from './DatePickerModal';
import Entitled from './Entitled';


const NewlyMarried = ({ person, marryC, dateC }) => {
    const { marry } = person;
    const marryChange = (checked) => {
        marryC(checked);

    }

    const dateChange = (date) => {
        dateC(date);
    }


    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="marry"
                checked={marry}
                onCheckedChange={(checked) => marryChange(checked)}
            />
            <Label className='font-semibold'>Friss házasok kedvezménye</Label>
            {marry && <DatePicker gDate={dateChange} />}
            <Entitled person={person} />

        </div>
    )
}

export default NewlyMarried