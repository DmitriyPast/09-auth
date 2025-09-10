import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ClientProvider from "@/components/TanStackProvider/TanStackProvider";
import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Welcome to NoteHub",
  openGraph: {
    title: "NoteHub",
    description: "Welcome to NoteHub",
    url: "https://notehub.com",
    images: [{
      url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      width: 1200,
      height: 630,
      alt: "NoteHub",
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub",
    description:
      "Welcome to NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ]
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <ClientProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
          <ReactQueryDevtools />
        </ClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
