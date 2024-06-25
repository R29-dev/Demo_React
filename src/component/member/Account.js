import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Account() {
    const token = localStorage.getItem("token");
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
       
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        avatar: null,
      
    });
    useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData) {
            userData = JSON.parse(userData);
            const { Auth } = userData;
            if (Auth) {
                setFormData({
                    name: Auth.name,
                    email: Auth.email,
                    address: Auth.address || '',
                    phone: Auth.phone || '',
                    id: Auth.id,
                    avatar: Auth.avatar
                });
            }
        }
    }, []);

  


    const userDataToSend = { ...formData };
   
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
            reader.readAsDataURL(file);
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
       
        if (!formData.name) {
            errors.name = "Vui lòng nhập tên của bạn";
        }
        if (!formData.phone) {
            errors.phone = "Vui lòng nhập số điện thoại của bạn";
        }
        if (!formData.address) {
            errors.address = "Vui lòng nhập địa chỉ của bạn";
        }
        // if (!formData.avatar) {
        //     errors.avatar = "Vui lòng chọn ảnh đại diện";
        // }
        return errors;
    };

    const validateAvatar = (file) => {
        // Các loại định dạng hình ảnh hợp lệ
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    
        // Kiểm tra xem định dạng của tệp có nằm trong danh sách các định dạng hợp lệ không
        if (!validImageTypes.includes(file.type)) {
            return false; // Nếu không, trả về false vì tệp không phải là hình ảnh hợp lệ
        }
    
        // Kích thước tối đa của tệp được cho phép (1MB)
        const maxSize = 1024 * 1024; // 1MB
    
        // Kiểm tra xem kích thước của tệp có vượt quá kích thước tối đa không
        if (file.size > maxSize) {
            return false; // Nếu có, trả về false vì tệp quá lớn
        }
    
        // Nếu tệp hợp lệ cả về định dạng và kích thước, trả về true
        return true;
    };
    
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'enctype="multipart/form-data'
        }
    };

  

    const postData = async () => {
        try {
           
            if (!token) {
            alert("Vui lòng đăng nhập để có thể cập nhật thông tin người dùng.");
            return;
            }
            
            const response = await axios.post(`http://localhost/laravel8/public/api/user/update/${formData.id}`, userDataToSend, config);
            // Kiểm tra xem yêu cầu đã thành công hay không
            if (response.status === 200) {
                
                alert("Cập nhật người dùng thành công");
    
            //     localStorage.setItem("userData", JSON.stringify({formData }));

                          console.log(userDataToSend);

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
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} readOnly />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                <input type="number" placeholder="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleInputChange} />
                <input type="file" name="avatar" onChange={handleFileChange} />
                <img src={`http://localhost/laravel8/public/upload/user/avatar/${formData.avatar}`} width="150px" alt="Avatar" />

                <button type="submit">Cập Nhật</button>
            </form>
            {renderErrors()}
        </div>
    );
}

export default Account;
