import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListComment from './ListComment';
import Comment from './Comment';
import Rate from './Rate';

function BlogDetail() {
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost/laravel8/public/api/blog/detail/${id}`)
            .then(response => {
                const data = response.data.data;
                setPostData(data);
                setCommentData(data.comment);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    return (
        <div>
            <div className="blog-post-area mx-4">
                <h2 className="title text-center">Latest From our Blog</h2>
                
                <div className="single-blog-post">
                    <h3>{postData.title}</h3>
                 
                    <Rate />

                    {postData.image && (
                        <img 
                            src={`http://localhost/laravel8/public/upload/Blog/image/${postData.image}`} 
                            style={{ width: '100%' }} 
                            alt={postData.title} 
                        />
                    )}
                    <p>{postData.description}</p>
                    <div dangerouslySetInnerHTML={{ __html: postData.content }} />
                    <ListComment comments={commentData} />
                    <Comment idBlog={id} />
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
