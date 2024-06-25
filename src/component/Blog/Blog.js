import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blog.css'; // Import file CSS vào đây
import { Link } from "react-router-dom";

function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/laravel8/public/api/blog')
            .then(response => {
                setBlogs(response.data.blog.data);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }, []);

    return (
        <div className="App">
            <h2 className="title text-center">Latest From our Blog</h2>
            {blogs.map(blog => (
                <div className="border border-1 rounded" key={blog.id}>
                    <div className="card">
                        <div className="card-img-container">
                            <img 
                                src={`http://localhost/laravel8/public/upload/Blog/image/${blog.image}`} 
                                alt={blog.title} 
                                className="card-img" 
                            />
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{blog.title}</h5>
                            <p className="card-text">{blog.description}</p>
                            <Link to={`/blog/detail/${blog.id}`} className="btn btn-primary">Read more</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Blog;
