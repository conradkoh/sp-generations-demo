'use client';
import Link from 'next/link';
import Image from 'next/image';
import WhatsAppButton from '@/components/WhatsAppButton';
import ContactMenu from '@/components/ContactMenu';
import { useState } from 'react';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="SP Generations Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-900">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-900">
                About us
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-900"
              >
                Our Services
              </Link>
              <Link href="/team" className="text-gray-700 hover:text-blue-900">
                Our Team
              </Link>
              <Link
                href="/career"
                className="text-gray-700 hover:text-blue-900"
              >
                Career
              </Link>
              <ContactMenu />
            </div>
            <div className="md:hidden">
              <button
                className="text-gray-700"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                About us
              </Link>
              <Link
                href="/services"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                Our Services
              </Link>
              <Link
                href="/team"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                Our Team
              </Link>
              <Link
                href="/career"
                className="block px-3 py-2 text-gray-700 hover:text-blue-900 hover:bg-gray-50 rounded-md"
              >
                Career
              </Link>
              <div className="px-3 py-2">
                <ContactMenu />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Image Section */}
      <section className="relative w-full pt-20">
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          {' '}
          {/* 16:9 aspect ratio */}
          <Image
            src="/images/hero-bg.jpg"
            alt="Generations Team"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
            Partnering You For Generations
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto">
            Our financially savvy consultants are here to help you navigate the
            complexities of generational wealth planning. We aim to provide you
            with the peace of mind you deserve. Whether you&apos;re looking for
            solutions for your health, home, or business, we&apos;ve got you
            covered.
          </p>
          <Link
            href="/plans"
            className="bg-blue-900 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition-colors inline-block"
          >
            View Plans
          </Link>
        </div>
      </section>

      {/* Our Promise Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Customisation',
                description:
                  'We believe that a perfect plan is one that fits perfectly to your individual needs.',
                icon: '✨',
              },
              {
                title: 'Continuity',
                description:
                  "We are committed to be your family's financial life partner. You will always have the help you need to make your best financial decisions.",
                icon: '🔄',
              },
              {
                title: 'Control',
                description:
                  'We provide the insights but you make the decisions.',
                icon: '🎯',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
            Why Choose Generations?
          </h2>
          <p className="text-xl text-center mb-12">
            Many believe financial planning is just about individual goals. But,
            what if true wealth lies in generational planning?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-900 mb-4">70%</div>
              <p className="text-xl">
                of family wealth is lost by the second generation
              </p>
            </div>
            <div className="p-6">
              <div className="text-5xl font-bold text-blue-900 mb-4">90%</div>
              <p className="text-xl">by the third (according to studies)</p>
            </div>
          </div>
          <p className="text-xl text-center mt-8">Is it worth risking it?</p>
          <p className="text-xl text-center">
            We plan with you to avoid these outcomes.
          </p>
        </div>
      </section>

      {/* Beyond Financial Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            Beyond Financial Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Multi-generational Perspective',
                description:
                  'Our unique approach is designed to help you create a legacy of financial security that spans generations. We recognise that your financial goals and aspirations are not just about you but are deeply interconnected with the future of your family.',
                icon: '👨‍👩‍👧‍👦',
              },
              {
                title: 'Personalised Financial Solutions',
                description:
                  'This service is crafted to bring your financial dreams to life by customising every aspect of your financial portfolio. Our tailored strategy is designed with your financial objectives in mind - the right financial products at the right time.',
                icon: '💎',
              },
              {
                title: 'Trust and Expertise',
                description:
                  "Not only will you have a dedicated advisor who offers more than just recommendations, but also a partner who genuinely cares about your financial well-being. We'll guide you towards financial confidence and security.",
                icon: '🤝',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Plan Your Financial Future?
          </h2>
          <p className="text-xl mb-8">
            Get a personalized roadmap for your financial journey in just 3
            simple steps
          </p>
          <Link
            href="/plans"
            className="bg-white text-blue-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            View Plans
          </Link>
        </div>
      </section>

      {/* Mobile Contact Section */}
      <section className="md:hidden py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="space-y-4">
            <Link
              href="/contact"
              className="block w-full bg-blue-900 text-white px-6 py-3 rounded-full text-center hover:bg-blue-800 transition-colors"
            >
              Fill Contact Form
            </Link>
            <a
              href="https://wa.me/message/BARD7QDUMIJLN1"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 text-white px-6 py-3 rounded-full text-center hover:bg-green-700 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: generations@aia.com.sg</li>
                <li>Phone: +65 9088 2624</li>
                <li>The Arcade 11 Collyer Quay #14-01 Singapore 049317</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-400 hover:text-white"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-gray-400 hover:text-white">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className="text-gray-400 hover:text-white"
                  >
                    Career
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Legal</h3>
              <p className="text-gray-400 text-sm">
                SP-Generations is an authorised representative of AIA Singapore
                Private Limited (Reg. No. 201106386R)
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className="text-sm">
              Legal Disclaimer: This is not the official website of AIA
              Singapore Private Limited (Company Registration No. 201106386R)
              (AIA). AIA disclaims all warranties of merchantability and fitness
              for purpose of the materials on this website. AIA makes no
              warranties or representations as to the results of the use of the
              materials on this website in terms of their correctness, accuracy
              and reliability.
            </p>
            <p className="mt-4 text-sm">
              Information is correct as at 01 Dec 2023. Approval code:
              AG-CO-000853-2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
