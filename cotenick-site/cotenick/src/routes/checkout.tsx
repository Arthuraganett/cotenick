import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brl, getPlan, plans } from "@/lib/plans";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>) => ({ plano: typeof s["plano"] === "string" ? (s["plano"] as string) : undefined }),
  head: () => ({
    meta: [
      { title: "Contratar plano — COTENICK" },
      { name: "description", content: "Contrate sua internet fibra COTENICK em 3 passos e agende a instalação." },
      { property: "og:title", content: "Contratar plano — COTENICK" },
      { property: "og:description", content: "Contrate em 3 passos e agende a instalação." },
    ],
  }),
  component: Checkout,
});

type Data = Record<
  "nome" | "cpf" | "email" | "telefone" | "cep" | "rua" | "numero" | "bairro" | "complemento" | "data" | "periodo" | "pagamento",
  string
>;
const steps = ["Dados Pessoais", "Endereço", "Agendamento & Pagamento"];
const required: (keyof Data)[][] = [
  ["nome", "cpf", "email", "telefone"],
  ["cep", "rua", "numero", "bairro"],
  ["data", "periodo", "pagamento"],
];

function Checkout() {
  const { plano } = Route.useSearch();
  const [planId, setPlanId] = useState(getPlan(plano)?.id ?? "res-600");
  const plan = getPlan(planId)!;
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [d, setD] = useState<Data>({ nome: "", cpf: "", email: "", telefone: "", cep: "", rua: "", numero: "", bairro: "", complemento: "", data: "", periodo: "", pagamento: "" });
  const set = (k: keyof Data, v: string) => setD({ ...d, [k]: v });
  const minDate = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const next = () => {
    if (required[step]!.some((k) => !d[k].trim())) return setErr("Preencha todos os campos obrigatórios.");
    if (step === 0 && !/^\S+@\S+\.\S+$/.test(d.email)) return setErr("E-mail inválido.");
    if (step === 0 && d.cpf.replace(/\D/g, "").length !== 11) return setErr("CPF deve ter 11 números.");
    setErr("");
    if (step < 2) return setStep(step + 1);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  };

  const f = (k: keyof Data, label: string, extra?: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-2">
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} value={d[k]} onChange={(e) => set(k, e.target.value)} {...extra} />
    </div>
  );

  if (done)
    return (
      <div className="page-enter bg-hero flex min-h-screen items-center justify-center px-4 pt-20">
        <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-glow">
          <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
          <h1 className="mt-4 text-3xl font-semibold">Pedido confirmado!</h1>
          <p className="mt-2 text-muted-foreground">Nossa equipe técnica entrará em contato em poucas horas para confirmar a instalação.</p>
          <dl className="mt-6 space-y-2 rounded-xl bg-muted p-5 text-left text-sm">
            <div className="flex justify-between"><dt>Plano</dt><dd className="font-medium">{plan.name} {plan.speed}</dd></div>
            <div className="flex justify-between"><dt>Mensalidade</dt><dd className="font-medium">{brl(plan.price)}</dd></div>
            <div className="flex justify-between"><dt>Titular</dt><dd className="font-medium">{d.nome}</dd></div>
            <div className="flex justify-between gap-4"><dt>Endereço</dt><dd className="text-right font-medium">{d.rua}, {d.numero} — {d.bairro}</dd></div>
            <div className="flex justify-between"><dt>Instalação</dt><dd className="font-medium">{d.data.split("-").reverse().join("/")} · {d.periodo}</dd></div>
            <div className="flex justify-between"><dt>Pagamento</dt><dd className="font-medium">{d.pagamento}</dd></div>
          </dl>
          <Button asChild className="mt-6" size="lg"><Link to="/">Voltar ao início</Link></Button>
        </div>
      </div>
    );

  return (
    <div className="page-enter mx-auto grid max-w-6xl gap-8 px-4 pb-24 pt-28 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="text-4xl font-semibold">Contratar</h1>
        <ol className="mt-8 flex gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 flex-col gap-2">
              <div className={cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-gradient-brand" : "bg-muted")} />
              <span className={cn("flex items-center gap-1 text-xs md:text-sm", i <= step ? "text-foreground" : "text-muted-foreground")}>
                {i < step && <Check className="h-3.5 w-3.5 text-cyan" />} {i + 1}. {s}
              </span>
            </li>
          ))}
        </ol>

        <div key={step} className="page-enter mt-8 grid gap-5 rounded-2xl border bg-card p-8 md:grid-cols-2">
          {step === 0 && (<>{f("nome", "Nome completo")}{f("cpf", "CPF", { inputMode: "numeric", placeholder: "000.000.000-00" })}{f("email", "E-mail", { type: "email" })}{f("telefone", "Telefone", { type: "tel" })}</>)}
          {step === 1 && (<>{f("cep", "CEP", { inputMode: "numeric" })}{f("rua", "Rua")}{f("numero", "Número")}{f("bairro", "Bairro")}<div className="md:col-span-2">{f("complemento", "Complemento (opcional)")}</div></>)}
          {step === 2 && (
            <>
              {f("data", "Data da visita técnica", { type: "date", min: minDate })}
              <div className="space-y-2">
                <Label>Período</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Manhã", "Tarde"].map((p) => (
                    <button type="button" key={p} onClick={() => set("periodo", p)} className={cn("rounded-lg border px-3 py-2 text-sm transition-colors", d.periodo === p ? "border-primary bg-accent" : "hover:border-primary")}>{p}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Forma de pagamento da 1ª mensalidade</Label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {["Pix", "Cartão de crédito", "Boleto"].map((p) => (
                    <button type="button" key={p} onClick={() => set("pagamento", p)} className={cn("rounded-lg border px-3 py-3 text-sm transition-colors", d.pagamento === p ? "border-primary bg-accent" : "hover:border-primary")}>{p}</button>
                  ))}
                </div>
              </div>
            </>
          )}
          {err && <p className="text-sm text-destructive md:col-span-2">{err}</p>}
          <div className="flex justify-between md:col-span-2">
            <Button variant="secondary" disabled={step === 0} onClick={() => setStep(step - 1)}>Voltar</Button>
            <Button onClick={next} disabled={loading}>
              {loading && <Loader2 className="animate-spin" />} {step < 2 ? "Continuar" : "Finalizar pedido"}
            </Button>
          </div>
        </div>
      </div>

      <aside className="h-fit rounded-2xl border bg-card p-6 shadow-glow lg:mt-[7.5rem]">
        <p className="text-sm text-muted-foreground">Plano selecionado</p>
        <select value={planId} onChange={(e) => setPlanId(e.target.value)} className="mt-2 w-full rounded-lg border bg-input px-3 py-2 text-sm">
          {plans.map((p) => (<option key={p.id} value={p.id} className="bg-card">{p.name} — {p.speed}</option>))}
        </select>
        <p className="mt-6 text-4xl font-semibold">{plan.speed}</p>
        <p className="mt-2"><span className="text-2xl font-semibold text-gradient">{brl(plan.price)}</span><span className="text-muted-foreground">/mês</span></p>
        <ul className="mt-4 space-y-2 text-sm">
          {plan.perks.map((p) => (<li key={p} className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan" />{p}</li>))}
        </ul>
      </aside>
    </div>
  );
}
