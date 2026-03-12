import { motion } from "motion/react";
import { Users, TrendingUp, Heart, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";

const fanPhotos = [
  {
    url: "https://images.unsplash.com/photo-1735588024511-bea738d2ce30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBmYW5zJTIwY2VsZWJyYXRpbmclMjBzdGFkaXVtfGVufDF8fHx8MTc3MzIyMTQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "@galoforte",
  },
  {
    url: "https://images.unsplash.com/photo-1762013315117-1c8005ad2b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBzdGFkaXVtJTIwY3Jvd2QlMjBuaWdodCUyMGxpZ2h0cyUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzczMzMzNzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "@atleticano",
  },
  {
    url: "https://images.unsplash.com/photo-1570077965853-b426f7c29700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBzdGFkaXVtJTIwdGlja2V0JTIwUVIlMjBjb2RlfGVufDF8fHx8MTc3MzMzMzcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "@massagalo",
  },
  {
    url: "https://images.unsplash.com/photo-1761941336817-1c258e7ef78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2NjZXIlMjBzdGFkaXVtJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzMyNjk3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "@arenamrv",
  },
  {
    url: "https://images.unsplash.com/photo-1758470476264-bf1cf2b6ea66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwbWFzY290fGVufDF8fHx8MTc3MzMzMzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "@galonaveia",
  },
  {
    url: "https://images.unsplash.com/photo-1681164316544-c5b0add83383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwVklQJTIwc29jY2VyJTIwbG91bmdlfGVufDF8fHx8MTc3MzMzMzcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    user: "@vipgalo",
  },
];

export function SocialProof() {
  const [memberCount, setMemberCount] = useState(120000);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setMemberCount((prev) => prev + Math.floor(Math.random() * 5));
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Users,
      value: memberCount.toLocaleString('pt-BR'),
      label: "Sócios Ativos",
      prefix: "+",
    },
    {
      icon: TrendingUp,
      value: "45K",
      label: "Novos este ano",
      prefix: "+",
    },
    {
      icon: Heart,
      value: "98%",
      label: "Satisfação",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="text-white/90 text-sm tracking-wide">NOSSA COMUNIDADE</span>
          </div>
          <h2 
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            SOMOS MASSA
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Mais de 120 mil atleticanos unidos pela mesma paixão
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#D4AF37]/20 rounded-xl">
                      <Icon className="text-[#D4AF37]" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-1">
                        {stat.prefix && (
                          <span className="text-[#D4AF37] text-2xl font-bold">
                            {stat.prefix}
                          </span>
                        )}
                        <motion.span
                          animate={index === 0 && isAnimating ? { scale: [1, 1.1, 1] } : {}}
                          className="text-4xl font-black text-white"
                          style={{ fontFamily: 'Oswald, sans-serif' }}
                        >
                          {stat.value}
                        </motion.span>
                      </div>
                      <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                    </div>
                  </div>
                  
                  {index === 0 && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                      <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FF6B35]"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "78%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-white/60 text-xs">Meta: 150K</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fan Photos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 
              className="text-3xl font-bold text-white"
              style={{ fontFamily: 'Oswald, sans-serif' }}
            >
              #GALONAVEIA
            </h3>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors group"
            >
              <Instagram size={20} />
              <span className="text-sm font-semibold">Ver mais no Instagram</span>
              <motion.span
                className="group-hover:translate-x-1 transition-transform"
              >
                →
              </motion.span>
            </a>
          </div>

          <Masonry columnsCount={3} gutter="16px">
            {fanPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative group overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt={`Fan photo by ${photo.user}`}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 text-white">
                      <Instagram size={16} />
                      <span className="text-sm font-semibold">{photo.user}</span>
                    </div>
                    <button className="mt-2 flex items-center gap-2 text-[#D4AF37] text-sm font-semibold">
                      <Heart size={16} />
                      Curtir
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>
      </div>
    </section>
  );
}
