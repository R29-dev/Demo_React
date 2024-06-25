import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useCart } from '../Context/CartContext';

function Home() {
    const [products, setProducts] = useState([]);
    const { updateCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost/laravel8/public/api/product/list');
                if (response.data && response.data.response === 'success' && Array.isArray(response.data.data.data)) {
                    setProducts(response.data.data.data);
                } else {
                    console.error('Data received is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Please login!");
            return;
        }

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            cart[productIndex].qty += 1;
        } else {
            cart.push({ id: productId, qty: 1 });
        }

        alert("Added to cart successfully!");

        updateCart(cart);
   
        // - tinh tong qty tai day
        // - treuyen tong nay vao hàm trong contexxt
        // xxx(20)
    };

    return (
        <div>
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {Array.isArray(products) && products.map(product => (
                    <div key={product.id} className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${JSON.parse(product.image)[0]}`} alt={product.name} />
                                    <h2>${product.price}</h2>
                                    <p>{product.name}</p>
                                    <a href="#" className="btn btn-default add-to-cart" onClick={() => handleAddToCart(product.id)}>
                                        <i className="fa fa-shopping-cart"></i>Add to cart
                                    </a>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>${product.price}</h2>
                                        <p>{product.name}</p>
                                        <button className="btn btn-default add-to-cart" onClick={() => handleAddToCart(product.id)}>
                                            Add to cart
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <Link to={`/product-detail/${product.id}`}><i className="fa fa-plus-square"></i>Product detail</Link>
                                    <li><a href="#"><i className="fa fa-plus-square"></i>Add to compare</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
