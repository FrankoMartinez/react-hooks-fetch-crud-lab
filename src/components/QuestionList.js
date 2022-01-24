import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestion] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => {
      setQuestion(data)
    })
  }, [])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => {
      const updatedItems = questions.filter((question) => question.id !== id)
      setQuestion(updatedItems)
    })
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH", 
      header: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({correctIndex}),
    })
    .then(res => res.json())
    .then((updatedQuestion) => {
      const updatedQuestions = questions.map((question) => {
        if (question.id === updatedQuestion.id) return updatedQuestion
        return question
      })
      setQuestion(updatedQuestions)
    })
}

  const questionsDisplayed = questions.map((question) => {
  return <QuestionItem key={question.id} question={question} onDeleteClick={handleDeleteClick} onAnswerChange={handleAnswerChange} />
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionsDisplayed}
      </ul>
    </section>
  );
}

export default QuestionList;
