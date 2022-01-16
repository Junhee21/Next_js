import styles from '../../styles/Home.module.css'
import SideBar from '../../src/components/form/SideBar';
export default function HomePage() {
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