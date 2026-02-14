"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });

  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
      {/* Animated background linear orbs */}
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transformed values for background orbs
  const bgOrb1X = useTransform(x, [0, windowSize.width], [-50, 50]);
  const bgOrb1Y = useTransform(y, [0, windowSize.height], [-50, 50]);
  const bgOrb2X = useTransform(x, [0, windowSize.width], [50, -50]);
  const bgOrb2Y = useTransform(y, [0, windowSize.height], [50, -50]);
  const bgOrb3X = useTransform(x, [0, windowSize.width], [-30, 30]);
  const bgOrb3Y = useTransform(y, [0, windowSize.height], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
    },
  };

  return (
    <section className="relative flex flex-col justify-center items-center min-h-[90vh] overflow-hidden px-4 md:px-8">
      {/* Custom cursor follower */}
      <motion.div
        className="fixed w-6 h-6 rounded-full border-2 border-purple-400 pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          style={{ x: bgOrb1X, y: bgOrb1Y }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: bgOrb2X, y: bgOrb2Y }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: bgOrb3X, y: bgOrb3Y }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

      {/* Mouse glow effect */}
      <motion.div
        className="hidden lg:block fixed w-96 h-96 rounded-full pointer-events-none -z-10 blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
          left: x,
          top: y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Main Content Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left Column - Text Content */}
        <div className="order-2 lg:order-1">
          {/* Badge - Updated text */}
          <motion.div
            variants={item}
            className="mb-6"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-sm font-medium text-purple-300 cursor-default hover:border-purple-400/40 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Ready for onsite/remote job
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={item}
            className="text-purple-400 font-mono text-sm md:text-base mb-4 tracking-wide group cursor-default"
            whileHover={{ x: 10 }}
          >
            <span className="inline-block group-hover:animate-pulse">&lt;</span>
            hello
            <span className="inline-block group-hover:animate-pulse">
              &gt;
            </span>{" "}
            Hi, my name is
          </motion.p>

          {/* Name */}
            <motion.h1
            variants={item}
            className="text-4xl md:text-6xl lg:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-white via-white to-gray-400 cursor-default select-none"
            whileHover={{
              scale: 1.02,
              textShadow: "0 0 20px rgba(168,85,247,0.5)",
            }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            {[
              "N",
              "i",
              "t",
              "e",
              "s",
              "h",
              "w",
              "a",
              "r",
              " ",
              "K",
              "u",
              "m",
              "a",
              "r",
            ].map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                whileHover={{
                  y: -10,
                  color: "#a855f7",
                  transition: { duration: 0.2 },
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* New subtitle: Final Year Btech CSE | Full Stack Developer */}
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-gray-400 mb-6 font-medium"
          >
            Final Year Btech CSE | Full Stack Developer
          </motion.p>

          {/* About Me section heading */}
          <motion.h3
            variants={item}
            className="text-2xl font-bold text-white mb-3"
          >
            About Me
          </motion.h3>

          {/* Description (now part of About Me) */}
          <motion.p
            variants={item}
            className="max-w-xl text-base md:text-lg text-gray-400 leading-relaxed mb-10 group cursor-default"
            whileHover={{ x: 5 }}
          >
            Final-year Computer Science student at IIIT Manipur with strong
            foundations in{" "}
            <motion.span
              className="text-purple-300 font-medium inline-block"
              whileHover={{ scale: 1.1, color: "#c084fc" }}
            >
              Data Structures & Algorithms
            </motion.span>{" "}
            and{" "}
            <motion.span
              className="text-blue-300 font-medium inline-block"
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
            >
              scalable full-stack development
            </motion.span>
            . Experienced in building high-performance web applications and
            RESTful APIs using MERN and Next.js, with a focus on clean
            architecture and efficient system design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            {/* LinkedIn */}
            <MagneticButton>
              <a
                href="https://www.linkedin.com/in/niteshwar-kumar1426/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 border-2 border-purple-500/50 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
                </svg>
                <span>LinkedIn</span>
                <motion.div
                  className="absolute inset-0 bg-purple-500/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </MagneticButton>

            {/* GitHub */}
            <MagneticButton>
              <a
                href="https://github.com/CodeCrusader31"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-6 py-3 border-2 border-purple-500/50 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>GitHub</span>
                <motion.div
                  className="absolute inset-0 bg-purple-500/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </MagneticButton>

            {/* Resume */}
            <MagneticButton>
              <a
                href="https://drive.google.com/file/d/1z_eCTUllUXBDgmIBA-T8g4n4zA9cfWQ7/view?usp=drivesdk"
                download
                className="group relative px-6 py-3 border-2 border-purple-500/50 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center gap-2"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Resume</span>
                <motion.div
                  className="absolute inset-0 bg-purple-500/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </MagneticButton>
          </motion.div>

          {/* Social Links (replaces tech stack) */}
          {/* <motion.div variants={item} className="flex flex-wrap items-center gap-4 text-gray-500">
            <span className="text-sm font-medium text-gray-400">Connect:</span>
            <SocialLink href="https://www.linkedin.com/in/niteshwar-kumar1426/" label="LinkedIn" icon="linkedin" />
            <SocialLink href="https://github.com/CodeCrusader31" label="GitHub" icon="github" />
            <SocialLink href="/resume.pdf" label="Resume" icon="resume" download />
          </motion.div> */}
        </div>

        {/* Right Column - Profile Image + Slogan */}
        <motion.div
          variants={item}
          className="order-1 lg:order-2 flex flex-col items-center lg:items-end gap-6"
        >
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
          >
            {/* Animated border gradient */}
            <motion.div
              className="absolute -inset-1 bg-linear-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Image container */}
            <div className="relative">
              <motion.div
                className="relative 
             w-64 h-80 
             md:w-80 md:h-105 
             lg:w-96 lg:h-130 
             rounded-2xl overflow-hidden 
             bg-linear-to-br from-gray-900 to-gray-800 
             border border-gray-700"
                whileHover={{ rotateY: 5, rotateX: 5 }}
                style={{ perspective: 1000 }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Niteshwar Kumar"
                  fill
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                  priority
                />

                {/* Overlay gradient on hover */}
                <motion.div className="absolute inset-0 bg-linear-to-t from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.8, 0.5, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Slogan below profile image */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-center lg:text-right text-purple-300/80 italic max-w-xs text-sm md:text-base"
          >
            "Building the future with AI-powered web experiences"
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        whileHover={{ scale: 1.2 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        <motion.div
          animate={floatingAnimation}
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors"
        >
          <span className="text-xs font-medium tracking-widest">SCROLL</span>
          <motion.svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            whileHover={{ y: 5 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Magnetic Button Component (unchanged)
function MagneticButton({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

// Social Link Component (reusable)
function SocialLink({ href, label, icon, download }: { href: string; label: string; icon: string; download?: boolean }) {
  const [isHovering, setIsHovering] = useState(false);
  const Icon = () => {
    switch (icon) {
      case "linkedin":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
          </svg>
        );
      case "github":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        );
      case "resume":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.a
      href={href}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noopener noreferrer"}
      download={download}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 text-sm text-gray-300 hover:text-purple-400 hover:border-purple-400/50 transition-all"
      whileHover={{ scale: 1.1, y: -2 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <Icon />
      {label}
    </motion.a>
  );
}
