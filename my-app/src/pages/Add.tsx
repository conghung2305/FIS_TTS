
import React, { useState } from 'react';
import { Input, Form, Button, Select, DatePicker, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../scss/styleAddForm.css'
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

const AddProduct: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleAddProduct = async (values: any) => {
        const { name, createdBy, eventType, startDate, endDate, feedbackCount, status } = values;

        if (!name || !createdBy || !eventType || !startDate || !endDate || feedbackCount < 0 || !status) {
            notification.error({ message: 'Please fill all fields correctly!' });
            return;
        }
        if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
            notification.error({ message: 'End date should be after start date' });
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
            notification.success({ message: 'Product added successfully!' });
            navigate('/');
            form.resetFields();
        } catch (error) {
            console.error('Error adding product:', error);
            notification.error({ message: 'Failed to add product' });
        }
    };

    return (
        <div className="add-product-container">
            <h2>Create New Product</h2>
            <Form
                form={form}
                onFinish={handleAddProduct}
                className="add-product-form"
                layout="vertical"
            >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the product name' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Người tạo" name="createdBy" rules={[{ required: true, message: 'Please enter the creator' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Loại sự kiện" name="eventType" rules={[{ required: true, message: 'Please select the event type' }]}>
                    <Select placeholder="Select event type">
                        <Option value="inactive">Inactive</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Ngày bắt đầu" name="startDate" rules={[{ required: true, message: 'Please select the start date' }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item label="Ngày kết thúc" name="endDate" rules={[{ required: true, message: 'Please select the end date' }]}>
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item label="Số lượng phản hồi" name="feedbackCount" >
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: 'Please select the status' }]}>
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

export default AddProduct;
