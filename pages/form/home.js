import styles from '../../styles/Home.module.css'
import SideBar from '../../src/components/form/SideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';

export default function homePage() {
    const [allForm, setAllForm] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:800/form/all")
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
                <br />
                <br />
                <br />
                <br />
                <h1>Juhee's Form
                </h1>
            </div>
        </div>
    )
}