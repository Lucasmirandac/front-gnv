import { motion } from "motion/react";
import { Check, Ticket, ShoppingBag, Gift, Car, Trophy, Star, Users, Percent, Baby, Dumbbell, Beer, CreditCard, Package, Zap } from "lucide-react";
import { useState } from "react";
import planData from "../../imports/pasted_text/plan-details.json";

// Icon mapping based on the JSON icon field
const iconMap: Record<string, any> = {
  "ticket": Ticket,
  "t-shirt": Package,
  "shopping-bag": ShoppingBag,
  "gift": Gift,
  "car": Car,
  "seal-percent": Percent,
  "seal-check-bold": Star,
  "number-zero-bold": Trophy,
  "number-one-bold": Trophy,
  "number-two-bold": Trophy,
  "number-three-bold": Trophy,
  "baby": Baby,
  "barbell": Dumbbell,
  "beer": Beer,
  "identification-card": CreditCard,
  "vantagem": Zap,
  "rooster": Users,
  "soccer-ball": Trophy,
  "swimming-pool": Users,
};

// Get the main plans from the data (excluding kids and specific plans)
const allPlans = planData[0].plans;

// Filter and map the featured plans for display
const getFeaturedPlans = () => {
  // Get Premium, Forte e Vingador, and Preto plans
  const premium = allPlans.find(p => p.planName === "Premium");
  const forteVingador = allPlans.find(p => p.planName === "Forte e Vingador");
  const preto = allPlans.find(p => p.planName === "Preto");

  const plans = [forteVingador, premium, preto].filter(Boolean);

  return plans.map((plan: any, index: number) => {
    const monthlyPrice = plan.amount / 100; // Convert cents to reais
    const isPremium = plan.planName === "Premium";
    const isForteVingador = plan.planName === "Forte e Vingador";

    return {
      id: plan.idPlan,
      name: plan.planName,
      price: `R$ ${monthlyPrice.toFixed(2).replace('.', ',')}`,
      period: "/ano",
      description: isPremium 
        ? "Experiência VIP completa" 
        : isForteVingador 
        ? "O plano mais popular" 
        : "Grandes benefícios",
      popular: isForteVingador,
      premium: isPremium,
      features: plan.benefits.slice(0, 5).map((benefit: any) => ({
        icon: iconMap[benefit.icon] || Star,
        text: benefit.description,
        highlight: benefit.order <= 3,
      })),
      gradient: isPremium
        ? "from-[#D4AF37]/20 to-[#1a1a1a]"
        : isForteVingador
        ? "from-[#2a2a2a] to-[#1a1a1a]"
        : "from-[#1a1a1a] to-[#2a2a2a]",
      borderGlow: isPremium
        ? "rgba(212, 175, 55, 0.6)"
        : isForteVingador
        ? "rgba(212, 175, 55, 0.3)"
        : "rgba(255, 255, 255, 0.1)",
      allBenefits: plan.benefits,
    };
  });
};

export function MembershipTiers() {
  const [showComparison, setShowComparison] = useState(false);
  const tiers = getFeaturedPlans();

  return (
    <section id="planos" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="text-white/90 text-sm tracking-wide">PLANOS</span>
          </div>
          <h2 
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 text-white"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            ESCOLHA SEU PLANO
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Encontre o plano perfeito para acompanhar o Galo de perto
          </p>

          {/* Comparison Toggle */}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="text-[#D4AF37] hover:text-[#D4AF37]/80 text-sm font-semibold flex items-center gap-2 mx-auto transition-colors"
          >
            {showComparison ? "Ocultar" : "Ver"} comparação completa
            <motion.div
              animate={{ rotate: showComparison ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.div>
          </button>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="overflow-x-auto pb-8 scrollbar-hide -mx-4 px-4">
            <div className="flex gap-6 min-w-max lg:grid lg:grid-cols-3 lg:min-w-0">
              {tiers.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative w-[320px] lg:w-auto"
                >
                  {/* Popular/Premium Badge */}
                  {(tier.popular || tier.premium) && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div 
                        className={`px-4 py-1 rounded-full text-xs font-bold tracking-wider ${
                          tier.premium 
                            ? 'bg-[#D4AF37] text-black' 
                            : 'bg-[#FF6B35] text-white'
                        }`}
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        {tier.premium ? 'PREMIUM' : 'POPULAR'}
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`relative h-full bg-gradient-to-b ${tier.gradient} backdrop-blur-xl rounded-2xl p-8 border transition-all`}
                    style={{
                      borderColor: tier.borderGlow,
                      boxShadow: `0 0 40px ${tier.borderGlow}`,
                    }}
                  >
                    <div className="mb-6">
                      <h3 
                        className="text-2xl font-bold text-white mb-2"
                        style={{ fontFamily: 'Oswald, sans-serif' }}
                      >
                        {tier.name}
                      </h3>
                      <p className="text-white/60 text-sm">{tier.description}</p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span 
                          className={`text-5xl font-black ${
                            tier.premium ? 'text-[#D4AF37]' : 'text-white'
                          }`}
                          style={{ fontFamily: 'Oswald, sans-serif' }}
                        >
                          {tier.price}
                        </span>
                        <span className="text-white/40 text-lg">{tier.period}</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {tier.features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                              feature.highlight 
                                ? 'bg-[#D4AF37]/20 text-[#D4AF37]' 
                                : 'bg-white/5 text-white/60'
                            }`}>
                              <Icon size={16} />
                            </div>
                            <span className={`text-sm ${
                              feature.highlight ? 'text-white font-semibold' : 'text-white/70'
                            }`}>
                              {feature.text}
                            </span>
                          </div>
                        );
                      })}
                      <div className="text-xs text-white/40 pt-2">
                        + {tier.allBenefits.length - tier.features.length} benefícios adicionais
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-4 rounded-lg font-bold tracking-wide transition-all ${
                        tier.premium
                          ? 'bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black shadow-lg shadow-[#D4AF37]/20'
                          : tier.popular
                          ? 'bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white shadow-lg shadow-[#FF6B35]/20'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      }`}
                      style={{ fontFamily: 'Oswald, sans-serif' }}
                    >
                      ASSINAR AGORA
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 overflow-x-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
              COMPARAÇÃO COMPLETA
            </h3>
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 gap-4 border-b border-white/10 pb-4 mb-4">
                <div className="text-white/60 text-sm font-semibold">Benefício</div>
                {tiers.map((tier) => (
                  <div key={tier.id} className="text-white text-sm font-bold text-center">
                    {tier.name}
                  </div>
                ))}
              </div>

              {/* Get all unique benefits across all plans */}
              {Array.from(new Set(tiers.flatMap(t => t.allBenefits.map((b: any) => b.description))))
                .slice(0, 15)
                .map((benefit, i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b border-white/5">
                    <div className="text-white/80 text-sm pr-4">{benefit}</div>
                    {tiers.map((tier) => (
                      <div key={tier.id} className="flex justify-center">
                        {tier.allBenefits.some((b: any) => b.description === benefit) ? (
                          <Check className="text-[#D4AF37]" size={18} />
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* All Plans Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 
            className="text-3xl font-bold text-white mb-8 text-center"
            style={{ fontFamily: 'Oswald, sans-serif' }}
          >
            TODOS OS PLANOS
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allPlans
              .filter((p: any) => p.marketed === 1 && !['Premium', 'Forte e Vingador', 'Preto'].includes(p.planName))
              .map((plan: any, i: number) => {
                const monthlyPrice = (plan.amount / 100) / (plan.months || 12);
                return (
                  <motion.div
                    key={plan.idPlan}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 rounded-xl p-6"
                  >
                    <h4 className="text-white font-bold mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      {plan.planName}
                    </h4>
                    <div className="text-2xl font-black text-white mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
                      R$ {monthlyPrice.toFixed(2).replace('.', ',')}
                      <span className="text-sm text-white/40 font-normal">/mês</span>
                    </div>
                    <div className="text-xs text-white/60 mb-4">
                      {plan.benefits.length} benefícios
                    </div>
                    <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all">
                      Ver detalhes
                    </button>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
