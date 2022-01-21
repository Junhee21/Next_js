import SideBar from '../../src/components/form/SideBar';
import styles from '../../styles/Home.module.css'
import Textarea from '../../src/components/form/textarea';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import classnames from 'classnames';

export default function SubmitPage() {
    const router = useRouter();
    const [form, setForm] = useState({});
    const [results, setResults] = useState([]);

    useEffect(() => {
        const jsonForm = JSON.parse(router.query.form);
        setForm(jsonForm)
    }, [router.query.form]);

    useEffect(() => {
        if (typeof form.FormQuestions != "undefined") {
            const cp = [];
            for (var i = 0; i<form.FormQuestions.length; i++) {
                cp[i] = {
                    questionId: "0",
                    resultId: uuidv4(),
                    result: ""
                }
            }
            setResults(cp);
        }
    }, [form]);

    const submit = () => {
        axios.post("http://localhost:8000/form/submit", results)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
            router.push({
                pathname: '/form/home',
                query: {accessToken: router.query.accessToken}
            })
    }

    const updateResult = (questionId, index, content) => {
        const cp = [...results];
        cp[index].result = content;
        cp[index].questionId = questionId;
        setResults(cp);
    }

    return (
        <div>
            <SideBar accessToken={router.query.accessToken}/>
            <div className={styles.flexColumn}>
                <div className={classnames(styles.item, styles.borderTopBlue)}>
                    <Textarea
                        value={form.title}
                        fontSize={40}
                        disabled={true}
                    />
                    <Textarea
                        value={form.info}
                        fontSize={20}
                        disabled={true}
                    />
                </div>
                {form.FormQuestions && form.FormQuestions.map((question, index) => {
                    return <Question
                        key={index}
                        order={index}
                        question={question}
                        updateResult={updateResult}
                    />
                })}
                <button
                    className={classnames(styles.h50, styles.w150, styles.cPointer, styles.borderR5, styles.m10)}
                    onClick={() => submit()}>Submit</button>
            </div>
        </div>
    )
}

const Question = ({order, question, updateResult }) => {
    return (
        <div className={styles.item}>
            <div style={{ display: 'flex', height: 'auto', }}>
                <div style={{ flex: '7', }}>
                    <Textarea
                        value={question.title}
                        fontSize={30}
                        disabled={true}
                    />
                </div>
                <div
                    style={{
                        flex: '1',
                        margin: '10px',
                        fontSize: '15px',
                        borderRadius: '5px',
                        textAlign: 'center',
                        cursor: 'pointer',
                    }}
                >
                    {question.questionType}
                </div>
            </div>
            <div>
                {(question.questionType == 'radio') &&
                    question.FormQuestionOptions.map((option, index) => {
                        return <div key={index} style={{ display: 'flex', width: '70%', marginLeft: '40px', alignItems: 'center' }}>
                            <input
                                type="radio"
                                name={question.id}
                                value={option.id}
                                onChange={e => updateResult(question.id, order, index+1)}
                            />
                            <Textarea
                                value={option.option}
                                fontSize={20}
                                disabled={true}
                            />
                        </div>
                    })}
                {(question.questionType == 'text') &&
                    <Textarea
                        fontSize={20}
                        row={5}
                        event={e => updateResult(question.id, order, e.target.value)}
                    />
                }
            </div>
        </div>
    )
}