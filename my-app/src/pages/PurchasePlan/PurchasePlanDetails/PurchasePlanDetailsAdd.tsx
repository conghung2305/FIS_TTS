import React, { useEffect, useState } from 'react';
import { Input, Form, Button, Select, DatePicker, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import "../PurchasePlanDetails/PurchasePlanDetailsAdd.scss";

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

const PurchasePlanDetailsAddEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/products/${id}`);
                    const productData = res.data;
                    setProduct(productData);
                    form.setFieldsValue({
                        name: productData.name,
                        createdBy: productData.createdBy,
                        eventType: productData.eventType,
                        startDate: productData.startDate ? moment(productData.startDate) : null,
                        endDate: productData.endDate ? moment(productData.endDate) : null,
                        feedbackCount: productData.feedbackCount,
                        status: productData.status
                    });
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };
            fetchProduct();
        }
    }, [id, form]);

    const handleSubmit = async (values: any) => {
        const { name, createdBy, eventType, startDate, endDate, feedbackCount, status } = values;
        const newProduct = {
            id: product ? product.id : generateId(),
            name,
            createdBy,
            createAt: product ? product.createAt : new Date(),
            eventType,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            feedbackCount,
            status
        };

        try {
            if (id) {
                await axios.put(`http://localhost:5000/products/${id}`, newProduct);
                notification.success({ message: 'Cập nhật sản phẩm thành công!' });
            } else {
                await axios.post('http://localhost:5000/products', newProduct);
                notification.success({ message: 'Thêm sản phẩm thành công!' });
            }
            navigate('/');
            form.resetFields();
        } catch (error) {
            console.error('Error saving product:', error);
            notification.error({ message: id ? 'Cập nhật sản phẩm thất bại' : 'Thêm sản phẩm thất bại' });
        }
    };

    return (
        <div className="add-edit-product-container">
            <Form
                form={form}
                onFinish={handleSubmit}
                className="add-edit-product-form"
                layout="vertical"
            >
                <h2>{id ? 'Edit Product' : 'Create New Product'}</h2>

          
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Tên không được bỏ trống' },
                        { pattern: /^[a-zA-Z0-9\s]+$/, message: 'Tên chỉ chứa ký tự chữ và số' }
                    ]}
                >
                    <Input />
                </Form.Item>

              
                <Form.Item
                    label="Người tạo"
                    name="createdBy"
                    rules={[
                        { required: true, message: 'Người tạo không được bỏ trống' },
                        { min: 3, message: 'Người tạo phải có ít nhất 3 ký tự' }
                    ]}
                >
                    <Input />
                </Form.Item>

              
                <Form.Item
                    label="Loại sự kiện"
                    name="eventType"
                    rules={[{ required: true, message: 'Loại sự kiện không được bỏ trống' }]}
                >
                    <Select placeholder="Chọn loại sự kiện">
                        <Option value="inactive">Inactive</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                </Form.Item>

       
                <Form.Item
                    label="Ngày bắt đầu"
                    name="startDate"
                    rules={[{ required: true, message: 'Ngày bắt đầu không được bỏ trống' }]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

             
                <Form.Item
                    label="Ngày kết thúc"
                    name="endDate"
                    dependencies={['startDate']}
                    rules={[
                        { required: true, message: 'Ngày kết thúc không được bỏ trống' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('startDate') < value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'));
                            },
                        }),
                    ]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    label="Số lượng phản hồi"
                    name="feedbackCount"
                    rules={[
                        { required: true, message: 'Số lượng phản hồi không được bỏ trống' },
                     
                    ]}
                >
                    <Input type="number" />
                </Form.Item>

      
                <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: 'Trạng thái không được bỏ trống' }]}
                >
                    <Select placeholder="Chọn trạng thái">
                        <Option value="inactive">Inactive</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {id ? 'Save Changes' : 'Create Product'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PurchasePlanDetailsAddEdit;
