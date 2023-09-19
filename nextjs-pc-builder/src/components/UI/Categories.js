import { Card } from 'antd';
import { Col, Row } from 'antd';
import Image from 'next/image';
import CPUImage from "@/assets/categories/processor.webp";
import MonitorImage from '@/assets/categories/monitor.webp';
import MotherBoardImage from '@/assets/categories/motherboard.webp';
import PowerSupplyImage from '@/assets/categories/power-supply.png';
import RamImage from '@/assets/categories/ram.jpg';
import SSDImage from '@/assets/categories/ssd.jpg';


const Categories = () => (
    <Row justify="center" className='flex justify-center items-center my-10' gutter={10}>
        <Col md={8} className='max-h-50 my-2'>
            <Card hoverable>
                <Image height={400} width={400} className='p-0' alt="example" src={MotherBoardImage} />
            </Card>
        </Col>
        <Col md={8} className='max-h-50 my-2'>
            <Card hoverable>
                <Image height={400} width={400} className='p-0' alt="example" src={CPUImage} />
            </Card>
        </Col>
        <Col md={8} className='max-h-50 my-2'>
            <Card hoverable>
                <Image height={400} width={400} className='p-0' alt="example" src={MonitorImage} />
            </Card>
        </Col>
        <Col md={8} className='max-h-50 my-2'>
            <Card hoverable>
                <Image height={400} width={400} className='p-0' alt="example" src={SSDImage} />
            </Card>
        </Col>
        <Col md={8} className='max-h-50 my-2'>
            <Card hoverable>
                <Image height={400} width={400} className='p-0' alt="example" src={RamImage} />
            </Card>
        </Col>
        <Col md={8} className='max-h-50 my-2'>
            <Card hoverable>
                <Image height={400} width={400} className='p-0' alt="example" src={PowerSupplyImage} />
            </Card>
        </Col>
    </Row>

);

export default Categories;