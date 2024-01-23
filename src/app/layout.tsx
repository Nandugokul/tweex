"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastContainer position="top-center" autoClose={1000} />
          <section className="max-w-screen-2xl m-auto px-10">
            {children}
          </section>
        </body>
      </html>
    </ReduxProvider>
  );
}
