import React, { useEffect, useState } from 'react'
import Flashcard from './Flashcard';

export default function FsSetFrame({ dataset }) {

    const [cardIndex, setCardIndex] = useState(0)
    const [cardNums, setCardNums] = useState([])

    const card =
    cardNums.length > 0
        ? dataset[cardNums[cardIndex]]
        : null;

    useEffect(() => {
        shuffle()
    }, [dataset])

    function shuffle() {
        let nums = []
        let randomOrderNums = []
        for (let i = 0; i < dataset.length; i++) {
            nums.push(i);
        }
        for (let i = 0; i < dataset.length; i++) {
            let n = Math.floor(Math.random() * nums.length)
            randomOrderNums.push(nums[n])
            nums.splice(n, 1)
        }
        setCardNums(randomOrderNums)
        setCardIndex(0)
    }


    function getPreviousCard() {
        
        if (cardIndex - 1 >= 0) {
            setCardIndex(cardIndex - 1)
        }
        
    }

    function getRandomCard() {
        
        if (cardIndex + 1 >= dataset.length) {
            shuffle()
        } else {
            setCardIndex(cardIndex + 1)
        }
    }

    return (
        <div>
            <div className="flex items-center ml-4 gap-2">
                <button onClick={() => getPreviousCard()}>←</button>
                <button onClick={() => getRandomCard()}>→</button>
                <p>Get random question {dataset.length - cardIndex}/{dataset.length}</p>
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
