import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rahul Uniyal — Full Stack Developer | Cloud & IoT Enthusiast",
  description: "Portfolio of Rahul Uniyal — Building cloud-powered applications, intelligent IoT systems, and modern web experiences. Specializing in React, Node.js, Firebase, and Real-Time Systems.",
  keywords: ["Rahul Uniyal", "Software Engineer", "Full Stack Developer", "Cloud Engineer", "IoT Developer", "React", "Node.js", "Firebase", "ESP8266"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
