import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

const StarsCanvas = dynamic(() => import("@/components/main/StarBackground"), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mahdi Yahya | Full-Stack & AI Engineer',
  description: 'Full-Stack Developer & AI Engineer. React, Next.js, Flutter, Python, Django, Firebase, Supabase, n8n, Machine Learning & Deep Learning. Building web, mobile, and AI automations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
      <StarsCanvas />
      <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  )
}
