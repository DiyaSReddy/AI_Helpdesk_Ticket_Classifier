import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SendHorizonal, Mic, MicOff } from 'lucide-react';

// Define SpeechRecognition types for browsers that support it
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface TicketFormProps {
  onSubmit: (description: string) => void;
  loading: boolean;
}

const TicketForm: React.FC<TicketFormProps> = ({ onSubmit, loading }) => {
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        alert(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setDescription(prev => (prev.endsWith(' ') || prev === '' ? prev : prev + ' ') + finalTranscript);
        }
      };
      
      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const handleToggleRecording = useCallback(() => {
    if (!recognitionRef.current) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Could not start speech recognition:", error);
        // This can happen if a recording is already active.
      }
    }
  }, [isRecording]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && !loading) {
      onSubmit(description.trim());
      setDescription('');
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h2 className="text-lg font-semibold mb-3">Submit New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your issue, or use the microphone to dictate..."
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          rows={4}
          disabled={loading}
        />
        <div className="mt-2 flex items-center space-x-2">
          <button
            type="submit"
            disabled={loading || !description.trim()}
            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <><SendHorizonal className="h-5 w-5 mr-2" /> Submit Ticket</>
            )}
          </button>
           <button
                type="button"
                onClick={handleToggleRecording}
                disabled={loading}
                className={`flex-shrink-0 flex items-center justify-center p-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${isRecording ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'} disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors`}
                aria-label={isRecording ? 'Stop recording' : 'Start recording'}
            >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;