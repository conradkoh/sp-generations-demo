'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/message/BARD7QDUMIJLN1"
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:scale-105 transition-transform duration-200"
      >
        <Image
          src="/images/whatsapp-button.svg"
          alt="Chat on WhatsApp"
          width={60}
          height={60}
          className="w-auto h-auto"
        />
      </Link>
    </div>
  );
}
