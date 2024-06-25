import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [ecoTax, setEcoTax] = useState(2);
    const [total, setTotal] = useState(0);
    const { updateCart } = useCart();
    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        const fetchCartItems = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productPromises = cart.map(item =>
                axios.get(`http://localhost/laravel8/public/api/user/product/${item.id}`, config).then(response => {
                    const product = response.data.data;
                    return {
                        ...product,
                        qty: item.qty,
                    };
                })
            );

            try {
                const products = await Promise.all(productPromises);
                setCartItems(products);
                calculateTotals(products);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchCartItems();
    }, []);

    // [
    //     {
    //         id :3 ,
    //         qty :4
    //     },
    //     {
    //         id : 8,
    //         qty :3
    //     }
    // ]

    const addToCart = (productId) => { 
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            cart[productIndex].qty += 1;
        } else {
            cart.push({ id: productId, qty: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart(cart);

        // Update the cartItems state with the updated quantities
        setCartItems(prevCartItems => {
            const updatedItems = prevCartItems.map(item =>
                item.id === productId ? { ...item, qty: item.qty + 1 } : item
            );
            calculateTotals(updatedItems);
            return updatedItems;
        });

    };
    const decreaseQuantity = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex !== -1) {
            if (cart[productIndex].qty > 1) { // Giảm số lượng sản phẩm nếu lớn hơn 1
                cart[productIndex].qty -= 1;
            } else { // Nếu số lượng là 1, xóa sản phẩm khỏi giỏ hàng
                cart = cart.filter(item => item.id !== productId);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart(cart);

        setCartItems(prevCartItems => {
            const updatedItems = prevCartItems.map(item =>
                item.id === productId ? { ...item, qty: item.qty - 1 } : item
            ).filter(item => item.qty > 0); // Loại bỏ sản phẩm nếu số lượng bằng 0

            calculateTotals(updatedItems);
            return updatedItems;
        });
    };

    const removeFromCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Lấy danh sách mặt hàng từ localStorage hoặc trả về mảng rỗng nếu không có
        cart = cart.filter(item => item.id !== productId); // Lọc ra danh sách giỏ hàng mới không có sản phẩm bị xóa
        localStorage.setItem('cart', JSON.stringify(cart)); // Lưu lại danh sách giỏ hàng mới vào localStorage
        updateCart(cart);

        // Cập nhật state cartItems với danh sách giỏ hàng mới sau khi xóa sản phẩm
        setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productId));
        calculateTotals(cartItems); // Tính toán lại tổng tiền sau khi xóa sản phẩm
    };


    const calculateTotals = (items) => {
        const newSubtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
        setSubtotal(newSubtotal);
        setTotal(newSubtotal + ecoTax);
    };

    return (
        <div>
            <div className="container" style={{ width: '100%' }}>
                <div className="table-responsive cart_info">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="cart_menu" style={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}>
                                <td className="image">Item</td>
                                <td className="description"></td>
                                <td className="price">Price</td>
                                <td className="quantity">Quantity</td>
                                <td className="total">Total</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(product => (
                                <tr key={product.id}>
                                    <td className="cart_product">
                                        <img style={{ width: '90px' }} src={`http://localhost/laravel8/public/upload/product/${product.id_user}/${product.image[0]}`} alt={product.name} />
                                    </td>
                                    <td className="cart_description">
                                        <h4><a href="#">{product.name}</a></h4>
                                        <p>Web ID: {product.web_id}</p>
                                    </td>
                                    <td className="cart_price">
                                        <p className='cart_total_price'>${product.price}</p>
                                    </td>
                                    <td className="cart_quantity">
                                        <div className="cart_quantity_button">
                                            
                                                <a className="cart_quantity_up" onClick={() => addToCart(product.id)}> + </a>
                                                <input className="cart_quantity_input" type="text" name="quantity" value={product.qty} readOnly autoComplete="off" size="2" />
                                                <a className="cart_quantity_down" onClick={() => decreaseQuantity(product.id)}> - </a>
                                            </div>

                                    </td>
                                    <td className="cart_total">
                                        <p className="cart_total_price">${(product.price * product.qty).toFixed(2)}</p>
                                    </td>
                                    <td className="cart_delete">
                                        <button className="cart_quantity_delete" onClick={() => removeFromCart(product.id)}><i className="fa fa-times"></i></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

            <div class="container" style={{ width: '100%' }}>
                <div class="heading">
                    <h3>What would you like to do next?</h3>
                    <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                </div>
                <div class="row">
                    <div class="col-sm-6 ">
                        <div class="chose_area">
                            <ul class="user_option">
                                <li>
                                    {/* <input type="checkbox"> */}
                                    <label>Use Coupon Code</label>
                                </li>
                                <li>
                                    {/* <input type="checkbox"> */}
                                    <label>Use Gift Voucher</label>
                                </li>
                                <li>
                                    {/* <input type="checkbox"> */}
                                    <label>Estimate Shipping &amp; Taxes</label>
                                </li>
                            </ul>
                            <ul class="user_info">
                                <li class="single_field">
                                    <label>Country:</label>
                                    <select>
                                        <option>United States</option>
                                        <option>Bangladesh</option>
                                        <option>UK</option>
                                        <option>India</option>
                                        <option>Pakistan</option>
                                        <option>Ucrane</option>
                                        <option>Canada</option>
                                        <option>Dubai</option>
                                    </select>

                                </li>
                                <li class="single_field">
                                    <label>Region / State:</label>
                                    <select>
                                        <option>Select</option>
                                        <option>Dhaka</option>
                                        <option>London</option>
                                        <option>Dillih</option>
                                        <option>Lahore</option>
                                        <option>Alaska</option>
                                        <option>Canada</option>
                                        <option>Dubai</option>
                                    </select>

                                </li>
                                <li class="single_field zip-field">
                                    <label>Zip Code:</label>
                                    {/* <input type="text"> */}
                                </li>
                            </ul>
                            <a class="btn btn-default update" href="">Get Quotes</a>
                            <a class="btn btn-default check_out" href="">Continue</a>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="total_area">
                            <ul>
                                <li>Cart Sub Total <span>${subtotal.toFixed(2)}</span></li>
                                <li>Eco Tax <span>${ecoTax.toFixed(2)}</span></li>
                                <li>Shipping Cost <span>Free</span></li>
                                <li>Total <span>${total.toFixed(2)}</span></li>
                            </ul>
                            <a class="btn btn-default update" href="">Update</a>
                            <a class="btn btn-default check_out" href="">Check Out</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Cart;
