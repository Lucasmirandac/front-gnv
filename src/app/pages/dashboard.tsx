import { motion } from "motion/react";
import { useState } from "react";
import { 
  Home, 
  Ticket, 
  Trophy, 
  Gift, 
  Calendar,
  User,
  LogOut,
  Clock,
  MapPin,
  QrCode,
  Star,
  TrendingUp,
  Award,
  ChevronRight,
  Bell,
} from "lucide-react";
import { Header } from "../components/header";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Visão Geral", icon: Home },
    { id: "tickets", label: "Ingressos", icon: Ticket },
    { id: "experiences", label: "Experiências", icon: Trophy },
    { id: "benefits", label: "Benefícios", icon: Gift },
    { id: "calendar", label: "Calendário", icon: Calendar },
    { id: "profile", label: "Perfil", icon: User },
  ];

  const upcomingMatches = [
    {
      opponent: "Flamengo",
      date: "15 Mar, 2026",
      time: "16:00",
      location: "Arena MRV",
      competition: "Brasileirão",
      hasTicket: true,
    },
    {
      opponent: "Palmeiras",
      date: "22 Mar, 2026",
      time: "19:00",
      location: "Arena MRV",
      competition: "Copa do Brasil",
      hasTicket: false,
    },
    {
      opponent: "River Plate",
      date: "05 Abr, 2026",
      time: "21:30",
      location: "Buenos Aires",
      competition: "Libertadores",
      hasTicket: false,
    },
  ];

  const recentActivity = [
    {
      type: "ticket",
      title: "Ingresso adquirido",
      description: "Galo x Flamengo - 15/03",
      time: "2 dias atrás",
    },
    {
      type: "points",
      title: "Pontos adicionados",
      description: "+150 pontos no programa",
      time: "5 dias atrás",
    },
    {
      type: "experience",
      title: "Tour agendado",
      description: "Arena MRV - 20/03",
      time: "1 semana atrás",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-20 flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden lg:block w-72 border-r border-white/10 min-h-screen bg-black/50 backdrop-blur-xl fixed left-0 top-20"
        >
          <div className="p-6">
            {/* User Info */}
            <div className="mb-8 p-4 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl border border-[#D4AF37]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#8b8b8b] rounded-full flex items-center justify-center">
                  <User className="text-black" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold">João Silva</h3>
                  <p className="text-white/60 text-xs">Massa Atleticana</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Pontos</span>
                <span className="text-[#D4AF37] font-bold">2,450 pts</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-white/10 text-white border border-white/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </motion.button>
                );
              })}
              
              <div className="pt-4 mt-4 border-t border-white/10">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all">
                  <LogOut size={20} />
                  <span className="font-semibold text-sm">Sair</span>
                </button>
              </div>
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 
                    className="text-4xl font-black text-white mb-2"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    BEM-VINDO DE VOLTA
                  </h1>
                  <p className="text-white/60">Confira suas próximas experiências com o Galo</p>
                </div>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all relative">
                  <Bell className="text-white" size={20} />
                  <div className="absolute top-2 right-2 w-2 h-2 bg-[#FF6B35] rounded-full" />
                </button>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Ticket, label: "Ingressos", value: "3", subtitle: "Ativos" },
                { icon: Star, label: "Pontos", value: "2,450", subtitle: "+150 este mês" },
                { icon: Trophy, label: "Experiências", value: "5", subtitle: "Agendadas" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                          <Icon className="text-[#D4AF37]" size={20} />
                        </div>
                        <ChevronRight className="text-white/40" size={20} />
                      </div>
                      <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Oswald, sans-serif' }}>
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-sm mb-1">{stat.label}</div>
                      <div className="text-[#D4AF37] text-xs">{stat.subtitle}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Next Match Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black border border-[#D4AF37]/30 rounded-3xl p-8 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="inline-block px-3 py-1 bg-[#D4AF37]/20 rounded-full mb-3">
                        <span className="text-[#D4AF37] text-xs font-bold tracking-wider">
                          PRÓXIMO JOGO
                        </span>
                      </div>
                      <h2 
                        className="text-3xl font-black text-white"
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        GALO X FLAMENGO
                      </h2>
                      <div className="flex items-center gap-4 mt-2 text-white/60 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>15 Mar, 2026</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>16:00</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span>Arena MRV</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Countdown */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Dias", value: 3 },
                      { label: "Horas", value: 14 },
                      { label: "Min", value: 27 },
                      { label: "Seg", value: 45 },
                    ].map((item, i) => (
                      <div key={i} className="bg-black/50 rounded-xl p-3 text-center">
                        <div 
                          className="text-2xl font-black text-[#D4AF37]"
                          style={{ fontFamily: 'Oswald, sans-serif' }}
                        >
                          {item.value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-white/40 text-xs">{item.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Ticket */}
                  <div className="bg-black/50 rounded-2xl p-4 border border-[#D4AF37]/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#D4AF37]/20 rounded-lg">
                          <QrCode className="text-[#D4AF37]" size={20} />
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">Ingresso Digital</div>
                          <div className="text-white/60 text-xs">Superior Leste • Cadeira 145</div>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black rounded-lg text-sm font-bold transition-all"
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        VER INGRESSO
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl blur-xl transition-all" />
                <div className="relative bg-gradient-to-br from-[#2a2a2a] to-black border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                  <h3 
                    className="text-xl font-bold text-white mb-6"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                  >
                    ATIVIDADE RECENTE
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0">
                        <div className="p-2 bg-white/10 rounded-lg mt-0.5">
                          {activity.type === "ticket" && <Ticket className="text-white/60" size={16} />}
                          {activity.type === "points" && <TrendingUp className="text-white/60" size={16} />}
                          {activity.type === "experience" && <Award className="text-white/60" size={16} />}
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-semibold mb-1">
                            {activity.title}
                          </div>
                          <div className="text-white/60 text-xs mb-1">
                            {activity.description}
                          </div>
                          <div className="text-white/40 text-xs">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Upcoming Matches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <h3 
                className="text-2xl font-bold text-white mb-6"
                style={{ fontFamily: 'Oswald, sans-serif' }}
              >
                PRÓXIMAS PARTIDAS
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {upcomingMatches.map((match, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
                      <div className="inline-block px-2 py-1 bg-white/10 rounded text-[#D4AF37] text-xs font-bold mb-4">
                        {match.competition}
                      </div>
                      <h4 className="text-white font-bold mb-3">Galo x {match.opponent}</h4>
                      <div className="space-y-2 mb-4 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{match.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{match.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{match.location}</span>
                        </div>
                      </div>
                      <button
                        className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                          match.hasTicket
                            ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`}
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        {match.hasTicket ? "VER INGRESSO" : "COMPRAR INGRESSO"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
