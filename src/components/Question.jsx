import { useState } from 'react'
import Timer from './Timer.jsx'
import Answers from './Answers.jsx'
import QUESTIONS from '../questions.js'

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })

    const timer =
        answer.isCorrect !== null ? 2000 : answer.selectedAnswer ? 1000 : 10000

    const handleSelectAnswer = selectedAnswer => {
        setAnswer({ selectedAnswer, isCorrect: null })

        setTimeout(() => {
            const isCorrect = QUESTIONS[index].answers[0] === selectedAnswer
            setAnswer({ selectedAnswer, isCorrect })

            setTimeout(() => onSelectAnswer(selectedAnswer), 2000)
        }, 1000)
    }

    const answerState =
        answer.selectedAnswer && answer.isCorrect !== null
            ? answer.isCorrect
                ? 'correct'
                : 'wrong'
            : answer.selectedAnswer
            ? 'answered'
            : ''

    return (
        <div id="question">
            <Timer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}
