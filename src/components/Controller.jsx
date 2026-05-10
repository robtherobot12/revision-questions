import React, { useState, useEffect } from 'react'
import Papa from 'papaparse';
import Flashcard from './Flashcard';

export default function Controller() {

    const [card, setCard] = useState(null)
    const [cards, setCards] = useState([])
    const [usedNumbers, setUsedNumbers] = useState([])

    function getRandomCard() {
        let availableUsedNumbers = usedNumbers;

        if (availableUsedNumbers.length >= cards.length - 1) {
            availableUsedNumbers = [];
        }

        let randomNum;
        do {
            randomNum =
                Math.floor(Math.random() * cards.length);
        }
        while (usedNumbers.includes(randomNum));

        setUsedNumbers([...availableUsedNumbers, randomNum]);
        setCard(cards[randomNum])
    }


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
                <div>
                    <button onClick={() => getRandomCard()}>Get random question {cards.length - usedNumbers.length}/{cards.length}</button>
                </div>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center grow">
                {
                    card == null ?
                        <p>Choose a random card</p>
                        :
                        <Flashcard question={card.question} answer={card.solution} />
                }
            </div>

        </div>
    )
}
