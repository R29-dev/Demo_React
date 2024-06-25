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
                const response = await axios.get('http://localhost/laravel8/public/api/user/my-product', config);
                console.log(response.data);

                // Kiểm tra xem dữ liệu nhận được có phải là một đối tượng với thuộc tính `data` không
                if (!response.data || !response.data.data || typeof response.data.data !== 'object') {
                    console.error('Invalid data format:', response.data);
                    return;
                }

                // Chuyển đổi đối tượng sản phẩm thành mảng
                const productData = Object.values(response.data.data);

                // Xử lý dữ liệu nhận về
                const processedData = productData.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: `http://localhost/laravel8/public/upload/product/34/${JSON.parse(product.image)[0]}`,
                }));
                setProducts(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
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
                    'Authorization': `Bearer ${token}`,
                }
            };

            // Gửi yêu cầu xóa sản phẩm
            await axios.get(`http://localhost/laravel8/public/api/user/product/delete/${id}`, config);

            // Sau khi xóa thành công, cập nhật danh sách sản phẩm
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                        <tr className="cart_menu" style={{ backgroundColor: '#FE980F', color: 'white', fontWeight: 'bold' }}>
                            <th>ID</th>
                            <th className="image">Image</th>
                            <th className="description">Name</th>
                            <th className="price">Price</th>
                            <th className="total" colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <h4><a href="#">{product.id}</a></h4>
                                </td>
                                <td className="cart_product">
                                    <a href="#"><img width="100px" src={product.image} alt={product.name} /></a>
                                </td>
                                <td className="cart_description">
                                    <h4><a href="#">{product.name}</a></h4>
                                </td>
                                <td className="cart_price">
                                    <p>{product.price}$</p>
                                </td>
                                <td className="edit">
                                <Link to={`/product/edit/${product.id}`}><i className="m-r-10 mdi mdi-grease-pencil"></i> Edit</Link>
                                </td>
                                <td className="delete">
                                    <a href="#" onClick={() => deleteProduct(product.id)}>
                                        <i className="m-r-10 mdi mdi-grease-pencil"></i> Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'right', margin: '10px' }}></div>
                <button style={{ backgroundColor: '#FE980F', fontSize: '50px', border: '0' }}>
                    <a className="text-white" style={{ color: 'white' }}>
                        <h4 className="panel-title"><Link to="/product/add">Add Product</Link></h4>
                    </a>
                </button>
            </div>
        </div>
    );
}

export default ListProduct;
