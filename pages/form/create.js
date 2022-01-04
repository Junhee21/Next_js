import styles from '../../styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';

export default function Create() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const cp = [...questions]
    cp.push({
      uuid: uuidv4(),
      title: "main title",
      description: "main description",
      questionType: "checkbox",
      options: [
        {
          uuid: uuidv4(),
          title: "sub title",
          description: "sub Description"
        }
      ]
    })
    setQuestions(cp);
  }

  const deleteQuestion = (uuid) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if (foundIndex === -1) {
      return false
    }
    const cp = [...questions]
    cp.splice(foundIndex, 1)
    setQuestions(cp)
  }

  const submit = () => {
    alert(questions.length);
    router.reload(window.location.pathname)
  }

  const updateMain = (key, text, uuid) => {
    const foundIndex = questions.findIndex(item => item.uuid === uuid)
    if (foundIndex === -1) {
      return false
    }
    const cp = [...questions]
    cp[foundIndex][key] = text
    setQuestions(cp)
  }

  const addOption = (uuid) => {
    const foundIndex = questions.findIndex(item => item.uuid === uuid)
    if (foundIndex === -1) {
      return false
    }
    const cp = [...questions]
    const question = cp[foundIndex]
    question.options.push({
      uuid: uuidv4(),
      title: "sub title",
      description: "sub description"
    })
    setQuestions(cp)
  }

  const updateOption = (text, uuid, optionUuid, key) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if (foundIndex === -1) {
      return false
    }
    const cp = [...questions]
    const question = cp[foundIndex]
    const options = question.options
    const foundOptionIndex = options.findIndex(item => item.uuid === optionUuid)
    if (foundOptionIndex === -1) {
      return false
    }
    options[foundOptionIndex][key] = text
    setQuestions(cp)
  }

  const deleteOption = (uuid, optionUuid) => {
    const foundIndex = questions.findIndex(question => question.uuid === uuid)
    if (foundIndex === -1) {
      return false
    }
    const cp = [...questions]
    const question = cp[foundIndex]
    const options = question.options
    const foundOptionIndex = options.findIndex(selectOption => selectOption.uuid === optionUuid)
    if (foundOptionIndex === -1) {
      return false
    }
    options.splice(foundOptionIndex, 1)
    setQuestions(cp)
  }

  return (
    <div className={styles.flexColumn}>
      <h1>Create Form</h1>
      <br />
      <br />
      <div className={styles.flexRow}>
        <button onClick={e => addQuestion()}>add</button>
        <button onClick={e => submit()}>submit</button>
      </div>
      <br />
      {questions.map((question, index) => {
        return <Question
          key={index}
          question={question}
          deleteQuestion={deleteQuestion}
          updateMain={updateMain}
          addOption={addOption}
          updateOption={updateOption}
          deleteOption={deleteOption}
        />
      })}
    </div>
  )
}

// without typestcript.. it will be so painful
// Question component

const Question = ({ question, deleteQuestion, updateMain,
  addOption, deleteOption, updateOption }) => {
  return (
    <div className={styles.border}>
      <input onChange={e => updateMain("title", e.target.value, question.uuid)}
        value={question.title}
        placeholder="question title"
      />
      <br />

      <input onChange={e => updateMain("description", e.target.value, question.uuid)}
        value={question.description}
        placeholder="question description"
      />
      <br />

      <select onChange={e => updateMain("questionType", e.target.value, question.uuid)}
        value={question.questionType}
      >
        <option value="checkbox">checkbox</option>
        <option value="radio">radio</option>
        <option value="text">text</option>
        <option value="longText">long Text</option>
      </select>
      <div className={styles.flexRow}>
        <button onClick={e => addOption(question.uuid)}>Add option</button>
        <button onClick={e => deleteQuestion(question.uuid)}>Delete all</button>
      </div>

      <div>here, <br />if the question itself is</div>

      {((question.questionType === "checkbox") || (question.questionType === "radio")) &&
        <div>
          {question.options.map((option, index) => {
            return <div key={index}>
              <input onChange={e => updateOption(e.target.value, question.uuid, option.uuid, "title")}
                value={option.title} />
              <br />
              <input onChange={e => updateOption(e.target.value, question.uuid, option.uuid, "description")}
                value={option.description} />
              <br />
              <button onClick={e => deleteOption(question.uuid, option.uuid)}>Delete Option</button>
              <br />
            </div>
          })}
        </div>
      }
    </div>
  )
}