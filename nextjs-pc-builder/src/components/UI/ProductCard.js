import { Button, Card } from 'antd';
import { Col } from 'antd';
import {
  ShoppingCartOutlined
} from '@ant-design/icons';
import Image from 'next/image';
const style = {
  width: "300px",
  marginTop: "10px",
  padding: "10px",
  display: "flex",
  justifyContent: "center"
};

const productCard = ({ data }) => {
  return (
    <Col md={8} className="mb-2">
      <Card hoverable cover={
        <>
          <Image height={300} width={200} alt="processor" src={data.image} className='max-h-48' />
        </>
      }>
        <h1 className="my-2 p-1 font-bold text-base leading-5 text-ellipsis truncate ">
          {data.title}
        </h1>
        <ul className="px-5">
          <li>Base Clock Speed 3.2GHz</li>
          <li>Package AM4</li>
          <li>PCI Express PCIe 3.0</li>
          <li>Rating {data.rating}</li>
        </ul>
        <hr className="my-2" />
        <div>
          <h4 className="text-yellow-500 text-2xl text-center">{data.price} $</h4>
        </div>
        <Button className='bg-blue-700 flex items-center justify-center mt-5' style={{ width: "100%" }} type="primary" icon={<ShoppingCartOutlined />}>Add to Cart</Button>
      </Card>
    </Col>
  )
}
export default productCard;