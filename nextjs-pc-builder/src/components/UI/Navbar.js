import Logo from '../../assets/logo.jpg';
import Image from 'next/image';
import Link from 'next/link';
const { SubMenu } = Menu;
import { useState } from 'react'
const { Header } = Layout;
import { Layout, Menu, Button, Drawer, Row, Col } from "antd";
// import { useSession, signOut } from "next-auth/react";


import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    MenuOutlined,
} from "@ant-design/icons";

const Navbar = ({session}) => {
    console.log("call from navbar", session)
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const customStyle = {
        color: 'orange'
    };

    return (
        <>
            <Layout className="layout">
                <Header style={{ padding: 0 }}>
                    <Row justify="space-between" align="middle">
                        <Col xs={20} sm={20} md={10}>
                            <div
                                className="logo"
                                style={{ color: "white", paddingLeft: "20px" }}
                            >
                                <Link href="/">
                                    <div className='flex'>
                                        <Image height={40} width={40} src={Logo} className='rounded mr-5' alt="image"/>
                                        <h1 className='text-2xl font-bold text-white'>BD PC BUILDER</h1>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                        <Col xs={0} sm={0} md={10}>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                                <Menu.Item key="1" icon={<HomeOutlined />}>
                                    <Link href={'/'}>
                                        Home
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<UserOutlined />}>
                                    <Link href={'/about'}>
                                        About
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link href={'/contact'}>
                                        Contact Us
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                    <Button type="primary" className='bg-red-700 text-white' href="/tool/pc-builder">
                                        PC BUILDER
                                    </Button>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    {/* { */}
                                        {/* // session?.user ?  */}
                                        {/* <Button onClick={() => signOut()} className='bg-blue-700 border-0 oultine-0 text-white'>Sign Out</Button> : */}
                                            <Link href={'/login'}>
                                                <Button className='bg-blue-700 border-0 oultine-0 text-white'>Login</Button>
                                            </Link>

                                    {/* // } */}

                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col xs={2} sm={2} md={0}>
                            <Button type="primary" onClick={showDrawer}>
                                <MenuOutlined />
                            </Button>
                        </Col>
                    </Row>
                    <Drawer
                        title="Menu"
                        placement="right"
                        onClick={onClose}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Menu mode="vertical" defaultSelectedKeys={["1"]}>
                            <Menu.Item key="5" icon={<HomeOutlined />}>
                                Home
                            </Menu.Item>
                            <Menu.Item key="6" icon={<UserOutlined />}>
                                Profile
                            </Menu.Item>
                            <Menu.Item key="7" icon={<SettingOutlined />}>
                                Settings
                            </Menu.Item>
                            <Menu.Item key="8">
                                {/* <Button type="primary" style={{ marginRight: "10px" }}>Sign in</Button> */}
                                {/* <Button>Sign up</Button> */}
                            </Menu.Item>
                        </Menu>
                    </Drawer>
                </Header>
            </Layout>
            <Menu mode="horizontal" className='bg-sky-900 text-white'>
                <SubMenu title="CPU / Processor">
                    <Menu.ItemGroup style={customStyle}>
                        <Link href="processor/amd">
                            <Menu.Item key="Amd">AMD</Menu.Item>
                        </Link>
                        <Link href="processor/amd">
                            <Menu.Item key="Amd">Intel</Menu.Item>
                        </Link>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu title="RAM">
                    <Menu.ItemGroup style={customStyle}>
                        <Link href="/ram">
                            <Menu.Item key="Amd">RAM</Menu.Item>
                        </Link>
                    </Menu.ItemGroup>
                </SubMenu>

                <SubMenu title="MOTHERBOARD">
                    <Menu.ItemGroup style={customStyle}>
                        <Link href="/motherboard">
                            <Menu.Item key="Amd">MOTHERBOARD</Menu.Item>
                        </Link>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu title="Power Supply">
                    <Menu.ItemGroup style={customStyle}>
                        <Link href="/power-supply">
                            <Menu.Item key="Amd">Power Supply</Menu.Item>
                        </Link>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu title="MONITOR">
                    <Menu.ItemGroup style={customStyle}>
                        <Link href="/monitor">
                            <Menu.Item key="Amd">MONITOR</Menu.Item>
                        </Link>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu title="OTHERS">
                    <Menu.ItemGroup style={customStyle}>
                        <Link href="/others">
                            <Menu.Item key="Amd">OTHERS</Menu.Item>
                        </Link>
                    </Menu.ItemGroup>
                </SubMenu>
            </Menu>
        </>
    )
}

export default Navbar