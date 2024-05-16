import { useState, useEffect } from "react";
import ListComment from './ListComment';
import axios from 'axios';

function Comment({ idBlog }) {
    
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/du-an-web/public/api/blog/detail/${idBlog}`);
                setComments(response.data.data.comments);
         
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    
        fetchData();
    }, [idBlog]);
    
    useEffect(() => {
        console.log(comments); // Đưa log ra đây để kiểm tra giá trị mới của comments
    }, [comments]);
    const handleCommentSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để có thể bình luận.");
            return;
        }

        const userData = JSON.parse(localStorage.getItem("userData"));
        console.log(userData.Auth.id);

        if (!message.trim()) {
            setError("Vui lòng nhập bình luận.");
            return;
        }

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        };
        const form = new FormData();
        form.append('id_blog', idBlog);
        form.append('id_user', userData.Auth.id); // Change userData.Auth.id to userData.id
        form.append('cmt', message); // Include the comment message
        form.append('name', userData.Auth.name); // Change userData.Auth.name to userData.name


        try {
            const response = await axios.post(`http://localhost/du-an-web/public/api/blog/comment/${idBlog}`, form, config);
            setComments([...comments, response.data.data]);
            console.log(response.data.data)
            setMessage("");
            setError("");
        } catch (error) {
            console.error('Error posting comment:', error);
            setError("Đã xảy ra lỗi khi gửi bình luận.");
        }
        
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div>
            <ListComment comments={comments} />
            <div className="text-area">
                <div className="blank-arrow">
                </div>
                <textarea
                    name="message"
                    rows="11"
                    value={message}
                    onChange={handleMessageChange}
                ></textarea>
                <button className="btn btn-primary" onClick={handleCommentSubmit}>
                    Post Comment
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}

export default Comment;
