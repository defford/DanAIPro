"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        const rect = productsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Hide arrow when:
        // 1. Products section is visible (top is above viewport)
        // 2. AND we're near the bottom of the products section or at the bottom of the page
        const isProductsSectionVisible = rect.top < windowHeight;
        const isNearBottomOfPage = scrollY + windowHeight >= documentHeight - 100;
        const isNearBottomOfSection = rect.bottom <= windowHeight + 200;
        
        const shouldHide = isProductsSectionVisible && (isNearBottomOfPage || isNearBottomOfSection);
        setIsVisible(!shouldHide);
      }
    };

    // Check on mount
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <button
        onClick={scrollToProducts}
        className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce hover:bg-red-600 transition-colors cursor-pointer"
        aria-label="Scroll to products"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </div>
  );
}

