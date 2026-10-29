import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brl, plans, type PlanCategory } from "@/lib/plans";
import { cn } from "@/lib/utils";

export function PlansSection() {
  const [category, setCategory] = useState<PlanCategory>("residencial");
  const list = plans.filter((p) => p.category === category);

  return (
    <section id="planos" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan">Planos</p>
        <h2 className="mt-3 text-4xl font-semibold md:text-5xl">Escolha sua velocidade</h2>
      </div>

      <div className="mx-auto mt-10 flex w-fit rounded-full border bg-card p-1">
        {(["residencial", "corporativo"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-medium transition-all",
              category === c ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Planos {c === "residencial" ? "Residenciais" : "Corporativos"}
          </button>
        ))}
      </div>

      <div key={category} className="page-enter mt-12 grid gap-6 md:grid-cols-3">
        {list.map((p) => (
          <div
            key={p.id}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-8 transition-transform hover:-translate-y-1",
              p.featured && "shadow-glow",
            )}
          >
            {p.featured && (
              <span className="absolute -top-3 left-8 rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-primary-foreground">
                Mais escolhido
              </span>
            )}
            <p className="text-muted-foreground">{p.name}</p>
            <p className="mt-2 text-4xl font-semibold">{p.speed}</p>
            <p className="mt-6">
              <span className="text-3xl font-semibold text-gradient">{brl(p.price)}</span>
              <span className="text-muted-foreground">/mês</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-cyan" /> {perk}
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8" variant={p.featured ? "default" : "secondary"} size="lg">
              <Link to="/checkout" search={{ plano: p.id }}>Contratar</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
