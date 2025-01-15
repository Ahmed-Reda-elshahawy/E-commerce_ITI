function loadNavbar() {
    const navbarHTML = `
        <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#">BagHub</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active itemsnavhover" aria-current="page"
                                href="../Home/Home.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link itemsnavhover" href="../Home/ShopAll.html">Shop</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link itemsnavhover" href="../Home/AboutUs.html">About Us</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto d-flex justify-content-end align-items-center gap-3 w-100">
                        <li class="nav-item searchGroup navbar-nav d-flex justify-content-end align-items-center gap-2">
                            <div class="search-container d-flex justify-content-center align-items-center">
                                <input type="text" class="form-control" placeholder="Search..." id="searchInput">
                                <ul id="searchResults"></ul>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="icon btn nav-link iconhover" id="userIcon" href="#" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="fas fa-user"></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end beforelogin" id="userDropdown1">
                                <li class="dropdown-item"><a id="login" class="nav-link w-100" href="#">Login</a></li>
                                <li class="dropdown-item"><a id="signUp" class="nav-link w-100" href="#">Sign Up</a>
                                </li>
                            </ul>
                            <ul class="dropdown-menu dropdown-menu-end afterlogin" id="userDropdown2">
                                <li class="dropdown-item"><a id="logOut" class="nav-link w-100" href="#">Log Out</a>
                                </li>
                                <li class="dropdown-item"><a id="sitting" class="nav-link w-100" href="#"><i
                                            class="fa-solid fa-gear p-2"></i>Profile</a></li>
                            </ul>

                        </li>
                        <li class="nav-item">
                            <a class="icon iconhover" href="../../Html/Cart/CartPay.html"><i
                                    class="fas fa-solid fa-bag-shopping"></i></a>
                                     <span id="cart-item-count" class="cart-count">0</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    document.getElementById("navbar-container").innerHTML = navbarHTML;
}

loadNavbar();