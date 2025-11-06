# Gemini AI Helpdesk Dashboard

[![React Badge](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript Badge](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Gemini API Badge](https://img.shields.io/badge/Google%20Gemini-API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

An intelligent, enterprise-grade helpdesk dashboard that leverages the Google Gemini API to automate IT ticket classification, analysis, and management. This project simulates the core functionalities of advanced platforms like ServiceNow Predictive Intelligence, providing a comprehensive solution for modern IT support.
<img width="1904" height="923" alt="Screenshot 2025-11-06 7 17 44 PM" src="https://github.com/user-attachments/assets/d7843a18-032b-43ff-8008-5b814043c984" /><img width="1904" height="862" alt="Screenshot 2025-11-06 7 17 52 PM" src="https://github.com/user-attachments/assets/88f31fbb-86b0-4b8d-8eba-cea89788385b" />
<img width="1880" height="895" alt="Screenshot 2025-11-06 7 16 51 PM" src="https://github.com/user-attachments/assets/5e2469b7-1952-41fc-a5db-991c99b97b85" /><img width="1880" height="894" alt="Screenshot 2025-11-06 7 17 03 PM" src="https://github.com/user-attachments/assets/3a193aa6-894c-4a2c-b4ad-a097a12f7d84" />

---

## ✨ Key Features

### 🤖 AI-Powered Ticket Analysis
*   **Automatic Classification:** Instantly categorizes tickets into `Hardware`, `Software`, `Network`, `Access/Security`, or `General Inquiry`.
*   **Urgency Prediction:** Assigns a `High`, `Medium`, or `Low` urgency level to prioritize incoming requests.
*   **Sentiment Analysis:** Detects user sentiment (`Positive`, `Negative`, `Urgent`) to gauge the tone of the ticket.
*   **AI-Generated Content:** Automatically generates:
    *   An empathetic **Auto-Response** for the user.
    *   Actionable **Resolution Steps** for technicians.
    *   A probable **Root Cause Analysis**.
    *   An **Explanation** of its classification choices (Explainable AI).
*   **Keyword Extraction:** Pulls out key terms for quick insights and trend analysis.

### 📊 Dynamic Dashboard & UI
*   **Real-Time Analytics:** Visualizes ticket data with interactive charts for:
    *   **Category Distribution** (Pie Chart)
    *   **Urgency Levels** (Bar Chart)
    *   **Keyword Cloud** for spotting trends.
*   **Admin Insights Panel:** Leverages Gemini to generate a **Daily Digest** of operations and provide strategic **Automation Suggestions**.
*   **Responsive Design:** A clean, three-column layout built with Tailwind CSS that works seamlessly on all screen sizes.
*   **Contextual Sidebars:** Displays a list of similar tickets based on the selected ticket's category.

### 🎤 User Experience Enhancements
*   **Voice-to-Text Submission:** Users can dictate their issues using the browser's Web Speech API.
*   **Instant Feedback:** The UI updates in real-time as the AI analyzes a new ticket.
*   **CSV Export:** Easily export all ticket data to a CSV file with a single click.

---

## 🛠️ Tech Stack

*   **Frontend:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
*   **AI:** [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`) via the `@google/genai` SDK
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Charts:** [Recharts](https://recharts.org/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Deployment:** Runs directly in the browser with no build step, making it perfect for static hosting (e.g., Vercel, Netlify, GitHub Pages).

---

## ⚙️ How It Works: The AI Engine

This project's intelligence comes from two primary interactions with the Gemini API, both of which request a structured JSON response for easy integration.

1.  **`analyzeTicket`:** When a user submits a ticket, a detailed prompt is sent to Gemini. This prompt instructs the AI to act as an expert IT analyst and return a complete analysis in a predefined JSON schema. This single API call provides the classification, urgency, sentiment, auto-response, resolution steps, and more.

2.  **`getAdminInsights`:** On the admin panel, a summary of all existing tickets is sent to Gemini. The prompt asks the AI to take on the role of an IT Operations Manager and generate a high-level daily digest and identify opportunities for workflow automation.

This approach showcases advanced prompt engineering and the powerful function-calling/JSON mode capabilities of modern LLMs.

---

## 🚀 Getting Started

This project is configured to run without any local build tools like Vite or Webpack. It uses a modern `importmap` in `index.html` to load dependencies directly from a CDN.

### Prerequisites
*   A modern web browser (Chrome, Firefox, Edge).
*   Visual Studio Code.
*   The **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)** extension for VS Code.

### Installation & Setup

**Step 1: Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/gemini-ai-helpdesk.git
cd gemini-ai-helpdesk
```

**Step 2: Set your Gemini API Key**

1.  Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Open the file `services/geminiService.ts`.
3.  Find the following line:
    ```typescript
    const API_KEY = process.env.API_KEY;
    ```
4.  Replace `process.env.API_KEY` with your actual API key in quotes:
    ```typescript
    // Replace "YOUR_API_KEY_HERE" with your actual key
    const API_KEY = "YOUR_API_KEY_HERE";
    ```
    > **⚠️ Security Warning:** This method is for local development only. Do not commit your API key to a public repository.

**Step 3: Run the Application**

1.  Open the project folder in VS Code.
2.  Right-click on the `index.html` file.
3.  Select **"Open with Live Server"** from the context menu.

Your default browser will open, and the application will be running!

---

## 📂 Project Structure

```
.
├── components/
│   ├── AdminInsights.tsx         # AI-generated daily digest and suggestions
│   ├── AnalyticsDashboard.tsx    # Charts for category, urgency, and keywords
│   ├── SimilarTickets.tsx        # Contextual sidebar for related tickets
│   ├── TicketDetails.tsx         # Main view for a single ticket's analysis
│   └── TicketForm.tsx            # Form for submitting new tickets (with voice input)
├── services/
│   └── geminiService.ts          # Core logic for Gemini API calls and prompt engineering
├── App.tsx                       # Main application component, state management
├── constants.ts                  # Mock data for initial state
├── index.html                    # Entry point, includes the importmap for dependencies
├── index.tsx                     # Renders the React application
├── types.ts                      # TypeScript type definitions
└── README.md                     # You are here!
```
`
