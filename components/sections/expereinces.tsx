"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Experience() {
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

  const experiences = [
    {
      role: "Full Stack Intern",
      company: "Grover Techies",
      period: "April 2025 – June 2025",
      type: "Internship",
      achievements: [
        {
          text: "Designed and implemented 10+ RESTful APIs for a booking management system serving 100+ daily users with high availability.",
          icon: "🚀",
        },
        {
          text: "Implemented secure JWT-based authentication with role-based access control and Redis caching, reducing login latency by 60%.",
          icon: "🔐",
        },
        {
          text: "Added API rate limiting and middleware-based request validation to improve security and prevent abuse.",
          icon: "🛡️",
        },
        {
          text: "Enhanced UI responsiveness and improved user workflows by optimizing frontend state management and API integration.",
          icon: "⚡",
        },
        {
          text: "Refactored reusable frontend components to improve maintainability and reduce redundant code.",
          icon: "♻️",
        },
        {
          text: "Debugged and resolved 12+ production issues using logs, testing, and structured code reviews, improving overall system stability.",
          icon: "🐛",
        },
      ],
      gradient: "from-purple-500 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.3)",
    },
    {
      role: "React Intern",
      company: "Freelance",
      period: "Jan 2025 – Feb 2025",
      type: "Freelance",
      achievements: [
        {
          text: "Built modular and reusable React components using hooks and component-driven architecture.",
          icon: "⚛️",
        },
        {
          text: "Integrated frontend with backend REST APIs, handling asynchronous data, error states, and loading flows.",
          icon: "🔄",
        },
        {
          text: "Improved UI performance by optimizing rendering logic and reducing unnecessary re-renders.",
          icon: "⚡",
        },
      ],
      gradient: "from-blue-500 to-cyan-500",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{
            x: useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-30, 30]),
            y: useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-30, 30]),
          }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            x: useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [30, -30]),
            y: useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [30, -30]),
          }}
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
            02.
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400"
            whileHover={{ scale: 1.02 }}
          >
            Where I've Worked
          </motion.h2>
          <motion.div
            className="flex-1 h-px bg-linear-to-r from-purple-500/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-8 relative"
      >
        {/* Vertical line */}
        <motion.div
          className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-linear-to-b from-purple-500 via-blue-500 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ transformOrigin: "top" }}
        />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={item}
            className="relative"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            {/* Timeline dot */}
            <motion.div
              className={`hidden md:block absolute left-8 top-8 w-4 h-4 rounded-full bg-linear-to-r ${exp.gradient} -translate-x-1/2`}
              whileHover={{ scale: 1.5 }}
              animate={{
                boxShadow:
                  hoveredIndex === index
                    ? `0 0 20px ${exp.glowColor}`
                    : "0 0 0px rgba(0,0,0,0)",
              }}
            >
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
            </motion.div>

            {/* Experience Card */}
            <motion.div
              className="md:ml-20 group relative"
              whileHover={{ x: 5 }}
            >
              {/* Gradient border on hover */}
              <motion.div
                className={`absolute -inset-px bg-linear-to-r ${exp.gradient} rounded-2xl opacity-0 blur group-hover:opacity-50 transition-opacity duration-500`}
              />

              {/* Card content */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 md:p-8 hover:border-gray-700 transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <motion.h3
                        className="text-xl md:text-2xl font-bold text-white"
                        whileHover={{ x: 5 }}
                      >
                        {exp.role}
                      </motion.h3>
                      <motion.span
                        className={`px-3 py-1 text-xs font-semibold rounded-full bg-linear-to-r ${exp.gradient} text-white`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {exp.type}
                      </motion.span>
                    </div>

                    <motion.div
                      className="flex items-center gap-2 text-gray-400"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-lg font-medium bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-400">
                        @ {exp.company}
                      </span>
                    </motion.div>
                  </div>

                  <motion.div
                    className="flex items-center gap-2 text-sm text-gray-400 font-mono"
                    whileHover={{ scale: 1.05 }}
                  >
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {exp.period}
                  </motion.div>
                </div>

                {/* Achievements */}
                <div className="space-y-4">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <motion.div
                      key={achievementIndex}
                      className="flex gap-4 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: achievementIndex * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      {/* Icon */}
                      <motion.span
                        className="text-2xl mt-1 shrink-0"
                        whileHover={{ scale: 1.3, rotate: 10 }}
                      >
                        {achievement.icon}
                      </motion.span>

                      {/* Achievement text */}
                      <p className="text-gray-400 leading-relaxed group-hover/item:text-gray-300 transition-colors">
                        {achievement.text}
                      </p>

                      {/* Hover indicator */}
                      <motion.div
                        className={`absolute left-0 w-1 h-full bg-linear-to-b ${exp.gradient} rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Tech stack tags (optional) */}
                <motion.div
                  className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-800"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {index === 0 ? (
                    <>
                      {["Node.js", "Express", "JWT", "Redis", "REST API"].map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full hover:border-purple-400/40 transition-colors cursor-default"
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </>
                  ) : (
                    <>
                      {["React", "Hooks", "REST API", "JavaScript"].map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full hover:border-blue-400/40 transition-colors cursor-default"
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        
      </motion.div>
    </section>
  );
}