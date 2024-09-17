import React, { useEffect, useState } from 'react';
import { Input, Table, Checkbox, Button, Select, Space, Form } from 'antd';
import { SearchOutlined, FolderAddOutlined, EyeOutlined, FilterOutlined, PlusOutlined, DeleteOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
const { Option } = Select;
interface Product {
    id: string;
    name: string;
    createdBy: string;
    createAt: Date;
    eventType: string;
    startDate: Date;
    endDate: Date;
    feedbackCount: number;
    status: string;
}
const MainComponent: React.FC = () => {
    const [product, setProduct] = useState<Product[]>([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/products");
                setProduct(res.data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        getAllProducts()
    }, []);
    const handleDelete = async (id: string) => {
        try {
            if (window.confirm("delete")) {
                await axios.delete("http://localhost:5000/products/" + id);
                setProduct(product.filter(product => product.id !== id));

                toast.success("Deleted")
                getAllProducts()

            }
        } catch (error) {
            console.error('Error deleting product:', error);

        }
    }
    const columnsLeft = [
        {
            title: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox />
                    <span style={{ marginLeft: 8 }}>Vật tư, hàng hóa</span>
                </div>
            ),
            dataIndex: 'item',
            render: (text: string) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox style={{ marginRight: 8 }} />
                    {text}
                </div>
            ),
        },
        {

            title: 'Số lượng cần mua',
            dataIndex: 'quantity',
        },

    ];

    const dataLeft = [
        { key: 1, item: 'Bơ, phô mai', quantity: '10,000 cái' },
        { key: 2, item: 'Thực phẩm khô,gia vị', quantity: '10,000 hộp' },
        { key: 3, item: 'Bàn đá, bàn gang', quantity: '10,000 hộp' },
        { key: 4, item: 'Gương kính', quantity: '10,000 hộp' },
        { key: 5, item: 'Thiết bị cân', quantity: '10,000 hộp' },
    ];

    const columnsRight = [
        {
            title: 'Mã ĐNMS',
            dataIndex: 'code',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
        },
        {
            render: () => <FolderAddOutlined />,
        },
    ];

    const dataRight = [
        { key: 1, code: 'PR.2023.0000010', unit: 'GGG-NH Gogi Tô Hiệu' },
        { key: 2, code: 'PR.2023.0000009', unit: 'GGG-NH Gogi Nguyễn Chí Thanh' },
        { key: 3, code: 'PR.2023.0000009', unit: 'GGG-NH Gogi Nguyễn Chí Thanh' },
        { key: 4, code: 'PR.2023.0000009', unit: 'GGG-NH Gogi Nguyễn Chí Thanh' },
        { key: 5, code: 'PR.2023.0000009', unit: 'GGG-NH Gogi Nguyễn Chí Thanh' },

    ];

    const columnsFooter = [
        { title: 'Mã PAM#', dataIndex: 'id' },
        { title: 'Tên PAM', dataIndex: 'name' },
        { title: 'Người tạo', dataIndex: 'createdBy' },
        { title: 'Ngày tạo', dataIndex: 'createAt' ,
            render: (startDate: Date) => (
                <span>{new Date(startDate).toLocaleDateString('vi-VN')}</span>
            ),
        },
        { title: 'Loại sự kiện', dataIndex: 'eventType' },
        { title: 'Ngày bắt đầu báo giá', dataIndex: 'startDate' },
        { title: 'Ngày kết thúc báo giá', dataIndex: 'endDate',
            render: (endDate: Date) => (
                <span>{new Date(endDate).toLocaleDateString('vi-VN')}</span>
            ),
         },
        { title: 'Số lượng phản hồi', dataIndex: 'feedbackCount' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status: string) => (
                <>
                    <SyncOutlined /> {status}
                </>
            ),
        },
        {
            render: (_: any, record: any) => (
                <Space>
                    <DeleteOutlined onClick={() => handleDelete(record.id)} />
                    <Link to={`/products/edit/${record.id}`}>
                        <EditOutlined />
                    </Link>
                </Space>
            ),
        },
    ];
    return (
        <main className='main'>
            <div className='main_head'>
                <span>Home/</span>
                <h1 className='tieude'>Quản lí phương án mua</h1>
            </div>

            <div className='main-content'>
                <div className='main-content-left'>
                    <div className='main-content-title'>
                        <span className='span'>Hàng hóa cần mua</span>
                        <p>Lựa chọn các hàng hóa đang có nhu cầu mua để tập trung</p>
                        <Form className='form-input-search'>
                            <Input placeholder='Search' prefix={<SearchOutlined />} />
                        </Form>
                    </div>

                    <Table columns={columnsLeft} dataSource={dataLeft} pagination={false} />
                </div>

                <div className='main-content-right'>
                    <span className='span'>Đề nghị mua</span>
                    <p>Tạo PAM cho một đề nghị</p>
                    <Form className='form-input-search'>
                        <Input placeholder='Search' prefix={<SearchOutlined />} />
                    </Form>

                    <Table columns={columnsRight} dataSource={dataRight} pagination={false} />
                </div>
            </div>

            <div className='main-footer'>
                <div>
                    <span className="span">Danh sách phương án mua</span>
                    <p>Danh sách các phương án mua (PAM) được tạo ra trên hệ thống mà người dùng được cấp quyền truy xuất</p>
                </div>

                <div className='main-footer-content'>
                    <div className='main-footer-content-left'>
                        <div className='main-eye'>
                            <div>
                                <EyeOutlined />
                            </div>
                            <div>
                                View:
                            </div>
                        </div>
                        <div>
                            <Select defaultValue="1" style={{ width: 120 }}>
                                <Option value="1">View All</Option>
                                <Option value="2">View</Option>
                                <Option value="3">View</Option>
                            </Select>
                        </div>

                    </div>
                    <div className='main-footer-content-right'>
                        <Space>
                            <SearchOutlined />
                            <FilterOutlined />
                            <Link to="/products/add">
                                <Button type='primary'>
                                    Tạo mới PAM <PlusOutlined />
                                </Button>
                            </Link>
                        </Space>
                    </div>
                </div>

                <Table columns={columnsFooter} dataSource={product} rowKey="id" />
            </div>
        </main>
    );
};

export default MainComponent;
function getAllProducts() {
    throw new Error('Function not implemented.');
}

