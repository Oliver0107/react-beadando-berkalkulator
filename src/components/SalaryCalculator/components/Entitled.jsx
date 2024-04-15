import React from 'react'
import { Badge } from '../../ui/badge';

const Entitled = ({ person }) => {
    const { mJogosult, marry } = person;
    return (
        <div>{mJogosult != null && marry && (mJogosult ? <Badge className="bg-green-600 w-28 justify-center pointer-events-none font-bold">Jogosult</Badge> : <Badge className="bg-red-600 w-28 justify-center pointer-events-none font-bold">Nem jogosult</Badge>)}</div>
    )
}

export default Entitled