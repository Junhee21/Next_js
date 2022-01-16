import styles from '../../styles/Home.module.css'
import SideBar from '../../src/components/form/SideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function homePage() {
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