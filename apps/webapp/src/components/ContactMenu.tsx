'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-colors"
      >
        Contact Us
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <Link
            href="/contact"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Fill Contact Form
          </Link>
          <a
            href="https://wa.me/message/BARD7QDUMIJLN1"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Chat on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
