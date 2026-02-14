"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useState, useEffect } from "react";

// Define the shape of a skill category
interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
  gradient: string;
  iconColor: string;
  glowColor: string;
}

export default function Skills() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Mouse motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x: MotionValue<number> = useSpring(mouseX, springConfig);
  const y: MotionValue<number> = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const skillCategories: SkillCategory[] = [
    {
      title: "Programming",
      icon: "💻",
      skills: [
        "C++ (Data Structures & Algorithms)",
        "Python",
        "JavaScript (ES6+)",
        "TypeScript",
      ],
      gradient: "from-purple-500 to-pink-500",
      iconColor: "text-purple-400",
      glowColor: "rgba(168, 85, 247, 0.3)",
    },
    {
      title: "Frontend",
      icon: "🎨",
      skills: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "HTML5 & CSS3",
      ],
      gradient: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-400",
      glowColor: "rgba(59, 130, 246, 0.3)",
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: [
        "Node.js",
        "Django",
        "Express.js",
        "REST APIs",
        "GraphQL",
        "JWT Authentication",
      ],
      gradient: "from-green-500 to-emerald-500",
      iconColor: "text-green-400",
      glowColor: "rgba(34, 197, 94, 0.3)",
    },
    {
      title: "Databases",
      icon: "🗄️",
      skills: [
        "MongoDB",
        "MySQL",
        "Firebase",
        "Redis",
      ],
      gradient: "from-orange-500 to-red-500",
      iconColor: "text-orange-400",
      glowColor: "rgba(249, 115, 22, 0.3)",
    },
    {
      title: "Core Concepts",
      icon: "📚",
      skills: [
        "Data Structures & Algorithms",
        "OOP",
        "System Design (Basics)",
        "Operating Systems",
        "DBMS",
      ],
      gradient: "from-indigo-500 to-purple-500",
      iconColor: "text-indigo-400",
      glowColor: "rgba(99, 102, 241, 0.3)",
    },
    {
      title: "Tools & Technologies",
      icon: "🛠️",
      skills: [
        "Git & GitHub",
        "Postman",
        "Vercel / Railway",
        "WebSockets",
      ],
      gradient: "from-pink-500 to-rose-500",
      iconColor: "text-pink-400",
      glowColor: "rgba(236, 72, 153, 0.3)",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Helper to safely get window dimensions (default to 1000 during SSR)
  const winWidth = typeof window !== "undefined" ? window.innerWidth : 1000;
  const winHeight = typeof window !== "undefined" ? window.innerHeight : 1000;

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{
            x: useTransform(x, [0, winWidth], [-50, 50]),
            y: useTransform(y, [0, winHeight], [-50, 50]),
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            x: useTransform(x, [0, winWidth], [50, -50]),
            y: useTransform(y, [0, winHeight], [50, -50]),
          }}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
            04.
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            whileHover={{ scale: 1.02 }}
          >
            Skills & Technologies
          </motion.h2>
          <motion.div
            className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"
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
          Technologies and tools I use to build scalable, performant applications.
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            variants={item}
            onHoverStart={() => setHoveredCategory(categoryIndex)}
            onHoverEnd={() => setHoveredCategory(null)}
            className="group relative"
          >
            {/* Gradient border on hover */}
            <motion.div
              className={`absolute -inset-[1px] bg-gradient-to-r ${category.gradient} rounded-2xl opacity-0 blur group-hover:opacity-75 transition-opacity duration-500`}
              animate={{
                opacity: hoveredCategory === categoryIndex ? 0.75 : 0,
              }}
            />

            {/* Card */}
            <motion.div
              className="relative h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.span
                  className="text-4xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {category.icon}
                </motion.span>
                <motion.h3
                  className={`text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${category.gradient}`}
                  whileHover={{ x: 5 }}
                >
                  {category.title}
                </motion.h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="group/skill relative"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: skillIndex * 0.05 }}
                    onHoverStart={() =>
                      setHoveredSkill(`${categoryIndex}-${skillIndex}`)
                    }
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    {/* Skill Item */}
                    <motion.div
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors cursor-default"
                      whileHover={{ x: 8 }}
                    >
                      {/* Animated dot */}
                      <motion.div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`}
                        animate={{
                          scale:
                            hoveredSkill === `${categoryIndex}-${skillIndex}`
                              ? [1, 1.5, 1]
                              : 1,
                        }}
                        transition={{
                          duration: 0.6,
                          repeat:
                            hoveredSkill === `${categoryIndex}-${skillIndex}`
                              ? Infinity
                              : 0,
                        }}
                      />

                      {/* Skill name */}
                      <span className="text-gray-400 group-hover/skill:text-gray-200 transition-colors text-sm md:text-base">
                        {skill}
                      </span>

                      {/* Progress bar on hover */}
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${category.gradient} rounded-full`}
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Skill count badge */}
              <motion.div
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/80 border border-gray-700"
                whileHover={{ scale: 1.2, rotate: 180 }}
                transition={{ duration: 0.4 }}
              >
                <span className={`text-xs font-bold ${category.iconColor}`}>
                  {category.skills.length}
                </span>
              </motion.div>

              {/* Hover glow effect */}
              <motion.div
                className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                style={{
                  background: `radial-gradient(circle at center, ${category.glowColor} 0%, transparent 70%)`,
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats section */}
      <motion.div
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {[
          { label: "Languages", value: "4+", icon: "💻" },
          { label: "Frameworks", value: "6+", icon: "⚛️" },
          { label: "Databases", value: "4+", icon: "🗄️" },
          { label: "Tools", value: "10+", icon: "🛠️" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="relative group"
            whileHover={{ y: -5 }}
          >
            <motion.div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 blur group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center hover:border-gray-700 transition-all">
              <motion.div
                className="text-3xl mb-2"
                whileHover={{ scale: 1.3, rotate: 10 }}
              >
                {stat.icon}
              </motion.div>
              <motion.div
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-1"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Learning section */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full text-purple-300"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            📖
          </motion.span>
          <span className="text-sm font-medium">
            Currently exploring: Docker, AWS & GraphQL
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}