
import React from 'react';
import { AdminInsightsData } from '../types';
import { Lightbulb, RefreshCw } from 'lucide-react';

interface AdminInsightsProps {
  insights: AdminInsightsData | null;
  loading: boolean;
  onRefresh: () => void;
}

const AdminInsights: React.FC<AdminInsightsProps> = ({ insights, loading, onRefresh }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Gemini Admin Insights</h3>
        <button onClick={onRefresh} disabled={loading} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50">
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      {loading ? (
         <div className="flex items-center justify-center h-64">
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="ml-4 text-gray-500">Generating insights...</p>
        </div>
      ) : insights ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Daily Digest</h4>
            <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: insights.dailyDigest.replace(/\n/g, '<br />') }} />
          </div>
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center"><Lightbulb className="h-5 w-5 mr-2 text-yellow-400"/>Automation Suggestions</h4>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {insights.automationSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Could not load admin insights.</p>
      )}
    </div>
  );
};

export default AdminInsights;
