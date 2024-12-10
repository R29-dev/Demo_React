import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from '../Context/CartContext';

function Header() {
	const navigate = useNavigate();
	const { getCartItemCount } = useCart();


	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			if (window.location.pathname == "/account") {
				navigate("/login");
			}
		}
	}, [navigate]); // useEffect sẽ chạy lại khi navigate thay đổi

	const handleCheck = () => {
		// Lấy token từ localStorage
		const token = localStorage.getItem("token");
		// Kiểm tra xem token có tồn tại không
		return !!token; // Trả về true nếu token tồn tại, ngược lại trả về false
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};


	return (
		<div>
			<header>

				<div class="header_top">
					<div class="container">
						<div class="row">
							<div class="col-sm-6">
								<div class="contactinfo">
									<ul class="nav nav-pills">
										<li><a href="#"><i class="fa fa-phone"></i> +2 95 01 88 821</a></li>
										<li><a href="#"><i class="fa fa-envelope"></i> info@domain.com</a></li>
									</ul>
								</div>
							</div>
							<div class="col-sm-6">
								<div class="social-icons pull-right">
									<ul class="nav navbar-nav">
										<li><a href="#"><i class="fa fa-facebook"></i></a></li>
										<li><a href="#"><i class="fa fa-twitter"></i></a></li>
										<li><a href="#"><i class="fa fa-linkedin"></i></a></li>
										<li><a href="#"><i class="fa fa-dribbble"></i></a></li>
										<li><a href="#"><i class="fa fa-google-plus"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="header-middle">
					<div class="container">
						<div class="row">
							<div class="col-md-4 clearfix">
								<div class="logo pull-left">

									<Link to="/">
										<img src={process.env.PUBLIC_URL + 'frontend/images/home/logo.png'} alt="" />
									</Link>

								</div>
								<div class="btn-group pull-right clearfix">
									<div class="btn-group">
										<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
											USA
											<span class="caret"></span>
										</button>
										<ul class="dropdown-menu">
											<li><a href="">Canada</a></li>
											<li><a href="">UK</a></li>
										</ul>
									</div>

									<div class="btn-group">
										<button type="button" class="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
											DOLLAR
											<span class="caret"></span>
										</button>
										<ul class="dropdown-menu">
											<li><a href="">Canadian Dollar</a></li>
											<li><a href="">Pound</a></li>
										</ul>
									</div>
								</div>
							</div>
							<div class="col-md-8 clearfix">
								<div class="shop-menu clearfix pull-right">
									<ul class="nav navbar-nav">
										{handleCheck() ? (
											<>
												<li>
													<Link to="/product/cart">
														<i className="fa fa-shopping-cart"></i> Cart ({getCartItemCount()})
													</Link>
												</li>


												<li><Link to="/account"><i className="fa fa-user"></i> Account</Link></li>
												<li><a href="#" onClick={handleLogout}><i className="fa fa-lock"></i> Logout</a></li>
											</>
										) : (
											<>
												<li><a href="cart.html"><i class="fa fa-shopping-cart"></i> Cart</a></li>
												<li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>
												<li><Link to="/register"><i className="fa fa-lock"></i> Register</Link></li>
											</>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="header-bottom">
					<div class="container">
						<div class="row">
							<div class="col-sm-9">
								<div class="navbar-header">
									<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
										<span class="sr-only">Toggle navigation</span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
									</button>
								</div>
								<div class="mainmenu pull-left">
									<ul class="nav navbar-nav collapse navbar-collapse">
										<li><Link to="/" active="active">Home</Link></li>
										<li class="dropdown"><a href="#">Shop<i class="fa fa-angle-down"></i></a>
											<ul role="menu" class="sub-menu">
												<li><a href="shop.html">Products</a></li>
												<li><a href="product-details.html">Product Details</a></li>
												<li><a href="checkout.html">Checkout</a></li>
												<li><a href="cart.html">Cart</a></li>
												<li><a href="login.html">Login</a></li>
											</ul>
										</li>
										{/* <li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li> */}
										<li class="dropdown"><Link to="/blog">Blog<i class="fa fa-angle-down"></i></Link>
											<ul role="menu" class="sub-menu">
												<li><Link to="/blog">Blog List</Link></li>
												<li><a href="blog-single.html">Blog Single</a></li>
											</ul>
										</li>
										<li><a href="404.html">404</a></li>
										<li><a href="contact-us.html">Contact</a></li>
									</ul>
								</div>
							</div>
							<div class="col-sm-3">
								<div class="search_box pull-right">
									<input type="text" placeholder="Search" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}

export default Header;
