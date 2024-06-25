import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Productdetail() {
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const token = localStorage.getItem('token'); // Giả sử token được lưu trong localStorage
            try {
                const response = await axios.get(`http://localhost/laravel8/public/api/user/product/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProduct(response.data.data);
            } catch (error) {
                console.error("Có lỗi xảy ra khi lấy dữ liệu sản phẩm!", error);
            }
        };

        fetchProduct();
    }, [id]);

    // Kiểm tra product có dữ liệu trước khi truy cập các thuộc tính của nó
    if (!product) {
        return <p>Loading...</p>;
    }

    const mainImageUrl = product.image && `http://localhost/laravel8/public/upload/product/${product.id_user}/${product.image[0]}`;
    const iconUrl = product.status === 0 
        ? 'http://localhost/laravel8/public/upload/icon/new.png' 
        : 'http://localhost/laravel8/public/upload/icon/sale.png';
    
    const firstThreeImages = product.image ? product.image.slice(0, 3) : [];
    const lastTwoImages = product.image ? product.image.slice(-2) : [];

    return (
        <div>
            <div className="product-details">
                <div className="col-sm-5">
                    <img src={iconUrl} className="newarrival" alt="" />
                    <div className="view-product">
                        <img id="img_main" src={mainImageUrl} alt={product.name} />
                        <a id="img_zoom" href={mainImageUrl} rel="prettyPhoto"><h3>ZOOM</h3></a>
                    </div>
                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <a className="left item-control" href="#similar-product" data-slide="prev">
                                    <i className="fa fa-angle-left"></i>
                                </a>
                                {firstThreeImages.map((img, index) => (
                                    <a key={index}><img className="choose" src={`http://localhost/laravel8/public/upload/product/${product.id_user}/small_${img}`} alt="Sản phẩm tương tự" /></a>
                                ))}
                            </div>
                            <div className="item">
                                {lastTwoImages.map((img, index) => (
                                    <a key={index}><img className="choose" src={`http://localhost/laravel8/public/upload/product/${product.id_user}/small_${img}`} alt="Sản phẩm tương tự" /></a>
                                ))}
                            </div>
                        </div>
                        <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                </div>
                <div className="col-sm-7">
                    <div className="product-information">
                        <h2>{product.name}</h2>
                        <p>Web ID: {product.web_id}</p>
                        <span>
                            <span>${product.price}</span>
                            <button type="button" className="btn btn-default cart">
                                <i className="fa fa-shopping-cart"></i>
                                Thêm vào giỏ
                            </button>
                        </span>
                        <p><b>Trạng thái:</b> {product.status === 0 ? 'Còn hàng' : 'Hết hàng'}</p>
                        <p><b>Tình trạng:</b> {product.condition}</p>
                        <p><b>Thương hiệu:</b> E-SHOPPER</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productdetail;
