import React, { useState } from 'react';

function AddProduct() {
    const [isSale, setIsSale] = useState(false);

    const handleSaleChange = (e) => {
        setIsSale(e.target.value === "1");
    };
    return (
        <div>
            <div className="container">
                <div className="blog-post-area">
                    <h2 className="title text-center">Product</h2>
                    <div className="signup-form">
                        <h2>Product</h2>
                        <form action="/Frontend/account/add" method="post" encType="multipart/form-data">
                            <input type="hidden" name="id_user" value="1" />
                            <input type="text" placeholder="Name" />
                            <br />
                            <input type="number" placeholder="Price" />
                            <br />
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Please choose category</option>
                                <option value="1">Category 1</option>
                                <option value="2">Category 2</option>
                            </select>
                            <br />
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Please choose brand</option>
                                <option value="1">Brand 1</option>
                                <option value="2">Brand 2</option>
                            </select>
                            <br />
                            <select className="form-select" id="saleSelect" aria-label="Default select example" onChange={handleSaleChange}>
                                <option selected>Sale</option>
                                <option value="0">New</option>
                                <option value="1">Sale</option>
                            </select>
                            {isSale && (
                                <div className="row" id="saleInputDiv">
                                    <div className="col-sm-3">
                                        <input type="number" placeholder="0" id="saleInput" />
                                    </div>
                                    <div className="col-auto">
                                        <span style={{ fontSize: '20px' }} className="form-text">%</span>
                                    </div>
                                </div>
                            )}
                            <br />
                            <input type="text" placeholder="Company profile" />
                            <br />
                            <input type="file" multiple />
                            <br />
                            <textarea cols="30" rows="10" placeholder="Detail"></textarea>
                            <br />
                            <button type="submit" className="btn btn-default">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
