import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">ShopMate</h2>
          <p className="text-sm text-gray-400">
            Your one-stop online store for all the latest trends and best deals.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#"><FaFacebook className="hover:text-blue-500" /></a>
            <a href="#"><FaTwitter className="hover:text-sky-400" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
            <a href="#"><FaYoutube className="hover:text-red-500" /></a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Men's Fashion</a></li>
            <li><a href="#">Women's Fashion</a></li>
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Accessories</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Affiliate Program</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} ShopMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
