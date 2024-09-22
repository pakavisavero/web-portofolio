// src/app/layout.js
import localFont from "next/font/local";
import "./globals.css";
import Header from "./pages/header/page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Blog Savero",
  description: "Created by Savero",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full"> {/* Add h-full to html */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full container mx-auto lg:px-8 antialiased`}
      >
        <Header />
        <div className="flex flex-col h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
