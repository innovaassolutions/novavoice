"use client";

import { Box } from "@chakra-ui/react";
import "./bizplan.css";
import StickyNav from "./components/StickyNav";
import HeroSection from "./components/HeroSection";
import ExecutiveSummarySection from "./components/ExecutiveSummarySection";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import MarketOpportunitySection from "./components/MarketOpportunitySection";
import CompetitiveLandscapeSection from "./components/CompetitiveLandscapeSection";
import BusinessModelSection from "./components/BusinessModelSection";
import FinancialProjectionsSection from "./components/FinancialProjectionsSection";
import UseOfFundsSection from "./components/UseOfFundsSection";
import InvestmentTermsSection from "./components/InvestmentTermsSection";
import CTASection from "./components/CTASection";

import { useSectionAnalytics } from "./hooks/useSectionAnalytics";

interface BizPlanClientProps {
  viewId: string;
  investorId: string;
}

export default function BizPlanClient({ viewId, investorId }: BizPlanClientProps) {
  useSectionAnalytics(viewId, investorId);

  return (
    <Box className="bizplan-wrapper">
      <StickyNav />
      <HeroSection />
      <ExecutiveSummarySection />
      <ProblemSection />
      <SolutionSection />
      <MarketOpportunitySection />
      <CompetitiveLandscapeSection />
      <BusinessModelSection />
      <FinancialProjectionsSection />
      <UseOfFundsSection />
      <InvestmentTermsSection />
      <CTASection />
    </Box>
  );
}
