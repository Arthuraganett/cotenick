export type PlanCategory = "residencial" | "corporativo";

export type Plan = {
  id: string;
  category: PlanCategory;
  name: string;
  speed: string;
  price: number;
  featured?: boolean;
  perks: string[];
};

export const plans: Plan[] = [
  { id: "res-400", category: "residencial", name: "Essencial", speed: "400 Mega", price: 89.9, perks: ["Wi-Fi 6 grátis", "Instalação grátis", "Suporte 24h"] },
  { id: "res-600", category: "residencial", name: "Turbo", speed: "600 Mega", price: 109.9, featured: true, perks: ["Wi-Fi 6 Mesh", "Rota gamer otimizada", "Suporte prioritário 24h", "Instalação grátis"] },
  { id: "res-1g", category: "residencial", name: "Ultra", speed: "1 Giga", price: 149.9, perks: ["Wi-Fi 6 Mesh + repetidor", "IP fixo opcional", "Visita técnica express"] },
  { id: "corp-500", category: "corporativo", name: "Business", speed: "500 Mega", price: 199.9, perks: ["IP fixo", "SLA 99,5%", "Suporte dedicado"] },
  { id: "corp-1g", category: "corporativo", name: "Business Pro", speed: "1 Giga", price: 349.9, featured: true, perks: ["IP fixo /29", "SLA 99,8%", "Gerente de conta", "Link redundante"] },
  { id: "corp-dedic", category: "corporativo", name: "Link Dedicado", speed: "2 Giga simétrico", price: 899.9, perks: ["Banda 100% garantida", "SLA 99,9%", "Monitoramento NOC 24/7"] },
];

export const getPlan = (id?: string) => plans.find((p) => p.id === id);

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
