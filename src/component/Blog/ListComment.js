import React from 'react';

function ListComment({ comments = [], onReply }) {
    // Hàm để render các bình luận theo điều kiện
    const renderComments = (comments, parentId = 0) => {
        return comments
            .filter(comment => comment.level === parentId) // Lọc bình luận theo level hoặc id của bình luận cha
            .map((comment) => (
                <li className="media" key={comment.id}>
                    <a className="pull-left" href="#">
                        {/* <img className="media-object" src={`/upload/user/avatar${comment.avatar}`} alt="" style="width: 100px;" /> */}
                    </a>
                    <div className="media-body">
                        <ul className="sinlge-post-meta">
                            <li><i className="fa fa-user"></i>{comment.name}</li>
                            <li><i className="fa fa-clock-o"></i> {comment.created_at}</li>
                        </ul>
                        <p>{comment.cmt}</p>
                        <a className="btn btn-primary" href="#" onClick={() => onReply(comment.id)}>
                            <i className="fa fa-reply"></i> Trả lời
                        </a>
                        {/* Đệ quy để hiển thị các bình luận trả lời */}
                        <ul className="nested-comments">
                            {renderComments(comments, comment.id)}
                        </ul>
                    </div>
                </li>
            ));
    };

    
        return (
            <div className="response-area">
                <ul className="media-list">
                    {renderComments(comments)} {/* Bắt đầu từ bình luận cấp gốc với level = 0 */}
                </ul>
            </div>
        );
        
}

export default ListComment;








// import React from 'react';

// function ListComment({ comments = [], onReply }) {
//     // Hàm đệ quy để hiển thị các bình luận và các bình luận con của chúng
//     const renderComments = (comments, parentId = 0) => {
//         return comments
//             .filter(comment => comment.level === parentId)
//             .map(comment => (
//                 <li className="media" key={comment.id}>
//                     <a className="pull-left" href="#">
//                         <img className="media-object" style={{ width: '100px' }} src={`/upload/user/avatar${comment.avatar}`} alt="" />
//                     </a>
//                     <div className="media-body">
//                         <ul className="sinlge-post-meta">
//                             <li><i className="fa fa-user"></i>{comment.name}</li>
//                             <li><i className="fa fa-clock-o"></i>{comment.created_at}</li>
//                         </ul>
//                         <p>{comment.cmt}</p>
//                         <a className="btn btn-primary" href="#" onClick={() => onReply(comment.id)}>
//                             <i className="fa fa-reply"></i> Trả lời
//                         </a>
//                         {/* Hiển thị các bình luận con */}
//                         <ul className="nested-comments">
//                             {renderComments(comments, comment.id)}
//                         </ul>
//                     </div>
//                 </li>
//             ));
//     };

//     return (
//         <div className="response-area">
//             <ul className="media-list">
//                 {renderComments(comments)}
//             </ul>
//         </div>
//     );
// }

// export default ListComment;

