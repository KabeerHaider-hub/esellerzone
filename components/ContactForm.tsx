"use client";
import { useState, type FormEvent } from "react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { Icon } from "./Icon";

const field = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-brand-500/70 focus:bg-white/[0.06]";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!site.formEndpoint) {
      // No form backend configured yet: open the visitor's email app with the details filled in.
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone/WhatsApp: ${data.phone}\nService: ${data.service}\n\n${data.message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`New enquiry: ${data.service}`)}&body=${encodeURIComponent(body)}`;
      setState("done");
      return;
    }
    setState("sending");
    try {
      const res = await fetch(site.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "done")
    return (
      <div className="glass grid min-h-[420px] place-items-center p-10 text-center">
        <div>
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-500 text-ink-950"><Icon name="check" className="h-8 w-8" /></div>
          <h3 className="mt-6 font-display text-2xl font-semibold text-white">Thanks, we&apos;re on it.</h3>
          <p className="mt-3 text-white/60">A strategist will get back to you within one business day.</p>
        </div>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-2 block text-sm text-white/60">Full name</span><input required name="name" className={field} placeholder="Jane Smith" /></label>
        <label className="block"><span className="mb-2 block text-sm text-white/60">Email</span><input required type="email" name="email" className={field} placeholder="you@company.com" /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mb-2 block text-sm text-white/60">Phone / WhatsApp</span><input name="phone" className={field} placeholder="+1 555 000 0000" /></label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/60">Service</span>
          <select name="service" className={`${field} [&>option]:bg-ink-900`} defaultValue="Not sure yet">
            <option>Not sure yet</option>
            {services.map((s) => <option key={s.slug}>{s.title}</option>)}
          </select>
        </label>
      </div>
      <label className="block"><span className="mb-2 block text-sm text-white/60">Tell us about your project</span><textarea required name="message" rows={5} className={field} placeholder="Your goals, current platforms, timeline and budget range." /></label>
      <button disabled={state === "sending"} className="btn-primary w-full disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send message"} <Icon name="arrow" className="h-4 w-4" />
      </button>
      {state === "error" && <p className="text-sm text-red-400">Something went wrong. Please email us at {site.email}.</p>}
    </form>
  );
}
