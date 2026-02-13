export interface Investor {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  notes: string | null;
  commitment_amount: number;
  created_at: string;
  updated_at: string;
}

export interface InvestorToken {
  id: string;
  investor_id: string;
  token: string;
  is_active: boolean;
  created_at: string;
  expires_at: string | null;
  last_used_at: string | null;
}

export interface BizplanView {
  id: string;
  investor_id: string;
  token_id: string;
  viewed_at: string;
  user_agent: string | null;
  ip_address: string | null;
}

export interface BizplanSectionAnalytic {
  id: string;
  view_id: string;
  investor_id: string;
  section_id: string;
  time_spent: number;
  entered_at: string;
  exited_at: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      investors: {
        Row: Investor;
        Insert: Omit<Investor, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Investor, "id" | "created_at" | "updated_at">>;
      };
      investor_tokens: {
        Row: InvestorToken;
        Insert: Omit<InvestorToken, "id" | "created_at">;
        Update: Partial<Omit<InvestorToken, "id" | "created_at">>;
      };
      bizplan_views: {
        Row: BizplanView;
        Insert: Omit<BizplanView, "id" | "viewed_at">;
        Update: Partial<Omit<BizplanView, "id" | "viewed_at">>;
      };
      bizplan_section_analytics: {
        Row: BizplanSectionAnalytic;
        Insert: Omit<BizplanSectionAnalytic, "id" | "created_at">;
        Update: Partial<Omit<BizplanSectionAnalytic, "id" | "created_at">>;
      };
    };
  };
}
