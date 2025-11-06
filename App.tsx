import React, { useState, useEffect, useCallback } from 'react';
import { TicketWithAnalysis, AdminInsightsData, TicketUrgency } from './types';
import { MOCK_TICKETS } from './constants';
import TicketForm from './components/TicketForm';
import TicketDetails from './components/TicketDetails';
import SimilarTickets from './components/SimilarTickets';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AdminInsights from './components/AdminInsights';
import { analyzeTicket, getAdminInsights } from './services/geminiService';
import { List, BarChart3, BotMessageSquare, AlertTriangle, FileDown } from 'lucide-react';

const getUrgencyDotColor = (urgency: TicketUrgency) => {
    switch (urgency) {
        case TicketUrgency.HIGH: return 'bg-red-500';
        case TicketUrgency.MEDIUM: return 'bg-yellow-500';
        case TicketUrgency.LOW: return 'bg-green-500';
        default: return 'bg-gray-400';
    }
}

const App: React.FC = () => {
  const [tickets, setTickets] = useState<TicketWithAnalysis[]>(MOCK_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<TicketWithAnalysis | null>(tickets[0] || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [adminInsights, setAdminInsights] = useState<AdminInsightsData | null>(null);
  const [loadingInsights, setLoadingInsights] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'admin'>('dashboard');

  const fetchAdminInsights = useCallback(async () => {
    setLoadingInsights(true);
    try {
      const insights = await getAdminInsights(tickets);
      setAdminInsights(insights);
    } catch (e) {
      console.error(e);
      setError("Could not fetch admin insights.");
    } finally {
      setLoadingInsights(false);
    }
  }, [tickets]);

  useEffect(() => {
    fetchAdminInsights();
  }, [fetchAdminInsights]);

  const handleTicketSubmit = async (description: string) => {
    setLoading(true);
    setError(null);
    try {
      const analysis = await analyzeTicket(description, tickets);
      const newTicket: TicketWithAnalysis = {
        id: `TICK-${String(tickets.length + 1).padStart(3, '0')}`,
        description,
        submittedAt: new Date(),
        user: { name: "New User", email: "user@example.com" },
        analysis,
      };
      setTickets(prevTickets => [newTicket, ...prevTickets]);
      setSelectedTicket(newTicket);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "Submitted At", "User", "Description", "Category", "Urgency", "Sentiment"];
    const rows = tickets.map(t => [
      t.id,
      t.submittedAt.toISOString(),
      t.user.name,
      `"${t.description.replace(/"/g, '""')}"`,
      t.analysis?.category || "N/A",
      t.analysis?.urgency || "N/A",
      t.analysis?.sentiment || "N/A",
    ].join(','));
    
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tickets.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      <header className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <BotMessageSquare className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-200">AI Helpdesk Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={exportToCSV} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
            <FileDown className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      <div className="p-4 lg:p-6 grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Ticket List and Form */}
        <aside className="xl:col-span-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg flex flex-col h-[calc(100vh-110px)]">
          <TicketForm onSubmit={handleTicketSubmit} loading={loading} />
          <h2 className="text-lg font-semibold mt-6 mb-3 flex items-center text-slate-700 dark:text-slate-300"><List className="h-5 w-5 mr-2" />Ticket Queue</h2>
          <div className="overflow-y-auto flex-grow pr-1">
            {tickets.map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-3 rounded-lg cursor-pointer mb-2 transition-all duration-200 border-l-4 ${selectedTicket?.id === ticket.id ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-500 shadow-sm' : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm truncate pr-2">{ticket.id} - <span className="font-normal">{ticket.description.substring(0, 40)}...</span></p>
                  {ticket.analysis && <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${getUrgencyDotColor(ticket.analysis.urgency)}`}></div>}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ticket.submittedAt.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Column: Main Content */}
        <main className="xl:col-span-8">
          {error && (
             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6" role="alert">
                <p className="font-bold flex items-center"><AlertTriangle className="mr-2 h-5 w-5"/>API Error</p>
                <p>{error}</p>
            </div>
          )}
          {selectedTicket ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <TicketDetails ticket={selectedTicket} />
                </div>
                <div className="h-full">
                    <SimilarTickets tickets={tickets} currentTicket={selectedTicket} onSelect={setSelectedTicket} />
                </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
              <p className="text-slate-500">Select a ticket to view details or submit a new one.</p>
            </div>
          )}

          <div className="mt-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg">
             <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('dashboard')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                        <BarChart3 className="mr-2 h-5 w-5" /> Analytics Dashboard
                    </button>
                    <button onClick={() => setActiveTab('admin')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${activeTab === 'admin' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                       <BotMessageSquare className="mr-2 h-5 w-5" /> Admin Insights
                    </button>
                </nav>
            </div>
            <div className="pt-6">
              {activeTab === 'dashboard' ? (
                <AnalyticsDashboard tickets={tickets} />
              ) : (
                <AdminInsights insights={adminInsights} loading={loadingInsights} onRefresh={fetchAdminInsights} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;