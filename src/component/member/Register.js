import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: null,
        level: 0 // Set trực tiếp level bằng 0
    });
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!validateAvatar(file)) {
                alert("Vui lòng chọn file hình ảnh có định dạng JPEG, PNG hoặc GIF và kích thước dưới 1MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    avatar: reader.result // Lưu base64 string của hình ảnh vào formData
                    
                }));
            };
            reader.readAsDataURL(file[0]);
        }
    };

    const validateEmail = (email) => {
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email || !validateEmail(formData.email)) {
            errors.email = "Email không hợp lệ";
        }
        if (!formData.password) {
            errors.password = "Mật khẩu không được để trống";
        }
        if (!formData.name) {
            errors.name = "Vui lòng nhập tên của bạn";
        }
        if (!formData.phone) {
            errors.phone = "Vui lòng nhập số điện thoại của bạn";
        }
        if (!formData.address) {
            errors.address = "Vui lòng nhập địa chỉ của bạn";
        }
        if (!formData.avatar) {
            errors.avatar = "Vui lòng chọn ảnh đại diện";
        }
        return errors;
    };

    const validateAvatar = (file) => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(file.type)) {
            return false; // Không phải là hình ảnh
        }
        const maxSize = 1024 * 1024; // 1MB
        if (file.size > maxSize) {
            return false; // Kích thước vượt quá 1MB
        }
        return true; // Hợp lệ
    };

    const postData = async () => {
        try {
            const response = await axios.post('http://localhost/laravel8/public/api/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Kiểm tra xem yêu cầu đã thành công hay không
            if (response.status === 200) {
                // Thông báo đăng ký thành công
                alert("Đăng ký thành công");
    
                // Chuyển hướng đến trang đăng nhập
                navigate("/login");
            }
    
            // Trả về dữ liệu phản hồi từ yêu cầu đăng ký
            return response.data;
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error('Error while registering:', error);
            throw error; // Ném lỗi để xử lý ở phần gọi hàm
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                // Nếu không có lỗi, gửi dữ liệu đăng ký
                await postData();
            } catch (error) {
                // Nếu có lỗi, hiển thị thông báo lỗi
                setFormErrors({ server: 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.' });
            }
        } else {
            // Nếu có lỗi, hiển thị thông báo lỗi
            setFormErrors(errors);
        }
    };

    const renderErrors = () => {
        return Object.keys(formErrors).map((key, index) => (
            <div key={index} className="error-message">{formErrors[key]}</div>
        ));
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} />
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                <input type="number" placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleInputChange} />
                <input type="file" name="avatar" onChange={handleFileChange} />

                <button type="submit">Đăng ký</button>
            </form>
            {renderErrors()}
        </div>
    );
}

export default Register;
