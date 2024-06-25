import React, { useState } from "react";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [sex, setSex] = useState("");
  const [errors, setErrors] = useState({});

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu và hiển thị lỗi nếu cần
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (!avatar) {
      errors.avatar = "Avatar is required";
    } else {
      if (!isValidImage(avatar)) {
        errors.avatar = "Invalid image format or size exceeds 1MB";
      }
    }

    if (!sex) {
      errors.sex = "Sex is required";
    }

    // Hiển thị các lỗi nếu có
    setErrors(errors);

    // Nếu không có lỗi, lưu thông tin vào localStorage
    if (Object.keys(errors).length === 0) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      alert("Registered successfully!");
    }
  };

  // Kiểm tra định dạng email
  const isValidEmail = (email) => {
    // Bạn có thể thực hiện kiểm tra định dạng email ở đây
    // Ví dụ đơn giản: kiểm tra email có chứa ký tự '@'
    return email.includes("@");
  };

  // Kiểm tra định dạng và kích thước của hình ảnh
  const isValidImage = (file) => {
    const allowedExtensions = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"];
    const fileSizeLimit = 1024 * 1024; // 1MB

    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return false;
    }

    const fileSize = file.size;
    if (fileSize > fileSizeLimit) {
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label htmlFor="avatar">Avatar:</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleFile}
        />
        {errors.avatar && <span>{errors.avatar}</span>}
      </div>
      <div>
        <label htmlFor="sex">Sex:</label>
        <select
          id="sex"
          name="sex"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
        >
          <option value="">Please select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.sex && <span>{errors.sex}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
