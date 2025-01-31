"use client";
import Adminlayout from "@/components/layouts/Adminlayout";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function AdminDashboard() {
  // ✅ Define state inside the component
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Adminlayout>
    <div className="flex">
      {/* ✅ Pass setIsOpen as a function */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <section className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"} p-6`}>
        <h1 className="text-primary text-center font-bold text-4xl font-poppins mb-4">
          Admin Dashboard
        </h1>

        <div className="relative">
          <Image
            src="https://thumbs.dreamstime.com/b/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg"
            alt="Bookshelf Background"
            width={1000}
            height={400}
            className="opacity-250"
          />
        </div>
      </section>
    </div>
    </Adminlayout>
  );
}
