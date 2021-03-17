import React, { useState, useEffect } from "react"
import Question from "./Question"
import { hot } from "react-hot-loader/root"
import FaqForm from "./FaqForm"

const FAQList = (props) => {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState([])

  // get the questions (they automatically post)
  const fetchQuestions = async () => {
    // debugger
    try {
      const response = await fetch("/api/v1/questions")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }

      const body = await response.json()

      setQuestions(body.questions)
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const postFaq = async (formPayload) => {
    try {
      const response = await fetch("/api/v1/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formPayload),
        // body: JSON.stringify({question: formPayload}) if router has req.body.questions
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setQuestions([...questions, body.question])
    } catch (error) {
      console.error(`Error in Fetch: ${error.message}`)
    }
  }

  const toggleQuestionSelect = (id) => {
    if (id === selectedQuestion) {
      setSelectedQuestion(null)
    } else {
      setSelectedQuestion(id)
    }
  }

  const questionListItems = questions.map((question) => {
    let selected
    if (selectedQuestion === question.id) {
      selected = true
    }

    let handleClick = () => {
      toggleQuestionSelect(question.id)
    }

    return (
      <div>
        <Question
          key={question.id}
          question={question.question}
          answer={question.answer}
          selected={selected}
          handleClick={handleClick}
          questions={questions}
        />
      </div>
    )
  })

  return (
    <div className="page">
      <h1>We Are Here To Help</h1>
      <div>
        <FaqForm postFaq={postFaq} />
      </div>
      <div className="question-list">{questionListItems}</div>
    </div>
  )
}

export default hot(FAQList)
