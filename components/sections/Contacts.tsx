"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Contact() {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/CodeCrusader31",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
      bgGlow: "rgba(168, 85, 247, 0.2)",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/niteshwar-kumar1426/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
      bgGlow: "rgba(59, 130, 246, 0.2)",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourhandle",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      gradient: "from-sky-500 to-blue-500",
      bgGlow: "rgba(14, 165, 233, 0.2)",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/just_nikku",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
      ),
      gradient: "from-yellow-500 to-orange-500",
      bgGlow: "rgba(234, 179, 8, 0.2)",
    },
    {
      name: "Email",
      url: "mailto:niteshwarkr2056@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: "from-pink-500 to-rose-500",
      bgGlow: "rgba(236, 72, 153, 0.2)",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{
            x: useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-40, 40]),
            y: useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [-40, 40]),
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            x: useTransform(x, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [40, -40]),
            y: useTransform(y, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [40, -40]),
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.span
            className="text-purple-400 font-mono text-lg"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            06.
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            whileHover={{ scale: 1.02 }}
          >
            Let's Connect
          </motion.h2>
          <motion.div
            className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <motion.p
          className="text-gray-400 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          I'm always open to discussing new projects, opportunities, or just having a chat. 
          Feel free to reach out!
        </motion.p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"
      >
        {/* Left Column - Contact Info & Social */}
        <motion.div variants={item} className="space-y-8">
          {/* Contact Cards */}
          <div className="space-y-4">
            <motion.a
              href="mailto:niteshwarkr2056@gmail.com"
              className="group relative block"
              whileHover={{ x: 5 }}
            >
              <motion.div
                className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 blur group-hover:opacity-75 transition-opacity duration-500"
              />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <p className="text-white font-medium group-hover:text-purple-400 transition-colors">
                     niteshwarkr2056@gmial.com
                    </p>
                  </div>
                </div>
              </div>
            </motion.a>

            <motion.div
              className="group relative block"
              whileHover={{ x: 5 }}
            >
              <motion.div
                className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 blur group-hover:opacity-75 transition-opacity duration-500"
              />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Location</p>
                    <p className="text-white font-medium">Patna, Bihar, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🌐
              </motion.span>
              Find Me Online
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  onHoverStart={() => setHoveredSocial(index)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  whileHover={{ y: -8, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Gradient border */}
                  <motion.div
                    className={`absolute -inset-[2px] bg-gradient-to-r ${social.gradient} rounded-xl opacity-0 blur group-hover:opacity-75 transition-opacity duration-500`}
                  />
                  
                  {/* Icon container */}
                  <div className="relative p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl group-hover:border-gray-600 transition-all aspect-square flex items-center justify-center">
                    <motion.div
                      className="text-gray-400 group-hover:text-white transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {social.icon}
                    </motion.div>
                  </div>

                  {/* Tooltip */}
                  <motion.div
                    className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gradient-to-r ${social.gradient} text-white text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredSocial === index ? 1 : 0,
                      y: hoveredSocial === index ? 0 : 10,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {social.name}
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-r ${social.gradient} rotate-45`} />
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${social.bgGlow} 0%, transparent 70%)`,
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Fun fact */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="absolute -inset-[1px] bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 blur group-hover:opacity-50 transition-opacity duration-500"
            />
            <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 group-hover:border-gray-700 transition-all">
              <div className="flex items-start gap-3">
                <motion.span
                  className="text-3xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💡
                </motion.span>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Quick Response</p>
                  <p className="text-white text-sm leading-relaxed">
                    I typically respond within <span className="text-green-400 font-semibold">12 hours</span>. 
                    Let's build something amazing together!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div variants={item} className="relative group">
          <motion.div
            className="absolute -inset-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl opacity-0 blur group-hover:opacity-30 transition-opacity duration-500"
          />
          
          <form
            onSubmit={handleSubmit}
            className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 space-y-6 hover:border-gray-700 transition-all"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-gray-400 text-sm mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            {/* Name Input */}
            <motion.div whileHover={{ x: 2 }}>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="John Doe"
              />
            </motion.div>

            {/* Email Input */}
            <motion.div whileHover={{ x: 2 }}>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                placeholder="john@example.com"
              />
            </motion.div>

            {/* Message Input */}
            <motion.div whileHover={{ x: 2 }}>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                placeholder="Your message here..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <motion.svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </motion.svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>

            {/* Success Message */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}