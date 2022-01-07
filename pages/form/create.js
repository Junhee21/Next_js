import TopBar from '../../src/components/form/topBar';
import Create from '../../src/components/form/create';

export default function createPage() {
  return (
    <div style={{
      minHeight: '100vw',
      height: '100%',
      backgroundColor: '#C3E2DD',
      position: 'relative',
    }}>
      <TopBar />
      <Create />
    </div>
  )
}