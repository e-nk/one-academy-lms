// components/Footer.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../layouts/Container';
import { ResponsiveText } from '../layouts/ResponsiveUtils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer navigation sections
  const footerSections = [
    {
      title: "Learn",
      links: [
        { name: "Courses", href: "https://online.oneacademy.org" },
        { name: "Knowledge Hub", href: "one.data.org" }
      ]
    },
    {
      title: "About",
      links: [
        { name: "Our Mission", href: "/about" },
        { name: "Partners", href: "https://www.one.org/get-involved/partner-with-us/" }
      ]
    },
    {
      title: "Get Involved",
      links: [
        { name: "Volunteer", href: "https://www.one.org/get-involved/become-a-youth-ambassador/" },
        { name: "Become a Partner", href: "https://www.one.org/get-involved/partner-with-us/" },
      ]
    }
  ];
  
  // Social media links with minimal icons
  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-one-primary-black text-white">
      {/* Main footer section */}
      <div className="border-b border-white/10">
        <Container variant="fluid">
          <div className="py-12 md:py-16">
            {/* Desktop layout */}
            <div className="hidden md:grid md:grid-cols-12 md:gap-8">
              {/* Logo and description column */}
              <div className="col-span-4 pr-8">
                {/* Updated logo and text to match header */}
                <Link href="/" className="flex items-center mb-6">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                      <Image
                        src="/one_logo/ONE-logo-white.png"
                        alt="ONE"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="font-colfax font-bold text-white text-xl sm:text-2xl tracking-wide ml-3">ACADEMY</span>
                  </div>
                </Link>
                <p className="text-white/70 mb-6 max-w-md text-sm">
									ONE Academy is a digital learning platform <strong>by the ONE Campaign</strong> designed to equip individuals with the knowledge and skills 
									needed to tackle today's most urgent social issues
								</p>

                {/* Social icons */}
                <div className="flex space-x-4">
                  {socialLinks.map((item) => (
                    <a 
                      key={item.name}
                      href={item.href}
                      className="text-white/70 hover:text-one-primary-neon transition-colors bg-white/5 p-2 rounded-full"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation columns */}
              <div className="col-span-7 grid grid-cols-3 gap-8">
                {footerSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-sm font-bold leading-relaxed tracking-wider uppercase font-colfax text-white mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-white/70 hover:text-one-primary-neon transition-colors"
                          >
                            <span className="text-sm font-normal">
                              {link.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Newsletter column */}
              <div className="col-span-1">
                <h3 className="text-sm font-bold leading-relaxed tracking-wider uppercase font-colfax text-white mb-4">
                  Stay Updated
                </h3>
                <div className="flex items-center">
                  <a 
                    href="/subscribe" 
                    className="inline-flex items-center bg-one-primary-neon text-one-primary-black hover:bg-opacity-90 px-4 py-2 transition-all"
                  >
                    <span className="text-xs font-bold leading-none tracking-wider uppercase font-colfax">
                      Subscribe
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="md:hidden space-y-8">
              {/* Logo and social links */}
              <div className="flex flex-col items-center">
                {/* Updated logo and text for mobile */}
                <Link href="/" className="flex items-center mb-6">
                  <div className="flex items-center">
                    <div className="relative h-12 w-12">
                      <Image
                        src="/one_logo/ONE-logo-white.png"
                        alt="ONE"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="font-colfax font-bold text-white text-xl tracking-wide ml-3">ACADEMY</span>
                  </div>
                </Link>
                <div className="flex justify-center space-x-4 mb-6">
                  {socialLinks.map((item) => (
                    <a 
                      key={item.name}
                      href={item.href}
                      className="text-white/70 hover:text-one-primary-neon transition-colors bg-white/5 p-2 rounded-full"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation accordion */}
              <div className="space-y-4">
                {footerSections.map((section) => (
                  <div key={section.title} className="border-b border-white/10 pb-4">
                    <h3 className="text-sm font-bold leading-relaxed tracking-wider uppercase font-colfax text-white mb-3">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-white/70 hover:text-one-primary-neon transition-colors block py-1"
                          >
                            <span className="text-sm font-normal">
                              {link.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Subscribe button */}
              <div className="flex justify-center">
                <a 
                  href="/subscribe" 
                  className="inline-flex items-center justify-center bg-one-primary-neon text-one-primary-black hover:bg-opacity-90 px-6 py-3 w-full max-w-sm transition-all"
                >
                  <span className="text-sm font-bold leading-none tracking-wider uppercase font-colfax mr-2">
                    Subscribe to Our Newsletter
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright section */}
      <Container variant="fluid">
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between">
          <span className="text-sm font-normal leading-tight tracking-normal text-white/60 mb-4 sm:mb-0">
            © {currentYear} ONE ACADEMY. All rights reserved.
          </span>
          
          <div className="flex space-x-6">
            <Link 
              href="/privacy-policy"
              className="text-white/60 hover:text-one-primary-neon transition-colors"
            >
              <span className="text-sm font-normal">
                Privacy Policy
              </span>
            </Link>
            <Link 
              href="/terms-of-service"
              className="text-white/60 hover:text-one-primary-neon transition-colors"
            >
              <span className="text-sm font-normal">
                Terms of Service
              </span>
            </Link>
            <Link 
              href="/accessibility"
              className="text-white/60 hover:text-one-primary-neon transition-colors"
            >
              <span className="text-sm font-normal">
                Accessibility
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;