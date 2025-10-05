import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Landing from './pages/Landing';
import Index from './pages/Index';
import Analytics from './pages/Analytics';
import Insights from './pages/Insights';
import Portfolio from './pages/Portfolio';
import Issues from './pages/Issues';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000, // 30 seconds
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/issues" element={<Issues />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
