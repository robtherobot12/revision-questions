import React, { useState, useEffect } from 'react'
import Flashcard from './Flashcard';

function cleanText(str) {
  if (!str) return str;
  return str
    .replace(/\\\r?\n/g, '\n')   // strip the trailing backslash
    .replace(/\n(?!\n)/g, '  \n') // single \n → two trailing spaces + \n (Markdown hard break)
    .trim();
}

export default function Controller() {

  const [card, setCard] = useState(null)
  const [cards, setCards] = useState([])
  const [usedNumbers, setUsedNumbers] = useState([])
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [dark])

  function getRandomCard() {
    let availableUsedNumbers = usedNumbers;

    if (availableUsedNumbers.length >= cards.length - 1) {
      availableUsedNumbers = [];
    }

    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * cards.length);
    } while (usedNumbers.includes(randomNum));

    setUsedNumbers([...availableUsedNumbers, randomNum]);
    setCard(cards[randomNum])
  }

  useEffect(() => {
    fetch('/question_bank.json')
      .then((response) => response.json())
      .then((data) => {
        const cleaned = data.map(card => ({
          ...card,
          question: cleanText(card.question),
          solution: cleanText(card.solution),
        }));
        setCards(cleaned);
      });
  }, [])

  return (
    <div className='h-screen flex flex-col' style={{ backgroundColor: 'var(--bg)' }}>

      {/* Header */}
      <div className='pt-3 pb-2 px-4 flex justify-between items-center'
        style={{ borderBottom: '1px solid var(--border)' }}>

        <div className='flex flex-col gap-0.5'>
          <h1 className='text-base font-semibold tracking-tight' style={{ color: 'var(--text-primary)' }}>
            COMS10015 Revision
          </h1>
          <p className='text-xs' style={{ color: 'var(--text-muted)' }}>
            by Rob, Leo — Questions by Dan Page
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <label className='theme-toggle' style={{ cursor: 'pointer' }}>
            <span>{dark ? '☾' : '☀'}</span>
            <div className='toggle-track' onClick={() => setDark(d => !d)}>
              <div className='toggle-thumb' />
            </div>
          </label>

          <button onClick={getRandomCard} className='text-xs'>
            Random&nbsp;
            <span style={{ opacity: 0.75 }}>
              {cards.length > 0 ? `${cards.length - usedNumbers.length}/${cards.length}` : '…'}
            </span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className='flex flex-col gap-5 justify-center items-center grow'>
        {card == null
          ? <p className='text-sm' style={{ color: 'var(--text-muted)' }}>
              Press &ldquo;Random&rdquo; to get a question
            </p>
          : <Flashcard question={card.question} answer={card.solution} />
        }
      </div>

    </div>
  )
}
