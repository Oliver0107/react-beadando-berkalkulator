import React from 'react'
import { Button } from '../../ui/button'

const Delete = ({ people, delPeople }) => {
    if (people == null) return null;

    const deletePeople = () => {
        delPeople();
    }

    return (
        <div>

            <Button onClick={() => deletePeople()}>Törlés</Button>

        </div>
    )
}
export default Delete