export default function About () {
  return (
    
     

     
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img src="https://i0.wp.com/between-the-shelves.com/wp-content/uploads/2019/01/Review-cover-image-3.jpg?fit=705%2C652&ssl=1" alt="Our Team" className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out" />
          </div>

          <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center md:text-left leading-tight">
            About Us
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Book Review is a platform that allows book lovers to share their opinions, discover new titles, and
            engage with a community of readers. Our mission is to make the process of discovering and reviewing books
            as easy and enjoyable as possible.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're looking for the latest bestseller or a hidden gem, Book Review is here to help you find your
            next great read. Our team is dedicated to bringing you the best book recommendations and providing a
            seamless platform for sharing your thoughts on your favorite books.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We are constantly working to improve the platform based on your feedback, ensuring that you have the best
            experience possible. Join us in our mission to create a community of readers who are passionate about books!
          </p>

          {/* Button */}
          <div className="flex justify-center md:justify-start mt-6">
            <a
              href="/contact"  // Replace with the appropriate link
              className="inline-block px-8 py-3 text-white bg-indigo-600 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform hover:bg-indigo-700 hover:scale-105"
            >
              Join Our Community
            </a>
          </div>
          </div>
        </div>
      </div>

      
    
  );
};
