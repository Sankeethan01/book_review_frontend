import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative bg-white">
    <Image
      src="https://img.pikbest.com/wp/202405/device-mobile-technology-enabled-learning-3d-and-books-on-shelves-for-online-education_9794670.jpg!f305cw"
      alt="Bookshelf Background"
      layout="responsive"
      width={1000}
      height={400}
      className="opacity-250"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
      <h2 className="text-6xl font-bold text-primary">WELCOME TO BOOK REVIEW</h2>
      
      <Link href="/books">
        <button className="mt-4 px-6 py-4 font-bold text-lg bg-primary text-white rounded-full hover:bg-blue-700">
          Explore Books
        </button>
      </Link>
    </div>
  </section>
  );
}
