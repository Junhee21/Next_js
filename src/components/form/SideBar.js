import styles from '../../../styles/Home.module.css'
import { useRouter } from 'next/router'
import axios from 'axios';

export default function SideBar ({accessToken}) {
    const router = useRouter();
    const confirmDelete = () => {
        if (window.confirm("계정 정보를 삭제하면 생성한 설문지와 결과가 모두 삭제됩니다. 정말 삭제하시겠습니까?")) {
            axios.delete(process.env.NEXT_PUBLIC_API_FORM_DELETEUSER, {
                data: {accessToken: accessToken}
            })
            .then(res => {
                router.push('signin')
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
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
                onClick={e => confirmDelete()}
            >
                DELETE
            </button>
            <button
                className={styles.sideBarButton}
                onClick={e => router.push('signin')}
            >
                LOG OUT
            </button>
        </div>
    )
}