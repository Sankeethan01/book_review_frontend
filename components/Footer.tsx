import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between px-6 py-8">
          {/* Social Media Links */}
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4 text-center md:text-left">FOLLOW US</h3>
            <div className="flex space-x-6 mt-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-xl hover:text-blue-600 transition duration-300 ease-in-out" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-xl hover:text-blue-400 transition duration-300 ease-in-out" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-xl hover:text-pink-500 transition duration-300 ease-in-out" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="text-xl hover:text-blue-700 transition duration-300 ease-in-out" />
              </a>
            </div>
          </div>

          {/* About Us */}
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4 text-center md:text-left">ABOUT US</h3>
            <p className="mt-2 text-gray-300 text-sm max-w-md text-center md:text-left">
              We are a community of passionate readers dedicated to sharing honest and insightful reviews on a wide variety of books. Join us as we explore the world of literature, one page at a time!
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold mb-4 text-center md:text-left">CONTACT US</h3>
            <p className="mt-2 text-gray-300 text-sm text-center md:text-left">Email: tbdbookreviews@gmail.com</p>
            <p className="text-gray-300 text-sm text-center md:text-left">Phone: +94 35 425 4412</p>
            <p className="text-gray-300 text-sm text-center md:text-left">Address: No 28, Koswatta Road, Colombo 07, Sri Lanka</p>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-400 text-sm">
          &copy; 2025 TBD Book Reviews | All Rights Reserved
        </div>
    </footer>
  );
}
