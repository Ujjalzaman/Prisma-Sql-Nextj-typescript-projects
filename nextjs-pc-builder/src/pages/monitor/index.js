import ProductLayout from "@/components/Layout/ProductLayout";
import { Button, Card, Col, Row } from "antd";
import Image from "next/image";
import { ShoppingCartOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/features/product/productSlice";

const MonitorPage = ({ products }) => {
  const [hasBuild, setHasBuild] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (router.query = 'getProduct') {
      setHasBuild(true)
    }
  }, [])

  const handleBackToPcBuild = (product) =>{
    dispatch(addProduct(product))
    router.push('/tool/pc-builder')
  }
  return (
    <Row gutter={8}>
      {products?.data?.map((data) => (
        <Col md={8} className="mb-2">
          <Card hoverable cover={
            <>
              <Image height={300} width={200} alt="monitor" src={data.image} className="max-h-48" />
            </>
          }>
            <h1 className="my-2 p-1 font-bold text-base leading-5">
              {data.title}
            </h1>
            <ul className="px-5">
              <li>Base Clock Speed 3.2GHz</li>
              <li>Package AM4</li>
              <li>PCI Express PCIe 3.0</li>
              <li>Rating {data.rating}</li>
              <li>Status {data.status}</li>
            </ul>
            <hr className="my-2" />
            <div>
              <h4 className="text-yellow-500 text-2xl text-center">{data.price} $</h4>
            </div>
            {
              hasBuild ? <Button className='bg-blue-700 flex items-center justify-center mt-5' style={{ width: "100%" }} type="primary" icon={<AppstoreAddOutlined />} onClick={() => handleBackToPcBuild(data)}>Add</Button> :

                <Button className='bg-blue-700 flex items-center justify-center mt-5' style={{ width: "100%" }} type="primary" icon={<ShoppingCartOutlined />}>Add to Cart</Button>
            }
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default MonitorPage;

MonitorPage.getLayout = function getLayout(page) {
  return (
    <ProductLayout>
      {page}
    </ProductLayout>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(process.env.BASE_URL + '/products/cat?category=monitor');
  const data = await res.json();
  return {
    props: {
      products: data
    }
  }
}