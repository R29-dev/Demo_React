import { useState, useEffect } from "react";
import ListComment from './ListComment';
import axios from 'axios';

function Comment({ idBlog }) {
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [error, setError] = useState("");
    const [level, setLevel] = useState(0);
    const [isReplying, setIsReplying] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost/laravel8/public/api/blog/detail/${idBlog}`);
                setComments(response.data.data.comment);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchData();
    }, [idBlog]);

    useEffect(() => {
        if (isReplying) {
            handleCommentSubmit();
            setIsReplying(false);
        }
    }, [isReplying]);

    const handleCommentSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Vui lòng đăng nhập để có thể bình luận.");
            return;
        }

        const userData = JSON.parse(localStorage.getItem("userData"));
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
        form.append('id_user', userData.id); // Correct property access
        form.append('cmt', message);
        form.append('name', userData.name); // Correct property access
        form.append('level', level);

        try {
            const response = await axios.post(`http://localhost/laravel8/public/api/blog/comment/${idBlog}`, form, config);
            setComments([...comments, response.data.data]);
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

    const handleReply = (commentId) => {
        setLevel(commentId);
        setIsReplying(true);
    };

    return (
        <div>
            <ListComment comments={comments} onReply={handleReply} />
            <div className="text-area">
                <div className="blank-arrow"></div>
                <textarea
                    name="message"
                    rows="11"
                    value={message}
                    onChange={handleMessageChange}
                ></textarea>
                <button className="btn btn-primary" onClick={() => setIsReplying(true)}>
                    Post Comment
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}

export default Comment;
