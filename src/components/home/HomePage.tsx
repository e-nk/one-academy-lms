"use client";
import React from 'react';
import Hero from './Hero';
import slides from './slidesData';




const HomePage = () => {
  return (
    <>
      <Hero 
				slides={slides}
			/>
			
      {/* Additional sections will be added here */}
     
    </>
  );
};

export default HomePage;