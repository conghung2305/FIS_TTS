import React from "react";
import { Layout, Menu, Avatar, Space } from "antd";
import { BellOutlined, SettingOutlined, UserOutlined, MenuOutlined, FolderOutlined } from '@ant-design/icons';
import "./Header.scss";
const { Header } = Layout;
const HeaderComponent: React.FC = () => {
    return (
        <Header className="header">
            <div className="container">
                <div className="nav">
                    <Space>
                        <FolderOutlined className="icon" />
                        <a href="#" className='logo'>eProcurement</a>
                        <Menu mode="horizontal" defaultSelectedKeys={['home']} className="menu">
                            <Menu.Item key="home">
                                <a href="#">Trang chủ</a>
                            </Menu.Item>
                            <Menu.Item key="plan">
                                <a href="#">Kế hoạch</a>
                            </Menu.Item>
                            <Menu.Item key="purchase-request">
                                <a href="#">Đề nghị mua</a>
                            </Menu.Item>
                            <Menu.Item key="purchase-option">
                                <a href="#">Phương án mua</a>
                            </Menu.Item>
                            <Menu.Item key="orders">
                                <a href="#">Đơn hàng</a>
                            </Menu.Item>
                            <Menu.Item key="payment">
                                <a href="#">Thanh toán</a>
                            </Menu.Item>
                            <Menu.Item key="forms">
                                <a href="#">Biểu mẫu</a>
                            </Menu.Item>
                            <Menu.Item key="reports">
                                <a href="#">Báo cáo</a>
                            </Menu.Item>
                        </Menu>
                    </Space>
                </div>
                <div className='navright'>
                    <Space size="middle">
                        <Avatar icon={<BellOutlined />} className='iconNav' />
                        <Avatar icon={<SettingOutlined />} className='iconNav' />
                        <Avatar icon={<UserOutlined />} className='iconNav' />
                        <Avatar icon={<MenuOutlined />} className='iconNav' />
                    </Space>
                </div>
            </div>
        </Header>
    );
};

export default HeaderComponent;
