import React, { useState, useEffect } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import 'katex/dist/katex.min.css'

export default function Flashcard({ question, answer }) {

  const [showAns, setShowAns] = useState(false)

  useEffect(() => {
    setShowAns(false)
  }, [question])

  return (
    <div className='w-full max-w-2xl flex flex-col gap-4 px-4'>

      {/* Question box */}
      <div className='question-card'>
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {question}
        </Markdown>
      </div>

      {/* Reveal / hide button */}
      <div className='flex justify-start'>
        <button
          className='reveal-btn'
          onClick={() => setShowAns(prev => !prev)}
        >
          {showAns ? 'Hide answer' : 'Reveal answer'}
        </button>
      </div>

      {/* Answer area */}
      <div
        style={{
          minHeight: '4rem',
          transition: 'opacity 0.2s ease',
          opacity: showAns ? 1 : 0,
          pointerEvents: showAns ? 'auto' : 'none',
        }}
      >
        {showAns && (
          <div className='answer-card'>
            <Markdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {answer}
            </Markdown>
          </div>
        )}

        {!showAns && (
          <div className='answer-placeholder' />
        )}
      </div>

    </div>
  )
}