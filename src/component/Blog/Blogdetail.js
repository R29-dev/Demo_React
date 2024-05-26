import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListComment from './ListComment';
import Comment from './Comment';
import Rate from './Rate';

function BlogDetail() {
    const [postData, setPostData] = useState({});
    const [commentData, setCommentData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost/du-an-web/public/api/blog/detail/${id}`)
            .then(response => response.json())
            .then(data => {
				console.log(data)
                setPostData(data.data.blog);
                setCommentData(data.data.comments);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

	return (
		<div>
			<div className="blog-post-area mx-4">
				<h2 className="title text-center">Latest From our Blog</h2>
				
				<div className="single-blog-post">
					<h3>{postData.Title}</h3>
					<ul class="sinlge-post-meta">
                                <li><i class="fa fa-user"></i>Đoàn Văn Công</li>
                                <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
							<Rate/>

					<img src={`http://localhost/du-an-web/public/upload/blog/image/${postData.Image}`}style={{ width: '100%' }}  alt={postData.Title} />
					<p>{postData.Description}</p>
					<div dangerouslySetInnerHTML={{ __html: postData.Content }} />
					<ListComment />
					<Comment idBlog={id} />


					
				</div>
			</div>
		</div>
	);
}

export default BlogDetail;
