"use client";

import { useState, useMemo } from "react";
import { Box, Heading, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MotionBox = motion(Box);

interface CashflowInputs {
  totalRaise: number;
  numContributors: number;
  interestRate: number;
  setupFee: number;
  monthlySub: number;
  commissionRate: number;
  custConservative: number;
  custOptimistic: number;
  adBudget: number;
  emailBudget: number;
  billsBudget: number;
  adPaceMonths: number;
  costSupabase: number;
  costVercel: number;
  costClaude: number;
  voiceLow: number;
  voiceHigh: number;
}

interface MonthData {
  month: number;
  newCust: number;
  cumCust: number;
  setupRev: number;
  subRev: number;
  totalRev: number;
  commission: number;
  ads: number;
  email: number;
  fixedInfra: number;
  voice: number;
  loanRepay: number;
  totalCosts: number;
  netCashflow: number;
  cashBalance: number;
  grossMargin: number;
}

const defaultInputs: CashflowInputs = {
  totalRaise: 25000,
  numContributors: 10,
  interestRate: 25,
  setupFee: 5000,
  monthlySub: 639,
  commissionRate: 25,
  custConservative: 5,
  custOptimistic: 8,
  adBudget: 10000,
  emailBudget: 5000,
  billsBudget: 10000,
  adPaceMonths: 6,
  costSupabase: 50,
  costVercel: 20,
  costClaude: 200,
  voiceLow: 7,
  voiceHigh: 28,
};

function computeModel(inputs: CashflowInputs, newCustPerMonth: number): MonthData[] {
  const totalRepay = inputs.totalRaise * (1 + inputs.interestRate / 100);
  const monthlyRepay = totalRepay / 12;
  const adMonthly = inputs.adBudget / inputs.adPaceMonths;
  const emailMonthly = inputs.emailBudget / inputs.adPaceMonths;
  const fixedInfra = inputs.costSupabase + inputs.costVercel + inputs.costClaude;
  const voiceMid = (inputs.voiceLow + inputs.voiceHigh) / 2;

  const months: MonthData[] = [];
  let cumCustomers = 0;
  let cashBalance = inputs.totalRaise;

  for (let m = 1; m <= 12; m++) {
    cumCustomers += newCustPerMonth;
    const setupRev = newCustPerMonth * inputs.setupFee;
    const subRev = cumCustomers * inputs.monthlySub;
    const totalRev = setupRev + subRev;
    const commission = totalRev * (inputs.commissionRate / 100);
    const ads = m <= inputs.adPaceMonths ? adMonthly : 0;
    const email = m <= inputs.adPaceMonths ? emailMonthly : 0;
    const voice = cumCustomers * voiceMid;
    const loanRepay = m <= 3 ? 0 : monthlyRepay;
    const totalCosts = commission + ads + email + fixedInfra + voice + loanRepay;
    const netCashflow = totalRev - totalCosts;
    cashBalance += netCashflow;
    const grossMargin = totalRev > 0 ? (totalRev - commission - voice) / totalRev : 0;

    months.push({
      month: m,
      newCust: newCustPerMonth,
      cumCust: cumCustomers,
      setupRev,
      subRev,
      totalRev,
      commission,
      ads,
      email,
      fixedInfra,
      voice,
      loanRepay,
      totalCosts,
      netCashflow,
      cashBalance,
      grossMargin,
    });
  }
  return months;
}

const fmt = (n: number) => {
  if (Math.abs(n) < 0.5) return "-";
  const neg = n < 0;
  const s = "$" + Math.abs(Math.round(n)).toLocaleString("en-US");
  return neg ? "(" + s + ")" : s;
};

const pct = (n: number) => (n * 100).toFixed(1) + "%";

function InputRow({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
}) {
  return (
    <Flex justify="space-between" align="center" py={1}>
      <Text fontSize="0.85rem" color="#64748b !important">
        {label}
      </Text>
      <Flex align="center" gap={1}>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            fontFamily: "monospace",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "#F25C05",
            background: "#FFF8F3",
            border: "1px solid #f1e8e0",
            borderRadius: "6px",
            padding: "0.25rem 0.5rem",
            width: "100px",
            textAlign: "right",
            outline: "none",
          }}
        />
        {suffix && (
          <Text fontSize="0.78rem" color="#64748b !important">
            {suffix}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

function DisplayRow({ label, value }: { label: string; value: string }) {
  return (
    <Flex justify="space-between" align="center" py={1}>
      <Text fontSize="0.85rem" color="#64748b !important">
        {label}
      </Text>
      <Text fontFamily="monospace" fontSize="0.85rem" fontWeight="600" color="#F25C05 !important">
        {value}
      </Text>
    </Flex>
  );
}

export default function FinancialProjectionsSection() {
  const [inputs, setInputs] = useState<CashflowInputs>(defaultInputs);
  const [activeTab, setActiveTab] = useState<"conservative" | "optimistic">("conservative");

  const update = (key: keyof CashflowInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const consData = useMemo(() => computeModel(inputs, inputs.custConservative), [inputs]);
  const optData = useMemo(() => computeModel(inputs, inputs.custOptimistic), [inputs]);
  const data = activeTab === "conservative" ? consData : optData;

  const totalRepay = inputs.totalRaise * (1 + inputs.interestRate / 100);
  const fixedInfra = inputs.costSupabase + inputs.costVercel + inputs.costClaude;
  const voiceMid = (inputs.voiceLow + inputs.voiceHigh) / 2;

  const revTotal = data.reduce((s, d) => s + d.totalRev, 0);
  const commTotal = data.reduce((s, d) => s + d.commission, 0);
  const voiceTotal = data.reduce((s, d) => s + d.voice, 0);
  const overallGM = revTotal > 0 ? (revTotal - commTotal - voiceTotal) / revTotal : 0;

  // Chart data
  const chartData = data.map((d) => ({
    name: `M${d.month}`,
    Revenue: Math.round(d.totalRev),
    Costs: Math.round(d.totalCosts),
    "Cash Balance": Math.round(d.cashBalance),
  }));

  // Loan schedule (3-month grace period, then 12 monthly payments)
  const monthlyPayment = totalRepay / 12;
  const monthlyPrincipal = inputs.totalRaise / 12;
  const loanSchedule = [];
  let balance = totalRepay;
  for (let m = 4; m <= 15; m++) {
    const interestPortion = monthlyPayment - monthlyPrincipal;
    const closing = balance - monthlyPayment;
    loanSchedule.push({ month: m, opening: balance, payment: monthlyPayment, interest: interestPortion, principal: monthlyPrincipal, closing: Math.max(0, closing) });
    balance = closing;
  }

  // Cashflow table rows config
  const rows: Array<{ section?: string; label?: string; key?: keyof MonthData; format?: string; total?: boolean; highlight?: boolean }> = [
    { section: "Customers" },
    { label: "New customers", key: "newCust", format: "num" },
    { label: "Cumulative customers", key: "cumCust", format: "num" },
    { section: "Revenue" },
    { label: "Setup fees", key: "setupRev", format: "usd" },
    { label: "Subscriptions", key: "subRev", format: "usd" },
    { label: "Total Revenue", key: "totalRev", format: "usd", total: true },
    { section: "Costs" },
    { label: `Sales commission (${inputs.commissionRate}%)`, key: "commission", format: "usd" },
    { label: "Facebook ads", key: "ads", format: "usd" },
    { label: "Email outreach", key: "email", format: "usd" },
    { label: "Fixed infrastructure", key: "fixedInfra", format: "usd" },
    { label: "Voice agent costs", key: "voice", format: "usd" },
    { label: "Loan repayment", key: "loanRepay", format: "usd" },
    { label: "Total Costs", key: "totalCosts", format: "usd", total: true },
    { section: "Net Cashflow" },
    { label: "Monthly net cashflow", key: "netCashflow", format: "usd", highlight: true },
    { label: "Cash balance", key: "cashBalance", format: "usd", highlight: true },
    { section: "Key Metrics" },
    { label: "Gross margin", key: "grossMargin", format: "pct" },
  ];

  return (
    <Box id="financials" className="bp-section bp-section-white">
      <Box maxW="1200px" mx="auto">
        <Heading as="h2" fontSize={{ base: "1.75rem", md: "2.25rem" }} mb={2} textAlign="center">
          Financial Projections
        </Heading>
        <Text textAlign="center" mb={8} fontSize="1.05rem" maxW="650px" mx="auto">
          Interactive 12-month cashflow model. Adjust assumptions to explore scenarios.
        </Text>

        {/* Summary Cards */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={8}>
          {[
            { label: "Total Raise", value: fmt(inputs.totalRaise), sub: `Repay ${fmt(totalRepay)} over 12mo`, color: "#3b82f6" },
            { label: "12-Month Revenue", value: fmt(revTotal), sub: `${activeTab === "conservative" ? "Conservative" : "Optimistic"} scenario`, color: "#22c55e" },
            { label: "End Cash Balance", value: fmt(data[11].cashBalance), sub: "After all costs & repayment", color: "#F25C05" },
            { label: "Gross Margin", value: pct(overallGM), sub: "Revenue − commission − voice", color: "#8b5cf6" },
          ].map((card) => (
            <Box key={card.label} className="bp-stat-card" position="relative" overflow="hidden">
              <Box position="absolute" top={0} left={0} right={0} h="3px" bg={card.color} />
              <Text className="bp-stat-label">{card.label}</Text>
              <Text className="bp-stat-value" style={{ color: card.color }}>{card.value}</Text>
              <Text className="bp-stat-sub">{card.sub}</Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Assumptions */}
        <MotionBox
          className="bp-card"
          mb={8}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontWeight="700" fontSize="1rem" mb={4} color="#1e293b !important">
            Assumptions
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
            <Box>
              <Text fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em" color="#64748b !important" mb={2} borderBottom="1px solid #f1e8e0" pb={2}>
                Fundraise
              </Text>
              <InputRow label="Total raise" value={inputs.totalRaise} onChange={(v) => update("totalRaise", v)} />
              <InputRow label="Contributors" value={inputs.numContributors} onChange={(v) => update("numContributors", v)} />
              <DisplayRow label="Per person" value={fmt(inputs.totalRaise / inputs.numContributors)} />
              <InputRow label="Interest rate" value={inputs.interestRate} onChange={(v) => update("interestRate", v)} suffix="%" />
              <DisplayRow label="Total repayment" value={fmt(totalRepay)} />
              <DisplayRow label="Monthly repayment" value={fmt(totalRepay / 12)} />
            </Box>
            <Box>
              <Text fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em" color="#64748b !important" mb={2} borderBottom="1px solid #f1e8e0" pb={2}>
                Revenue & Pricing
              </Text>
              <InputRow label="Setup fee" value={inputs.setupFee} onChange={(v) => update("setupFee", v)} />
              <InputRow label="Monthly subscription" value={inputs.monthlySub} onChange={(v) => update("monthlySub", v)} />
              <InputRow label="Sales commission" value={inputs.commissionRate} onChange={(v) => update("commissionRate", v)} suffix="%" />
              <InputRow label="New cust/mo (cons.)" value={inputs.custConservative} onChange={(v) => update("custConservative", v)} />
              <InputRow label="New cust/mo (opt.)" value={inputs.custOptimistic} onChange={(v) => update("custOptimistic", v)} />
            </Box>
            <Box>
              <Text fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em" color="#64748b !important" mb={2} borderBottom="1px solid #f1e8e0" pb={2}>
                Budget Allocation
              </Text>
              <InputRow label="Facebook ads" value={inputs.adBudget} onChange={(v) => update("adBudget", v)} />
              <InputRow label="Email outreach" value={inputs.emailBudget} onChange={(v) => update("emailBudget", v)} />
              <InputRow label="Bills / runway" value={inputs.billsBudget} onChange={(v) => update("billsBudget", v)} />
              <InputRow label="Ad spend pace" value={inputs.adPaceMonths} onChange={(v) => update("adPaceMonths", v)} suffix="mo" />
            </Box>
            <Box>
              <Text fontSize="0.72rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.08em" color="#64748b !important" mb={2} borderBottom="1px solid #f1e8e0" pb={2}>
                Monthly Costs
              </Text>
              <InputRow label="Supabase" value={inputs.costSupabase} onChange={(v) => update("costSupabase", v)} />
              <InputRow label="Vercel" value={inputs.costVercel} onChange={(v) => update("costVercel", v)} />
              <InputRow label="Claude Max" value={inputs.costClaude} onChange={(v) => update("costClaude", v)} />
              <DisplayRow label="Total fixed infra" value={fmt(fixedInfra)} />
              <InputRow label="Voice cost/cust (low)" value={inputs.voiceLow} onChange={(v) => update("voiceLow", v)} />
              <InputRow label="Voice cost/cust (high)" value={inputs.voiceHigh} onChange={(v) => update("voiceHigh", v)} />
              <DisplayRow label="Voice cost (mid)" value={`$${voiceMid.toFixed(2)}`} />
            </Box>
          </SimpleGrid>
        </MotionBox>

        {/* Chart */}
        <MotionBox
          className="bp-chart-container"
          mb={8}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontWeight="700" mb={4} color="#1e293b !important" fontSize="0.95rem">
            Revenue vs. Costs with Cash Balance
          </Text>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={chartData} margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1e8e0" />
              <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" />
              <YAxis yAxisId="left" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} fontSize={11} stroke="#94a3b8" />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} fontSize={11} stroke="#94a3b8" />
              <Tooltip
                formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name]}
                contentStyle={{ borderRadius: 8, border: "1px solid #f1e8e0", fontSize: 13 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={20} opacity={0.8} />
              <Bar yAxisId="left" dataKey="Costs" fill="#f87171" radius={[4, 4, 0, 0]} barSize={20} opacity={0.8} />
              <Line yAxisId="right" type="monotone" dataKey="Cash Balance" stroke="#F25C05" strokeWidth={2.5} dot={{ fill: "#F25C05", r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </MotionBox>

        {/* Tabs + Cashflow Table */}
        <Box className="bp-card" mb={8} p={0} overflow="hidden">
          <Flex borderBottom="1px solid #f1e8e0">
            {(["conservative", "optimistic"] as const).map((tab) => (
              <Box
                key={tab}
                as="button"
                px={6}
                py={3}
                fontSize="0.85rem"
                fontWeight="600"
                color={activeTab === tab ? "#F25C05" : "#64748b"}
                borderBottom={activeTab === tab ? "2px solid #F25C05" : "2px solid transparent"}
                bg={activeTab === tab ? "#FFF8F3" : "transparent"}
                onClick={() => setActiveTab(tab)}
                _hover={{ color: "#F25C05" }}
                textTransform="capitalize"
              >
                {tab} ({tab === "conservative" ? inputs.custConservative : inputs.custOptimistic}/mo)
              </Box>
            ))}
          </Flex>
          <Box overflowX="auto" p={0}>
            <table className="bp-cashflow-table">
              <thead>
                <tr>
                  <th></th>
                  {data.map((d) => (
                    <th key={d.month}>M{d.month}</th>
                  ))}
                  <th style={{ color: "#F25C05" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => {
                  if (r.section) {
                    return (
                      <tr key={idx} className="bp-cashflow-section-row">
                        <td colSpan={14}>{r.section}</td>
                      </tr>
                    );
                  }

                  const key = r.key!;
                  const isHighlight = r.highlight;
                  const isTotal = r.total;
                  let cls = "";
                  if (isHighlight) {
                    cls = data[11][key] as number >= 0 ? "bp-cashflow-highlight-positive" : "bp-cashflow-highlight-negative";
                  } else if (isTotal) {
                    cls = "bp-cashflow-total-row";
                  }

                  let sum = 0;
                  const cells = data.map((d) => {
                    const v = d[key] as number;
                    if (key !== "cashBalance" && key !== "cumCust" && key !== "grossMargin") sum += v;
                    const formatted = r.format === "pct" ? pct(v) : r.format === "num" ? String(v) : fmt(v);
                    return <td key={d.month}>{formatted}</td>;
                  });

                  let totalCell: string;
                  if (key === "cashBalance" || key === "cumCust") {
                    const last = data[11][key] as number;
                    totalCell = r.format === "num" ? String(last) : fmt(last);
                  } else if (key === "grossMargin") {
                    totalCell = pct(overallGM);
                  } else {
                    totalCell = r.format === "num" ? String(sum) : fmt(sum);
                  }

                  return (
                    <tr key={idx} className={cls}>
                      <td>{r.label}</td>
                      {cells}
                      <td style={{ fontWeight: 700 }}>{totalCell}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </Box>

        {/* Loan Repayment */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Text fontWeight="700" mb={2} color="#1e293b !important" fontSize="0.95rem" textAlign="center">
            Loan Repayment Schedule
          </Text>
          <Text fontSize="0.85rem" color="#64748b !important" textAlign="center" mb={4}>
            Repayments begin after a 3-month grace period
          </Text>
          <Box className="bp-table-wrap">
            <table className="bp-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Month</th>
                  <th>Opening Balance</th>
                  <th>Payment</th>
                  <th>Interest</th>
                  <th>Principal</th>
                  <th>Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                {loanSchedule.map((row) => (
                  <tr key={row.month}>
                    <td style={{ textAlign: "center", fontWeight: 600, color: "#1e293b" }}>{row.month}</td>
                    <td>{fmt(row.opening)}</td>
                    <td>{fmt(row.payment)}</td>
                    <td style={{ color: "#F25C05", fontWeight: 600 }}>{fmt(row.interest)}</td>
                    <td>{fmt(row.principal)}</td>
                    <td>{fmt(row.closing)}</td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700, borderTop: "2px solid #f1e8e0" }}>
                  <td style={{ fontWeight: 700, color: "#1e293b" }}>Total</td>
                  <td></td>
                  <td style={{ fontWeight: 700 }}>{fmt(totalRepay)}</td>
                  <td style={{ color: "#F25C05", fontWeight: 700 }}>{fmt(totalRepay - inputs.totalRaise)}</td>
                  <td style={{ fontWeight: 700 }}>{fmt(inputs.totalRaise)}</td>
                  <td style={{ fontWeight: 700 }}>{fmt(0)}</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </MotionBox>
      </Box>
    </Box>
  );
}
