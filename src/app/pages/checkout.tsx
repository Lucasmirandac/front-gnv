import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Header } from "../components/header";
import { fetchPlansMock, type Plan } from "../services/plans-api.mock";

interface CheckoutLocationState {
  mainPlanId: number;
  dependentPlanId: number | null;
}

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as Partial<CheckoutLocationState>;

  const [mainPlan, setMainPlan] = useState<Plan | null>(null);
  const [dependentPlan, setDependentPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [installments, setInstallments] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix" | "boleto">("card");

  useEffect(() => {
    const load = async () => {
      const data = await fetchPlansMock();
      const bucket = data.find((b) => b.id === 0);
      const plans = bucket?.plans ?? [];

      if (state.mainPlanId != null) {
        setMainPlan(plans.find((p) => p.idPlan === state.mainPlanId) ?? null);
      }

      if (state.dependentPlanId != null) {
        setDependentPlan(plans.find((p) => p.idPlan === state.dependentPlanId) ?? null);
      }

      setLoading(false);
    };

    load();
  }, [state.mainPlanId, state.dependentPlanId]);

  const monthlyPrice = (plan: Plan | null) =>
    plan ? (plan.amount / (plan.months || 12)).toFixed(2).replace(".", ",") : "0,00";

  const annualAmount = (plan: Plan | null) => (plan ? plan.amount : 0);

  const totalAnnual =
    annualAmount(mainPlan) +
    annualAmount(dependentPlan);

  const installmentValue = installments > 0 ? totalAnnual / installments : totalAnnual;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-[960px] mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="text-white/50 hover:text-white text-xs uppercase tracking-wide mb-4"
        >
          Voltar
        </button>

        <h1
          className="text-3xl md:text-4xl font-black mb-2"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          Checkout
        </h1>
        <p className="text-white/60 text-sm mb-8">
          Este é um ambiente de checkout simulado para o Galo na Veia. Nenhum pagamento real será
          processado.
        </p>

        {loading && <p className="text-white/60">Carregando dados do plano...</p>}

        {!loading && (
          <div className="grid md:grid-cols-[2fr,1fr] gap-8">
            <div className="space-y-6">
              {mainPlan && (
                <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-6">
                  <h2
                    className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    Plano principal
                  </h2>
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <div
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "Oswald, sans-serif" }}
                      >
                        {mainPlan.planName}
                      </div>
                      <div className="text-xs text-white/40">Assinatura anual</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black">
                        R$ {monthlyPrice(mainPlan)} <span className="text-xs text-white/40">/mês</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/50">
                    {mainPlan.benefits.length} benefícios incluídos. Você poderá revisar todos os
                    detalhes na confirmação final.
                  </p>
                </div>
              )}

              {dependentPlan && (
                <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-6">
                  <h2
                    className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    Plano de dependente
                  </h2>
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <div
                        className="text-xl font-bold text-white"
                        style={{ fontFamily: "Oswald, sans-serif" }}
                      >
                        {dependentPlan.planName}
                      </div>
                      <div className="text-xs text-white/40">Vinculado ao titular</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black">
                        R$ {monthlyPrice(dependentPlan)}{" "}
                        <span className="text-xs text-white/40">/mês</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/50">
                    Ideal para garantir que o dependente acompanhe o Galo ao seu lado.
                  </p>
                </div>
              )}
            </div>

            <aside className="bg-gradient-to-b from-[#111111] to-black border border-white/10 rounded-2xl p-6">
              <h2
                className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wide"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                Resumo do pedido
              </h2>
              {/* Métodos de pagamento */}
              <div className="mb-4 text-xs text-white/70 space-y-2">
                <div className="font-semibold text-white/80">Forma de pagamento</div>
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="accent-[#D4AF37]"
                    />
                    Cartão de crédito
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={paymentMethod === "pix"}
                      onChange={() => setPaymentMethod("pix")}
                      className="accent-[#D4AF37]"
                    />
                    Pix
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="boleto"
                      checked={paymentMethod === "boleto"}
                      onChange={() => setPaymentMethod("boleto")}
                      className="accent-[#D4AF37]"
                    />
                    Boleto bancário
                  </label>
                </div>
              </div>

              {/* Dados de pagamento */}
              {paymentMethod === "card" && (
                <div className="mb-4 space-y-3 text-xs">
                  <div className="font-semibold text-white/80">Dados do cartão</div>
                  <div className="space-y-2">
                    <div>
                      <label className="block mb-1 text-white/60">Nome completo do titular</label>
                      <input
                        type="text"
                        className="w-full bg-black border border-white/20 rounded-md px-2 py-1.5 text-xs text-white"
                        placeholder="Como está no cartão"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-white/60">Número do cartão</label>
                      <input
                        type="text"
                        className="w-full bg-black border border-white/20 rounded-md px-2 py-1.5 text-xs text-white"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block mb-1 text-white/60">Validade</label>
                        <input
                          type="text"
                          className="w-full bg-black border border-white/20 rounded-md px-2 py-1.5 text-xs text-white"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-white/60">CVV</label>
                        <input
                          type="text"
                          className="w-full bg-black border border-white/20 rounded-md px-2 py-1.5 text-xs text-white"
                          placeholder="000"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-white/60">CPF do titular</label>
                        <input
                          type="text"
                          className="w-full bg-black border border-white/20 rounded-md px-2 py-1.5 text-xs text-white"
                          placeholder="000.000.000-00"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "pix" && (
                <div className="mb-4 text-xs text-white/70 space-y-2">
                  <div className="font-semibold text-white/80">Pagamento via Pix</div>
                  <p>
                    No fluxo real, você veria aqui o QR Code e o código Pix copia e cola para efetuar o pagamento do
                    valor total anual.
                  </p>
                </div>
              )}

              {paymentMethod === "boleto" && (
                <div className="mb-4 text-xs text-white/70 space-y-2">
                  <div className="font-semibold text-white/80">Pagamento via boleto</div>
                  <p>
                    No fluxo real, seria gerado um boleto bancário com o valor total anual e prazo de vencimento
                    definido nas regras do programa.
                  </p>
                </div>
              )}

              <div className="space-y-2 text-sm text-white/80 mb-4">
                {mainPlan && (
                  <div className="flex justify-between">
                    <span>{mainPlan.planName}</span>
                    <span>R$ {monthlyPrice(mainPlan)}/mês</span>
                  </div>
                )}
                {dependentPlan && (
                  <div className="flex justify-between">
                    <span>{dependentPlan.planName} (dependente)</span>
                    <span>R$ {monthlyPrice(dependentPlan)}/mês</span>
                  </div>
                )}
              </div>
              <div className="border-t border-white/10 pt-4 mb-4 text-sm space-y-3">
                <div className="flex justify-between">
                  <span>Valor total anual</span>
                  <span>
                    R$ {totalAnnual.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-white/60">Dividir em até 12x sem juros (simulação)</span>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(Number(e.target.value))}
                      className="bg-black border border-white/20 rounded-md px-2 py-1 text-xs text-white"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n}x
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/60">Parcela estimada</div>
                    <div className="font-semibold">
                      R$ {installmentValue.toFixed(2).replace(".", ",")} /mês
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-white/40 mb-3">
                Este checkout é apenas uma simulação visual. Em um ambiente real, você veria o valor total do plano
                e escolheria as condições de parcelamento diretamente na página segura de pagamentos do Galo na Veia.
              </p>
              <button
                disabled
                className="w-full py-3 rounded-lg bg-white/10 text-white/40 text-xs font-semibold tracking-wide cursor-not-allowed"
              >
                Pagamento indisponível neste ambiente
              </button>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

