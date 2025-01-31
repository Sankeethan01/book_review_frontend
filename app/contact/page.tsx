/* eslint-disable @next/next/no-img-element */
"use client";

import SecondaryNavbar from "@/components/SecondaryNavbar";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSuccessMessage("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });

    // Hide the success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <>
    <SecondaryNavbar />
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-white shadow-2xl rounded-lg p-10 ">
        {/* Image Section */}
        <div className="flex justify-center items-center ">
          <img
            src="https://cdn3.vectorstock.com/i/1000x1000/66/52/graphic-cartoon-character-contact-us-vector-35846652.jpg"
            alt="Contact Us"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col justify-center space-y-6 ">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center">Contact Us</h1>

          {successMessage && (
            <div className="text-green-700 bg-green-200 p-3 rounded-lg text-center font-semibold">
              {successMessage}
            </div>
          )}

          <div className="bg-white p-8 rounded-lg shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="mt-2 block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-primary text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
