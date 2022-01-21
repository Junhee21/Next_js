import axios from "axios";
import { useState } from "react"
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'

export default function SignUpPage() {
    const router = useRouter();
    const [id, setId] = useState();
    const [pw, setPw] = useState();
    const inputId = (id) => {
        setId(id);
    }
    const inputPw = (pw) => {
        setPw(pw);
    }
    const signUp = () => {
        if (id && pw) {
            axios.post(process.env.NEXT_PUBLIC_API_FORM_SIGNUP, { userId: id, password: pw })
                .then(function (response) {
                    console.log(response)
                    if (response.data.message === "Aleady used id") {
                        alert("이미 사용중인 아이디 입니다.");
                    } else {
                        router.push({
                            pathname: '/form/home',
                            query: { accessToken: response.data.accessToken }
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    return (
        <div className={styles.signFlex}>
            <div className={styles.signBox}>
                <div style={{ fontSize: '50px', margin: '50px' }}>회원가입</div>
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
                        onClick={() => router.push('signin')}
                    >로그인</button>
                    <button
                        className={styles.signButton}
                        onClick={() => signUp()}
                    >회원가입</button>
                </div>
            </div>
        </div>
    )
}