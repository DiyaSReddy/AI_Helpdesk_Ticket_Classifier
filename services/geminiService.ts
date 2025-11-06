
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis, TicketWithAnalysis, AdminInsightsData } from '../types';

// IMPORTANT: This key is managed externally and assumed to be available in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

/**
 * Analyzes a new ticket description using the Gemini API with a structured JSON response.
 * @param description The user-submitted ticket description.
 * @param allTickets A list of existing tickets for context.
 * @returns A promise that resolves to the AIAnalysis object.
 */
export const analyzeTicket = async (description: string, allTickets: TicketWithAnalysis[]): Promise<AIAnalysis> => {
  const prompt = `
    You are an expert IT Helpdesk AI assistant, similar to ServiceNow's Predictive Intelligence.
    Your task is to analyze the following IT support ticket and provide a complete analysis in a structured JSON format.

    Ticket Description: "${description}"

    Consider the following examples of past tickets for context, but do not include them in your output:
    ${allTickets.slice(0, 3).map(t => `- "${t.description}" -> Category: ${t.analysis?.category}, Urgency: ${t.analysis?.urgency}`).join('\n')}

    Please analyze the ticket and return ONLY the JSON object matching the provided schema. Be concise and professional.
    The 'autoResponse' should be empathetic and set clear expectations.
    The 'resolutionSteps' should be actionable for a non-technical user.
    The 'explanation' should justify your classification choice.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, enum: ["Hardware", "Software", "Network", "Access/Security", "General Inquiry"] },
            urgency: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
            sentiment: { type: Type.STRING, enum: ["Positive", "Neutral", "Negative", "Urgent"] },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3-5 relevant keywords from the ticket."
            },
            autoResponse: {
              type: Type.STRING,
              description: "A friendly, empathetic, and professional auto-response for the user, acknowledging their issue and setting expectations."
            },
            resolutionSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3-5 actionable, step-by-step suggestions for the user to try and resolve the issue."
            },
            rootCause: {
              type: Type.STRING,
              description: "A brief, likely root cause analysis for the IT team."
            },
            explanation: {
              type: Type.STRING,
              description: "A short explanation of why the chosen category and urgency are appropriate."
            }
          },
          required: ["category", "urgency", "sentiment", "keywords", "autoResponse", "resolutionSteps", "rootCause", "explanation"]
        }
      }
    });

    const analysis = JSON.parse(response.text);
    return analysis as AIAnalysis;
  } catch (error) {
    console.error("Error analyzing ticket with Gemini:", error);
    throw new Error("Failed to get AI analysis. Please check your API key and network connection.");
  }
};


/**
 * Generates admin insights like a daily digest and automation suggestions.
 * @param allTickets A list of all tickets to be summarized.
 * @returns A promise that resolves to the AdminInsightsData object.
 */
export const getAdminInsights = async (allTickets: TicketWithAnalysis[]): Promise<AdminInsightsData> => {
    const ticketSummary = allTickets.map(t => ({
        id: t.id,
        category: t.analysis?.category,
        urgency: t.analysis?.urgency,
        description: t.description.substring(0, 100) + '...'
    }));

    const prompt = `
        You are an IT Operations Manager AI. Based on the following list of recent helpdesk tickets,
        generate a concise daily digest and identify tickets that are good candidates for automation.

        Ticket Data:
        ${JSON.stringify(ticketSummary, null, 2)}

        Provide your response as a single JSON object with two keys: "dailyDigest" and "automationSuggestions".
        - "dailyDigest": A brief, professional summary (in markdown format) of the day's ticket activity. Mention ticket volume, common themes, and any high-urgency trends.
        - "automationSuggestions": An array of strings. Each string should describe a specific ticket type and suggest an automation workflow. For example: 'Password reset requests (e.g., TICK-002) can be automated with a self-service portal.'
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        dailyDigest: {
                            type: Type.STRING,
                            description: "Markdown formatted daily summary of ticket activity."
                        },
                        automationSuggestions: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "Suggestions for automating common ticket types."
                        }
                    },
                    required: ["dailyDigest", "automationSuggestions"]
                }
            }
        });

        const insights = JSON.parse(response.text);
        return insights as AdminInsightsData;

    } catch (error) {
        console.error("Error generating admin insights with Gemini:", error);
        throw new Error("Failed to get admin insights.");
    }
};
