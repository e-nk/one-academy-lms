"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
		{ name: "Home", href: "/" },
    { name: "Learn", href: "/learn" },
    // { name: "Get Involved", href: "/get-involved" },
    { name: "About", href: "/about" },
    // { name: "Knowledge Hub", href: "#" },
  ]

  const getHeaderClasses = () => {
    return isScrolled ? "bg-white py-3 shadow-md" : "bg-transparent py-5"
  }

  const getTextColorClass = () => {
    return isScrolled ? "text-one-primary-black" : "text-white"
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderClasses()}`}>
      <div className="w-full px-[20px] sm:px-[30px] lg:px-[40px] xl:px-[60px] mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and text */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center">
                <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                  <div className={`absolute inset-0 transition-opacity duration-300 ${!isScrolled ? "opacity-100" : "opacity-0"}`}>
                    <Image src="/one_logo/ONE-logo-white.png" alt="ONE" fill className="object-contain" priority />
                  </div>
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
                    <Image src="/one_logo/ONE-logo-black.png" alt="ONE" fill className="object-contain" priority />
                  </div>
                </div>
                <span className={`font-bold text-xl sm:text-2xl tracking-wide ml-3 transition-colors duration-300 ${getTextColorClass()}`}>ACADEMY</span>
              </div>
            </Link>

            {/* Desktop Navigation - With more space between logo and menu */}
            <nav className="hidden lg:flex space-x-8 xl:space-x-10 ml-16">
              {menuItems.map((item) => {
                const isActive = pathname !== "/" && pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative font-bold uppercase text-base tracking-wide ${getTextColorClass()} hover:text-one-primary-neon transition-colors group`}
                  >
                    {item.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-one-primary-neon transition-all duration-300 ${
                        isActive ? "w-full" : "w-0"
                      } group-hover:w-full`}
                    />
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right side - Enroll and Login */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Enroll Now Button */}
            <Link
              href="/learn"
              className="group flex items-center space-x-1 px-5 py-2.5 rounded-md text-base font-medium transition-all duration-300
                bg-one-primary-neon text-one-primary-black
                hover:bg-one-primary-black hover:text-one-primary-neon"
            >
              <span className="font-bold uppercase">Enroll Now</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            {/* Already have an account - Login */}
            <div className="flex flex-col items-center text-center">
              <span className={`text-xs ${getTextColorClass()} opacity-75 mb-1`}>Already have an account?</span>
              <Link
                href="https://online.oneacademy.org/login"
                className={`font-bold uppercase text-sm tracking-wide ${getTextColorClass()} hover:text-one-primary-neon transition-colors underline decoration-1 underline-offset-2`}
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex items-center lg:hidden">
            <Button 
              className={`p-2 ${getTextColorClass()} hover:text-one-primary-neon transition-colors`}
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Button>

            <Button
              type="button"
              className={`p-2 ml-2 ${getTextColorClass()} hover:text-one-primary-neon transition-colors`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-one-primary-black text-white border-t border-gray-800 animate-slideDown overflow-hidden">
          <div className="w-full px-[20px] sm:px-[30px]">
            <div className="py-4 space-y-1 sm:space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname !== "/" && pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2.5 rounded-md text-base font-bold uppercase transition-colors
                      hover:bg-one-primary-black hover:text-one-primary-neon
                      ${isActive ? "text-one-primary-neon" : "text-white"}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              })}

              {/* Mobile Enroll Now Button */}
              <Link
                href="/learn"
                className="group flex items-center justify-between w-full px-4 py-3 mt-4 rounded-md text-base font-bold uppercase
                  bg-one-primary-neon text-one-primary-black 
                  hover:bg-one-primary-black hover:text-one-secondary-plum transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Enroll Now</span>
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Mobile Login Option */}
              <div className="text-center mt-3 pt-3 border-t border-gray-700">
                <span className="text-xs text-gray-400 block mb-2">Already have an account?</span>
                <Link
                  href="https://online.oneacademy.org/login"
                  className="font-bold uppercase text-sm tracking-wide text-white hover:text-one-primary-neon transition-colors underline decoration-1 underline-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header