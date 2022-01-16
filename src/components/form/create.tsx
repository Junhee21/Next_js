import { useState } from 'react';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import classnames from 'classnames';
import axios from 'axios';
import styles from '../../../styles/Home.module.css'
import Textarea from './textarea';
import { Form } from '../../interface/form';

export default function Create() {
    const router = useRouter();
    const [form, setForm] = useState<Form>({
        uuid: uuidv4(),
        title: "제목을 입력하시오",
        info: "설문지 설명",
        questions: []
    })

    const addQuestion = () => {
        const cp = { ...form };
        cp.questions.push({
            uuid: uuidv4(),
            title: "질문",
            questionType: "radio",
            options: [
                {
                    uuid: uuidv4(),
                    option: "옵션"
                },
                {
                    uuid: uuidv4(),
                    option: "옵션"
                }
            ]
        })
        setForm(cp);
    }

    const create = () => {
        axios.post(process.env.NEXT_PUBLIC_API_FORM_CREATE, form)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        router.push('/form/home')
    }

    const updateHead = (key, text) => {
        const cp = { ...form }
        cp[key] = text
        setForm(cp)
    }

    const deleteQuestion = (uuid) => {
        const foundIndex = form.questions.findIndex(question => question.uuid === uuid)
        if (foundIndex === -1) {
            return false
        }
        const cp = { ...form }
        cp.questions.splice(foundIndex, 1)
        setForm(cp)
    }

    const updateQuestion = (uuid, key, text) => {
        const foundIndex = form.questions.findIndex(item => item.uuid === uuid)
        if (foundIndex === -1) {
            return false
        }
        const cp = { ...form }
        cp.questions[foundIndex][key] = text
        if (key === 'questionType') {
            cp.questions[foundIndex].options =
                [
                    {
                        uuid: uuidv4(),
                        option: "옵션"
                    },
                    {
                        uuid: uuidv4(),
                        option: "옵션"
                    }
                ]
        }
        setForm(cp)
    }

    const addOption = (uuid) => {
        const foundIndex = form.questions.findIndex(item => item.uuid === uuid)
        if (foundIndex === -1) {
            return false
        }
        const cp = { ...form }
        const question = cp.questions[foundIndex]
        question.options.push({
            uuid: uuidv4(),
            option: "옵션"
        })
        setForm(cp)
    }

    const updateOption = (uuid, optionUuid, text) => {
        const foundIndex = form.questions.findIndex(item => item.uuid === uuid)
        if (foundIndex === -1) {
            return false
        }
        const cp = { ...form }
        const question = cp.questions[foundIndex]
        const options = question.options
        const foundOptionIndex = options.findIndex(item => item.uuid === optionUuid)
        if (foundOptionIndex === -1) {
            return false
        }
        options[foundOptionIndex].option = text
        setForm(cp)
    }

    const deleteOption = (uuid, optionUuid) => {
        const foundIndex = form.questions.findIndex(item => item.uuid === uuid)
        if (foundIndex === -1) {
            return false
        }
        const cp = { ...form }
        const question = cp.questions[foundIndex]
        const options = question.options
        const foundOptionIndex = options.findIndex(item => item.uuid === optionUuid)
        if (foundOptionIndex === -1) {
            return false
        }
        options.splice(foundOptionIndex, 1)
        setForm(cp)
    }

    return (
        <div className={styles.flexColumn}>
            <div className={classnames(styles.item, styles.borderTopBlue)}>
                <Textarea
                    value={form.title}
                    event={e => updateHead("title", e.target.value)}
                    fontSize={40}
                />
                <Textarea
                    value={form.info}
                    event={e => updateHead("info", e.target.value)}
                    fontSize={20}
                />
            </div>
            {form.questions.map((question, index) => {
                return <Question
                    key={index}
                    question={question}
                    deleteQuestion={deleteQuestion}
                    updateQuestion={updateQuestion}
                    addOption={addOption}
                    deleteOption={deleteOption}
                    updateOption={updateOption}
                />
            })}
            <div style={{ display: 'flex', }}>
                <button
                    className={classnames(styles.h50, styles.w150, styles.cPointer, styles.borderR5, styles.m10)}
                    onClick={e => addQuestion()}>Add Question</button>
                <button
                    className={classnames(styles.h50, styles.w150, styles.cPointer, styles.borderR5, styles.m10)}
                    onClick={e => create()}>Create</button>
            </div>
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

// without typestcript.. it will be so painful

// Question component
const Question = ({ question, deleteQuestion, updateQuestion,
    addOption, deleteOption, updateOption }) => {
    return (
        <div className={styles.item} style={{minHeight:'150px'}}>
            <div style={{ display: 'flex', height: 'auto', }}>
                <div style={{ flex: '7', }}>
                    <Textarea
                        value={question.title}
                        event={e => updateQuestion(question.uuid, "title", e.target.value)}
                        fontSize={30}
                    />
                </div>
                <select
                    style={{
                        flex: '1',
                        margin: '10px',
                        fontSize: '15px',
                        borderRadius: '5px',
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                    onChange={e => updateQuestion(question.uuid, "questionType", e.target.value)}
                    value={question.questionType}
                >
                    <option value="radio">radio</option>
                    <option value="text">text</option>
                </select>
            </div>
            <button
                className={classnames(styles.h30, styles.w80, styles.cPointer, styles.borderR5)}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                }}
                onClick={e => deleteQuestion(question.uuid)}
            >
                Delete
            </button>
            {(question.questionType === "radio") &&
                <div>
                    {question.options.map((option, index) => {
                        return <div key={index} style={{ display: 'flex', width: '70%', marginLeft: '40px', marginTop:'10px', alignItems: 'center' }}>
                            <Textarea
                                value={option.option}
                                event={e => updateOption(question.uuid, option.uuid, e.target.value)}
                                fontSize={20}
                            />
                            {(question.options.length > 2) &&
                                <button
                                    onClick={e => deleteOption(question.uuid, option.uuid)}
                                    style={{ background: 'white', borderRadius: '10px', height: '40px', width: '40px' }}
                                >
                                    X
                                </button>
                            }
                        </div>
                    })}
                    <button
                        className={classnames(styles.h30, styles.w80, styles.cPointer, styles.borderR5)}
                        onClick={e => addOption(question.uuid)}
                        style={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            marginLeft: '40px',
                        }}
                    >
                        Add option
                    </button>
                </div>
            }
            {(question.questionType === 'text') &&
                <div style={{ width: '70%', marginLeft: '40px'}}>
                </div>
            }
        </div>
    )
}