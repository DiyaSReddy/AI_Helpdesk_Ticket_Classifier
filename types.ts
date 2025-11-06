
export enum TicketCategory {
  HARDWARE = "Hardware",
  SOFTWARE = "Software",
  NETWORK = "Network",
  ACCESS_SECURITY = "Access/Security",
  GENERAL_INQUIRY = "General Inquiry",
}

export enum TicketUrgency {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}

export enum TicketSentiment {
  POSITIVE = "Positive",
  NEUTRAL = "Neutral",
  NEGATIVE = "Negative",
  URGENT = "Urgent",
}

export interface Ticket {
  id: string;
  description: string;
  submittedAt: Date;
  user: {
    name: string;
    email: string;
  };
}

export interface AIAnalysis {
  category: TicketCategory;
  urgency: TicketUrgency;
  sentiment: TicketSentiment;
  keywords: string[];
  autoResponse: string;
  resolutionSteps: string[];
  rootCause: string;
  explanation: string;
}

export interface TicketWithAnalysis extends Ticket {
  analysis: AIAnalysis | null;
}

export interface AdminInsightsData {
  dailyDigest: string;
  automationSuggestions: string[];
}
