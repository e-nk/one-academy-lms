// components/Hero.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "../layouts/Container";
import { ResponsiveText } from "../layouts/ResponsiveUtils";

const Hero = ({ slides = [] }) => {
  // State management
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  // Color schemes for each slide
  const bgColors = [
    "bg-one-secondary-peach", 
    "bg-one-secondary-fuchsia", 
    "bg-one-secondary-plum"
  ];
  
  const textColors = {
    "bg-one-secondary-peach": "text-one-primary-black",
    "bg-one-secondary-fuchsia": "text-one-primary-white",
    "bg-one-secondary-plum": "text-one-primary-white",
  };

  const buttonColors = {
    "bg-one-secondary-peach": "bg-one-primary-teal text-one-primary-white",
    "bg-one-secondary-fuchsia": "bg-one-primary-neon text-one-primary-black",
    "bg-one-secondary-plum": "bg-one-primary-neon text-one-primary-black",
  };

  // Function to go to next slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsAnimating(false);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      setIsTransitioning(false);
      // Reset animations for the new slide
      setTimeout(() => setIsAnimating(true), 50);
    }, 500);
  }, [isTransitioning, slides.length]);

  // Function to go to previous slide
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setIsAnimating(false);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      setIsTransitioning(false);
      // Reset animations for the new slide
      setTimeout(() => setIsAnimating(true), 50);
    }, 500);
  }, [isTransitioning, slides.length]);

  // Auto advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 7000); // Change slide every 7 seconds

    return () => clearTimeout(timer);
  }, [currentSlide, nextSlide]);

  // Function to render title with spans as new lines
  const renderTitle = (title) => {
    if (title.includes('<span>') && title.includes('</span>')) {
      // Split the title into parts
      const parts = title.split(/<span>|<\/span>/);
      
      // Render parts with line breaks
      return (
        <div className="flex flex-col">
          {parts.map((part, index) => {
            if (!part.trim()) return null;
            
            // First part has different styling than spans
            if (index === 0) {
              return (
                <span key={index} className="font-colfax font-bold">
                  {part.trim()}
                </span>
              );
            } else {
              return (
                <span key={index} className="font-colfax font-bold mt-2">
                  {part.trim()}
                </span>
              );
            }
          })}
        </div>
      );
    }
    
    // Return the title as is if no spans are found
    return <span className="font-colfax font-bold">{title}</span>;
  };

  // Animation variants for text animations
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Get current background color
  const currentBgColor = bgColors[currentSlide % bgColors.length];
  const currentTextColor = textColors[currentBgColor];
  const currentButtonColor = buttonColors[currentBgColor];

  return (
    <div className={`w-full ${currentBgColor} transition-colors duration-500 py-12`}>
      {/* Desktop View */}
      <Container variant="fluid">
        <div 
          className="hidden md:block relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className={`flex flex-row h-[600px] rounded-lg overflow-hidden relative`}>
            {/* Left content area - Now centered vertically better */}
            <div className="w-[45%] flex items-center z-10">
              <div className="py-8">
                <motion.div
                  key={`slide-title-${currentSlide}`}
                  initial="initial"
                  animate={isAnimating ? "animate" : "initial"}
                  variants={textVariants}
                >
                  <div className="mb-6">
                    <h1 className={`${currentTextColor} text-5xl md:text-6xl font-colfax font-bold leading-tight`}>
                      {renderTitle(slides[currentSlide].title)}
                    </h1>
                  </div>

                  <p className={`${currentTextColor} text-lg md:text-xl font-colfax mb-8`}>
                    {slides[currentSlide].description}
                  </p>

                  {/* {slides[currentSlide].ctaButton && (
                    <Link
                      href={slides[currentSlide].ctaLink || "#"}
                      className={`inline-flex items-center ${currentButtonColor} px-6 py-3 font-bold uppercase hover:bg-opacity-90 transition-colors`}
                    >
                      <span className="font-colfax font-bold text-sm">
                        {slides[currentSlide].ctaButton} <span className="ml-2">→</span>
                      </span>
                    </Link>
                  )} */}
                </motion.div>
              </div>
            </div>
            
            {/* Right media area - showing active slide's media */}
            <div className="w-[55%] relative">
              {slides.map((slide, index) => (
                <div 
                  key={`slide-media-${index}`}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    currentSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
                  }`}
                >
                  {/* Show image */}
                  {slide.imageSrc && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={slide.imageSrc}
                        alt={slide.title?.replace(/<\/?span>/g, '') || "Slide image"}
                        fill
                        className="object-contain" 
                        priority={true}
                        sizes="(max-width: 768px) 100vw, 55vw"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Navigation arrows - moved to extreme left and right */}
            <button 
              onClick={prevSlide}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 transition-all z-30 h-16 flex items-center ${
                isHovering ? 'opacity-70' : 'opacity-0'
              }`}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 transition-all z-30 h-16 flex items-center ${
                isHovering ? 'opacity-70' : 'opacity-0'
              }`}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div 
          className="md:hidden overflow-hidden relative"
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => setIsHovering(false)}
        >
          {/* Media section */}
          <div className={`relative h-[300px] transition-colors duration-500`}>
            {slides.map((slide, index) => (
              <div 
                key={`mobile-media-${index}`}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentSlide === index ? 'opacity-100 z-20' : 'opacity-0 z-10'
                }`}
              >
                {/* Show image */}
                {slide.imageSrc && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={slide.imageSrc}
                      alt={slide.title?.replace(/<\/?span>/g, '') || "Slide image"}
                      fill
                      className="object-contain" 
                      priority={true}
                      sizes="100vw"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div className={`relative transition-colors duration-500 px-4`}>
            <div className="py-8">
              <motion.div
                key={`mobile-content-${currentSlide}`}
                initial="initial"
                animate={isAnimating ? "animate" : "initial"}
                variants={textVariants}
              >
                <h1 className={`${currentTextColor} text-3xl font-colfax font-bold leading-tight mb-4`}>
                  {renderTitle(slides[currentSlide].title)}
                </h1>

                <p className={`${currentTextColor} text-base font-colfax mb-6`}>
                  {slides[currentSlide].description}
                </p>

                {slides[currentSlide].ctaButton && (
                  <Link
                    href={slides[currentSlide].ctaLink || "#"}
                    className={`inline-flex items-center ${currentButtonColor} px-5 py-3 font-bold uppercase hover:bg-opacity-90 transition-colors`}
                  >
                    <span className="font-colfax font-bold text-sm">
                      {slides[currentSlide].ctaButton} <span className="ml-2">→</span>
                    </span>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
          
          {/* Mobile Navigation arrows - moved to extreme left and right */}
          <button 
            onClick={prevSlide}
            className={`absolute left-0 top-[150px] transform -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 transition-all z-30 h-12 flex items-center ${
              isHovering ? 'opacity-70' : 'opacity-0'
            }`}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className={`absolute right-0 top-[150px] transform -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 transition-all z-30 h-12 flex items-center ${
              isHovering ? 'opacity-70' : 'opacity-0'
            }`}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Hero;