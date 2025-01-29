import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Welcome to Book Review!
      </h1>
      <p className="text-lg text-gray-700">
        Discover, share, and review your favorite books.
      </p>
      <div className="mt-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Explore Books
        </button>
      </div>
    </div>
  );
}
