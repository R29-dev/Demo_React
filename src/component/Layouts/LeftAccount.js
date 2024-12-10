import { Link } from "react-router-dom";

function LeftAccount() {
    return (
        <div className="App">
            <div class="left-sidebar">
                <h2>Account</h2>
                <div class="panel-group category-products" id="accordian">

                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><Link to="/account">Account</Link></h4>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="panel-title"><Link to="/product">My Product</Link></h4>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default LeftAccount;