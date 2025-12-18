import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "EventConnect - Book Your Next Experience",
  description: "Discover and book the hottest events, concerts, sports matches, and more. Your one-stop destination for unforgettable experiences.",
  keywords: ["events", "tickets", "concerts", "sports", "booking", "entertainment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <AuthProvider>
          <Navbar />
          <main className="pt-16">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-3xl">🎫</span>
                    <span className="font-bold text-xl">EventConnect</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Your one-stop destination for booking events, concerts, sports, and entertainment.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li><a href="/" className="hover:text-white transition-colors">Browse Events</a></li>
                    <li><a href="/my-bookings" className="hover:text-white transition-colors">My Bookings</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Categories</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li><a href="/?category=Music" className="hover:text-white transition-colors">Music</a></li>
                    <li><a href="/?category=Sports" className="hover:text-white transition-colors">Sports</a></li>
                    <li><a href="/?category=Comedy" className="hover:text-white transition-colors">Comedy</a></li>
                    <li><a href="/?category=Theatre" className="hover:text-white transition-colors">Theatre</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} EventConnect. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
