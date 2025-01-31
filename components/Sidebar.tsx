"use client";

import { Menu, BookOpen, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void; // ✅ Ensure correct type
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();

  return (
    <div className="flex ">
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } h-screen bg-primary text-white transition-all duration-300 flex flex-col fixed left-0 top-0`}
      >
        {/* ✅ Toggle Button */}
        <button
          className="p-3 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)} // ✅ This should now work
        >
          <Menu />
        </button>

        {/* Sidebar Items */}
        <nav className="mt-5 space-y-4">
          <div className="flex items-center px-4 py-2 hover:bg-gray-700 transition rounded-md">
            <BookOpen className="w-5 h-5" />
            {isOpen && (
              <button
                onClick={() => router.push("/admin/books")}
                className="ml-3 w-64 text-white py-3 text-lg font-semibold transition duration-300"
              >
                Manage Books
              </button>
            )}
          </div>

          <div className="flex items-center px-4 py-2 hover:bg-gray-700 transition rounded-md mt-2">
            <Star className="w-5 h-5" />
            {isOpen && (
              <button
                onClick={() => router.push("/admin/reviews")}
                className="ml-3 w-64 text-white py-3 text-lg font-semibold transition duration-300"
              >
                Manage Reviews
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
