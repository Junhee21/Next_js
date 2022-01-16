import styles from '../../styles/Home.module.css'
import SideBar from '../../src/components/form/SideBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios';

export default function ResultPage() {
    const router = useRouter();
    const [allForm, setAllForm] = useState([]);
    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_FORM_ALL)
            .then(function (response) {
                setAllForm(response.data.Forms)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    return (
        <div className={styles.formBackGround}>
            <SideBar />
            <div className={styles.flexColumn}>
                {allForm.map((form, index) => {
                    return <button className={styles.item}
                        style={{height: '80px',
                                width: '60%'}}
                        key={index}
                        onClick={e => {router.push({
                            pathname: '/form/result-form',
                            query: {formId: form.id}
                        })}}>
                        {form.title}
                    </button>
                })}
            </div>
        </div>
    )
}