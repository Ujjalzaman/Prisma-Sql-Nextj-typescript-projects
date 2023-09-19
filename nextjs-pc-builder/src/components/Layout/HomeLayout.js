import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Image from 'next/image';
import Logo from '../../assets/logo.jpg';

const { Header, Content, Footer } = Layout;

const HomeLayout = ({ children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const MenuItems = [
        { name: 'Home', link: '/home' },
        { name: 'About', link: '/about' },
        { name: 'Contact', link: '/contact' }
    ];
    return (
        <Layout className="layout">
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" >
                    <Image height={50} width={50} src={Logo} className='rounded-full' />
                </div>
                <Menu mode="horizontal" theme='dark'>
                    {MenuItems.map(item => (
                        <Menu.Item key={item.name}>
                            <a href={item.link}>{item.name}</a>
                        </Menu.Item>
                    ))}
                </Menu>
                {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
        //   items={item.map((_, index) => {
        //     const key = index + 1;
        //     return {
        //       key,
        //       label: `nav ${key}`,
        //     };
        //   })}
        /> */}
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Developed By UjjalZaman ©2023
            </Footer>
        </Layout>
    );
};
export default HomeLayout;