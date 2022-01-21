import SideBar from '../../src/components/form/SideBar';
import Create from '../../src/components/form/create';
import { useRouter } from 'next/router';

export default function CreatePage() {
  const router = useRouter();
  return (
    <div>
      <SideBar accessToken={router.query.accessToken}/>
      <Create accessToken={router.query.accessToken}/>
    </div>
  )
}