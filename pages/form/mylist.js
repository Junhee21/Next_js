import styles from '../../styles/Home.module.css'
import SideBar from '../../src/components/form/SideBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';
import { empty } from 'uuidv4';

export default function MyListPage() {
    const router = useRouter();
    const [forms, setForms] = useState([]);
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_FORM_GETMYLIST, {
            params: { accessToken: router.query.accessToken }
        })
        .then(function (response) {
            setForms(response.data.forms)
        })
        .catch(function (error) {
            console.log(error)
        })
    }, [router.query.accessToken])

    return (
        <div>
            <SideBar accessToken={router.query.accessToken}/>
            <div className={styles.flexColumn}>
                {forms.map((form, index) => {
                    return <button className={styles.item}
                        style={{height: '80px',
                                width: '60%'}}
                        key={index}
                        onClick={e => {router.push({
                            pathname: '/form/result',
                            query: {
                                formId: form.id,
                                accessToken: router.query.accessToken
                            }
                        })}}>
                        {form.title}
                    </button>
                })}
                {(forms.length === 0) && 
                    <>
                        <div style={{
                            fontSize: "10vh",
                            margin: "10vh"
                        }}>EMPTY!</div>
                        <button style={{
                            fontSize: "10vh",
                            border: "3px solid #0070f3",
                            borderRadius: "15px",
                            padding: "2vh",
                            backgroundColor: "#C3E2DD"}}
                            onClick={() => router.push({
                                pathname: 'create',
                                query: {accessToken: router.query.accessToken}
                            })}
                        
                        >
                            Go to Create
                        </button>
                    </>
                }
            </div>
        </div>
    )
}