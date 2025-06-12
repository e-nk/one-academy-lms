"use client"
import { useState } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { DarkModeToggle } from "../DarkModeToggle"
import { Search, BookMarkedIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { theme } = useTheme()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const isDark = theme === 'dark'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="w-full mx-auto px-[20px] sm:px-[30px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px]">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side - Logo and Search */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative h-10 w-10">
                <Image 
                  src={isDark ? "/one_logo/ONE-logo-white.png" : "/one_logo/ONE-logo-black.png"}
                  alt="ONE" 
                  fill 
                  className="object-contain transition-transform group-hover:scale-105" 
                  priority 
                />
              </div>
              <span className="font-colfax font-black text-xl tracking-wider text-foreground">
                ACADEMY
              </span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-9 pl-9 pr-4 text-sm rounded-full bg-input text-foreground placeholder-muted-foreground border border-border focus:bg-background focus:border-primary focus:shadow-sm focus:outline-none transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </form>
            </div>
          </div>

          {/* Right side - Navigation and Auth */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* My Courses Link */}
            <nav className="hidden md:block">
              <Link
                href="/my-courses"
                className="flex space-x-2 items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2"
              >
                <BookMarkedIcon className="h-4 w-4" />
                <span>My Courses</span>
              </Link>
            </nav>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* Auth */}
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9"
                  }
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  variant="outline"
                  size="default"
                  className="font-colfax font-semibold"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:bg-accent"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-[20px] sm:px-[30px] py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-sm bg-input text-foreground placeholder-muted-foreground border border-border rounded-full focus:outline-none focus:bg-background focus:border-primary"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>

            {/* Mobile My Courses Link */}
            <Link
              href="/my-courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-4 py-3 text-foreground font-colfax font-semibold uppercase tracking-wider text-sm hover:text-primary hover:bg-accent rounded-lg transition-all"
            >
              <BookMarkedIcon className="h-4 w-4" />
              <span>My Courses</span>
            </Link>

            {/* Mobile Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  variant="outline"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full font-colfax font-semibold"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header