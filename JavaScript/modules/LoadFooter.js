function loadFooter() {
    const footerContainer = document.getElementById("footer-container");
    footerContainer.innerHTML = `
        <div class="footer">
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-6 col-md-3 footer-section gap-4">
                            <h5 class="head">Products</h5>
                            <ul class="list-unstyled">
                                <li><a href="#">Product</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">Log in</a></li>
                                <li><a href="#">Request access</a></li>
                                <li><a href="#">Partnerships</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-3 footer-section">
                            <h5 class="head">About us</h5>
                            <ul class="list-unstyled">
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Careers</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-3 footer-section">
                            <h5 class="head">Resources</h5>
                            <ul class="list-unstyled">
                                <li><a href="#">Help center</a></li>
                                <li><a href="#">Book a demo</a></li>
                                <li><a href="#">Server status</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-3 footer-section">
                            <h5 class="head">Get in touch</h5>
                            <ul class="list-unstyled">
                                <li><a href="#">Questions or feedback?</a></li>
                                <li><a href="http://linkedin.com/in/yasmin-rabea">Follow us on LinkedIn</a></li>
                            </ul>
                            <i class="fa-brands fa-facebook iconColor footerIcon"></i>
                            <i class="fa-brands fa-instagram iconColor footerIcon"></i>
                            <i class="fa-brands fa-twitter iconColor footerIcon"></i>
                            <i class="fa-brands fa-linkedin iconColor footerIcon"></i>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
                        <p><a href="#" class="text-decoration-none">Privacy Policy</a> | <a href="#"
                                class="text-decoration-none">Terms of Service</a></p>
                    </div>
                </div>
            </footer>
        </div>
    `;
}

loadFooter();
