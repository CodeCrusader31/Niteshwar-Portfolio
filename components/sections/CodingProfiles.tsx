"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function CodingProfiles() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const profiles = [
    {
      name: "LeetCode",
      username: "just_nikku",
      url: "https://leetcode.com/just_nikku",
      icon: "🟡",
      description: "Problem Solving & Algorithms",
      stats: [
        { label: "Problems Solved", value: "550+", icon: "✅" },
        { label: "Contest Rating", value: "1637", icon: "🏆" },
        { label: "Max Streak", value: "70 days", icon: "🔥" },
      ],
      gradient: "from-yellow-500 to-orange-500",
      borderColor: "border-yellow-500/50",
      hoverBorderColor: "hover:border-yellow-400",
      textColor: "text-yellow-400",
      bgGlow: "rgba(234, 179, 8, 0.2)",
    },
    {
      name: "GeeksforGeeks",
      username: "just_nikku",
      url: "https://www.geeksforgeeks.org/profile/mahinii5yq",
      icon: "🟢",
      description: "DSA Practice & Interview Prep",
      stats: [
        { label: "Problems Solved", value: "200+", icon: "✅" },
        { label: "Coding Score", value: "1250", icon: "⭐" },
        { label: "Practice Streak", value: "30 days", icon: "🔥" },
      ],
      gradient: "from-green-500 to-emerald-500",
      borderColor: "border-green-500/50",
      hoverBorderColor: "hover:border-green-400",
      textColor: "text-green-400",
      bgGlow: "rgba(34, 197, 94, 0.2)",
    },
    {
      name: "CodeChef",
      username: "just_nikku",
      url: "https://www.codechef.com/users/just_nikku",
      icon: "🟣",
      description: "Competitive Programming",
      stats: [
        { label: "Current Rating", value: "1580", icon: "📊" },
        { label: "Max Rating", value: "1680", icon: "🏅" },
        { label: "Contests", value: "25+", icon: "🎯" },
      ],
      gradient: "from-purple-500 to-pink-500",
      borderColor: "border-purple-500/50",
      hoverBorderColor: "hover:border-purple-400",
      textColor: "text-purple-400",
      bgGlow: "rgba(168, 85, 247, 0.2)",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="coding-profiles" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{
            x: useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-35, 35]),
            y: useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-35, 35]),
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            x: useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [35, -35]),
            y: useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [35, -35]),
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.span
            className="text-purple-400 font-mono text-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            05.
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400"
            whileHover={{ scale: 1.02 }}
          >
            Coding Profiles
          </motion.h2>
          <motion.div
            className="flex-1 h-px bg-linear-to-r from-purple-500/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        <motion.p
          className="text-gray-400 max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Competitive programming journey and problem-solving achievements across platforms.
        </motion.p>
      </motion.div>

      {/* Profiles Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {profiles.map((profile, index) => (
          <motion.div
            key={index}
            variants={item}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative h-full"
          >
            {/* Animated gradient border */}
            <motion.div
              className={`absolute -inset-px bg-linear-to-r ${profile.gradient} rounded-2xl opacity-0 blur group-hover:opacity-75 transition-opacity duration-500`}
              animate={{
                opacity: hoveredIndex === index ? 0.75 : 0,
              }}
            />

            {/* Card */}
            <motion.a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative h-full flex flex-col bg-gray-900/50 backdrop-blur-sm border ${profile.borderColor} ${profile.hoverBorderColor} rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl`}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.span
                    className="text-4xl"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {profile.icon}
                  </motion.span>
                  <div>
                    <motion.h3
                      className={`text-xl md:text-2xl font-bold ${profile.textColor}`}
                      whileHover={{ x: 5 }}
                    >
                      {profile.name}
                    </motion.h3>
                    <p className="text-xs text-gray-500 font-mono">
                      @{profile.username}
                    </p>
                  </div>
                </div>

                {/* External link icon */}
                <motion.div
                  className={`p-2 rounded-lg border ${profile.borderColor} bg-gray-800/50`}
                  whileHover={{ scale: 1.2, rotate: 45 }}
                >
                  <svg
                    className={`w-4 h-4 ${profile.textColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                className="text-gray-400 text-sm mb-6"
                whileHover={{ x: 3 }}
              >
                {profile.description}
              </motion.p>

              {/* Stats Grid */}
              <div className="grid gap-4 mt-auto">
                {profile.stats.map((stat, statIndex) => (
                  <motion.div
                    key={statIndex}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-gray-600 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: statIndex * 0.1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.span
                        className="text-xl"
                        whileHover={{ scale: 1.3 }}
                      >
                        {stat.icon}
                      </motion.span>
                      <span className="text-sm text-gray-400">{stat.label}</span>
                    </div>
                    <motion.span
                      className={`text-base font-bold ${profile.textColor}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.value}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Progress indicator */}
              <motion.div
                className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full bg-linear-to-r ${profile.gradient}`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-xs text-gray-400">Active Profile</span>
              </motion.div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${profile.bgGlow} 0%, transparent 70%)`,
                }}
              />
            </motion.a>
          </motion.div>
        ))}
      </motion.div>

      {/* Overall Stats Summary
      <motion.div
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {[
          { label: "Total Problems", value: "550+", icon: "💯", gradient: "from-yellow-500 to-orange-500" },
          { label: "Avg Rating", value: "1560", icon: "⭐", gradient: "from-green-500 to-emerald-500" },
          { label: "Contests", value: "30+", icon: "🏆", gradient: "from-purple-500 to-pink-500" },
          { label: "Global Rank", value: "Top 15%", icon: "🌍", gradient: "from-blue-500 to-cyan-500" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="relative group"
            whileHover={{ y: -5 }}
          >
            <motion.div
              className={`absolute -inset-[1px] bg-gradient-to-r ${stat.gradient} rounded-xl opacity-0 blur group-hover:opacity-50 transition-opacity duration-500`}
            />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-all">
              <motion.div
                className="text-3xl mb-2"
                whileHover={{ scale: 1.3, rotate: 10 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-1`}
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievement badge */}
      {/* <motion.div
        className="mt-12 flex justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-500/10 via-green-500/10 to-purple-500/10 border border-gray-700 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🎯
          </motion.span>
          <span className="text-sm font-medium text-gray-300">
            Consistently solving problems daily • Preparing for FAANG interviews
          </span>
        </motion.div>
      </motion.div> */} 
    </section>
  );
}