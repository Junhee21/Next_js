import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function SideBar ({accessToken}) {
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
                className={styles.sideBarButton}
                onClick={e => {router.push({
                    pathname: '/form/home',
                    query: {accessToken: accessToken}
            })}}>
                HOME
            </button>
            <button
                className={styles.sideBarButton}
                onClick={e => {router.push({
                    pathname: '/form/create',
                    query: {accessToken: accessToken}
            })}}>
                CREATE
            </button>
            <button
                className={styles.sideBarButton}
                onClick={e => {router.push({
                    pathname: '/form/mylist',
                    query: {accessToken: accessToken}
            })}}>
                MY LIST
            </button>
            <button
                className={styles.sideBarButton}
                onClick={e => {router.push({
                    pathname: '/form/list',
                    query: {accessToken: accessToken}
            })}}>
                ALL LIST
            </button>
            <button
                className={styles.sideBarButton}
                onClick={e => {router.push({
                    pathname: '/form/list',
                    query: {accessToken: accessToken}
            })}}>
                DELETE
            </button>
        </div>
    )
}