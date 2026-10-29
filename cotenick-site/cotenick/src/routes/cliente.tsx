import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, FileText, Loader2, LogOut, Wifi } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LogoMark } from "@/components/Logo";
import { brl } from "@/lib/plans";

export const Route = createFileRoute("/cliente")({
  head: () => ({
    meta: [
      { title: "Central do Cliente — COTENICK" },
      { name: "description", content: "Acesse sua conta COTENICK: faturas, Pix, boleto e consumo de banda." },
      { property: "og:title", content: "Central do Cliente — COTENICK" },
      { property: "og:description", content: "Faturas, Pix, boleto e consumo de banda." },
    ],
  }),
  component: Cliente,
});

const usage = [
  { d: "Seg", down: 42, up: 12 },
  { d: "Ter", down: 58, up: 18 },
  { d: "Qua", down: 35, up: 10 },
  { d: "Qui", down: 70, up: 22 },
  { d: "Sex", down: 88, up: 30 },
  { d: "Sáb", down: 96, up: 34 },
  { d: "Dom", down: 76, up: 25 },
];
const invoices = [
  { ref: "Outubro/2026", due: "10/11/2026", value: 109.9, status: "Pendente" },
  { ref: "Setembro/2026", due: "10/10/2026", value: 109.9, status: "Pago" },
  { ref: "Agosto/2026", due: "10/09/2026", value: 109.9, status: "Pago" },
];
const PIX = "00020126580014BR.GOV.BCB.PIX0136cotenick-fatura-102026-a1b2c3d45204000053039865406109.905802BR5908COTENICK6009SAO PAULO62070503***6304ABCD";

function Cliente() {
  const [user, setUser] = useState<string | null>(null);
  const [cpf, setCpf] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [boleto, setBoleto] = useState(false);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpf.trim() || pass.length < 4) { toast.error("Preencha CPF/e-mail e senha (mín. 4 caracteres)."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser("Mariana Souza");
    }, 1000);
  };

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX);
      toast.success("Copiado! Código Pix na área de transferência.");
    } catch {
      toast.error("Não foi possível copiar.");
    }
  };

  if (!user)
    return (
      <div className="page-enter bg-hero flex min-h-screen items-center justify-center px-4 pt-16">
        <form onSubmit={login} className="w-full max-w-sm space-y-5 rounded-2xl border bg-card p-8">
          <LogoMark className="mx-auto h-12" />
          <h1 className="text-center text-2xl font-semibold">Central do Cliente</h1>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF ou e-mail</Label>
            <Input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pass">Senha</Label>
            <Input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />} Entrar
          </Button>
          <p className="text-center text-xs text-muted-foreground">Acesso de demonstração: qualquer CPF e senha.</p>
        </form>
      </div>
    );

  const max = Math.max(...usage.map((u) => u.down));
  return (
    <div className="page-enter mx-auto max-w-6xl px-4 pb-24 pt-28">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Olá, {user.split(" ")[0]}</h1>
        <Button variant="secondary" onClick={() => setUser(null)}><LogOut /> Sair</Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6">
          <p className="text-sm text-muted-foreground">Titular</p>
          <p className="text-lg font-semibold">{user}</p>
          <p className="mt-4 text-sm text-muted-foreground">Plano contratado</p>
          <p className="text-lg font-semibold">Turbo 600 Mega</p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm text-success">
            <Wifi className="h-4 w-4" /> Conexão Ativa
          </p>
        </div>
        <div className="rounded-2xl border bg-card p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Consumo da semana (GB)</p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-primary" /> Download</span>
              <span className="flex items-center gap-1"><i className="h-2 w-2 rounded-full bg-cyan" /> Upload</span>
            </div>
          </div>
          <div className="mt-6 flex h-40 items-end justify-between gap-3">
            {usage.map((u) => (
              <div key={u.d} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-32 w-full items-end justify-center gap-1">
                  <div className="w-1/2 rounded-t bg-primary transition-all" style={{ height: `${(u.down / max) * 100}%` }} title={`${u.down} GB`} />
                  <div className="w-1/2 rounded-t bg-cyan" style={{ height: `${(u.up / max) * 100}%` }} title={`${u.up} GB`} />
                </div>
                <span className="text-xs text-muted-foreground">{u.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border bg-card p-6">
        <p className="font-semibold">Financeiro</p>
        <div className="mt-4 divide-y">
          {invoices.map((i) => (
            <div key={i.ref} className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">{i.ref}</p>
                <p className="text-sm text-muted-foreground">Vencimento {i.due} · {brl(i.value)}</p>
              </div>
              {i.status === "Pendente" ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs text-warning">Pendente</span>
                  <Button size="sm" onClick={copyPix}><Copy /> Copiar Código Pix</Button>
                  <Button size="sm" variant="secondary" onClick={() => setBoleto(true)}><FileText /> Visualizar Boleto PDF</Button>
                </div>
              ) : (
                <span className="w-fit rounded-full bg-accent px-3 py-1 text-xs text-success">Pago</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <Dialog open={boleto} onOpenChange={setBoleto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Boleto — Outubro/2026</DialogTitle></DialogHeader>
          <div className="space-y-4 rounded-lg border p-5 font-mono text-sm">
            <div className="flex justify-between"><span>COTENICK TELECOM LTDA</span><span>Banco 341</span></div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><p className="text-muted-foreground">Pagador</p><p>{user}</p></div>
              <div><p className="text-muted-foreground">Vencimento</p><p>10/11/2026</p></div>
              <div><p className="text-muted-foreground">Referência</p><p>Plano Turbo 600 Mega</p></div>
              <div><p className="text-muted-foreground">Valor</p><p>{brl(109.9)}</p></div>
            </div>
            <div className="flex h-14 gap-[2px]">
              {Array.from({ length: 70 }).map((_, n) => (
                <div key={n} className="bg-foreground" style={{ width: (n * 7) % 3 === 0 ? 3 : 1 }} />
              ))}
            </div>
            <p className="break-all text-xs">34191.79001 01043.510047 91020.150008 1 98760000010990</p>
          </div>
          <Button onClick={() => window.print()}>Imprimir / Salvar PDF</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
