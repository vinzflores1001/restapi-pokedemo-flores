// app/layout.js
import { Inter } from 'next/font/google';
import './globals.css'; // ← This is critical!

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Pokémon Dashboard',
  description: 'A Pokémon REST API demo built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Pixel Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}