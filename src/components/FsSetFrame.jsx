import React, { useState } from 'react'
import Flashcard from './Flashcard';

export default function FsSetFrame({ dataset }) {

    const [card, setCard] = useState(null)
    const [usedNumbers, setUsedNumbers] = useState([])

    function getPreviousCard() {
        
    }

    function getRandomCard() {
        let availableUsedNumbers = usedNumbers;

        if (availableUsedNumbers.length >= dataset.length - 1) {
            availableUsedNumbers = [];
        }

        let randomNum;
        do {
            randomNum =
                Math.floor(Math.random() * dataset.length);
        }
        while (usedNumbers.includes(randomNum));

        setUsedNumbers([...availableUsedNumbers, randomNum]);
        setCard(dataset[randomNum])
    }

    return (
        <div>
            <div>
                <button onClick={() => getRandomCard()}>Get random question {dataset.length - usedNumbers.length}/{dataset.length}</button>
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
