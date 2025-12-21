
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import logo from "@/assets/login/logo.png"

import { Link } from "react-router"

const WebFooter = () => {
  return (
    <footer className="bg-[#2B4C8A] text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-8">
          {/* Logo and Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className=" ">
                   <img src={logo} alt="Logo" className="w-42 h-40 object-cover" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Proof Replaces Promises</h3>
            <p className="text-white/80 text-sm mb-5">
              The world's first digital DNA registry ensuring verified identity and trusted ownership.
            </p>
            <p className="text-white/90  text-sm">Built on Science. Not Stories.</p>
          </div>

          {/* Quick Links */}
          <div className="md:ml-12">
            <h4 className="font-semibold mb-4 ">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-white/80 hover:text-white transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/why-dna" className="text-white/80 hover:text-white transition-colors">
                  Why DNA
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal & Policy Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/faqs" className="text-white/80 hover:text-white transition-colors">
                  FAQ's
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/verification" className="text-white/80 hover:text-white transition-colors">
                  PCR Verification & Tier Standards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-white/60 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/80">© 2025 Prestige Canine Registry. All rights reserved.</p>

            <div className="flex items-center gap-4">
              <span className="text-sm text-white/80">Email: support@prestigecanineregistry.com</span>
              <div className="flex gap-3">
                <Link to="https://facebook.com" className="text-white/80 hover:text-white transition-colors hover:scale-105">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link to="https://instagram.com" className="text-white/80 hover:text-white transition-colors hover:scale-105">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link to="https://twitter.com" className="text-white/80 hover:text-white transition-colors hover:scale-105">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link to="https://linkedin.com" className="text-white/80 hover:text-white transition-colors hover:scale-105">
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default WebFooter
