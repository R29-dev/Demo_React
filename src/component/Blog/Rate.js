import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

function Rate({ idBlog }) {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");

    // Hàm để thay đổi điểm đánh giá
    const changeRating = async (newRating, name) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để có thể đánh giá.");
            return;
        }

        const userData = JSON.parse(localStorage.getItem("userData"));
        const userId = userData.Auth.id;

        // Cập nhật điểm đánh giá và thông báo trên giao diện
        setRating(newRating);
        setMessage(`Bạn đã đánh giá ${newRating} sao`);

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        };

        const data = {
            id_blog: idBlog,
            id_user: userId,
            rate: newRating,
        };

        try {
            // Gửi yêu cầu POST đến API để lưu điểm đánh giá
            const response = await axios.post(`http://localhost/du-an-web/public/api/blog/rate/${idBlog}`, data, config);
            console.log("Post response:", response);
            alert("Đánh giá đã được gửi thành công."); // Thông báo khi đánh giá được gửi thành công
        } catch (error) {
            console.error('Error posting rating:', error.response || error.message);
        }
    };

    // Lấy điểm đánh giá trung bình khi tải lại trang
    useEffect(() => {
        const fetchRating = async () => {
            try {
                // Gửi yêu cầu GET đến API để lấy điểm đánh giá trung bình
                const response = await axios.get(`http://localhost/du-an-web/public/api/blog/rate/${idBlog}`);
                const averageRating = response.data.averageRating; // Giả sử API trả về điểm trung bình
                // Cập nhật điểm đánh giá trên giao diện
                setRating(averageRating);
            } catch (error) {
                console.error('Error fetching rating:', error);
            }
        };

        fetchRating();
    }, [idBlog]);

    return (
        <div>
            {/* Hiển thị component StarRatings để cho phép người dùng đánh giá */}
            <StarRatings
                rating={rating}
                starRatedColor="yellow" // Màu sắc của các sao đã được đánh giá
                changeRating={changeRating} // Sự kiện khi người dùng thay đổi điểm đánh giá
                numberOfStars={5} // Số sao tối đa
                name='rating' // Tên của component để xác định
            />
            {/* Hiển thị thông báo về điểm đánh giá */}
            {message && <p>{message}</p>}
        </div>
    );
}

export default Rate;
