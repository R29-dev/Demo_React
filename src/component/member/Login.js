import { useState } from "react";
import './Login.css'; // Import CSS file for styling
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

function Login() {
    // State để lưu trữ dữ liệu của form
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        level: 0
    });

    // State để lưu trữ thông báo lỗi
    const [formErrors, setFormErrors] = useState("");

    // Sử dụng hook useNavigate để có thể điều hướng trang
    const navigate = useNavigate();

    // Hàm xử lý khi người dùng nhập liệu vào các trường input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Cập nhật state formData với giá trị mới
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Hàm xử lý khi người dùng nhấn nút đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Kiểm tra xem người dùng đã nhập đầy đủ email và password chưa
        if (!formData.email || !formData.password) {
            setFormErrors("Vui lòng nhập đầy đủ email và mật khẩu");
            return;
        }

        // Kiểm tra định dạng của email bằng biểu thức chính quy
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!re.test(formData.email)) {
            setFormErrors("Email không hợp lệ");
            return;
        }

        try {
            // Gửi yêu cầu đăng nhập thông qua axios
            const response = await axios.post("http://localhost/laravel8/public/api/login", {
                email: formData.email,
                password: formData.password,
                level: formData.level

            });

            // Nếu đăng nhập thành công, lưu token vào localStorage và điều hướng đến trang chính
            localStorage.setItem("token", response.data.token);
            // Lưu thông tin user vào localStorage
            localStorage.setItem("userData", JSON.stringify(response.data));
            alert("Đăng nhập thành công");
            navigate("/");
        } catch (error) {
            // Nếu có lỗi trong quá trình đăng nhập, hiển thị thông báo lỗi
            setFormErrors("Email hoặc mật khẩu không đúng");
        }
    };

    return (
        <div className="login">
            {/* Form đăng nhập */}
            <form onSubmit={handleSubmit} className="login-form">
                {/* Input email */}
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                {/* Input password */}
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                <input type="hidden"  name="level" value={formData.level} onChange={handleInputChange} />

                {/* Nút đăng nhập */}
                <button type="submit">Đăng nhập</button>
            </form>
            {/* Hiển thị thông báo lỗi nếu có */}
            {formErrors && <div className="error-message">{formErrors}</div>}
        </div>
    );
}

export default Login;
