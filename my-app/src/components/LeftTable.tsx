import React from 'react';
import { Table, Checkbox, Input, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const columnsLeft = [
  {
    title: (
      <div style={{ display: 'flex', alignItems: 'center',marginLeft: 16,}}>
        <Checkbox />
        <span style={{ marginLeft: 8 }}>Vật tư, hàng hóa</span>
      </div>
    ),
    dataIndex: 'item', 
    render: (text: string) => (
      <div style={{ display: 'flex', alignItems: 'center',marginLeft: 16  }}>
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

const LeftTable: React.FC = () => {
  return (
    <div>
      <div className='main-content-title'>
        <span className='span'>Hàng hóa cần mua</span>
        <p>Lựa chọn các hàng hóa đang có nhu cầu mua để tập trung</p>
        <Form className='form-input-search'>
          <Input placeholder='Search' prefix={<SearchOutlined />} />
        </Form>
      </div>
      <Table columns={columnsLeft} dataSource={dataLeft} pagination={false} />
    </div>
  );
};

export default LeftTable;
