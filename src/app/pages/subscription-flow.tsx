import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Header } from "../components/header";
import { fetchPlansMock, type Plan } from "../services/plans-api.mock";

export function SubscriptionFlowPage() {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [mainPlan, setMainPlan] = useState<Plan | null>(null);
  const [dependentPlan, setDependentPlan] = useState<Plan | null>(null);
  const [addDependent, setAddDependent] = useState<"no" | "yes">("no");
  const [allPlans, setAllPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchPlansMock();
      const bucket = data.find((b) => b.id === 0);
      const plans = bucket?.plans ?? [];
      setAllPlans(plans);

      const id = Number(planId);
      const found = plans.find((p) => p.idPlan === id) ?? null;
      setMainPlan(found);

      // planos elegíveis para dependente: todos exceto Premium e Forte e Vingador
      const eligible = plans.filter(
        (p) => !["Premium", "Forte e Vingador"].includes(p.planName),
      );

      // pré-seleciona Kids se existir entre os elegíveis, senão o primeiro elegível
      const preferred =
        eligible.find((p) => p.planName === "Kids") ?? eligible[0] ?? null;
      setDependentPlan(preferred);

      setLoading(false);
    };

    load();
  }, [planId]);

  const handleContinue = () => {
    if (!mainPlan) return;

    navigate("/checkout", {
      state: {
        mainPlanId: mainPlan.idPlan,
        dependentPlanId: addDependent === "yes" && dependentPlan ? dependentPlan.idPlan : null,
      },
    });
  };

  const monthlyPrice = (plan: Plan | null) =>
    plan ? (plan.amount / (plan.months || 12)).toFixed(2).replace(".", ",") : "0,00";

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="max-w-[960px] mx-auto px-4 py-16">
          <p className="text-white/60">Carregando plano...</p>
        </main>
      </div>
    );
  }

  if (!mainPlan) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="max-w-[960px] mx-auto px-4 py-16">
          <p className="text-red-400 mb-4">Plano não encontrado.</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-semibold"
          >
            Voltar para os planos
          </button>
        </main>
      </div>
    );
  }

  const eligibleDependents = allPlans.filter(
    (p) => !["Premium", "Forte e Vingador"].includes(p.planName),
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-[960px] mx-auto px-4 py-12">
        <div className="mb-8">
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
            Confirmar assinatura
          </h1>
          <p className="text-white/60 text-sm">
            Revise seu plano e escolha se deseja adicionar um plano para dependente antes de seguir
            para o checkout.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-6">
            <h2
              className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              Plano principal
            </h2>
            <div className="mb-3">
              <div
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                {mainPlan.planName}
              </div>
              <div className="text-sm text-white/40">
                R$ {monthlyPrice(mainPlan)} <span className="text-xs">/mês</span>
              </div>
            </div>
            <div className="text-xs text-white/50">
              {mainPlan.benefits.length} benefícios incluídos neste plano.
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 rounded-2xl p-6">
            <h2
              className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              Adicionar dependente
            </h2>

            <div className="space-y-3 mb-4">
              <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                <input
                  type="radio"
                  name="addDependent"
                  value="no"
                  checked={addDependent === "no"}
                  onChange={() => setAddDependent("no")}
                  className="accent-[#D4AF37]"
                />
                Não, seguir apenas com este plano
              </label>
              <label className="flex items-center gap-2 text-sm text-white/80 cursor-pointer">
                <input
                  type="radio"
                  name="addDependent"
                  value="yes"
                  checked={addDependent === "yes"}
                  onChange={() => setAddDependent("yes")}
                  className="accent-[#D4AF37]"
                />
                Sim, adicionar plano de dependente
              </label>
            </div>

            {addDependent === "yes" && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-white/60">
                  Selecione um plano elegível para dependente.
                </p>
                <select
                  value={dependentPlan?.idPlan ?? ""}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    const found = eligibleDependents.find((p) => p.idPlan === id) ?? null;
                    setDependentPlan(found);
                  }}
                  className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-sm text-white"
                >
                  {eligibleDependents.length === 0 && (
                    <option value="">Nenhum plano de dependente disponível</option>
                  )}
                  {eligibleDependents.length > 0 && (
                    <>
                      <option value="">Selecione um plano</option>
                      {eligibleDependents.map((p) => (
                        <option key={p.idPlan} value={p.idPlan}>
                          {p.planName} - R$ {monthlyPrice(p)}/mês
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="text-sm text-white/60">
            <span className="text-white/80 font-semibold">Resumo:</span>{" "}
            R$ {monthlyPrice(mainPlan)} /mês
            {addDependent === "yes" && dependentPlan && (
              <>
                {" "}
                + R$ {monthlyPrice(dependentPlan)} /mês{" "}
                <span className="text-xs text-white/40">(dependente)</span>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm font-semibold"
            >
              Voltar para os planos
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black text-sm font-bold tracking-wide shadow-lg shadow-[#D4AF37]/20"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              Continuar para checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

