import styles from '../../styles/Home.module.css'
import SideBar from '../../src/components/form/SideBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function HomePage() {
    const router = useRouter();
    const [userId, setUserId] = useState();
    useEffect(() => {
        axios.get("http://localhost:8000/form/getuserid", {
            params: { accessToken: router.query.accessToken }
        })
            .then(res => {
                setUserId(res.data.user.userId)
            })
            .catch(err => {
                console.log(err);
            })
    }, [router.query.accessToken])

    return (
        <div>
            <SideBar accessToken={router.query.accessToken} />
            <div className={styles.flexColumn}>
                <div style={{
                    fontSize: '80px',
                    margin: '150px',
                }}>Hello {userId}!</div>
            </div>
        </div>
    )
}