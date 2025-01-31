"use client";

import Footer from "@/components/Footer";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

export default function Adminlayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar (Visible on All Pages) */}
      {/* <Navbar/> */}

      <div className="flex flex-grow">
        {/* Sidebar for Admin Only */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-grow p-6 bg-gray-100">{children}</main>
      </div>

      {/* Footer (Visible on All Pages) */}
      {/* <Footer /> */}
    </div>
  );
}
