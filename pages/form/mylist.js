import styles from '../../styles/Home.module.css'
import SideBar from '../../src/components/form/SideBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';

export default function MyListPage() {
    const router = useRouter();
    const [forms, setForms] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/form/getmylist", {
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
            </div>
        </div>
    )
}