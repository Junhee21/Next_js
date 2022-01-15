import styles from '../../styles/Home.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function createPage() {
    const [allForm, setAllForm] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:800/form/all")
            .then(function (response) {
                setAllForm(response.data.forms)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    return (
        <div className={styles.main}
            style={{
                minHeight: '100vh',
                height: '100%',
                backgroundColor: '#C3E2DD',
            }}>
            <h1>Junhee's Form</h1>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <a
                        href="http://localhost:3000/form/create"
                    >
                        <h2>Create Form</h2>
                    </a>
                </div>
                {allForm.map((form, index) => {
                    return <div key={index} className={styles.card}>
                        {form.title}
                    </div>
                })}
            </div>
        </div>
    )
}