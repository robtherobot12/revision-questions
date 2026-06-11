import React, { useEffect, useState } from 'react'
import Flashcard from './Flashcard';

export default function FsSetFrame({ dataset }) {

    const [card, setCard] = useState(null)
    const [usedNumbers, setUsedNumbers] = useState([])
    const [cardNums, setCardNums] = useState([])

    useEffect(() => {
        let nums = []
      for (let i = 0; i < dataset.length; i++) {
        nums.push(i);
      }
      setCardNums(nums)
    }, [dataset])
    

    function getPreviousCard() {

    }

    function getRandomCard() {
        // let availableUsedNumbers = usedNumbers;

        // if (availableUsedNumbers.length >= dataset.length - 1) {
        //     availableUsedNumbers = [];
        // }

        // let randomNum;
        // do {
        //     randomNum =
        //         Math.floor(Math.random() * dataset.length);
        // }
        // while (usedNumbers.includes(randomNum));

        let randomNum = Math.floor(Math.random() * cardNums.length);
        let cardNum = cardNums[randomNum]

        console.log(cardNums)
        console.log(randomNum)
        console.log(cardNum)
        setCardNums(cardNums.splice(randomNum, 1))
        console.log(cardNums)
        setUsedNumbers([...usedNumbers, cardNum]);
        setCard(dataset[cardNum])
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
