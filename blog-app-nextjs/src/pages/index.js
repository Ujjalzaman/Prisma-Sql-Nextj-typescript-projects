import RootLayout from '@/components/RootLayout';
import { Button, Space } from 'antd';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

const HomePage = () => {
  const {data:session} = useSession();
  console.log(session)
  return (
    <div>
      <Head>
        <title>Welcome to blog page</title>
        <meta name="someg" description="somelthoinfdj fd"/>
      </Head>
      <div>
        <h1>
          HomePage
        </h1>
        <Button type="primary">Primary Button</Button>
      </div>
    </div>
  )
}
export default HomePage;


HomePage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      {page}
    </RootLayout>
  )
}