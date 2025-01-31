import SecondaryNavbar from "@/components/SecondaryNavbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SecondaryNavbar />
      <section className="relative bg-white mt-[72px]">
        <Image
          src="https://images.unsplash.com/photo-1529007196863-d07650a3f0ea?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Bookshelf Background"
          layout="responsive"
          width={1000}
          height={400}
          className="opacity-5000"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h2 className="font-agbalumo text-6xl font-bold text-white">
            WELCOME TO BOOK REVIEW
          </h2>
          <Link href="/books">
            <button className="mt-4 px-6 py-4 font-bold text-lg bg-white text-primary rounded-full hover:bg-blue-500">
              Explore Books
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
