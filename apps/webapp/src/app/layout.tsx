import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ConvexClientProvider } from '@/app/ConvexClientProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SP Generations | Partnering You For Generations',
  description:
    'Our financially savvy consultants are here to help you navigate the complexities of generational wealth planning. We aim to provide you with the peace of mind you deserve.',
  keywords:
    'financial planning, wealth management, generational wealth, insurance, AIA, Singapore',
  authors: [{ name: 'SP Generations' }],
  creator: 'SP Generations',
  publisher: 'SP Generations',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_SG',
    url: 'https://www.sp-generations.com.sg',
    siteName: 'SP Generations',
    title: 'SP Generations | Partnering You For Generations',
    description:
      'Our financially savvy consultants are here to help you navigate the complexities of generational wealth planning.',
    images: [
      {
        url: '/images/hero-bg.jpg',
        width: 1200,
        height: 630,
        alt: 'SP Generations Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SP Generations | Partnering You For Generations',
    description:
      'Our financially savvy consultants are here to help you navigate the complexities of generational wealth planning.',
    images: ['/images/hero-bg.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
