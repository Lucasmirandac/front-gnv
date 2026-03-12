import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10"
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <div className="text-white">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-[#8b8b8b] rounded-md flex items-center justify-center">
                  <span className="text-black font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>G</span>
                </div>
                <div>
                  <div className="text-sm font-bold tracking-tight" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    GALO NA VEIA
                  </div>
                  <div className="text-[10px] text-[#8b8b8b] tracking-wider">
                    CLUBE ATLÉTICO MINEIRO
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center gap-4"
          >
            <a
              href="#planos"
              className="text-white/80 hover:text-white transition-colors text-sm"
            >
              Planos
            </a>
            <a
              href="#beneficios"
              className="text-white/80 hover:text-white transition-colors text-sm"
            >
              Benefícios
            </a>
            <Link
              to="/dashboard"
              className="text-white/80 hover:text-white transition-colors text-sm"
            >
              Dashboard
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-6 py-3 rounded-lg font-semibold tracking-wide shadow-lg shadow-[#FF6B35]/20 transition-all"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              SEJA SÓCIO
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-4">
              <a
                href="#planos"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Planos
              </a>
              <a
                href="#beneficios"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Benefícios
              </a>
              <Link
                to="/dashboard"
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-6 py-3 rounded-lg font-semibold tracking-wide"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                SEJA SÓCIO
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}