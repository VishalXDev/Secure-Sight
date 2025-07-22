'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-white text-2xl font-bold tracking-tight cursor-pointer hover:text-blue-300 transition-colors duration-200">
                Secure<span className="text-blue-400">Sight</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center ml-auto space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700/50 cursor-pointer transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-1 bg-gray-800">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}>
              <span className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700/50 cursor-pointer transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/cameras', label: 'Cameras' },
  { href: '/scenes', label: 'Scenes' },
  { href: '/incidents', label: 'Incidents' },
  { href: '/users', label: 'Users' },
]
