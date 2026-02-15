// ─── Executive Summary Stats ────────────────────────────────────────────────
export const executiveStats = [
  { label: "Total Addressable Market", value: "$42.2B", sub: "Annual recurring revenue" },
  { label: "Calls Unanswered", value: "62%", sub: "Small business calls missed" },
  { label: "Monthly Cost vs In-House", value: "$639/mo", sub: "vs $5,000+/mo receptionist" },
  { label: "Market Growth (CAGR)", value: "34.8%", sub: "AI voice agent market" },
  { label: "Capital Raise", value: "$25,000", sub: "10 investors × $2,500" },
  { label: "LTV/CAC Ratio", value: "17.7x", sub: "Conservative estimate" },
];

// ─── Problem Section ────────────────────────────────────────────────────────
export const missedCallStats = [
  { stat: "80%", description: "of callers who reach voicemail hang up without leaving a message" },
  { stat: "85%", description: "of unanswered callers never call back — directionally supported across multiple industry studies" },
  { stat: "$25K–$60K", description: "annual revenue lost per business from unanswered calls" },
];

export const industryMissRates = [
  { industry: "Home Services", rate: 62, color: "#F25C05" },
  { industry: "Law Firms", rate: 60, color: "#f59e0b" },
  { industry: "Professional Services", rate: 54, color: "#3b82f6" },
  { industry: "Healthcare", rate: 45, color: "#22c55e" },
  { industry: "Average Small Business", rate: 62, color: "#8b5cf6" },
];

// ─── Solution Section ────────────────────────────────────────────────────────
export const howItWorks = [
  {
    step: 1,
    title: "Custom Setup",
    description: "We integrate directly with your scheduling system, CRM, and knowledge base via custom API connections — no Zapier workarounds.",
  },
  {
    step: 2,
    title: "AI Answers Every Call",
    description: "NovaVoice picks up 24/7/365 — booking appointments, qualifying leads, answering FAQs, and routing urgent calls.",
  },
  {
    step: 3,
    title: "You Grow Your Business",
    description: "Review call transcripts, track conversions, and watch revenue grow as zero calls go unanswered.",
  },
];

export const differentiators = [
  "Custom API integrations included ($5K–$15K value)",
  "24/7/365 coverage — no after-hours gaps",
  "No annual contracts or lock-in",
  "Multi-language support",
  "Real-time call transcripts and analytics",
  "82–88% cheaper than in-house receptionist",
];

// ─── Market Opportunity Section ─────────────────────────────────────────────
export const tamSamSom = [
  { label: "TAM", value: "$42.2B", businesses: "5.5M businesses", description: "All phone-dependent SMBs in US & Canada" },
  { label: "SAM", value: "$21.1B", businesses: "2.75M businesses", description: "High-value phone-dependent industries" },
  { label: "SOM (Year 3)", value: "$2.0–$2.7M", businesses: "250–350 businesses", description: "Realistic Year 3 target" },
];

export const marketGrowthData = [
  { year: "2024", value: 2.4 },
  { year: "2025", value: 3.2 },
  { year: "2026", value: 4.3 },
  { year: "2027", value: 5.8 },
  { year: "2028", value: 7.9 },
  { year: "2029", value: 10.6 },
  { year: "2030", value: 14.3 },
  { year: "2031", value: 19.3 },
  { year: "2032", value: 26.0 },
  { year: "2033", value: 35.1 },
  { year: "2034", value: 47.5 },
];

export const industryTargets = [
  { industry: "Home Services", firms: "700K–900K", missRate: "62%", urgency: "Extreme" },
  { industry: "Healthcare/Medical", firms: "678K", missRate: "45%+", urgency: "Extreme" },
  { industry: "Legal/Law Firms", firms: "418K", missRate: "60%", urgency: "Extreme" },
  { industry: "Professional Services", firms: "857K", missRate: "54%", urgency: "High" },
  { industry: "Insurance Agencies", firms: "400K", missRate: "High", urgency: "High" },
  { industry: "Dental Practices", firms: "200K", missRate: "High", urgency: "Extreme" },
  { industry: "Auto Repair", firms: "200K", missRate: "High", urgency: "High" },
  { industry: "Property Management", firms: "200K", missRate: "High", urgency: "High" },
  { industry: "Veterinary Clinics", firms: "57K", missRate: "High", urgency: "Extreme" },
];

// ─── Competitive Landscape Section ──────────────────────────────────────────
export const costComparison100 = [
  { provider: "Goodcall (AI)", cost: 79, type: "Self-Service AI" },
  { provider: "Dialzara (AI)", cost: 99, type: "Self-Service AI" },
  { provider: "Rosie (AI)", cost: 149, type: "Self-Service AI" },
  { provider: "SAS (Human)", cost: 312, type: "Human" },
  { provider: "Smith.ai DFY", cost: 500, type: "Managed AI" },
  { provider: "NovaVoice", cost: 639, type: "Managed AI" },
  { provider: "Ruby (Human)", cost: 1400, type: "Human" },
];

export const costComparison300 = [
  { provider: "Rosie (AI)", cost: 149, type: "Self-Service AI" },
  { provider: "Goodcall (AI)", cost: 249, type: "Self-Service AI" },
  { provider: "Dialzara (AI)", cost: 391, type: "Self-Service AI" },
  { provider: "Smith.ai DFY", cost: 500, type: "Managed AI" },
  { provider: "NovaVoice", cost: 639, type: "Managed AI" },
  { provider: "MAP (Human)", cost: 969, type: "Human" },
  { provider: "Ruby (Human)", cost: 3500, type: "Human" },
];

export const costComparison500 = [
  { provider: "Rosie (AI)", cost: 149, type: "Self-Service AI" },
  { provider: "Goodcall (AI)", cost: 249, type: "Self-Service AI" },
  { provider: "NovaVoice", cost: 639, type: "Managed AI" },
  { provider: "Dialzara (AI)", cost: 679, type: "Self-Service AI" },
  { provider: "Smith.ai DFY", cost: 1000, type: "Managed AI" },
  { provider: "PATLive (Human)", cost: 2470, type: "Human" },
  { provider: "Ruby (Human)", cost: 5175, type: "Human" },
];

export const tcoComparison24Months = [
  { provider: "Rosie (Self-Service)", cost: 3576, type: "Self-Service AI" },
  { provider: "Smith.ai AI + DFY Add-on", cost: 8480, type: "Managed AI" },
  { provider: "Ruby (Human, 200 min)", cost: 17280, type: "Human" },
  { provider: "NovaVoice", cost: 20336, type: "Managed AI" },
  { provider: "Smith.ai Done For You", cost: 24000, type: "Managed AI" },
  { provider: "In-House Receptionist", cost: 132000, type: "Human" },
];

export const competitorTiers = [
  {
    tier: "Self-Service AI",
    price: "$29–$375/mo",
    setup: "$0",
    integrations: "Zapier / DIY",
    support: "Business owner configures everything",
    examples: "Rosie, Goodcall, Dialzara, Upfirst, Phonely, Synthflow",
  },
  {
    tier: "NovaVoice (Managed AI)",
    price: "$639/mo",
    setup: "$5,000 one-time",
    integrations: "Custom API integrations included",
    support: "Done-for-you setup & optimization",
    examples: "NovaVoice",
  },
  {
    tier: "Premium Managed AI",
    price: "$500–$2,000/mo",
    setup: "$2,000 add-on (monthly); $0 (annual, $6K–$24K/yr min)",
    integrations: "Custom integrations included",
    support: "Dedicated AI solutions expert",
    examples: "Smith.ai Done For You",
  },
  {
    tier: "Human Answering",
    price: "$250–$3,500+/mo",
    setup: "$0–$95",
    integrations: "Basic / per-integration fees",
    support: "Human operators",
    examples: "Ruby, AnswerConnect, PATLive",
  },
];

// ─── Business Model Section ─────────────────────────────────────────────────
export const unitEconomics = {
  setupFee: 5000,
  monthlySubscription: 639,
  yearlyRecurringPerCustomer: 7668,
  firstYearRevenuePerCustomer: 12668,
  voiceCostPerCustomerPerMonth: 17.5,
  salesCommission: "25%",
  grossMarginTarget: "72–74%",
  ltv: 17742,
  cacConservative: 1000,
  ltvCacRatio: "17.7x",
  avgLifespanMonths: 30.3,
};

export const breakEvenByIndustry = [
  { industry: "Personal Injury Law", avgJobValue: 5000, conversionsNeeded: "0.13 cases", frequency: "~1 every 8 months" },
  { industry: "General Legal", avgJobValue: 3000, conversionsNeeded: "0.21 cases", frequency: "~1 every 5 months" },
  { industry: "HVAC", avgJobValue: 1150, conversionsNeeded: "0.56 jobs", frequency: "~1 every 2 months" },
  { industry: "Dental (New Patient)", avgJobValue: 800, conversionsNeeded: "0.80 patients", frequency: "~1 per month" },
  { industry: "Plumbing", avgJobValue: 300, conversionsNeeded: "2.13 calls", frequency: "~2 per month" },
  { industry: "Home Services", avgJobValue: 500, conversionsNeeded: "1.28 jobs", frequency: "~1–2 per month" },
  { industry: "Auto Repair", avgJobValue: 450, conversionsNeeded: "1.42 services", frequency: "~1–2 per month" },
  { industry: "Medical Practice", avgJobValue: 200, conversionsNeeded: "3.20 visits", frequency: "~3 per month" },
];

// ─── Use of Funds Section ───────────────────────────────────────────────────
export const fundAllocation = [
  { name: "Facebook Ads", value: 10000, color: "#F25C05" },
  { name: "Email Outreach", value: 5000, color: "#3b82f6" },
  { name: "Bills & Runway", value: 10000, color: "#22c55e" },
];

// ─── Investment Terms Section ───────────────────────────────────────────────
export const investmentTerms = {
  totalRaise: 25000,
  numberOfInvestors: 10,
  perInvestor: 2500,
  interestRate: "25%",
  totalReturn: 3125,
  repaymentPeriod: "12 months",
  monthlyRepayment: 2604.17,
  totalRepayment: 31250,
};

export const riskFactors = [
  "Early-stage company with limited operating history",
  "Competitive market with well-funded entrants",
  "Customer acquisition costs may exceed projections",
  "Technology risk — AI voice quality depends on third-party providers",
  "SMB churn rates typically 3–7% monthly",
  "Regulatory changes around AI disclosure requirements",
  "75% of consumers prefer talking to a human (Five9 study)",
  "78% of SMBs have not yet adopted voice AI",
];

// ─── SaaS Metrics ──────────────────────────────────────────────────────────
export const saasMetrics = [
  { label: "Customer LTV (incl. setup)", value: "$17,742", sub: "Based on 30.3-month avg lifespan" },
  { label: "CAC (marketing only)", value: "$1,000", sub: "Conservative estimate" },
  { label: "LTV/CAC Ratio", value: "17.7x", sub: "Industry benchmark: 3x+" },
  { label: "CAC Payback", value: "Immediate", sub: "Setup fee ($5K) exceeds CAC" },
  { label: "Avg Customer Lifespan", value: "30.3 months", sub: "Based on 3.3% monthly churn" },
  { label: "Monthly Churn Rate", value: "3.3%", sub: "~33.5% annualized" },
];

// ─── Churn Sensitivity Data ────────────────────────────────────────────────
export const churnSensitivity = [
  { monthlyChurn: "2%", annualized: "21.4%", activeCustomers: 35, totalRevenue: 345000, netCashflow: 132000, endingCash: 157000, mrr: 22365, isBase: false },
  { monthlyChurn: "3.3%", annualized: "33.5%", activeCustomers: 34, totalRevenue: 336000, netCashflow: 125000, endingCash: 150000, mrr: 21726, isBase: true },
  { monthlyChurn: "5%", annualized: "46.0%", activeCustomers: 32, totalRevenue: 322000, netCashflow: 113000, endingCash: 138000, mrr: 20448, isBase: false },
  { monthlyChurn: "7%", annualized: "58.7%", activeCustomers: 30, totalRevenue: 306000, netCashflow: 99000, endingCash: 124000, mrr: 19170, isBase: false },
];

// ─── Acquisition Ramps ─────────────────────────────────────────────────────
export const acquisitionRamps = {
  conservative: [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5],  // total: 45
  optimistic:   [0, 2, 4, 6, 8, 8, 8, 8, 8, 8, 8, 8],   // total: 76
};

// ─── Loan Schedule (pre-computed for display) ───────────────────────────────
export function computeLoanSchedule(totalRaise: number, interestRate: number) {
  const totalRepay = totalRaise * (1 + interestRate / 100);
  const monthlyPayment = totalRepay / 12;
  const monthlyPrincipal = totalRaise / 12;
  let balance = totalRepay;
  const schedule = [];

  for (let m = 1; m <= 12; m++) {
    const interestPortion = monthlyPayment - monthlyPrincipal;
    const closing = balance - monthlyPayment;
    schedule.push({
      month: m,
      openingBalance: balance,
      payment: monthlyPayment,
      interestPortion,
      principalPortion: monthlyPrincipal,
      closingBalance: Math.max(0, closing),
    });
    balance = closing;
  }

  return { schedule, totalRepay, monthlyPayment, totalInterest: totalRepay - totalRaise };
}

// ─── Section Navigation ─────────────────────────────────────────────────────
export const sections = [
  { id: "executive-summary", label: "Summary" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "market", label: "Market" },
  { id: "competitive", label: "Competition" },
  { id: "business-model", label: "Business Model" },
  { id: "financials", label: "Financials" },
  { id: "use-of-funds", label: "Use of Funds" },
  { id: "terms", label: "Terms" },
  { id: "team", label: "Team" },
  { id: "research", label: "Research" },
  { id: "cta", label: "Invest" },
];
