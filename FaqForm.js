import React, { useState } from "react"
import { Link } from "react-router-dom"

const FaqForm = (props) => {
  const [newFaq, setNewFaq] = useState({ //state for form info
    question: "",
    answer: "",
  })
  const [errors, setErrors] = useState("") //errors state
  const handleChange = (event) => { 
    setNewFaq({
      ...newFaq,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newFaq.question !== "" && newFaq !== "") { //front end error check
      setErrors("")//set errors 
      props.postFaq(newFaq) //pass newFaq over to FAQList post request 
      setNewFaq({ question: "", answer: "" }) //set form back to empty on submit
    } else {
      setErrors("All fields are required")
    }
  }

  let errorMessage
  if (errors) {
    errorMessage = <h2>{errors}</h2>
  }

  return (
    <div>
      <Link to="/launchers">View Launcher List</Link>
      <form onSubmit={handleSubmit}>
        {errorMessage}           
        <label htmlFor="question">Question:</label>
        <input
          id="question"
          type="text"
          name="question"
          value={newFaq.question}
          onChange={handleChange}
        />
        <label htmlFor="answer">Answer:</label>
        <input
          id="answer"
          type="text"
          name="answer"
          value={newFaq.answer}
          onChange={handleChange}
        />
        <input type="submit"></input>
      </form>
    </div>
  )
}

export default FaqForm
