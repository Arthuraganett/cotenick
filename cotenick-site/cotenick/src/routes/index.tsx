import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Cable, Gamepad2, Headphones, Loader2, PartyPopper, Wifi, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlansSection } from "@/components/PlansSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COTENICK — Internet Fibra Óptica de Ultravelocidade" },
      { name: "description", content: "Internet 100% fibra óptica com até 1 Giga, Wi-Fi 6 grátis e suporte humano 24h. Consulte a cobertura da COTENICK." },
      { property: "og:title", content: "COTENICK — Internet Fibra Óptica" },
      { property: "og:description", content: "Ultravelocidade, Wi-Fi 6 grátis e suporte humano 24h." },
    ],
  }),
  component: Home,
});

const features = [
  { icon: Cable, title: "Fibra de ponta a ponta", text: "Rede 100% óptica até dentro da sua casa, sem cabos de cobre no caminho." },
  { icon: Wifi, title: "Wi-Fi 6 Grátis", text: "Roteador de última geração incluso em todos os planos, sem custo extra." },
  { icon: Headphones, title: "Suporte Humano 24h", text: "Gente de verdade atendendo a qualquer hora, por telefone ou WhatsApp." },
  { icon: Gamepad2, title: "Estabilidade Gamer", text: "Rotas otimizadas e latência baixa para jogar e transmitir sem lag." },
];

function Home() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const consultar = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.replace(/\D/g, "").length !== 8) return setError("Digite um CEP válido com 8 números.");
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 1400);
  };

  const formatCep = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 8);
    return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
  };

  return (
    <div className="page-enter">
      <section className="bg-hero relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-40 md:pt-48">
          <p className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-cyan" /> Até 2 Giga simétrico
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">
            A velocidade da <span className="text-gradient">luz</span> na sua conexão.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Internet fibra óptica de ultravelocidade, estável e sem limites para sua casa ou empresa.
          </p>
          <form onSubmit={consultar} className="mt-10 flex max-w-lg flex-col gap-3 sm:flex-row">
            <Input
              value={cep}
              onChange={(e) => setCep(formatCep(e.target.value))}
              placeholder="Digite seu CEP"
              inputMode="numeric"
              className="h-12 bg-card text-base"
            />
            <Button type="submit" size="lg" className="h-12" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Consultando..." : "Consultar Cobertura"}
            </Button>
          </form>
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
      </section>

      <PlansSection />

      <section id="services" className="mx-auto max-w-6xl px-4 pb-24">
        <h2 className="text-center text-4xl font-semibold">Por que COTENICK?</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border bg-card p-6 transition-colors hover:border-primary">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
                <f.icon className="h-6 w-6 text-cyan" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <PartyPopper className="mx-auto h-10 w-10 text-cyan" />
            <DialogTitle className="text-center text-2xl">Parabéns!</DialogTitle>
            <DialogDescription className="text-center">
              Temos cobertura de fibra óptica na sua região! (CEP {cep})
            </DialogDescription>
          </DialogHeader>
          <Button
            size="lg"
            onClick={() => {
              setOpen(false);
              setTimeout(() => document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" }), 150);
            }}
          >
            Ver planos disponíveis
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
