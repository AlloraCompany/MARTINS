"use client";

import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      setFormData({ name: "", email: "", phone: "" });
    } else {
      // setStatus("Erro ao salvar lead.");
      console.error("Erro ao enviar dados.");
    }
  }

  return (
    <section className="bg-green relative py-10 lg:pb-14">
      <div className="container mx-auto flex flex-col sm:flex-row gap-10 p-10 lg:p-20 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md">
        <div className="basis-1/2">
          <p className="text-clamp-xl font-medium leading-none">
            Seu próximo lar pode estar mais perto do que você imagina.
          </p>
          <p className="mt-10 text-lg leading-tight">
            Assine nossa newsletter e seja o primeiro a saber sobre lançamentos,
            condições especiais e dicas que vão transformar o jeito de viver e
            investir.
          </p>
        </div>
        <div className="basis-1/2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <input
                type="text"
                className="w-full p-3 bg-transparent placeholder:text-dark-blue placeholder:text-sm border bg-white border-dark-blue rounded-md"
                placeholder="Nome completo"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-3 bg-transparent placeholder:text-dark-blue placeholder:text-sm border bg-white border-dark-blue rounded-md"
                placeholder="WhatsApp"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                className="w-full p-3 bg-transparent placeholder:text-dark-blue placeholder:text-sm border bg-white border-dark-blue rounded-md"
                placeholder="E-mail"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            {/* <div>
              <input type="checkbox" />
            </div> */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="aceito"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <label htmlFor="aceito" className="text-xs ml-2 leading-none">
                  Ao enviar este formulário, você concorda com o uso dos seus
                  dados conforme a LGPD. Eles serão usados para contato e
                  comunicações, conforme nossa Política de Privacidade.
                </label>
                <button
                  type="submit"
                  className="ml-4 px-8 py-2 text-white bg-dark-blue font-medium rounded-md"
                >
                  ENVIAR
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
