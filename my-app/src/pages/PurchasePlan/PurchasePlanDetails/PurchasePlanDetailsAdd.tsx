import React, { useState } from 'react';
import { Input, Form, Button, Select, DatePicker, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../PurchasePlanDetails/PurchasePlanDetailsAdd.scss"
const { Option } = Select;
const generateId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const uniqueNumber = Date.now().toString().slice(-6);
    return `PR.${year}.${uniqueNumber}`;
};

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

const PurchasePlanDetailsAdd: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleAddProduct = async (values: any) => {
        const { name, createdBy, eventType, startDate, endDate, feedbackCount, status } = values;

        if (!name || !createdBy || !eventType || !startDate || !endDate || feedbackCount < 0 || !status) {
            notification.error({ message: 'Tất cả các trường không được bỏ trống' });
            return;
        }
        if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
            notification.error({ message: 'Ngày kết thúc phải sau ngày bắt đầu' });
            return;
        }

        try {
            const newProduct: Product = {
                id: generateId(),
                name,
                createdBy,
                createAt: new Date(),
                eventType,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                feedbackCount,
                status,
            };
            await axios.post('http://localhost:5000/products', newProduct);
            notification.success({ message: 'Thêm sản phẩm thành công!' });
            navigate('/');
            form.resetFields();
        } catch (error) {
            console.error('Error adding product:', error);
            notification.error({ message: 'Thêm sản phẩm thất bại' });
        }
    };

    return (
        <div className="add-product-container">
            <Form
                form={form}
                onFinish={handleAddProduct}
                className="add-product-form"
                layout="vertical"
            >
                 <h2>CREATE NEW PRODUCT</h2>
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Không bỏ trống' }]}>
                    <Input />
                </Form.Item> 
                <Form.Item label="Người tạo" name="createdBy" rules={[{ required: true, message: 'Không bỏ trống' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Loại sự kiện" name="eventType" rules={[{ required: true, message: 'Không bỏ trống' }]}>
                    <Select placeholder="Select event type">
                        <Select.Option value="inactive">Inactive</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Ngày bắt đầu" name="startDate" rules={[{ required: true, message: 'Không bỏ trống' }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item label="Ngày kết thúc" name="endDate" rules={[{ required: true, message: 'Không bỏ trống' }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item label="Số lượng phản hồi" name="feedbackCount" >
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: 'Không bỏ trống' }]}>
                    <Select placeholder="Select status">
                        <Option value="inactive">Inactive</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Create Product</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PurchasePlanDetailsAdd;
