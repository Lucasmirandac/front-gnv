import { motion } from "motion/react";
import { Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-white to-[#8b8b8b] rounded-md flex items-center justify-center">
                <span className="text-black font-bold text-lg" style={{ fontFamily: 'Oswald, sans-serif' }}>G</span>
              </div>
              <div>
                <div className="text-sm font-bold tracking-tight text-white" style={{ fontFamily: 'Oswald, sans-serif' }}>
                  GALO NA VEIA
                </div>
                <div className="text-[10px] text-[#8b8b8b] tracking-wider">
                  CLUBE ATLÉTICO MINEIRO
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-6">
              O programa oficial de sócios-torcedores do maior clube de Minas Gerais.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              PLANOS
            </h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Força Jovem</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Massa Atleticana</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Forte e Vingador</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Comparar Planos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              SUPORTE
            </h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              CONTATO
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Rua da Bahia, 1022<br />Belo Horizonte - MG</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <span>(31) 3499-4333</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <span>contato@galonaveia.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 Clube Atlético Mineiro. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
