import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-12">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-6 gap-8">
        
        {/* Social Media Links */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-lg font-bold font-poppins mb-4 text-center lg:text-left">
            FOLLOW US
          </h3>
          <div className="flex space-x-6 mt-2">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-xl hover:text-blue-600 transition-transform transform hover:scale-110" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-xl hover:text-blue-400 transition-transform transform hover:scale-110" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-xl hover:text-pink-500 transition-transform transform hover:scale-110" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-xl hover:text-blue-700 transition-transform transform hover:scale-110" />
            </a>
          </div>
        </div>

        {/* About Us */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
          <h3 className="text-lg font-bold font-poppins mb-4">ABOUT US</h3>
          <p className="text-gray-300 text-sm font-poppins leading-relaxed">
            We are a community of passionate readers dedicated to sharing honest and insightful reviews on a wide variety of books. Join us as we explore the world of literature, one page at a time!
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className="text-lg font-bold font-poppins mb-4">CONTACT US</h3>
          <p className="text-gray-300 text-sm font-poppins">📧 Email: <a href="mailto:tbdbookreviews@gmail.com" className="hover:text-white">tbdbookreviews@gmail.com</a></p>
          <p className="text-gray-300 text-sm font-poppins">📞 Phone: +94 35 425 4412</p>
          <p className="text-gray-300 text-sm font-poppins">📍 Address: No 28, Koswatta Road, Colombo 07, Sri Lanka</p>
        </div>

      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 text-center mt-8 py-4 text-gray-400 text-sm font-poppins">
        &copy; 2025 TBD Book Reviews | All Rights Reserved
      </div>
    </footer>
  );
}
