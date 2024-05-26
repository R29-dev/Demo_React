import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Account() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    // Lấy dữ liệu người dùng từ localStorage khi component được mount
    useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData) {
            userData = JSON.parse(userData);
            const { Auth } = userData;
            if (Auth) {
                setUser({
                    name: Auth.name,
                    email: Auth.email,
                    address: Auth.address || '',
                    phone: Auth.phone || '',
                });
            }
        }
    }, []);

    // Xử lý khi người dùng nhập dữ liệu vào các input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // Hàm kiểm tra tính hợp lệ của dữ liệu người dùng nhập vào
    const validate = () => {
        let tempErrors = {};
        if (!user.name) tempErrors.name = "Tên không được để trống.";
        if (!user.phone) tempErrors.phone = "Số điện thoại không được để trống.";
        if (!user.address) tempErrors.address = "Địa chỉ không được để trống.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Hàm xử lý khi người dùng submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Nếu kiểm tra tính hợp lệ thất bại, không thực hiện tiếp

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Vui lòng đăng nhập để có thể cập nhật thông tin người dùng.");
                return;
            }
    
            const userDataToSend = { ...user };
            if (!userDataToSend.password) {
                delete userDataToSend.password; // Xóa trường password nếu nó trống
            }
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
    
            const response = await axios.post('http://localhost/du-an-web/public/api/user/update', userDataToSend, config);
            console.log(response.data); // Log phản hồi từ server

            // Xử lý thông báo thành công
            alert('Cập nhật thông tin người dùng thành công.');

            console.log("Dữ liệu người dùng sau khi cập nhật:", userDataToSend);

            localStorage.setItem("userData", JSON.stringify({ Auth: userDataToSend }));

           
        } catch (error) {
            console.error('Lỗi:', error);
            // Xử lý thông báo lỗi
            alert('Đã xảy ra lỗi khi cập nhật thông tin người dùng. Vui lòng thử lại.');
        }
    };

    return (
        <div className="blog-post-area">
            <h2 className="title text-center">Update user</h2>
            <div className="signup-form">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" value={user.name}  placeholder="Name" onChange={handleInputChange} />
                    {errors.name && <div className="error">{errors.name}</div>}
                    
                    <input type="email" name="email"  value={user.email} placeholder="Email Address" readOnly />
                    
                    <input type="password" name="password"  value={user.password} placeholder="Password"  onChange={handleInputChange} />

                    <input type="text" name="phone" value={user.phone}  placeholder="Phone" onChange={handleInputChange} />
                    {errors.phone && <div className="error">{errors.phone}</div>}

                    <input type="text" name="address"  value={user.address} placeholder=" Address" onChange={handleInputChange} />
                    {errors.address && <div className="error">{errors.address}</div>}
                    
                    <button type="submit" className="btn btn-default">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Account;
