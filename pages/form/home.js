import TopBar from '../../src/components/form/topBar';
import styles from '../../styles/Home.module.css'

export default function createPage() {
    return (
        <div style={{
            minHeight: '100vw',
            height: '100%',
            backgroundColor: '#C3E2DD',
        }}>
            <TopBar />
            <div className={styles.card}
                style={{marginTop:'80px',}}
            >
                <a
                    href="http://localhost:3000/form/create"
                >
                    <h2>Create Form &rarr;</h2>
                </a>
            </div>
            )
        </div>
    )
}