import SideBar from '../../src/components/form/SideBar';
import Create from '../../src/components/form/create';
import styles from '../../styles/Home.module.css'

export default function CreatePage() {
  return (
    <div className={styles.formBackGround}>
      <SideBar />
      <Create />
    </div>
  )
}