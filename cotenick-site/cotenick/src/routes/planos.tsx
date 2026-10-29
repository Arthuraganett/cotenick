import { createFileRoute } from "@tanstack/react-router";
import { PlansSection } from "@/components/PlansSection";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos de Internet Fibra — COTENICK" },
      { name: "description", content: "Planos residenciais e corporativos de fibra óptica COTENICK de 400 Mega a 2 Giga." },
      { property: "og:title", content: "Planos de Internet Fibra — COTENICK" },
      { property: "og:description", content: "Planos residenciais e corporativos de 400 Mega a 2 Giga." },
    ],
  }),
  component: () => (
    <div className="page-enter bg-hero pt-16">
      <PlansSection />
    </div>
  ),
});
