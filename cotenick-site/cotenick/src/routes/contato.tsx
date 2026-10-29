import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — COTENICK" },
      { name: "description", content: "Fale com a COTENICK por formulário, telefone ou WhatsApp. Atendimento humano 24h." },
      { property: "og:title", content: "Contato — COTENICK" },
      { property: "og:description", content: "Atendimento humano 24h por telefone e WhatsApp." },
    ],
  }),
  component: Contato,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Telefone inválido"),
  mensagem: z.string().trim().min(10, "Mensagem muito curta").max(1000),
});
type Form = z.infer<typeof schema>;
const empty: Form = { nome: "", email: "", telefone: "", mensagem: "" };

function Contato() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Form] = i.message));
      return setErrors(errs);
    }
    setErrors({});
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm(empty);
      toast.success("Mensagem enviada! Retornaremos em breve.");
    }, 1200);
  };

  const field = (k: keyof Form, label: string, type = "text") => (
    <div className="space-y-2">
      <Label htmlFor={k}>{label}</Label>
      {k === "mensagem" ? (
        <Textarea id={k} rows={5} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
      ) : (
        <Input id={k} type={type} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
      )}
      {errors[k] && <p className="text-sm text-destructive">{errors[k]}</p>}
    </div>
  );

  return (
    <div className="page-enter bg-hero">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 pt-36 md:grid-cols-2">
        <div>
          <h1 className="text-5xl font-semibold">Fale com a gente</h1>
          <p className="mt-4 text-muted-foreground">Estamos aqui 24 horas por dia, 7 dias por semana.</p>
          <ul className="mt-10 space-y-5">
            <li className="flex items-center gap-3"><Phone className="text-cyan" /> 0800 123 4567</li>
            <li className="flex items-center gap-3"><Mail className="text-cyan" /> atendimento@cotenick.com.br</li>
            <li className="flex items-center gap-3"><Clock className="text-cyan" /> Suporte humano 24h</li>
          </ul>
          <Button asChild size="lg" className="mt-10">
            <a href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20preciso%20de%20suporte%20COTENICK" target="_blank" rel="noreferrer">
              <MessageCircle /> Suporte via WhatsApp
            </a>
          </Button>
        </div>
        <form onSubmit={submit} className="space-y-5 rounded-2xl border bg-card p-8" noValidate>
          {field("nome", "Nome")}
          {field("email", "E-mail", "email")}
          {field("telefone", "Telefone", "tel")}
          {field("mensagem", "Mensagem")}
          <Button type="submit" size="lg" className="w-full" disabled={sending}>
            {sending && <Loader2 className="animate-spin" />} {sending ? "Enviando..." : "Enviar mensagem"}
          </Button>
        </form>
      </div>
    </div>
  );
}
