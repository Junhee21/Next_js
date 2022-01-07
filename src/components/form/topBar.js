import classNames from 'classnames'
import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function TopBar () {
    const router = useRouter();
    return (
        <div style={{
            display: 'flex',
            position: 'fixed',
            width: '100%',
            height: '80px',
            top: '0px',
            backgroundColor: 'white',
            zIndex: '1',
            borderBottom: '2px solid gray',
        }}>
            <button
                className={classNames(styles.cPointer, styles.m10)}
                style={{marginLeft:'50px',}}
                onClick={e => {router.push('/form/home')}}
            >
                HOME
            </button>
        </div>
    )
}