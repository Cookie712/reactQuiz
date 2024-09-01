import { useState, useCallback } from 'react'
import QUESTIONS from '../questions.js'
import Question from './Question.jsx'
import Summary from './Summary.jsx'

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([])

    const activeQuestionIndex = userAnswers.length
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(
        selectedAnswer => setUserAnswers(prev => [...prev, selectedAnswer]),
        []
    )

    const handleSkipAnswer = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]
    )

    return quizIsComplete ? (
        <Summary userAnswers={userAnswers} />
    ) : (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}
