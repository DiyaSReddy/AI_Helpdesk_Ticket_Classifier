import React, { useMemo } from 'react';
import { TicketWithAnalysis, TicketCategory, TicketUrgency, TicketSentiment } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Package, TrendingUp, Cloud } from 'lucide-react';

interface AnalyticsDashboardProps {
  tickets: TicketWithAnalysis[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
const KEYWORD_COLORS = ['text-blue-500', 'text-green-500', 'text-purple-500', 'text-amber-500', 'text-sky-500', 'text-rose-500'];

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ tickets }) => {

  const categoryData = useMemo(() => {
    const counts = tickets.reduce((acc, ticket) => {
      const category = ticket.analysis?.category || 'Unclassified';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tickets]);

  const urgencyData = useMemo(() => {
    const counts = tickets.reduce((acc, ticket) => {
      const urgency = ticket.analysis?.urgency || 'Unclassified';
      acc[urgency] = (acc[urgency] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return [
        { name: TicketUrgency.LOW, count: counts[TicketUrgency.LOW] || 0 },
        { name: TicketUrgency.MEDIUM, count: counts[TicketUrgency.MEDIUM] || 0 },
        { name: TicketUrgency.HIGH, count: counts[TicketUrgency.HIGH] || 0 },
    ];
  }, [tickets]);

  const sentimentKeywords = useMemo(() => {
    const keywordMap = tickets.reduce((acc, ticket) => {
        if(ticket.analysis) {
            ticket.analysis.keywords.forEach(kw => {
                acc.set(kw, (acc.get(kw) || 0) + 1);
            });
        }
        return acc;
    }, new Map<string, number>());

    return Array.from(keywordMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);
  }, [tickets]);
  
  const getKeywordSize = (count: number) => {
      if (count > 3) return 'text-2xl';
      if (count > 1) return 'text-xl';
      return 'text-lg';
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Category Distribution */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-800/50 p-4 rounded-2xl">
        <h4 className="font-semibold mb-4 flex items-center text-slate-700 dark:text-slate-300"><Package className="h-5 w-5 mr-2" />Category Distribution</h4>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name">
                {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Urgency Trend */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-800/50 p-4 rounded-2xl">
        <h4 className="font-semibold mb-4 flex items-center text-slate-700 dark:text-slate-300"><TrendingUp className="h-5 w-5 mr-2" />Urgency Levels</h4>
         <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
                <BarChart data={urgencyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count">
                        {urgencyData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.name === 'High' ? '#FF8042' : entry.name === 'Medium' ? '#FFBB28' : '#00C49F'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
      
      {/* Sentiment Cloud */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-800/50 p-4 rounded-2xl">
        <h4 className="font-semibold mb-4 flex items-center text-slate-700 dark:text-slate-300"><Cloud className="h-5 w-5 mr-2" />Keyword Cloud</h4>
        <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-center h-[250px] overflow-hidden p-4">
            {sentimentKeywords.map(([keyword, count], index) => (
                <span key={keyword} className={`${getKeywordSize(count)} font-medium ${KEYWORD_COLORS[index % KEYWORD_COLORS.length]}`} style={{ opacity: 0.6 + (count * 0.1) }}>
                    {keyword}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;