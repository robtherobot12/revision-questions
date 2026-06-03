import React, { useState, useEffect } from 'react'
import Papa from 'papaparse';
import Flashcard from './Flashcard';
import FsSetFrame from './FsSetFrame';

export default function Controller() {

    
    const [cards, setCards] = useState([])
    


    useEffect(() => {
        fetch('/question_bank.csv')
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setCards(results.data);
                    },
                });
                
            });
    }, [])


    return (
        <div className='h-screen flex flex-col'>
            <div className='pt-2 px-2 flex justify-between'>
                <div className="flex gap-2">
                    <h1 className='text-2xl'>COMS10015 Revision Flashcards</h1>
                    <p className='text-xs'>by Rob (and shoutout to Dan Page)</p>
                </div>
            </div>
            <FsSetFrame dataset={cards} />

        </div>
    )
}
