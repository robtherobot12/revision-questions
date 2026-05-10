import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'

export default function Flashcard({question, answer}) {

    const [showAns, setShowAns] = useState(false)

    useEffect(() => {
      setShowAns(false)
    }, [question])
    

  return (
    <div className='w-2/3 flex flex-col justify-center items-center text-center gap-5'>
        
        <div className="flex flex-col justify-center items-center gap-3">
            <Markdown>{question}</Markdown>
            {
                showAns ?
                <Markdown>{answer}</Markdown>
                : <></>
            }
        </div>
        <button className='hover:cursor-pointer px-4 py-2' onClick={(e) => setShowAns(!showAns)}>Reveal Answer</button>
    </div>
  )
}
