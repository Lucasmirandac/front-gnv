import { motion } from "motion/react";
import { Clock, MapPin, QrCode, Calendar, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";

export function MatchdayHub() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 27,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="beneficios" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1761941336817-1c258e7ef78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2NjZXIlMjBzdGFkaXVtJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzMyNjk3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Arena MRV"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="text-white/90 text-sm tracking-wide">EXPERIÊNCIA EXCLUSIVA</span>
          </div>
          <h2 
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            MATCHDAY HUB
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Tudo que você precisa para viver o dia do jogo
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Countdown Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black border border-[#D4AF37]/30 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#D4AF37]/20 rounded-xl">
                  <Clock className="text-[#D4AF37]" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    PRÓXIMO JOGO
                  </h3>
                  <p className="text-white/60 text-sm">Galo x Flamengo</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 text-white/80">
                <MapPin size={16} />
                <span className="text-sm">Arena MRV • Belo Horizonte</span>
              </div>

              {/* Countdown */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Dias", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ].map((item, i) => (
                  <div key={i} className="bg-black/50 rounded-xl p-4 text-center">
                    <div 
                      className="text-3xl font-black text-[#D4AF37] mb-1"
                      style={{ fontFamily: 'Oswald, sans-serif' }}
                    >
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-white/60 text-xs">{item.label}</div>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black py-4 rounded-xl font-bold tracking-wide transition-all shadow-lg shadow-[#D4AF37]/20"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                GARANTIR INGRESSO
              </motion.button>
            </div>
          </motion.div>

          {/* Digital Ticket Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-gradient-to-br from-[#2a2a2a] to-black border border-white/10 rounded-3xl p-8 backdrop-blur-xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/10 rounded-xl">
                  <QrCode className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    MEU INGRESSO
                  </h3>
                  <p className="text-white/60 text-sm">Setor: Superior Leste • Cadeira 145</p>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex-1 flex items-center justify-center mb-6">
                <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-black via-[#1a1a1a] to-black rounded-xl flex items-center justify-center">
                    <QrCode className="text-white" size={80} />
                  </div>
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-4 text-center">
                <div className="text-white/60 text-xs mb-1">Status do Check-in</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white font-semibold">Ativo • Pronto para uso</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Exclusive Experiences */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            EXPERIÊNCIAS EXCLUSIVAS
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Trophy,
                title: "Tour pela Arena MRV",
                description: "Conheça os bastidores do estádio mais moderno da América Latina",
                image: "https://images.unsplash.com/photo-1761941336817-1c258e7ef78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2NjZXIlMjBzdGFkaXVtJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzMyNjk3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              },
              {
                icon: Users,
                title: "Meet & Greet",
                description: "Encontro exclusivo com jogadores e comissão técnica",
                image: "https://images.unsplash.com/photo-1758470476264-bf1cf2b6ea66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwbWFzY290fGVufDF8fHx8MTc3MzMzMzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              },
              {
                icon: Calendar,
                title: "Matchday Hospitality",
                description: "Acesso VIP com buffet premium e camarotes exclusivos",
                image: "https://images.unsplash.com/photo-1681164316544-c5b0add83383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwVklQJTIwc29jY2VyJTIwbG91bmdlfGVufDF8fHx8MTc3MzMzMzcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
              },
            ].map((experience, i) => {
              const Icon = experience.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="relative group overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>
                  
                  <div className="relative p-6 h-64 flex flex-col justify-end">
                    <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg w-fit mb-4">
                      <Icon className="text-[#D4AF37]" size={24} />
                    </div>
                    <h4 
                      className="text-xl font-bold text-white mb-2"
                      style={{ fontFamily: 'Oswald, sans-serif' }}
                    >
                      {experience.title}
                    </h4>
                    <p className="text-white/70 text-sm mb-4">
                      {experience.description}
                    </p>
                    <button className="text-[#D4AF37] hover:text-[#D4AF37]/80 text-sm font-semibold flex items-center gap-2 transition-colors">
                      Saiba mais →
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
