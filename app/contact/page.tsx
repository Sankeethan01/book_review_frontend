export default function Contact() {
    return (
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p>Have questions? Get in touch!</p>
        <form className="max-w-md">
          <input
            type="text"
            placeholder="Your Name"
            className="block w-full px-4 py-2 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="block w-full px-4 py-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Your Message"
            className="block w-full px-4 py-2 mb-4 border rounded"
            rows={4}
          ></textarea>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Send
          </button>
        </form>
      </div>
    );
  }
  