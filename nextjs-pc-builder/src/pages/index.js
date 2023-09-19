import HomePageLayOut from '@/components/Layout/HomePageLayOut';
import Categories from '@/components/UI/Categories';
import ProductCard from '@/components/UI/ProductCard';
import { shuffleArray } from '@/utils/shuffleArray';
import { Row } from 'antd';
import { useSession } from "next-auth/react";


const HomePage = ({ products }) => {
    const {data:session} = useSession();
    // console.log(session)
    return (
        <div className='my-10'>
            <h3 className='bg-gray-600 text-yellow-400 p-2 text-center'>Products</h3>
            <div className='flex justify-center items-center mx-10'>
                <Row justify="center" className='flex justify-center items-center my-10' gutter={10}>
                    {
                        products?.map((data, id) => <ProductCard data={data} key={id + 10} />)
                    }
                </Row>
            </div>
            <h3 className='bg-gray-600 text-yellow-400 p-2 text-center'>Categories</h3>
            <div className='flex justify-center items-center mx-10'>
                <Categories />
            </div>
        </div>
    )
}

export default HomePage;

HomePage.getLayout = function getLayout(page) {
    const {data:session} = useSession();

    console.log("sessins layout", session)
    return (
        <HomePageLayOut session={session}>
            {page}
        </HomePageLayOut>
    )
}
export const getServerSideProps = async () => {
    const res = await fetch(process.env.BASE_URL + '/products');
    const data = await res.json();
    const shuffleProducts = shuffleArray(data.data);
    const randomProducts = shuffleProducts.slice(0, 6);
    return {
        props: {
            products: randomProducts
        }
    }
}