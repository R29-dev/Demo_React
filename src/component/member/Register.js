import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for API calls
import './Login.css'; // Sử dụng lại style của form login cho đơn giản

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: null,
    });
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate(); // Sử dụng hook useNavigate để lấy hàm navigate

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
            setFormData(prev => ({
                ...prev,  
                avatar: file  
            }));
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

    const postData = async () => {
        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('email', formData.email);
            form.append('password', formData.password);
            form.append('phone', formData.phone);
            form.append('address', formData.address);
            form.append('avatar', formData.avatar);
            const response = await axios.post('http://localhost/du-an-web/public/api/register', form);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error while registering:', error);
            throw error;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            try {
                const responseData = await postData();
                alert("Đăng ký thành công");
                // Add any additional logic upon successful registration
                navigate("/login");

            } catch (error) {
                setFormErrors({ server: 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.' });
            }
        } else {
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
            
            <form onSubmit={handleSubmit} className="login-form" encType="multipart/form-data">
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
