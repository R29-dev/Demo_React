function ListComment({ comments = [] }) {
    return (
        <div className="response-area">         
            <ul className="media-list">
                {comments.map((comment) => (
                    <li className="media" key={comment.id}>
                        <a className="pull-left" href="#">
                            {/* <img className="media-object" src="images/blog/man-two.jpg" alt=""> */}
                        </a>
                        <div className="media-body">
                            <ul className="sinlge-post-meta">
                                <li><i className="fa fa-user"></i>{comment.name}</li>
                                <li><i className="fa fa-clock-o"></i> {comment.created_at}</li>
                              
                            </ul>
                            <p>{comment.cmt}</p>
                            <a className="btn btn-primary" href="#"><i className="fa fa-reply"></i> Replay</a>
                        </div>
                    </li>
                ))}
            </ul>
            {/* <div className="col-sm-12">
                <h2>Leave a reply</h2>
            </div> */}
        </div>
    );
}

export default ListComment;
