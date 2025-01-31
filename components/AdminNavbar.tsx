"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="w-full bg-white shadow-md py-3 -mt-6 z-40">
      <div className="container mx-auto flex justify-center items-center px-6">
        {/* Navigation Links */}
        <nav className="flex gap-x-6">
          <Link href="/admin">
            <button className="px-5 py-2 text-white bg-primary rounded-lg hover:bg-blue-900">
              Books
            </button>
          </Link>
          <Link href="/admin/books">
            <button className="px-5 py-2 text-white bg-primary rounded-lg hover:bg-blue-900">
              Manage Books
            </button>
          </Link>
          <Link href="/admin/reviews">
            <button className="px-5 py-2 text-white bg-primary rounded-lg hover:bg-blue-900">
              Manage Reviews
            </button>
          </Link>
        </nav>
      </div>
    </div>
  );
}
