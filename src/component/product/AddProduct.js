import React, { useState, useEffect } from 'react'; // Import các hooks cần thiết từ React
import axios from 'axios'; // Import thư viện axios để gửi HTTP requests

function AddProduct() {
    // Khai báo các state sử dụng trong component
    const [isSale, setIsSale] = useState(false); // State để kiểm tra xem sản phẩm có đang được giảm giá không
    const [categories, setCategories] = useState([]); // State để lưu danh sách các danh mục sản phẩm
    const [brands, setBrands] = useState([]); // State để lưu danh sách các thương hiệu sản phẩm
    const [formData, setFormData] = useState({ // State để lưu thông tin của form
        name: '',
        price: '',
        category: '',
        brand: '',
        status: '0',
        sale: '',
        company: '',
        detail: '',
        file: [],
    });
    const [errors, setErrors] = useState({}); // State để lưu các lỗi khi validate form
    
    // useEffect để fetch danh sách category và brand từ API khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/laravel8/public/api/category-brand'); // Gửi request để lấy danh sách category và brand
                setCategories(response.data.category); // Lưu danh sách category vào state
                setBrands(response.data.brand); // Lưu danh sách brand vào state
            } catch (error) {
                console.error('Error fetching data:', error); // Log lỗi nếu có
            }
        };

        fetchData(); // Gọi hàm fetchData
    }, []); // Truyền một mảng rỗng để useEffect chỉ chạy một lần sau khi component được mount

    // Hàm xử lý khi thay đổi trạng thái sale
    const handleSaleChange = (e) => {
        setIsSale(e.target.value === "1"); // Thiết lập trạng thái isSale dựa vào giá trị của select
        setFormData({ // Cập nhật thông tin của form
            ...formData,
            status: e.target.value,
        });
    };

    // Hàm xử lý khi thay đổi giá trị các input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ // Cập nhật thông tin của form
            ...formData,
            [name]: value,
        });
    };

    // Hàm xử lý khi thay đổi tệp tin
    const handleFileChange = (e) => {
        setFormData({ // Cập nhật thông tin của form
            ...formData,
            file: e.target.files,
        });
    };

    // Hàm kiểm tra dữ liệu đầu vào của form
    const validateForm = () => {
        const errors = {}; // Khởi tạo object lưu các lỗi

        // Kiểm tra từng trường thông tin của form
        if (!formData.name) {
            errors.name = 'Tên sản phẩm là bắt buộc';
        }

        if (!formData.price || formData.price <= 0) {
            errors.price = 'Giá sản phẩm là bắt buộc và phải lớn hơn 0';
        }

        if (!formData.category) {
            errors.category = 'Danh mục sản phẩm là bắt buộc';
        }

        if (!formData.brand) {
            errors.brand = 'Thương hiệu sản phẩm là bắt buộc';
        }

        if (formData.status === '1' && (!formData.sale || formData.sale <= 0)) {
            errors.sale = 'Phần trăm giảm giá là bắt buộc và phải lớn hơn 0 khi chọn Sale';
        }

        if (!formData.company) {
            errors.company = 'Thông tin công ty là bắt buộc';
        }

        if (formData.file.length === 0) {
            errors.file = 'Ít nhất một tệp tin là bắt buộc';
        }

    if (!formData.detail) {
            errors.detail = 'Chi tiết sản phẩm là bắt buộc';
        }

        setErrors(errors); // Cập nhật state errors với các lỗi đã kiểm tra

        return Object.keys(errors).length === 0; // Trả về true nếu không có lỗi, ngược lại trả về false
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form

        if (!validateForm()) { // Kiểm tra form
            return;
        }

        const productData = new FormData(); // Khởi tạo FormData để chứa dữ liệu sản phẩm

        // Thêm thông tin sản phẩm vào FormData
        productData.append('name', formData.name);
        productData.append('price', formData.price);
        productData.append('category', formData.category);
        productData.append('brand', formData.brand);
        productData.append('status', formData.status);
        productData.append('sale', formData.sale);
        productData.append('company', formData.company);
        productData.append('detail', formData.detail);

        // Thêm các file ảnh vào FormData
        Array.from(formData.file).map((file) => {
            productData.append("file[]", file);
        });

        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            if (!token) { // Nếu không có token
                console.error('Token not found in localStorage.'); // Log lỗi
                return;
            }

            const config = { // Cấu hình cho request
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            };

            const response = await axios.post('http://localhost/laravel8/public/api/user/product/add', productData, config); // Gửi request POST để thêm sản phẩm
            console.log(response.data); // Log dữ liệu trả về từ server

            if (response.status === 200) { // Nếu request thành công
                alert("Thêm sản phẩm thành công"); // Hiển thị thông báo thành công
                return response.data; // Trả về dữ liệu từ server
            }
        } catch (error) { // Xử lý lỗi
            console.error('Error:', error); // Log lỗi
            throw error; // Ném lỗi để xử lý ở phần gọi hàm
        }
    };

    return (
        <div>
            <div className="container">
                <div className="blog-post-area">
                    <h2 className="title text-center">Product</h2>
                    <div className="signup-form">
                        <h2>Product</h2>
                      {/* Hiển thị thông báo thành công nếu có  */}
                     
                        {/* Form nhập thông tin sản phẩm */}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            {/* Input nhập tên sản phẩm */}
                            <input type="text" name="name" placeholder="Tên sản phẩm" onChange={handleInputChange} />
                            {/* Hiển thị lỗi nếu có */}
                            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                            <br />
                            {/* Input nhập giá sản phẩm */}
                            <input type="number" name="price" placeholder="Giá" onChange={handleInputChange} />
                            {/* Hiển thị lỗi nếu có */}
                            {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
                            <br />
                            {/* Dropdown chọn danh mục sản phẩm */}
                            <select className="form-select" name="category" aria-label="Default select example" onChange={handleInputChange}>
                                <option value="">Chọn danh mục</option>
                                {/* Mapping và hiển thị danh sách các danh mục */}
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.category}</option>
                                ))}
                            </select>
                            {/* Hiển thị lỗi nếu có */}
                            {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
                            <br />
                            {/* Dropdown chọn thương hiệu sản phẩm */}
                            <select className="form-select" name="brand" aria-label="Default select example" onChange={handleInputChange}>
                                <option value="">Chọn thương hiệu</option>
                                {/* Mapping và hiển thị danh sách các thương hiệu */}
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.brand}</option>
                                ))}
                            </select>
                            {/* Hiển thị lỗi nếu có */}
                            {errors.brand && <p style={{ color: 'red' }}>{errors.brand}</p>}
                            <br />
                            {/* Dropdown chọn trạng thái sản phẩm */}
                            <select className="form-select" id="saleSelect" aria-label="Default select example" onChange={handleSaleChange}>
                                <option value="0">New</option>
                                <option value="1">Sale</option>
                            </select>
                            {/* Nếu sản phẩm đang sale, hiển thị input nhập phần trăm giảm giá */}
                            {isSale && (
                                <div className="row" id="saleInputDiv">
                                    <div className="col-sm-3">
                                        <input type="number" name="sale" placeholder="0" id="saleInput" onChange={handleInputChange} />
                                    </div>
                                    <div className="col-auto">
                                        <span style={{ fontSize: '20px' }} className="form-text">%</span>
                                    </div>
                                </div>
                            )}
                            {/* Hiển thị lỗi nếu có */}
                            {errors.sale && <p style={{ color: 'red' }}>{errors.sale}</p>}
                            <br />
                            {/* Input nhập thông tin công ty */}
                            <input type="text" name="company" placeholder="Thông tin công ty" onChange={handleInputChange} />
                            {/* Hiển thị lỗi nếu có */}
                            {errors.company && <p style={{ color: 'red' }}>{errors.company}</p>}
                            <br />
                            {/* Input chọn file ảnh */}
                            <input type="file" name="file[]" multiple onChange={handleFileChange} />
                            {/* Hiển thị lỗi nếu có */}
                            {errors.file && <p style={{ color: 'red' }}>{errors.file}</p>}
                            <br />
                            {/* Textarea nhập chi tiết sản phẩm */}
                            <textarea name="detail" cols="30" rows="10" placeholder="Chi tiết sản phẩm" onChange={handleInputChange}></textarea>
                            {/* Hiển thị lỗi nếu có */}
                            {errors.detail && <p style={{ color: 'red' }}>{errors.detail}</p>}
                            <br />
                            {/* Button submit form */}
                            <button type="submit" className="btn btn-default">Thêm sản phẩm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProduct; // Xuất component để sử dụng ở các file khác

