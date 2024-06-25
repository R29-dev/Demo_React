import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditProduct() {
    const [isSale, setIsSale] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        status: "",
        sale: "",
        company: "",
        detail: "",
        file: [],
        existingImages: [],
        filesToDelete: [],
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found in localStorage.');
                    return;
                }

                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                };
                const responses = await axios.get('http://localhost/laravel8/public/api/category-brand');
                setCategories(responses.data.category);
                setBrands(responses.data.brand);

                const response = await axios.get(`http://localhost/laravel8/public/api/user/product/${id}`, config);

                if (response.data.response === "success") {
                    const product = response.data.data;
                    setFormData({
                        name: product.name,
                        price: product.price,
                        category: product.id_category,
                        brand: product.id_brand,
                        status: product.status.toString(),
                        sale: product.sale || '',
                        company: product.company_profile,
                        detail: product.detail,
                        file: [],
                        existingImages: product.image,
                        filesToDelete: [],
                    });
                    setIsSale(product.status === 1);
                } else {
                    console.error('Failed to fetch product:', response.data);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSaleChange = (e) => {
        setIsSale(e.target.value === "1");
        setFormData({
            ...formData,
            status: e.target.value,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files,
        });
    };

    const handleCheckboxChange = (e, filename) => {
        const { checked } = e.target;
        setFormData((prevState) => {
            const newFilesToDelete = checked
                ? [...prevState.filesToDelete, filename]
                : prevState.filesToDelete.filter(file => file !== filename);
            return {
                ...prevState,
                filesToDelete: newFilesToDelete,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('brand', formData.brand);
        data.append('status', formData.status);
        if (formData.status === "1") {
            data.append('sale', formData.sale);
        }
        data.append('company', formData.company);
        data.append('detail', formData.detail);

        // Thêm các file ảnh vào FormData
        Array.from(formData.file).map((file) => {
            data.append("file[]", file);
        });

        // Append files to delete
        formData.filesToDelete.forEach(file => {
            data.append('avatarCheckBox[]', file);
        });

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found in localStorage.');
                return;
            }
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
            const response = await axios.post(`http://localhost/laravel8/public/api/user/product/update/${id}`, data, config);
            console.log(response.data)
            if (response.data.response === "success") {
                alert('Product updated successfully');
                return response.data; // Trả về dữ liệu từ server

            } else {
                console.error('Failed to update product:', response.data);
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="blog-post-area">
                    <h2 className="title text-center">Product</h2>
                    <div className="signup-form">
                        <h2>Edit Product</h2>
                        <form encType="multipart/form-data" onSubmit={handleSubmit}>
                            <input type="hidden" name="id_user" value="1" />
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
                            <br />
                            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} />
                            <br />
                            <select className="form-select" name="category" aria-label="Default select example" value={formData.category} onChange={handleInputChange}>
                                <option value="">Chọn danh mục</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.category}</option>
                                ))}
                            </select>
                            <br />
                            <select className="form-select" name="brand" aria-label="Default select example" value={formData.brand} onChange={handleInputChange}>
                                <option value="">Chọn thương hiệu</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.brand}</option>
                                ))}
                            </select>
                            <br />
                            <select className="form-select" id="saleSelect" value={formData.status} onChange={handleSaleChange} aria-label="Default select example">
                                <option value="0">New</option>
                                <option value="1">Sale</option>
                            </select>
                            {isSale && (
                                <div className="row" id="saleInputDiv">
                                    <div className="col-sm-3">
                                        <input type="number" name="sale" value={formData.sale} placeholder="0" id="saleInput" onChange={handleInputChange} />
                                    </div>
                                    <div className="col-auto">
                                        <span style={{ fontSize: '20px' }} className="form-text">%</span>
                                    </div>
                                </div>
                            )}
                            <br />
                            <input type="text" name="company" placeholder="Company profile" value={formData.company} onChange={handleInputChange} />
                            <br />
                            <input type="file" name="file[]" multiple onChange={handleFileChange} />
                            <br />
                            <div className="existing-files " style={{ display:`flex` }}>
                                {formData.existingImages.map((file, index) => (
                                    <div key={index} style={{padding :`10px` }}>
                                        <img src={`http://localhost/laravel8/public/upload/product/34/${file}`} alt={file} style={{ width: '100px' }} />
                                        <input
                                            type="checkbox"
                                            name="filesToDelete"
                                            value={file}
                                            onChange={(e) => handleCheckboxChange(e, file)}
                                        /> Delete
                                    </div>
                                ))}
                            </div>
                            <textarea name="detail" value={formData.detail} cols="30" rows="10" placeholder="Detail" onChange={handleInputChange}></textarea>
                            <br />
                            <button type="submit" className="btn btn-default">Update Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
