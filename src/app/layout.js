"use client";

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
  <Head>
    <title>Dashboard Pembayaran</title>
    <meta
      name="description"
      content="Aplikasi manajemen pembayaran semester berbasis Next.js"
    />
  </Head>
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-gray-100">

        <div className="flex min-h-screen">
          <SideBar
            open={sidebarOpen}
            setOpen={setSidebarOpen}/>

          <div className="flex-1 flex flex-col lg:ml-64">
            <Navbar
              onMenuClick={() => setSidebarOpen(true)}/>
            <main className="flex-1 p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
    </>
  );
}