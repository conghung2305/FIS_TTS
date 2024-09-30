import React from 'react';
import { Table, Input, Form } from 'antd';
import { SearchOutlined, DiffOutlined } from '@ant-design/icons';

const columnsRight = [
  {
    title: 'Mã ĐNMS',
    dataIndex: 'code',
    render: (text: string) => <span style={{ color: 'blue' }}>{text}</span>,
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
  },
  {
    render: () => <DiffOutlined style={{ color: 'blue' }} />,
  },
];

const dataRight = [
  { key: 1, code: 'PR.2023.0000010', unit: 'GGG-NH Gogi Tô Hiệu' },
  { key: 2, code: 'PR.2023.0000008', unit: 'GGG-NH Gogi Nguyễn Chí Thanh' },
  { key: 3, code: 'PR.2023.0000007', unit: 'GGG-NH Sumo Nguyễn Phong Sắc' },
  { key: 4, code: 'PR.2023.0000006', unit: 'GGG-NH Sumo Nguyễn Thị Định' },
  { key: 5, code: 'PR.2023.0000005', unit: 'GGG-NH Phòng kế hoạch và phát triển' },
];

const RightTable: React.FC = () => {
  return (
    <div>
      <span className='span'>Đề nghị mua</span>
      <p>Tạo PAM cho một đề nghị</p>
      <Form className='form-input-search'>
        <Input placeholder='Search' prefix={<SearchOutlined />} />
      </Form>
      <Table columns={columnsRight} dataSource={dataRight} pagination={false} />
    </div>
  );
};

export default RightTable;
