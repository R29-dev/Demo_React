import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function ListProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Lấy token từ localStorage
                const token = localStorage.getItem('token');

                // Kiểm tra xem token có tồn tại không
                if (!token) {
                    console.error('Token not found in localStorage.');
                    return;
                }

                // Thêm token vào header của yêu cầu
                const config = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    }
                };

                // Gửi yêu cầu lấy dữ liệu sản phẩm
                const response = await axios.get('http://localhost/du-an-web/public/api/product/list', config);

                // Kiểm tra xem dữ liệu nhận được có phải là một mảng không
                if (!Array.isArray(response.data.data)) {
                    console.error('Invalid data format:', response.data);
                    return;
                }

                // Xử lý dữ liệu nhận về
                const processedData = response.data.data.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: `http://localhost/du-an-web/public/upload/product/${JSON.parse(product.hinhanh)[0]}`,
                }));
                setProducts(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu" style={{ backgroundColor: '#FE980F', color: 'white', fontWeight: 'bold' }}>
                            <th >ID</th>

                            <th className="image">Image</th>
                            <th className="description">Name</th>
                            <th className="price">Price</th>
                            <th className="total" colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td >
                                    <h4><a href="#">{product.id}</a></h4>
                                </td>
                                <td className="cart_product">
                                    <a href="#"><img width="200px" src={product.image} alt={product.name} /></a>
                                </td>
                                <td className="cart_description">
                                    <h4><a href="#">{product.name}</a></h4>
                                </td>
                                <td className="cart_price">
                                    <p>{product.price}$</p>
                                </td>
                                <td className="edit">
                                    <a href="#"><i className="m-r-10 mdi mdi-grease-pencil"></i> Edit</a>
                                </td>
                                <td className="delete">
                                    <a href="#"><i className="m-r-10 mdi mdi-grease-pencil"></i> Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'right', margin: '10px' }}></div>
                <button style={{ backgroundColor: '#FE980F', fontSize: '50px', border: '0' }}>
                    <a className="text-white" style={{ color: 'white' }}>
                    <h4 class="panel-title"><Link to="/product/add">Add Product</Link></h4>
                    </a>
                </button>
            </div>
        </div>
    );
}

export default ListProduct;
