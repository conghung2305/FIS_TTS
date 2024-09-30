import { useEffect, useState } from "react";
import HeaderComponent from "../../../components/Header"
import axios from "axios";
import { toast } from "react-toastify";
import LeftTable from "../../../components/LeftTable";
import RightTable from "../../../components/RightTable";
import FooterTable from "../../../components/FooterTable";
import "../PurchasePlanMaster/PurchasePlanMaster.scss"
import swal from "sweetalert";
import { notification } from "antd";
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
const PurchaseMater: React.FC = () => {
    const [product, setProduct] = useState<Product[]>([]);
    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/products");
                setProduct(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getAllProducts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const willDelete = await swal({
                title: "Bạn có chắc chắn muốn xóa?",
                text: "Hành động này sẽ không thể hoàn tác!",
                icon: "warning",
                buttons: ["Hủy", "Xóa"],
                dangerMode: true,
            });
            if (willDelete) {
                await axios.delete(`http://localhost:5000/products/${id}`);
                setProduct(product.filter(product => product.id !== id));
                notification.success({message:'Xóa sản phẩm thành công'})
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
    return (
        <div className='containerX'>
            <HeaderComponent />
            <main className='main'>
                <div className='main_head'>
                    <span>Home/</span>
                    <h1 className='tieude'>Quản lí phương án mua</h1>
                </div>
                <div className='main-content'>
                    <div className='main-content-left'>
                        <LeftTable />
                    </div>
                    <div className='main-content-right'>
                        <RightTable />
                    </div>
                </div>
                <div className='main-footer'>
                    <FooterTable product={product} handleDelete={handleDelete} />
                </div>
            </main>
        </div>
    )
}
export default PurchaseMater