import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import HeaderComponent from "../components/Header";
import MainComponent from "../components/Main";


const List: React.FC = () => {
  
  return (
    <div className='containerX'>
      {/* <header className="header">
        <div className="container">
          <div className="nav">
            <i className="fa-solid fa-folder icon"></i>
            <a href="#" className='logo'>eProcurement</a>
            <a href="#">Trang chủ</a>
            <a href="#">Kế hoạch</a>
            <a href="#">Đề nghị mua</a>
            <a href="#">Phương án mua</a>
            <a href="#">Đơn hàng</a>
            <a href="#">Thanh toán</a>
            <a href="#">Biểu mẫu</a>
            <a href="#">Báo cáo</a>
          </div>
          <div className='navright'>
            <div className='iconNav'>
              <i className="fa-solid fa-bell"></i>
            </div>
            <div className='iconNav'>
              <i className="fa-solid fa-gear"></i>
            </div>
            <div className='iconNav'>
              <i className="fa-solid fa-circle"></i>
            </div>
            <div className='iconNav'>
              <i className="fa-solid fa-list"></i>
            </div>
          </div>
        </div>
      </header> */}
      <HeaderComponent/>
      {/* <main className='main'>
        <div className='main_head'>
          <span>Home/</span>
          <h1 className='tieude'>Quản lí phương án mua</h1>
        </div>
        <div className='main-content'>
          <div className='main-content-left'>
            <div className='main-content-title'>
              <span className='span'>Hàng hóa cần mua</span>
              <p>Lựa chọn các hàng hóa đang có nhu cầu mua để tập trung</p>
              <div className='form-input-search'>
                <form action="" >
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder='Search' className='input-search' />
                </form>
              </div>

            </div>
            <table className='table-left'>
              <thead>
                <tr>
                  <th><input type="checkbox" />Vật tư,hàng hóa</th>
                  <th>Số lượng cần mua</th>
                </tr>

              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" />Bơ,phô mai</td>
                  <td>10,000 cái</td>
                </tr>
                <tr>
                  <td><input type="checkbox" />Bơ,phô mai</td>
                  <td>10,000 cái</td>
                </tr>
                <tr>
                  <td><input type="checkbox" />Bơ,phô mai</td>
                  <td>10,000 cái</td>
                </tr>
                <tr>
                  <td><input type="checkbox" />Bơ,phô mai</td>
                  <td>10,000 cái</td>
                </tr>
                <tr>
                  <td><input type="checkbox" />Bơ,phô mai</td>
                  <td>10,000 cái</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='main-content-right'>
            <span className='span'>Đề nghị mua</span>
            <p>Tạo PAM cho một đề nghị</p>
            <div className='form-input-search'>
              <form action="" >
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder='Search' className='input-search' />
              </form>
            </div>
            <table className='table-right'>
              <thead>
                <tr>

                  <th>Mã ĐNMS</th>
                  <th>Đơn vị</th>
                  <th></th>
                </tr>

              </thead>
              <tbody>
                <tr>

                  <td>PR.2023.0000010</td>
                  <td>GGG-NH Gogi Tô Hiệu</td>
                  <td>
                    <i className="fa-solid fa-folder-plus"></i>
                  </td>
                </tr>
                <tr>

                  <td>PR.2023.0000009</td>
                  <td>GGG-NH Gogi Nguyễn Chí Thanh</td>
                  <td>
                    <i className="fa-solid fa-folder-plus"></i>
                  </td>
                </tr>
                <tr>

                  <td>PR.2023.0000008</td>
                  <td>GGG-NH Sunmo Nguyễn Phong Sắc</td>
                  <td>
                    <i className="fa-solid fa-folder-plus"></i>
                  </td>
                </tr>
                <tr>

                  <td>PR.2023.0000007</td>
                  <td>GGG-NH Sunmo Nguyễn Thị Định</td>
                  <td>
                    <i className="fa-solid fa-folder-plus"></i>
                  </td>
                </tr>
                <tr>

                  <td>PR.2023.0000006</td>
                  <td>GGG-NH Phòng kế hoạch và phát triển</td>
                  <td>
                    <i className="fa-solid fa-folder-plus"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='main-footer'>
          <div>
            <span className="span">Danh sách phương án mua</span>
            <p>Danh sách các phương án mua (PAM) được tạo ra trên hệ thống mà người dùng được cấp quyền truy xuất</p>
          </div>
          <div className='main-footer-content'>
            <div className='main-footer-content-left'>
              <i className="fa-solid fa-eye"></i>  View:
              <select name="" id="">
                <option value="1">View All</option>
                <option value="2">View</option>
                <option value="3">View </option>
              </select>
            </div>
            <div className='main-footer-content-right'>
              <div>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <div>
                <i className="fa-solid fa-filter"></i>
              </div>
              <div className='addPam'>
                <Link to={"/products/add"}>
                  <button className='btn'>
                    Tạo mới PAM
                    <i className="fa-solid fa-plus icons"></i>
                  </button>
                </Link>

              </div>
            </div>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Mã PAM#</th>
                <th>Tên PAM</th>
                <th>Người tạo</th>
                <th>Ngày tạo</th>
                <th>Loại sự kiện</th>
                <th>Ngày bắt đầu báo giá</th>
                <th>Ngày kết thúc báo giá</th>
                <th>Số lượng phản hồi</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => (
                <tr key={product.id}>
                  <td className='id'>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.createdBy}</td>
                  <td>{new Date(product.createAt).toLocaleDateString()}</td>
                  <td>{product.eventType}</td>
                  <td>{new Date(product.startDate).toLocaleDateString()}</td>
                  <td>{new Date(product.endDate).toLocaleDateString()}</td>
                  <td>{(product.feedbackCound)}</td>
                  <td><i className="fa-solid fa-circle-notch"></i>{product.status}</td>
                  <td>
                    <i className="fa-solid fa-trash" onClick={() => handleDelete(product.id)} ></i><br />
                    <Link to={`/products/edit/${product.id}`}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main> */}
      <MainComponent/>
    </div>
  )
}
export default List

function getAllProducts() {
  throw new Error("Function not implemented.");
}

