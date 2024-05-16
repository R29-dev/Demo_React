import React, { useState, useEffect } from 'react';
import './Blog.css'; // Import file CSS vào đây
import { Link } from "react-router-dom";

function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost/du-an-web/public/api/blog')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBlogs(data.blog.data);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }, []);

    return (
        <div className="App">
          
                <h2 className="title text-center">Latest From our Blog</h2>
                {blogs.map(blog => (
                    <div className=" border border-1 rounded" key={blog.id}>
                        <div className="card">
                            <div className="card-img-container">
                                <img 
                                    src={`http://localhost/du-an-web/public/upload/blog/image/${blog.Image}`} 
                                    alt="" 
                                    className="card-img" 
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{blog.Title}</h5>
                                <p className="card-text">{blog.Description}</p>
                                <Link to={`/blog/detail/${blog.id}`} className="btn btn-primary">Read more</Link>
                            </div>
                        </div>
                    </div>
                ))}
           
        </div>
    );
}

export default Blog;
