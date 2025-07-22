'use client'

import { motion } from 'framer-motion'
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/VishalXDev?tab=repositories",
      label: "GitHub"
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://twitter.com/vishaldwivedy",
      label: "Twitter"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/vishal-dwivedy",
      label: "LinkedIn"
    }
  ]

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full mt-16 border-t border-gray-800/50 backdrop-blur-sm bg-black/60"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col items-center justify-center gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1 text-sm">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span>
              Crafted with <span className="text-pink-400">♥</span> by{' '}
              <span className="text-white font-semibold hover:text-blue-400 transition-colors">
                Vishal Dwivedy
              </span>
            </span>
          </div>

          <div className="flex gap-3 mt-1">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-gray-400 hover:text-white transition-all duration-300 p-2 rounded-full hover:bg-gray-800/50"
              >
                {link.icon}
              </Link>
            ))}
          </div>

          <p className="mt-2 text-[10px] text-gray-500 text-center">
            © {new Date().getFullYear()} SecureSight. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
