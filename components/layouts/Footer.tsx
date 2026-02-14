'use client';
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-800 mt-24">
      {/* Top gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-purple-500 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Copyright */}
          <motion.p
            className="text-sm text-gray-400 text-center md:text-left"
            whileHover={{ scale: 1.02 }}
          >
            © {new Date().getFullYear()}{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-blue-400 font-semibold">
              Niteshwar Kumar
            </span>
            . All rights reserved.
          </motion.p>

          {/* Tech Stack Badge */}
          <motion.div
            className="flex items-center gap-2 text-xs text-gray-500"
            whileHover={{ scale: 1.05 }}
          >
            <span>Built with</span>
            <motion.span
              className="px-2 py-1 bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-md text-purple-300 font-medium"
              whileHover={{ y: -2 }}
            >
              Next.js
            </motion.span>
            <span>&</span>
            <motion.span
              className="px-2 py-1 bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-md text-blue-300 font-medium"
              whileHover={{ y: -2 }}
            >
              Tailwind CSS
            </motion.span>
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-purple-400 transition-colors group"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to Top</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* Made with love */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.p
            className="text-xs text-gray-600 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.1 }}
          >
            Made with
            <motion.span
              className="text-red-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            in India
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll progress bar at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-purple-500 via-pink-500 to-blue-500"
        style={{
          scaleX: typeof window !== 'undefined' && typeof document !== 'undefined'
            ? window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
            : 0,
          transformOrigin: "0%",
        }}
      />
    </footer>
  );
}