import React, { createContext, useContext, useState, useEffect } from 'react';

// Tạo một Context mới để lưu trữ thông tin giỏ hàng
const CartContext = createContext();

// Custom hook để sử dụng CartContext trong các thành phần con
export const useCart = () => useContext(CartContext);

// Component CartProvider quản lý state của giỏ hàng và cung cấp dữ liệu cho CartContext
const CartProvider = ({ children }) => {
    // State để lưu trữ danh sách các sản phẩm trong giỏ hàng
    const [cartItems, setCartItems] = useState([]);
    
    // State để lưu trữ tổng số lượng sản phẩm trong giỏ hàng
    const [cartItemCount, setCartItemCount] = useState(0);

    // Effect hook để lấy dữ liệu giỏ hàng từ localStorage khi component được render lần đầu tiên
    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        setCartItemCount(cart.reduce((acc, item) => acc + item.qty, 0));
    }, []);

    // Hàm để tính tổng số lượng sản phẩm trong giỏ hàng
    const getCartItemCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((acc, item) => acc + item.qty, 0);
    };

    // Hàm để cập nhật giỏ hàng và lưu vào localStorage
    const updateCart = (newCart) => {
        setCartItems(newCart);
        setCartItemCount(newCart.reduce((acc, item) => acc + item.qty, 0));
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // Cung cấp giá trị cho CartContext bao gồm các state và hàm xử lý
    return (
        <CartContext.Provider value={{ cartItems, cartItemCount, getCartItemCount, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
export default CartContext;
