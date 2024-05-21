import { useState } from "react"
import '../styles/Game.css'

let questionsArray = [
    {
        id: 0,
        question: "The capital of france is paris.",
        answer: true,
        marking: false
    },
    {
        id: 1,
        question: "The square root of 9 is equal to 4",
        answer: false,
        marking: false
    },
    {
        id: 2,
        question: "Humans have four lungs!",
        answer: false,
        marking: false
    },
    {
        id: 3,
        question: "You can see the great wall of china from space!",
        answer: false,
        marking: false
    },
    {
        id: 4,
        question: "The boiling point of water is 100C",
        answer: true,
        marking: false
    }
]

function FinalScore({ score }) {
    return (
        <>
            <h3 className="final-score">You got {score}/5!</h3>
            <button onClick={() => window.location.reload()}>Replay?</button>
        </>
    )
}

function Questions({ currentQn, prevQn, nextQn, gameOver, markQn, isSelected }) {
    return (
        <>
            {questionsArray.map(question => {
                if (question.id === currentQn) {
                    return (
                        <form key={question.id} className="question">
                            <h3>Q.{question.id + 1} {question.question}</h3>
                            <div className="radio-group">
                                <input className="radio-input" name="radio-group" id="radio1" type="radio" onChange={() => markQn(question, true)} />
                                <label className="radio-label" htmlFor="radio1">
                                    <span className="radio-inner-circle"></span>
                                    True
                                </label>

                                <input className="radio-input" name="radio-group" id="radio2" type="radio" onChange={() => markQn(question, false)} />
                                <label className="radio-label" htmlFor="radio2">
                                    <span className="radio-inner-circle"></span>
                                    False
                                </label>
                            </div>
                        </form>
                    )
                }
            })}
            <div className="switch-question-buttons">
                <button onClick={() => {
                    prevQn()
                }}>Back</button>
                {currentQn === 4 ? <button onClick={gameOver}>Finish</button> : <button className="next-btn" onClick={nextQn} disabled={!isSelected}>Next</button>}
            </div>
        </>
    )
}

export default function Game() {
    const [currentQn, setCurrentQn] = useState(questionsArray[0].id)
    const [score, setScore] = useState(null)
    const [isSelected, setIsSelected] = useState(false)

    function prevQn() {
        if (currentQn === 0) {
            return
        }

        setCurrentQn(currentQn => currentQn - 1)
    }

    function nextQn() {
        if (currentQn === 4) {
            return
        }

        setCurrentQn(currentQn => currentQn + 1)
        setIsSelected(false);
    }

    function gameOver() {
        let score = 0

        for (let i = 0; i < questionsArray.length; i++) {
            if (questionsArray[i].answer === questionsArray[i].marking) {
                score = score + 1
            }
        }

        setScore(score)
    }

    function markQn(question, option) {
        questionsArray[question.id].marking = option
        setIsSelected(true);
    }

    return (
        <div className="game-container">
            {score === null &&
                <Questions
                    currentQn={currentQn}
                    prevQn={prevQn}
                    nextQn={nextQn}
                    gameOver={gameOver}
                    markQn={markQn}
                    isSelected={isSelected}
                >
                </Questions>
            }
            {score !== null &&
                <FinalScore score={score}></FinalScore>
            }
        </div>
    )
}