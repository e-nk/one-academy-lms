import React, { ReactNode, Ref} from 'react';

// Section component for page sections with responsive spacing
interface SectionProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  smallSection?: boolean;
  noTopPadding?: boolean;
  noBottomPadding?: boolean;
  backgroundImage?: string;
  as?: React.ElementType;
  id?: string;
  ref?: Ref<HTMLElement>;
}

export function Section({
  children,
  className = '',
  fullHeight = false,
  smallSection = false,
  noTopPadding = false,
  noBottomPadding = false,
  backgroundImage,
  as: Component = 'section',
  id,
  ref
}: SectionProps) {
  // Base styles with responsive padding following the CSS file
  let sectionStyles = smallSection 
    ? 'py-8 sm:py-12 md:py-14 lg:py-16' // Small section
    : 'py-12 sm:py-16 md:py-20 lg:py-24'; // Regular section
  
  // Handle padding modifiers
  if (noTopPadding) sectionStyles = sectionStyles.replace(/pt-\d+|py-\d+/g, '');
  if (noBottomPadding) sectionStyles = sectionStyles.replace(/pb-\d+|py-\d+/g, '');
  
  // Full height option
  const heightClass = fullHeight ? 'min-h-screen' : '';
  
  // Background image
  const bgStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};
  
  return (
    <Component 
      className={`relative w-full ${sectionStyles} ${heightClass} ${className}`}
      style={bgStyle}
      id={id}
      ref={ref}
    >
      {children}
    </Component>
  );
}

// Responsive Stack component that changes layout based on screen size
interface StackProps {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  gap?: 'none' | 'small' | 'medium' | 'large';
  verticalOnMobile?: boolean;
}

export function Stack({
  children,
  className = '',
  reverse = false,
  gap = 'medium',
  verticalOnMobile = true
}: StackProps) {
  // Set gap sizes
  const gapSizes = {
    none: 'gap-0',
    small: 'gap-4 md:gap-6',
    medium: 'gap-6 md:gap-8 lg:gap-10',
    large: 'gap-8 md:gap-12 lg:gap-16'
  };
  
  // Define the responsive layout
  const layout = verticalOnMobile
    ? 'flex flex-col md:flex-row'
    : 'flex flex-row';
  
  // Handle reverse order
  const order = reverse ? 'md:flex-row-reverse' : '';
  
  return (
    <div className={`${layout} ${order} ${gapSizes[gap]} ${className}`}>
      {children}
    </div>
  );
}

// Responsive text sizes following the official brand guidelines
interface ResponsiveTextProps {
  children: ReactNode;
  className?: string;
  variant?: 
    'size1' | 
    'size2' | 
    'size3' | 
    'size4' | 
    'size5' | 
    'size6' | 
    'size7' | 
    'size8' | 
    'size9' | 
    'size10' | 
    'button-small' | 
    'button-large' | 
    'footer-header';
  as?: React.ElementType;
  uppercase?: boolean;
  italic?: boolean;
}

export function ResponsiveText({
  children,
  className = '',
  variant = 'size3',
  as: Component = 'div',
  uppercase = false,
  italic = false
}: ResponsiveTextProps) {
  // Define text variants based on brand guidelines
  const textVariants = {
    // Size 1: 12px - Small buttons
    'size1': 'text-xs font-bold leading-tight tracking-normal font-colfax',
    
    // Size 2: 14px - Large buttons, small copy
    'size2': 'text-sm font-normal leading-tight tracking-normal font-colfax',
    
    // Size 3: 16px - Body copy, input fields (DEFAULT)
    'size3': 'text-base font-normal leading-relaxed tracking-normal font-colfax',
    
    // Size 4: 18px - Larger body copy, captions
    'size4': 'text-lg font-normal leading-relaxed tracking-normal font-colfax',
    
    // Size 5: 24px - Section titles, card titles
    'size5': 'text-2xl font-medium leading-tight tracking-normal font-colfax',
    
    // Size 6: 32px - Section titles
    'size6': 'text-3xl font-bold leading-tight tracking-normal font-colfax',
    
    // Size 7: 40px - Section titles
    'size7': 'text-4xl font-bold leading-tight tracking-tighter font-colfax',
    
    // Size 8: 48px - Sub headers
    'size8': 'text-5xl font-black leading-none tracking-tighter font-colfax',
    
    // Size 9: 64px - Heroes
    'size9': 'text-6xl font-black leading-none tracking-tighter uppercase font-italian-plate',
    
    // Size 10: 96px - Largest headlines
    'size10': 'text-8xl font-black leading-none tracking-tighter uppercase font-colfax',
    
    // Special variants for specific use cases
    'button-small': 'text-xs font-bold leading-none tracking-wider uppercase font-colfax',
    'button-large': 'text-sm font-bold leading-none tracking-wider uppercase font-colfax',
    'footer-header': 'text-sm font-bold leading-relaxed tracking-wider uppercase font-colfax',
  };
  
  // Apply additional text transformations if needed
  const textTransform = uppercase ? 'uppercase' : '';
  const fontStyle = italic ? 'italic' : '';
  
  return (
    <Component className={`${textVariants[variant]} ${textTransform} ${fontStyle} ${className}`}>
      {children}
    </Component>
  );
}