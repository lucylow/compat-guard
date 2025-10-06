import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { webStatusApi } from '@/services/webStatusApi';

export const LiveBaselineChecker = () => {
  const [code, setCode] = useState('');
  const [results, setResults] = useState<Array<{ feature: string; baseline: any; suggestion: string }>>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const analysis = await webStatusApi.analyzeCode(code);
      setResults(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Sparkles className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Live Baseline Checker</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Paste your CSS or JavaScript code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Example: .container { container-type: inline-size; }"
            className="w-full h-48 p-4 bg-background border border-border rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !code.trim()}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
        >
          <Search className="h-4 w-4" />
          {isAnalyzing ? 'Analyzing...' : 'Check Baseline Compatibility'}
        </button>

        {results.length > 0 && (
          <div className="space-y-3 mt-6">
            <h3 className="font-semibold text-lg">Results:</h3>
            {results.map((result, i) => (
              <div key={i} className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-medium text-foreground mb-1">{result.feature}</div>
                    <div className={`text-sm ${webStatusApi.getBaselineStatusColor(result.baseline)}`}>
                      {webStatusApi.getBaselineStatusLabel(result.baseline)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">{result.suggestion}</div>
                  </div>
                  <div className={`px-3 py-1 rounded text-xs font-medium ${
                    result.baseline.baseline === 'widely' ? 'bg-green-100 text-green-800' :
                    result.baseline.baseline === 'newly' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {result.baseline.baseline === false ? 'Not Baseline' : result.baseline.baseline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
