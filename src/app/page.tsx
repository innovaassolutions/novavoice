"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import NovaVoiceDashboard from "@/components/mockups/NovaVoiceDashboard";
import NovaVoiceCallFlow from "@/components/mockups/NovaVoiceCallFlow";
import NovaVoiceAnalytics from "@/components/mockups/NovaVoiceAnalytics";

const NOVACRM_API_URL =
  process.env.NEXT_PUBLIC_NOVACRM_API_URL || "https://nova-cyan-mu.vercel.app";
const NOVACRM_API_KEY = process.env.NEXT_PUBLIC_NOVACRM_LEAD_API_KEY || "";

interface FormData {
  name: string;
  email: string;
  organization_name: string;
  role: string;
  notes: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const HERO_STATS = [
  { k: "24 / 7", v: "Always answering" },
  { k: "< 2 SEC", v: "Average pickup" },
  { k: "100%", v: "Calls captured" },
  { k: "ZERO", v: "Voicemails missed" },
];

const COST_STATS = [
  { v: "$126K", label: "lost per year from unanswered calls" },
  { v: "85%", label: "of callers never call back after voicemail" },
  { v: "62%", label: "of calls to service businesses go unanswered" },
  { v: "10–15×", label: "higher conversion from phone vs. web leads" },
];

const PROBLEMS = [
  {
    title: "You can't always be there",
    body: "You're with a customer, on the road, at lunch, or it's after hours. The phone rings and nobody picks up. That caller moves on to your competitor — and 85% never call back.",
  },
  {
    title: "Hiring is expensive",
    body: "A full-time receptionist costs $50,000–$61,000/year with benefits — and still only covers business hours. For most small businesses, that math simply doesn't work.",
  },
  {
    title: "Voicemail doesn't work",
    body: "80% of callers sent to voicemail hang up without leaving a message. Of those who do, 67% are ignored. Voicemail isn't a safety net — it's a dead end.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "We build your agent",
    body: "We learn your business — services, pricing, hours, FAQs, booking rules — and build a custom AI agent trained to sound and respond exactly the way you want.",
  },
  {
    n: "02",
    title: "Connect your phone",
    body: "We integrate with your existing number. Calls forward to NovaVoice when you can't answer — or all the time, if you prefer. No hardware, no new numbers.",
  },
  {
    n: "03",
    title: "Never miss a call again",
    body: "Your agent answers 24/7, books appointments, captures leads, and escalates when needed — with a full dashboard of transcripts and analytics behind it.",
  },
];

const FEATURES = [
  { t: "24/7 call answering", d: "Your agent never sleeps, never calls in sick, never puts a caller on hold. Every call answered within seconds — day or night." },
  { t: "Appointment booking", d: "Integrated with your calendar. The agent checks availability, books, confirms, and reschedules — all during the call." },
  { t: "Custom-trained on your business", d: "It knows your services, pricing, hours, policies, and FAQs. Not generic — it sounds like it works for you, because it does." },
  { t: "Intelligent escalation", d: "Complex issues and high-value opportunities are routed to the right person with full context and a call summary." },
  { t: "Real-time transcripts & analytics", d: "Every call transcribed, scored for sentiment, and logged with outcomes. See exactly what callers want." },
  { t: "Lead capture & follow-up", d: "Caller details captured automatically and pushed to your CRM, email, or any tool you use. No lead slips through." },
];

const PHOTO_INDUSTRIES = [
  {
    img: "/generated/ind-home-services.jpg",
    alt: "Home services technician taking a call on a jobsite at dusk",
    title: "Home Services",
    body: "Plumbers, electricians, HVAC, and contractors miss 62% of inbound calls — at ~$1,200 each. NovaVoice captures every lead and books jobs on the spot.",
  },
  {
    img: "/generated/ind-restaurant.jpg",
    alt: "Restaurant host taking a reservation by phone in a dim dining room",
    title: "Restaurants & Hospitality",
    body: "Reservations, menu questions, catering, and event bookings — handled. Restaurants lose up to $1,500/month from just five missed calls a day.",
  },
  {
    img: "/generated/ind-veterinary.jpg",
    alt: "Veterinary receptionist on the phone with a dog at the desk",
    title: "Veterinary & Clinics",
    body: "Book visits, triage urgency, handle refill requests, and confirm appointments — so the front desk never has to choose between the phone and the patient in front of them.",
  },
];

const TEXT_INDUSTRIES = [
  { t: "Healthcare & Dental", d: "Schedule appointments, handle refill inquiries, confirm insurance, and send reminders. 36% of healthcare consumers prefer voice over any other channel." },
  { t: "Legal Services", d: "Phone leads are worth 5–10× a form fill. NovaVoice qualifies clients, captures case details, and schedules consultations — no high-value lead lost." },
  { t: "Real Estate", d: "Phone calls drive 38% of conversions. Answer property inquiries, schedule showings, and capture buyer/seller info while you're at the closing table." },
  { t: "Auto Repair & Dealerships", d: "Book service, give status updates, answer parts questions, and capture new leads — without pulling a technician off the floor." },
];

const PRICING_TIERS = [
  {
    name: "Essentials",
    blurb: "For solo operators and family businesses that just need every call answered.",
    monthly: "$299",
    setup: "No setup fee",
    featured: false,
    cta: { label: "Get Started", href: "#get-started" },
    features: [
      "24/7 AI call answering",
      "Answers FAQs about your services, hours & pricing",
      "Message taking with instant SMS/email handoff",
      "Calendar-link appointment booking",
      "Call routing & escalation to your team",
      "Real-time transcripts & call summaries",
      "Generous fair-use minutes",
    ],
  },
  {
    name: "Professional",
    blurb: "For established businesses ready to integrate one core system.",
    monthly: "$639",
    setup: "$5,000 one-time setup",
    featured: true,
    cta: { label: "Get Started", href: "#get-started" },
    features: [
      "Everything in Essentials, plus:",
      "Custom AI agent trained on your business",
      "Custom API integration into one core system (scheduling or CRM)",
      "Books appointments directly into your calendar",
      "Lead capture & CRM sync",
      "Intelligent escalation with full context",
      "Unlimited calls",
      "Ongoing updates & optimization",
    ],
  },
  {
    name: "Business",
    blurb: "For multi-system or multi-location operations that run on connected tools.",
    monthly: "From $1,200",
    setup: "From $7,500 setup — scoped to your stack",
    featured: false,
    cta: { label: "Talk to Sales", href: "#get-started" },
    features: [
      "Everything in Professional, plus:",
      "Integration across multiple systems (scheduling + inventory + CRM)",
      "Multi-location & multi-number support",
      "Custom workflows & routing logic",
      "Priority support with dedicated optimization",
      "Advanced analytics & reporting",
    ],
  },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")";

/* Magnetic CTA — drifts toward the cursor, snaps back on leave (matches innovaas.co) */
function MagneticLink({
  href,
  children,
  variant,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant: "solid" | "ghost";
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  const base =
    "inline-block rounded-sm px-7 py-3.5 text-sm font-semibold tracking-wide will-change-transform";
  const styles =
    variant === "solid"
      ? "bg-signal-500 text-white hover:bg-signal-400"
      : "border border-line-strong text-ink-100 hover:border-signal-500 hover:text-signal-400";
  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles}`}
      style={{
        transition:
          "transform 0.25s cubic-bezier(0.22,1,0.36,1), background-color 0.2s, border-color 0.2s, color 0.2s",
      }}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}

/* Section eyebrow */
function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="nv-kicker mb-4">{children}</p>;
}

export default function NovaVoicePage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    organization_name: "",
    role: "",
    notes: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Scroll-reveal + illumination (touch) — mirrors the innovaas.co motion system.
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            e.target.classList.remove("reveal-pending");
            reveal.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal-pending").forEach((el) => reveal.observe(el));

    const lit = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("illum-lit");
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll(".illum-card").forEach((el) => lit.observe(el));

    return () => {
      reveal.disconnect();
      lit.disconnect();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch(`${NOVACRM_API_URL}/api/leads/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(NOVACRM_API_KEY ? { "X-Api-Key": NOVACRM_API_KEY } : {}),
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          organization_name: form.organization_name || undefined,
          role: form.role || undefined,
          interest: "novavoice",
          notes: form.notes || undefined,
          page_slug: "novavoice-landing",
          source: "novavoice-landing",
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || `Request failed (${res.status})`);
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  const inputClass =
    "w-full rounded-md border border-line bg-ink-950 px-4 py-3 text-ink-100 placeholder-ink-600 outline-none transition-colors focus:border-signal-500 focus:ring-1 focus:ring-signal-500";

  return (
    <div className="nv-landing">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="relative overflow-hidden border-b border-line bg-ink-950">
        <div className="absolute inset-0">
          <Image
            src="/generated/hero-signal.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,8,14,0.97) 0%, rgba(5,8,14,0.86) 36%, rgba(5,8,14,0.42) 70%, rgba(5,8,14,0.62) 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: "linear-gradient(180deg, transparent, #05080e)" }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-24 md:grid-cols-[1fr_280px] md:pb-24 md:pt-32 lg:pt-36">
          <div>
            <p className="nv-kicker mb-7 flex items-center gap-3">
              <span className="nv-pulse inline-block h-2 w-2 rounded-full bg-signal-500" />
              AI PHONE AGENT — ALWAYS ON
            </p>
            <h1 className="nv-display text-ink-50">
              <span
                className="nv-hero-line block text-[clamp(3rem,9vw,7rem)]"
                style={{ animationDelay: "0.05s" }}
              >
                Answer
              </span>
              <span
                className="nv-hero-line block text-[clamp(3rem,9vw,7rem)]"
                style={{ animationDelay: "0.18s" }}
              >
                every
              </span>
              <span
                className="nv-hero-line block text-[clamp(3rem,9vw,7rem)]"
                style={{ animationDelay: "0.31s" }}
              >
                <span className="nv-outline">call</span>
                <span className="text-signal-500">.</span>
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-300">
              NovaVoice is a custom AI phone agent that answers every call, books
              appointments, and captures every lead — 24/7/365. No voicemail. No
              missed revenue.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticLink href="#get-started" variant="solid">
                Get a Demo
              </MagneticLink>
              <MagneticLink href="#overview" variant="ghost">
                See How It Works
              </MagneticLink>
            </div>
          </div>

          {/* Stat rail */}
          <div className="flex flex-col justify-end self-end">
            {HERO_STATS.map((s) => (
              <div key={s.k} className="border-t border-line py-4 last:border-b">
                <p className="font-mono text-xs tracking-[0.2em] text-signal-500">
                  {s.k}
                </p>
                <p className="mt-1 text-sm text-ink-300">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── IMPACT STAT BAND ──────────────────── */}
      <section className="border-b border-line bg-ink-900">
        <div className="reveal-pending mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {COST_STATS.map((s, i) => (
            <div
              key={s.v}
              className={`px-6 py-9 ${i % 2 === 0 ? "border-r border-line" : ""} ${
                i < 2 ? "border-b border-line md:border-b-0" : ""
              } ${i === 2 ? "md:border-r md:border-line" : ""}`}
            >
              <p className="nv-display text-4xl text-signal-500 md:text-5xl">
                {s.v}
              </p>
              <p className="mt-2 text-sm leading-snug text-ink-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── OVERVIEW ───────────────────────── */}
      <section id="overview" className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending grid items-center gap-12 md:grid-cols-2">
            <div>
              <Kicker>The product</Kicker>
              <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
                An AI receptionist that actually sounds human
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-300">
                NovaVoice answers your business calls with the intelligence of a
                trained receptionist and the availability of a machine. It knows
                why callers are reaching out, books appointments into your
                calendar, answers questions about your services and pricing, and
                routes complex issues to the right person.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-400">
                Unlike robotic IVR menus or generic chatbots, it holds natural
                conversations. Callers get real answers — not &quot;press 1 for
                sales.&quot; Whether it&apos;s 2 PM on a Tuesday or 2 AM on a Sunday.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-line">
              <Image
                src="/generated/overview-agent.jpg"
                alt="NovaVoice AI voice agent visualized as a glowing node routing calls"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="reveal-pending mt-14">
            <div className="overflow-hidden rounded-xl border border-line shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              <NovaVoiceDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── PROBLEM ───────────────────────── */}
      <section className="border-b border-line bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending">
            <Kicker>The problem</Kicker>
            <h2 className="max-w-3xl font-display text-3xl font-bold text-ink-50 md:text-4xl">
              Phone calls drive 69% of business inquiries. Most never get
              answered.
            </h2>
          </div>
          <div className="reveal-pending mt-12 grid gap-6 md:grid-cols-3">
            {PROBLEMS.map((p) => (
              <div
                key={p.title}
                className="rounded-lg border border-line bg-ink-850 p-7 transition-colors hover:border-signal-500/40"
              >
                <h3 className="font-display text-lg font-semibold text-ink-50">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── HOW IT WORKS ───────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending">
            <Kicker>How it works</Kicker>
            <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
              Live in days, not months
            </h2>
          </div>
          <div className="reveal-pending mt-12 grid gap-px overflow-hidden rounded-xl border border-line md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-ink-900 p-8">
                <p className="nv-display text-5xl text-signal-500/30">{s.n}</p>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-50">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── CONVERSATION ───────────────────────── */}
      <section className="border-b border-line bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending">
            <Kicker>The conversation</Kicker>
            <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
              Natural, human-like conversations
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-300">
              NovaVoice doesn&apos;t sound like a robot. It holds real
              conversations — understanding context, remembering caller history,
              and taking action in real time.
            </p>
          </div>
          <div className="reveal-pending mt-12">
            <div className="overflow-hidden rounded-xl border border-line shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              <NovaVoiceCallFlow />
            </div>
            <p className="mt-4 text-center text-xs text-ink-500">
              Live call transcript: real-time intent detection, caller history,
              and automated appointment booking.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── FEATURES ───────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending">
            <Kicker>Capabilities</Kicker>
            <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
              Everything a great receptionist does — at machine scale
            </h2>
          </div>
          <div className="reveal-pending mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.t}
                className="group rounded-lg border border-line bg-ink-900 p-6 transition-colors hover:border-signal-500/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-signal-500/10 text-signal-500">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10.5l3.5 3.5L16 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-ink-50">
                  {f.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── ANALYTICS ───────────────────────── */}
      <section className="border-b border-line bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending">
            <Kicker>The dashboard</Kicker>
            <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
              Full visibility into every call
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-300">
              Know exactly what customers call about, when they call, and how
              every interaction ends — with data-driven insight to grow.
            </p>
          </div>
          <div className="reveal-pending mt-12">
            <div className="overflow-hidden rounded-xl border border-line shadow-[0_0_60px_rgba(0,0,0,0.5)]">
              <NovaVoiceAnalytics />
            </div>
            <p className="mt-4 text-center text-xs text-ink-500">
              Monthly analytics: call reasons, peak hours, sentiment, and cost
              savings.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── INDUSTRIES ───────────────────────── */}
      <section id="industries" className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending">
            <Kicker>Industries</Kicker>
            <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
              Built for businesses where a missed call has a price tag
            </h2>
          </div>

          <div className="reveal-pending mt-12 grid gap-6 md:grid-cols-3">
            {PHOTO_INDUSTRIES.map((ind) => (
              <div
                key={ind.title}
                className="illum-card overflow-hidden rounded-lg border border-line bg-ink-900"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={ind.img}
                    alt={ind.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(5,8,14,0.1) 35%, rgba(5,8,14,0.94))",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-display text-lg font-semibold text-ink-50">
                      {ind.title}
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-ink-200">
                      {ind.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-pending mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEXT_INDUSTRIES.map((ind) => (
              <div
                key={ind.t}
                className="rounded-lg border border-line bg-ink-900 p-6 transition-colors hover:border-signal-500/40"
              >
                <h3 className="font-display text-base font-semibold text-signal-500">
                  {ind.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">
                  {ind.d}
                </p>
              </div>
            ))}
          </div>

          {/* Pilot banner */}
          <div className="reveal-pending mt-12">
            <div className="relative overflow-hidden rounded-xl border border-signal-500/40 bg-ink-900 px-6 py-12 text-center shadow-[0_0_70px_rgba(242,92,5,0.12)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(60% 120% at 50% 0%, rgba(242,92,5,0.18), transparent 70%)",
                }}
              />
              <div className="relative">
                <h3 className="font-display text-2xl font-bold text-ink-50">
                  Be our first success story
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-ink-300">
                  We&apos;re onboarding a limited number of pilot partners. Get
                  priority setup, hands-on support, and help us prove what
                  NovaVoice can do for your industry.
                </p>
                <div className="mt-7 flex justify-center">
                  <MagneticLink href="#get-started" variant="solid">
                    Join the Pilot Program
                  </MagneticLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────── PRICING ───────────────────────── */}
      <section id="pricing" className="border-b border-line bg-ink-900">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending text-center">
            <Kicker>
              <span className="block">Pricing</span>
            </Kicker>
            <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
              Pricing that scales with your business
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-300">
              From simple call answering to deep system integration — choose the
              depth your business needs. No per-minute charges, no hidden fees.
            </p>
          </div>

          <div className="reveal-pending mt-14 grid items-stretch gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col overflow-hidden rounded-xl border bg-ink-950 ${
                  tier.featured
                    ? "border-signal-500 shadow-[0_0_60px_rgba(242,92,5,0.16)] lg:scale-[1.03]"
                    : "border-line"
                }`}
              >
                {tier.featured && (
                  <div className="bg-signal-500 py-1.5 text-center font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white">
                    Most Popular
                  </div>
                )}
                <div className="p-7 pb-3">
                  <h3 className="font-display text-xl font-bold text-ink-50">
                    {tier.name}
                  </h3>
                  <p className="mt-2 min-h-[60px] text-sm text-ink-400">
                    {tier.blurb}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="nv-display text-4xl text-ink-50">
                      {tier.monthly}
                    </span>
                    <span className="text-sm text-ink-400">/mo</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-400">{tier.setup}</p>
                </div>
                <ul className="flex-1 space-y-2.5 px-7">
                  {tier.features.map((f) =>
                    f.endsWith(":") ? (
                      <li
                        key={f}
                        className="pt-2 text-sm font-semibold text-ink-200"
                      >
                        {f}
                      </li>
                    ) : (
                      <li
                        key={f}
                        className="flex gap-2 text-sm text-ink-300"
                      >
                        <svg
                          className="mt-0.5 shrink-0 text-signal-500"
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M4 10.5l3.5 3.5L16 5.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {f}
                      </li>
                    )
                  )}
                </ul>
                <div className="p-7 pt-6">
                  <Link
                    href={tier.cta.href}
                    className={`block rounded-md py-3 text-center text-sm font-semibold transition-colors ${
                      tier.featured
                        ? "bg-signal-500 text-white hover:bg-signal-400"
                        : "border border-signal-500 text-signal-500 hover:bg-signal-500 hover:text-white"
                    }`}
                  >
                    {tier.cta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Enterprise strip */}
          <div className="reveal-pending mt-8">
            <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-line bg-ink-950 p-6 md:flex-row">
              <div>
                <p className="font-display font-semibold text-ink-50">
                  Running a franchise or chain?
                </p>
                <p className="text-sm text-ink-400">
                  We build bespoke, multi-location deployments with SLAs and
                  dedicated support.
                </p>
              </div>
              <Link
                href="#get-started"
                className="shrink-0 rounded-md border border-signal-500 px-5 py-2.5 text-sm font-semibold text-signal-500 transition-colors hover:bg-signal-500 hover:text-white"
              >
                Get a Custom Quote
              </Link>
            </div>
            <p className="mt-6 text-center text-sm text-ink-400">
              <span className="font-semibold text-ink-200">
                Still 85–95% less
              </span>{" "}
              than a full-time receptionist — with 24/7 coverage, zero sick days,
              and every call answered.
            </p>
          </div>
        </div>
      </section>

      {/* ───────────────────────── LEAD FORM ───────────────────────── */}
      <section id="get-started" className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="reveal-pending text-center">
            <Kicker>
              <span className="block">Get started</span>
            </Kicker>
            <h2 className="font-display text-3xl font-bold text-ink-50 md:text-4xl">
              Ready to stop missing calls?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-300">
              Tell us about your business and we&apos;ll show you how NovaVoice can
              start answering your phones.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl rounded-xl border border-line bg-ink-900 p-6 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-signal-500/10 text-signal-500">
                  <svg width="28" height="28" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10.5l3.5 3.5L16 5.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink-50">
                  Thanks! We&apos;ll be in touch shortly.
                </h3>
                <p className="mt-2 max-w-md text-ink-400">
                  We&apos;ve received your inquiry and will reach out within one
                  business day to discuss your AI phone agent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-ink-200"
                    >
                      Full name <span className="text-signal-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-ink-200"
                    >
                      Work email <span className="text-signal-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="organization_name"
                      className="mb-1.5 block text-sm font-medium text-ink-200"
                    >
                      Business name
                    </label>
                    <input
                      id="organization_name"
                      name="organization_name"
                      autoComplete="organization"
                      value={form.organization_name}
                      onChange={handleChange}
                      placeholder="Riverside Dental"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="role"
                      className="mb-1.5 block text-sm font-medium text-ink-200"
                    >
                      Industry
                    </label>
                    <input
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="e.g., Dental, HVAC, Legal"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="mb-1.5 block text-sm font-medium text-ink-200"
                  >
                    How many calls does your business get per day?
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="e.g., About 20-30 calls/day. We miss a lot during lunch and after 5 PM. Most are appointment requests and pricing questions..."
                    className={inputClass}
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded-md bg-signal-500 py-4 text-base font-semibold text-white transition-colors hover:bg-signal-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Get your AI phone agent"}
                </button>
                <p className="text-center text-xs text-ink-500">
                  We respect your privacy and will never share your information.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ───────────────────────── FINAL CTA ───────────────────────── */}
      <section className="relative overflow-hidden bg-ink-950">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 90% at 50% 100%, rgba(242,92,5,0.16), transparent 70%)",
          }}
        />
        <div className="reveal-pending relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <h2 className="nv-display text-ink-50 text-[clamp(2.5rem,7vw,5rem)]">
            Every missed call is{" "}
            <span className="nv-outline">money</span> lost
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
            Small businesses lose an average of $126,000 a year to unanswered
            calls. NovaVoice makes sure your phone is always answered — so you can
            focus on running your business.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticLink href="#get-started" variant="solid">
              Get Started
            </MagneticLink>
            <MagneticLink href="https://innovaas.co/contact" variant="ghost" external>
              Talk to Us
            </MagneticLink>
          </div>
        </div>
      </section>

      {/* ElevenLabs ConvAI Widget — Lou, NovaVoice assistant */}
      {/* @ts-expect-error — elevenlabs-convai is a web component not known to React's JSX types */}
      <elevenlabs-convai agent-id="agent_2901kh6db6n6fjk94rms1ns8vrtt"></elevenlabs-convai>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
      />
    </div>
  );
}
