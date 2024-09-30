import React from 'react';
import { Table, Space, Select, Button } from 'antd';
import { EyeOutlined, SearchOutlined, FilterOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { CheckOutlined, WarningOutlined } from '@ant-design/icons';
import "./FooterTable.scss"
interface FooterTableProps {
  product: any[];
  handleDelete: (id: string) => void;
}

const FooterTable: React.FC<FooterTableProps> = ({ product, handleDelete }) => {
  const columnsFooter = [
    {
      title: 'Mã PAM#', dataIndex: 'id',
      render: (id: string) => <span style={{ color: 'blue' }}>{id}</span>,
    },
    { title: 'Tên PAM', dataIndex: 'name' },
    { title: 'Người tạo', dataIndex: 'createdBy' },
    {
      title: 'Ngày tạo', dataIndex: 'createAt',
      render: (createAt: Date) => <span>{new Date(createAt).toLocaleDateString('vi-VN')}</span>,
    },
    { title: 'Loại sự kiện', dataIndex: 'eventType' },
    {
      title: 'Ngày bắt đầu báo giá', dataIndex: 'startDate',
      render: (startDate: Date) => <span>{new Date(startDate).toLocaleDateString('vi-VN')}</span>,
    },
    {
      title: 'Ngày kết thúc báo giá', dataIndex: 'endDate',
      render: (endDate: Date) => <span>{new Date(endDate).toLocaleDateString('vi-VN')}</span>,
    },
    {
      title: 'Số lượng phản hồi', dataIndex: 'feedbackCount',
      render: (feedbackCount: number) => `${feedbackCount} phản hồi`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status: string) => {
        if (status === 'completed') return <><CheckOutlined style={{ color: 'green' }} /> {status}</>;
        if (status === 'pending') return <><SyncOutlined style={{ color: 'blue' }} /> {status}</>;
        if (status === 'inactive') return <><WarningOutlined style={{ color: 'red' }} /> {status}</>;
        return <>{status}</>;
      },
    },
    {
      render: (_: any, record: any) => (
        <Space>
          <DeleteOutlined onClick={() => handleDelete(record.id)} />
          <Link to={`/edit/${record.id}`}>
            <EditOutlined />
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className='main-footer-content'>
        <div className='main-footer-content-left'>
          <div className='main-eye'>
            <EyeOutlined /> View:
          </div>
          <Select defaultValue="1" style={{ width:70, marginRight:"20px"}}>
            <Select.Option value="1">View</Select.Option>
            <Select.Option value="2">View</Select.Option>
            <Select.Option value="3">View</Select.Option>
          </Select> 
        </div>
        <div className='main-footer-content-right'>
          <Space>
            <SearchOutlined />
            <FilterOutlined />
            <Link to="/add">
              <Button type='primary'>
                Tạo mới PAM <PlusOutlined />
              </Button>
            </Link>
          </Space>
        </div>
      </div>
      <Table columns={columnsFooter} dataSource={product} rowKey="id" />
    </div>
  );
};

export default FooterTable;
