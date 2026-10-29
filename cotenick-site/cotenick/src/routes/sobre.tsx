import { createFileRoute } from "@tanstack/react-router";
import { Eye, Network, Target } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a COTENICK — Nossa história" },
      { name: "description", content: "Conheça a história, missão e a rede própria de fibra óptica de alta resiliência da COTENICK." },
      { property: "og:title", content: "Sobre a COTENICK" },
      { property: "og:description", content: "História, missão e infraestrutura de rede própria." },
    ],
  }),
  component: Sobre,
});

const blocks = [
  { icon: Target, title: "Missão", text: "Conectar pessoas e empresas com internet rápida, estável e um atendimento que resolve de verdade." },
  { icon: Eye, title: "Visão", text: "Ser referência em telecomunicações, levando ultravelocidade, 10G-PON e Wi-Fi 7 a cada endereço que atendemos." },
  { icon: Network, title: "Rede própria", text: "Backbone óptico próprio com anéis redundantes, data centers interligados e monitoramento NOC 24/7." },
];

function Sobre() {
  return (
    <div className="page-enter bg-hero">
      <section className="mx-auto max-w-4xl px-4 pb-16 pt-40">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan">Sobre nós</p>
        <h1 className="mt-3 text-5xl font-semibold">Nascemos para acelerar o mundo.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          A COTENICK começou com um objetivo simples: oferecer internet que funcione sempre. Desde a primeira caixa de
          emenda instalada, investimos em fibra óptica de ponta a ponta e em uma equipe técnica própria. Hoje atendemos
          milhares de residências e empresas com a mesma obsessão por estabilidade.
        </p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pb-24 md:grid-cols-3">
        {blocks.map((b) => (
          <div key={b.title} className="rounded-2xl border bg-card p-8">
            <b.icon className="h-8 w-8 text-cyan" />
            <h2 className="mt-5 text-2xl font-semibold">{b.title}</h2>
            <p className="mt-3 text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
