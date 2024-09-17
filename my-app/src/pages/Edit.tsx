import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import moment from 'moment'; 
import 'react-toastify/dist/ReactToastify.css';
import '../scss/EditProduct.scss';
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
const { Option } = Select;
const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            console.error('No product ID found in URL.');
            return;
        }

        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/products/${id}`);
                const productData = res.data;
                setProduct(productData);
                console.log("feedback:",productData);
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
    }, [id, form]);
    const handleSubmit = async (values: any) => {
        if (!id || !product) {
            console.error('Cannot submit form without a valid product ID.');
            return;
        }
        const { name, createdBy, eventType, startDate, endDate, feedbackCount, status } = values;

        if (!name.trim()) {
            toast.error("Tên sự kiện không bỏ trống");
            return;
        }
        if (!createdBy.trim()) {
            toast.error("Người tạo là bắt buộc");
            return;
        }
        if (!eventType.trim()) {
            toast.error("Loại sự kiện là bắt buộc");
            return;
        }
        if (!startDate) {
            toast.error("Ngày bắt đầu là bắt buộc");
            return;
        }
        if (!endDate) {
            toast.error("Ngày kết thúc là bắt buộc");
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            toast.error("Ngày kết thúc phải sau ngày bắt đầu");
            return;
        }
        if (feedbackCount < 0) {
            toast.error("Số lượng phản hồi không được âm");
            return;
        }
        if (!status.trim()) {
            toast.error("Trạng thái là bắt buộc");
            return;
        }

        const updatedProduct = {
            id,
            name,
            createdBy,
            createAt: product.createAt || new Date(),
            eventType,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            feedbackCount,
            status
        };

        try {
            await axios.put(`http://localhost:5000/products/${id}`, updatedProduct);
            toast.success("Cập nhật sản phẩm thành công");
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error("Cập nhật sản phẩm không thành công");
        }
    };

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            {product ? (
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Tên sự kiện không bỏ trống' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Người tạo"
                        name="createdBy"
                        rules={[{ required: true, message: 'Người tạo là bắt buộc' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Loại sự kiện"
                        name="eventType"
                        rules={[{ required: true, message: 'Loại sự kiện là bắt buộc' }]}
                    >
                        <Select>
                            <Option value="inactive">Inactive</Option>
                            <Option value="pending">Pending</Option>
                            <Option value="completed">Completed</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Ngày bắt đầu"
                        name="startDate"
                        rules={[{ required: true, message: 'Ngày bắt đầu là bắt buộc' }]}
                    >
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                        label="Ngày kết thúc"
                        name="endDate"
                        rules={[{ required: true, message: 'Ngày kết thúc là bắt buộc' }]}
                    >
                        <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng phản hồi"
                        name="feedbackCount"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[{ required: true, message: 'Trạng thái là bắt buộc' }]}
                    >
                        <Select>
                       
                            <Option value="inactive">Inactive</Option>
                            <Option value="pending">Pending</Option>
                            <Option value="completed">Completed</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <p>Loading product data...</p>
            )}
        </div>
    );
};
export default EditProduct;


