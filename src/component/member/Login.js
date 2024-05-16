import { useState } from "react";
import './Login.css';
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        pass: ""
    });
    const [formErrors, setFormErrors] = useState("");

    const navigate = useNavigate(); // Use useNavigate hook to get the navigate function

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Kiểm tra xem có email hoặc pass nào trống không
        if (!formData.email || !formData.pass) {
            setFormErrors("Vui lòng nhập đầy đủ email và mật khẩu");
            return;
        }

        // Kiểm tra định dạng email
        const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!re.test(formData.email)) {
            setFormErrors("Email không hợp lệ");
            return;
        }

        try {
            const response = await axios.post("http://localhost/du-an-web/public/api/login", {
                email: formData.email,
                password: formData.pass
            });
        
            // Nếu đăng nhập thành công, lưu token vào localStorage và chuyển hướng đến trang chính
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
            <form onSubmit={handleSubmit} className="login-form">
                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                <input type="password" placeholder="Password" name="pass" value={formData.pass} onChange={handleInputChange} />
                <button type="submit">Đăng nhập</button>
            </form>
            {formErrors && <div className="error-message">{formErrors}</div>}
        </div>
    );
}

export default Login;
