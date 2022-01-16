import classNames from 'classnames'
import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function SideBar () {
    const router = useRouter();
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            width: '200px',
            height: '100%',
            left: '0px',
            backgroundColor: 'white',
            zIndex: '1',
        }}>
            <button
                className={classNames(styles.cPointer, styles.m10)}
                onClick={e => {router.push('/form/home')}}
            >
                HOME
            </button>
            <button
                className={classNames(styles.cPointer, styles.m10)}
                onClick={e => {router.push('/form/create')}}
            >
                CREATE
            </button>
            <button
                className={classNames(styles.cPointer, styles.m10)}
                onClick={e => {router.push('/form/list')}}
            >
                LIST
            </button>
            <button
                className={classNames(styles.cPointer, styles.m10)}
                onClick={e => {router.push('/form/result')}}
            >
                RESULT
            </button>
        </div>
    )
}