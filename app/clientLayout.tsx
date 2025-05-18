"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Sidebar from "@/components/sidebar"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { CustomerSupport } from "@/components/customer-support"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className="disable-transitions">
      <style jsx global>{`
        .disable-transitions * {
          transition: none !important;
        }
      `}</style>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="ai-pos-theme-preference">
          <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 shadow-sm">
                <div className="text-lg font-semibold">FoodPOS</div>
                <div className="flex items-center gap-2">
                  <CustomerSupport />
                  <DarkModeToggle />
                </div>
              </header>
              <div className="p-4">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
