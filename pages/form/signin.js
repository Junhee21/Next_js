import axios from "axios";
import { useState } from "react"
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'

export default function SignInPage() {
    const router = useRouter();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const inputId = (id) => {
        setId(id);
    }
    const inputPw = (pw) => {
        setPw(pw);
    }
    const signIn = () => {
        axios.get("http://localhost:8000/form/signin", {
            params: {userId: id, password: pw}
        })
        .then(function (response) {
            if (!response.data.accessToken) {
                alert("아이디 또는 비밀번호가 잘못 입력 되었습니다.");
            } else {
                router.push({
                    pathname: '/form/home',
                    query: {accessToken: response.data.accessToken}
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    return (
        <div className={styles.signFlex}>
            <div className={styles.signBox}>
                <div style={{ fontSize: '50px', margin: '50px' }}>로그인</div>
                <div className={styles.signTextFlex}>
                    아이디
                    <textarea
                        className={styles.signTextArea}
                        value={id}
                        onChange={(e) => inputId(e.target.value)} />
                </div>
                <div className={styles.signTextFlex}>
                    비밀번호
                    <textarea
                        className={styles.signTextArea}
                        value={pw}
                        onChange={(e) => inputPw(e.target.value)} />
                </div>
                <div
                    className={styles.signButtonBox}
                >
                    <button
                        className={styles.signButton}
                        onClick={() => signIn()}
                    >로그인</button>
                    <button
                        className={styles.signButton}
                        onClick={() => router.push('signup')}
                    >회원가입</button>
                </div>
            </div>
        </div>
    )
}