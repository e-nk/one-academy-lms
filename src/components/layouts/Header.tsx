"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { DarkModeToggle } from "../DarkModeToggle"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const menuItems = [
    { name: "Learn", href: "/learn" },
    { name: "About", href: "/about" },
    { name: "ONE.ORG", href: "https://one.org/" },
  ]

  const getHeaderClasses = () => {
    return isScrolled 
      ? "bg-white/95 backdrop-blur-md py-3 shadow-lg border-b border-gray-100" 
      : "bg-one-primary-black py-4"
  }

  const getTextColorClass = () => {
    return isScrolled 
      ? "text-one-primary-black" 
      : "text-one-primary-white"
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderClasses()}`}>
      <div className="w-full mx-auto px-[20px] sm:px-[30px] lg:px-[40px] xl:px-[60px] 2xl:px-[80px]">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10">
              <div className={`absolute inset-0 transition-opacity duration-300 ${!isScrolled ? "opacity-100" : "opacity-0"}`}>
                <Image 
                  src="/one_logo/ONE-logo-white.png" 
                  alt="ONE" 
                  fill 
                  className="object-contain transition-transform group-hover:scale-105" 
                  priority 
                />
              </div>
              <div className={`absolute inset-0 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
                <Image 
                  src="/one_logo/ONE-logo-black.png" 
                  alt="ONE" 
                  fill 
                  className="object-contain transition-transform group-hover:scale-105" 
                  priority 
                />
              </div>
            </div>
            <span className={`font-colfax font-black text-xl tracking-wider transition-colors ${getTextColorClass()} group-hover:text-one-primary-neon`}>
              ACADEMY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-colfax font-semibold text-sm uppercase tracking-wider transition-all duration-200 ${getTextColorClass()} hover:text-one-primary-neon group`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-one-primary-neon transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              )
            })}
          </nav>

          {/* Search & Auth */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-64 h-9 pl-9 pr-4 text-sm rounded-full transition-all duration-200 ${
                  isScrolled 
                    ? "bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:bg-white focus:border-one-primary-teal focus:shadow-sm" 
                    : "bg-white/10 text-white placeholder-white/70 border border-white/20 focus:bg-white/20 focus:border-white/40"
                } focus:outline-none`}
              />
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
                isScrolled ? "text-gray-400" : "text-white/70"
              }`} />
            </form>

            {/* Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  variant="outline"
                  className={`font-colfax font-semibold px-6 py-2 rounded-full border-2 transition-all duration-200 ${
                    isScrolled
                      ? "border-one-secondary-plum bg-one-secondary-plum text-white hover:bg-one-primary-black hover:border-one-primary-black"
                      : "border-white text-white hover:bg-one-primary-white hover:text-one-primary-black hover:border-one-primary-white"
                  }`}
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 rounded-full border-2 border-white/20"
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <DarkModeToggle />
            
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${getTextColorClass()} hover:bg-white/10`}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-one-primary-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="px-[20px] sm:px-[30px] py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 text-sm bg-white/10 text-white placeholder-white/70 border border-white/20 rounded-full focus:outline-none focus:bg-white/20 focus:border-white/40"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white font-colfax font-semibold uppercase tracking-wider text-sm hover:text-one-primary-neon hover:bg-white/5 rounded-lg transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button 
                  variant="outline"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full font-colfax font-semibold border-2 border-one-primary-white text-one-primary-white hover:bg-one-primary-white hover:text-one-primary-black rounded-full"
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