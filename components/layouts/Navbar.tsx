"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for scroll animations
  const navOpacity = useTransform(scrollY, [0, 50], [0.8, 0.95]);
  const navBlur = useTransform(scrollY, [0, 50], [8, 16]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["about", "experience", "projects", "skills", "coding-profiles", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b border-gray-800"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${isScrolled ? 0.95 : 0.8})`,
        backdropFilter: `blur(${isScrolled ? 16 : 8}px)`,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="relative group">
            <motion.div
              className="text-xl md:text-2xl font-bold tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated gradient text */}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-blue-400">
                  Niteshwar
                </span>
                <span className="text-gray-400">.dev</span>
                
                {/* Underline animation */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-linear-to-r from-purple-400 to-blue-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </span>

              {/* Glow effect on hover */}
              <motion.span
                className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #ec4899, #3b82f6)",
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="relative group px-4 py-2 text-sm font-medium transition-colors"
                    onClick={() => setActiveSection(link.href.substring(1))}
                  >
                    {/* Link text */}
                    <motion.span
                      className={`relative z-10 transition-colors ${
                        isActive ? "text-purple-400" : "text-gray-400 group-hover:text-white"
                      }`}
                      whileHover={{ y: -2 }}
                    >
                      {link.name}
                    </motion.span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover background */}
                    <motion.span
                      className="absolute inset-0 bg-gray-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                    />

                    {/* Bottom border animation */}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    />
                  </Link>
                </motion.div>
              );
            })}

            {/* Resume Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="https://drive.google.com/file/d/1z_eCTUllUXBDgmIBA-T8g4n4zA9cfWQ7/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-5 py-2 border-2 border-purple-500/50 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all text-sm"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
                  borderColor: "rgba(168, 85, 247, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
              </motion.a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-linear-to-r from-purple-400 to-blue-400 rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 9 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-linear-to-r from-purple-400 to-blue-400 rounded-full"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-full h-0.5 bg-linear-to-r from-purple-400 to-blue-400 rounded-full"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -9 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0,
                    x: isMobileMenuOpen ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-400"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                    onClick={() => {
                      setActiveSection(link.href.substring(1));
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <motion.span whileTap={{ x: 5 }}>
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Mobile Resume Button */}
            <motion.a
              href="https://drive.google.com/file/d/1z_eCTUllUXBDgmIBA-T8g4n4zA9cfWQ7/view?usp=drivesdk"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 border-2 border-purple-500/50 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all text-sm text-center mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: 0.3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50"
        animate={{
          opacity: isScrolled ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500"
        style={{
          scaleX: useTransform(scrollY, [0, typeof document !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 1], [0, 1]),
          transformOrigin: "0%",
        }}
      />
    </motion.nav>
  );
}