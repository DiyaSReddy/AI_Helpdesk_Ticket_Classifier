import React from 'react';
import { TicketWithAnalysis, TicketCategory, TicketUrgency } from '../types';
import { Tag, ClipboardCheck, AlertCircle, MessageSquare, ListChecks, Search, BrainCircuit, Info } from 'lucide-react';

const CategoryIcon: React.FC<{ category: TicketCategory }> = ({ category }) => {
  const iconClasses = "h-5 w-5 mr-2";
  switch (category) {
    case TicketCategory.HARDWARE: return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
    case TicketCategory.SOFTWARE: return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="M8 17h8"></path></svg>;
    case TicketCategory.NETWORK: return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><path d="M18 8.7a4 4 0 1 0-7.3 3"></path><path d="M12 12.3a4 4 0 1 0 7.3 3"></path><path d="M6 8.7a4 4 0 1 0-7.3 3"></path><path d="M12 12.3a4 4 0 1 0-7.3 3"></path></svg>;
    case TicketCategory.ACCESS_SECURITY: return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClasses}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
    default: return <Info className={iconClasses} />;
  }
};

const getUrgencyClasses = (urgency: TicketUrgency) => {
    switch (urgency) {
        case TicketUrgency.HIGH: return 'border-red-500/50 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300';
        case TicketUrgency.MEDIUM: return 'border-yellow-500/50 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
        case TicketUrgency.LOW: return 'border-green-500/50 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
        default: return 'border-slate-500/50 bg-slate-50 text-slate-700 dark:bg-slate-900/20 dark:text-slate-300';
    }
}
const getCategoryClasses = () => 'border-slate-500/50 bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300';


const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; iconBgClass: string; }> = ({ icon, title, children, iconBgClass }) => (
    <div className="bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-xl mb-4 border border-slate-200 dark:border-slate-700">
        <div className="flex items-start">
             <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg ${iconBgClass} mr-4`}>
                {icon}
            </div>
            <div>
                <h3 className="text-md font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {title}
                </h3>
                <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">{children}</div>
            </div>
        </div>
    </div>
);


const TicketDetails: React.FC<{ ticket: TicketWithAnalysis }> = ({ ticket }) => {
  if (!ticket) return null;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg h-full">
      <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{ticket.id}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Submitted by {ticket.user.name} on {ticket.submittedAt.toLocaleString()}</p>
        <p className="mt-4 text-slate-700 dark:text-slate-300 leading-relaxed">{ticket.description}</p>
      </div>

      {ticket.analysis ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className={`p-3 rounded-lg border flex items-center ${getUrgencyClasses(ticket.analysis.urgency)}`}>
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Urgency: {ticket.analysis.urgency}</span>
            </div>
            <div className={`p-3 rounded-lg border flex items-center ${getCategoryClasses()}`}>
                <CategoryIcon category={ticket.analysis.category} />
                <span className="font-semibold">Category: {ticket.analysis.category}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2 flex items-center text-sm text-slate-600 dark:text-slate-400"><Tag className="h-4 w-4 mr-2"/>Keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {ticket.analysis.keywords.map(kw => (
                <span key={kw} className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900/70 dark:text-blue-300">{kw}</span>
              ))}
            </div>
          </div>

          <InfoCard 
            icon={<MessageSquare className="h-5 w-5 text-green-500"/>} 
            title="Suggested Auto-Response"
            iconBgClass="bg-green-100 dark:bg-green-900/50"
          >
            <p className="leading-relaxed">{ticket.analysis.autoResponse}</p>
          </InfoCard>

          <InfoCard 
            icon={<ListChecks className="h-5 w-5 text-blue-500"/>} 
            title="Suggested Resolution Steps"
            iconBgClass="bg-blue-100 dark:bg-blue-900/50"
          >
            <ul className="list-decimal list-inside space-y-1.5">
              {ticket.analysis.resolutionSteps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
          </InfoCard>
          
           <InfoCard 
            icon={<BrainCircuit className="h-5 w-5 text-purple-500"/>} 
            title="AI Analysis"
            iconBgClass="bg-purple-100 dark:bg-purple-900/50"
          >
            <p><strong className="font-semibold text-slate-700 dark:text-slate-300">Root Cause:</strong> {ticket.analysis.rootCause}</p>
            <p className="mt-2"><strong className="font-semibold text-slate-700 dark:text-slate-300">Explanation:</strong> {ticket.analysis.explanation}</p>
          </InfoCard>

        </div>
      ) : (
         <div className="flex flex-col items-center justify-center h-64">
             <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-slate-500">Awaiting AI analysis...</p>
         </div>
      )}
    </div>
  );
};

export default TicketDetails;