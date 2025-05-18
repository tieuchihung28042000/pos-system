"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Toggle theme function - immediate switch
  const toggleTheme = () => {
    // Force immediate theme change without transitions
    document.documentElement.classList.add("disable-transitions")
    setTheme(resolvedTheme === "dark" ? "light" : "dark")

    // Allow future transitions after a tiny delay
    setTimeout(() => {
      document.documentElement.classList.remove("disable-transitions")
    }, 100)
  }

  if (!mounted) {
    return null // Avoid rendering anything until client-side to prevent hydration mismatch
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme} className="flex items-center gap-2 px-3 border-border">
      {isDark ? (
        <>
          <Sun className="h-4 w-4" />
          <span>Màu sáng</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span>Màu tối</span>
        </>
      )}
    </Button>
  )
}
