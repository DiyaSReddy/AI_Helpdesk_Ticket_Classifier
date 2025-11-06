import React from 'react';
import { TicketWithAnalysis } from '../types';
import { Layers } from 'lucide-react';

interface SimilarTicketsProps {
  tickets: TicketWithAnalysis[];
  currentTicket: TicketWithAnalysis;
  onSelect: (ticket: TicketWithAnalysis) => void;
}

const SimilarTickets: React.FC<SimilarTicketsProps> = ({ tickets, currentTicket, onSelect }) => {
  // Simple similarity check based on category. A real implementation would use vector embeddings.
  const similar = tickets.filter(
    t => t.id !== currentTicket.id && t.analysis?.category === currentTicket.analysis?.category
  ).slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg h-full">
      <h3 className="text-md font-semibold mb-3 flex items-center text-slate-700 dark:text-slate-300">
        <Layers className="h-5 w-5 mr-2" /> Similar Tickets
      </h3>
      {similar.length > 0 ? (
        <div className="space-y-2">
          {similar.map(ticket => (
            <div
              key={ticket.id}
              onClick={() => onSelect(ticket)}
              className="p-3 rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <p className="font-semibold text-sm truncate">{ticket.id} - {ticket.description}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Category: {ticket.analysis?.category}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">No similar tickets found in the same category.</p>
      )}
    </div>
  );
};

export default SimilarTickets;