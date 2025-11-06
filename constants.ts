
import { TicketWithAnalysis, TicketCategory, TicketUrgency, TicketSentiment } from './types';

export const MOCK_TICKETS: TicketWithAnalysis[] = [
  {
    id: "TICK-001",
    description: "My laptop screen is flickering constantly. It's a Dell XPS 15. This started happening after the latest Windows update. I've tried restarting but it doesn't help.",
    submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    user: { name: "Alice Johnson", email: "alice.j@example.com" },
    analysis: {
      category: TicketCategory.HARDWARE,
      urgency: TicketUrgency.HIGH,
      sentiment: TicketSentiment.NEGATIVE,
      keywords: ["flickering screen", "Dell XPS 15", "Windows update"],
      autoResponse: "Hi Alice, we're sorry to hear you're experiencing issues with your laptop screen. Our team will investigate this high-priority issue immediately and get back to you with an update shortly.",
      resolutionSteps: ["Try rolling back the latest graphics driver.", "Connect to an external monitor to see if the issue persists.", "Check for loose display cable connections (if comfortable doing so)."],
      rootCause: "Potential graphics driver incompatibility after a recent Windows update or a hardware fault with the display panel.",
      explanation: "The ticket involves a physical component (screen) and a critical usability issue (flickering), justifying 'Hardware' category and 'High' urgency."
    }
  },
  {
    id: "TICK-002",
    description: "I can't log in to the new CRM software. It keeps saying 'Invalid Credentials' but I am sure I'm using the right password. I need access for a client demo tomorrow morning!",
    submittedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    user: { name: "Bob Williams", email: "bob.w@example.com" },
    analysis: {
      category: TicketCategory.ACCESS_SECURITY,
      urgency: TicketUrgency.HIGH,
      sentiment: TicketSentiment.URGENT,
      keywords: ["can't log in", "CRM", "Invalid Credentials", "demo tomorrow"],
      autoResponse: "Hello Bob, thank you for reaching out. We understand the urgency of your request, especially with a client demo pending. We are looking into your account access for the CRM right now.",
      resolutionSteps: ["Please try the 'Forgot Password' link to reset your credentials.", "Ensure your CAPS LOCK key is not enabled.", "Try logging in from an incognito browser window to rule out cache issues."],
      rootCause: "Likely a password synchronization issue, account lock-out, or user error with credentials.",
      explanation: "The issue is about login credentials ('Access/Security') and has a strict deadline ('demo tomorrow'), making it 'High' urgency."
    }
  },
  {
    id: "TICK-003",
    description: "The WiFi in the main conference room is extremely slow. We were dropping connection during our video call with the London office. It's making collaboration very difficult.",
    submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    user: { name: "Charlie Brown", email: "charlie.b@example.com" },
    analysis: {
      category: TicketCategory.NETWORK,
      urgency: TicketUrgency.MEDIUM,
      sentiment: TicketSentiment.NEGATIVE,
      keywords: ["WiFi", "slow", "conference room", "video call"],
      autoResponse: "Hi Charlie, we've received your report about the slow WiFi in the main conference room. We apologize for the disruption this has caused. A network technician will investigate the issue within the next 2-3 hours.",
      resolutionSteps: ["Try connecting to the 'Guest' network as a temporary workaround.", "Move closer to the wireless access point if possible.", "Disconnect and reconnect to the WiFi network."],
      rootCause: "Could be an overloaded access point, network interference, or a problem with the ISP connection.",
      explanation: "The problem relates to connectivity ('Network'). It's disruptive but not a complete work stoppage for an individual, so 'Medium' urgency is appropriate."
    }
  },
    {
    id: "TICK-004",
    description: "How do I request a new license for Adobe Photoshop? My trial is about to expire and I need it for the new marketing campaign.",
    submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    user: { name: "Diana Prince", email: "diana.p@example.com" },
    analysis: {
      category: TicketCategory.SOFTWARE,
      urgency: TicketUrgency.LOW,
      sentiment: TicketSentiment.NEUTRAL,
      keywords: ["license", "Adobe Photoshop", "request"],
      autoResponse: "Hello Diana, thank you for your query. To request a new software license, please fill out the 'Software Request Form' available on the IT portal. We've attached a direct link for your convenience.",
      resolutionSteps: ["Navigate to the IT portal.", "Find the 'Software Request Form' under the 'Services' section.", "Fill in the required details and specify the business justification for Adobe Photoshop."],
      rootCause: "Standard user request for software provisioning.",
      explanation: "This is a standard request for software ('Software') and is not an urgent issue, hence 'Low' urgency."
    }
  },
  {
    id: "TICK-005",
    description: "Microsoft Outlook is crashing every time I try to attach a file. It happens consistently. I've already tried rebooting my machine.",
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: { name: "Eve Adams", email: "eve.a@example.com" },
    analysis: {
        category: TicketCategory.SOFTWARE,
        urgency: TicketUrgency.MEDIUM,
        sentiment: TicketSentiment.NEGATIVE,
        keywords: ["Outlook", "crashing", "attach file", "rebooting"],
        autoResponse: "Hi Eve, we're sorry to hear about the issue with Outlook crashing. This sounds frustrating. We've logged this as a medium-priority software bug and our application support team will investigate.",
        resolutionSteps: ["Try running Outlook in Safe Mode to see if an add-in is causing the issue.", "Use the 'Repair' function for Office 365 from the Control Panel.", "As a workaround, try using the Outlook Web App (OWA) to send your email with the attachment."],
        rootCause: "Could be a corrupted Outlook profile, a conflicting add-in, or a bug in a recent Office update.",
        explanation: "The issue is with a specific application ('Software'). It's disruptive but likely has workarounds, so 'Medium' urgency is appropriate."
    }
  },
  {
    id: "TICK-006",
    description: "Where can I find the official company holidays calendar for this year? I'm trying to plan my vacation.",
    submittedAt: new Date(Date.now() - 28 * 60 * 60 * 1000),
    user: { name: "Frank Miller", email: "frank.m@example.com" },
    analysis: {
        category: TicketCategory.GENERAL_INQUIRY,
        urgency: TicketUrgency.LOW,
        sentiment: TicketSentiment.NEUTRAL,
        keywords: ["holidays", "calendar", "vacation", "policy"],
        autoResponse: "Hello Frank, thanks for your question. You can find the official company holiday calendar on the HR section of the company intranet. We've included a direct link for you.",
        resolutionSteps: ["Navigate to the company intranet homepage.", "Click on the 'Human Resources' tab.", "The holiday calendar is available as a downloadable PDF under the 'Policies & Documents' section."],
        rootCause: "User needs information about company resources.",
        explanation: "This is a request for information, not a technical problem, so it falls under 'General Inquiry' with 'Low' urgency."
    }
  },
  {
    id: "TICK-007",
    description: "The printer on the 3rd floor (HP-3rd-Floor-Color) is not working. It says there's a paper jam, but I've checked all the trays and there's no paper stuck anywhere. I need to print important contracts.",
    submittedAt: new Date(Date.now() - 30 * 60 * 1000),
    user: { name: "Grace Lee", email: "grace.l@example.com" },
    analysis: {
        category: TicketCategory.HARDWARE,
        urgency: TicketUrgency.MEDIUM,
        sentiment: TicketSentiment.NEGATIVE,
        keywords: ["printer", "paper jam", "HP", "not working"],
        autoResponse: "Hi Grace, we've received your report about the 3rd-floor printer. We apologize for the inconvenience. A technician will be dispatched to inspect the printer shortly. In the meantime, you can use the printer on the 2nd floor (HP-2nd-Floor-BW).",
        resolutionSteps: ["Turn the printer off, wait 30 seconds, and turn it back on.", "Open all access panels and carefully re-check for any small, torn pieces of paper.", "Ensure the paper in the tray is correctly aligned and not overloaded."],
        rootCause: "A faulty sensor is likely reporting a 'ghost' paper jam, or there is a small piece of paper stuck deep inside the mechanism.",
        explanation: "The ticket pertains to a physical device ('Hardware'). It impacts multiple users but there is a workaround (another printer), so urgency is 'Medium'."
    }
  }
];
