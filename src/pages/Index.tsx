import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, TrendingUp, Download, RefreshCw, Code, GitBranch, Shield, Users, Zap, AlertCircle, FileCode, Clock } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { StatsCard } from '../components/StatsCard';
import { AccessibilityPanel } from '../components/AccessibilityPanel';
import { ToastProvider, useToast } from '../components/Toast';
import { useLatestScan, useScanProject, useIssues } from '../hooks/useProjects';

const DashboardContent = () => {
  const { showToast } = useToast();
  const [currentProjectId, setCurrentProjectId] = useState('project-dashboard'); // Default project

  // Fetch data from API
  const { data: scanData, isLoading, refetch } = useLatestScan(currentProjectId);
  const { data: issuesData } = useIssues(currentProjectId);
  const scanProject = useScanProject();

  const handleProjectChange = (projectId: string) => {
    setCurrentProjectId(projectId);
    showToast('Project changed', 'Info', 'info');
  };

  useEffect(() => {
    // Welcome message on first load
    const hasShownWelcome = sessionStorage.getItem('welcomeShown');
    if (!hasShownWelcome) {
      setTimeout(() => {
        showToast(
          'Welcome to CompatGuard! Use Ctrl+K to quickly search and explore your compatibility dashboard.',
          'Welcome',
          'success'
        );
        sessionStorage.setItem('welcomeShown', 'true');
      }, 1000);
    }

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showToast]);

  const handleNavigation = (item: string) => {
    showToast(`Navigated to ${item}`, 'Navigation', 'info');
  };

  const handleSearch = (query: string) => {
    if (query.length > 2) {
      showToast(`Searching for "${query}"`, 'Search', 'info');
    }
  };

  const handleNewScan = async () => {
    showToast('Starting project scan...', 'Scan Started', 'info');
    try {
      await scanProject.mutateAsync(currentProjectId);
      showToast('Project scan completed successfully', 'Scan Complete', 'success');
      refetch();
    } catch (error) {
      showToast('Scan failed. Please try again.', 'Scan Error', 'error');
    }
  };

  const handleExport = () => {
    showToast('Exporting compatibility report...', 'Export Started', 'info');
    setTimeout(() => {
      showToast('Report exported successfully', 'Export Complete', 'success');
    }, 1500);
  };

  // Use data from API or show loading state
  const compliance = scanData?.compliance || 66.1;
  const totalIssues = scanData?.totalIssues || 211;
  const browserCoverage = scanData?.browserCoverage || 95;
  const criticalIssues = issuesData?.filter(i => i.severity === 'critical').slice(0, 3) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-background overflow-x-auto">
      <Sidebar onNavigate={handleNavigation} />
      <div className="flex-1 flex flex-col overflow-x-auto">
        <Header
          onSearch={handleSearch}
          currentProjectId={currentProjectId}
          onProjectChange={handleProjectChange}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
          {/* Page Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Project Dashboard</h1>
              <p className="text-lg text-muted-foreground">
                Monitor your project's compatibility status and resolve issues
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button
                onClick={handleNewScan}
                disabled={scanProject.isPending}
                className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${scanProject.isPending ? 'animate-spin' : ''}`} />
                {scanProject.isPending ? 'Scanning...' : 'New Scan'}
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              icon={CheckCircle}
              value={`${compliance.toFixed(1)}%`}
              label="Baseline Compliance"
              progress={compliance}
              trend="+12.7%"
              trendUp={true}
              variant="success"
            />
            <StatsCard
              icon={AlertTriangle}
              value={totalIssues.toString()}
              label="Active Issues"
              progress={35}
              trend="-28%"
              trendUp={true}
              variant="warning"
            />
            <StatsCard
              icon={TrendingUp}
              value={`${browserCoverage}%`}
              label="Browser Coverage"
              progress={browserCoverage}
              trend="+12.7%"
              trendUp={true}
              variant="primary"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Critical Issues Panel */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive/10 text-destructive rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Critical Issues</h2>
                    <p className="text-sm text-muted-foreground">Requires immediate attention</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-semibold">23 Critical</span>
              </div>
              <div className="space-y-4">
                {(criticalIssues.length > 0 ? criticalIssues : [
                  { file: 'Modal.jsx', issue: '<dialog> element', impact: '100% users', severity: 'critical' },
                  { file: 'ProductGrid.css', issue: 'CSS Subgrid', impact: '18% users', severity: 'high' },
                  { file: 'arrayHelpers.js', issue: 'Array.flatMap', impact: '7% users', severity: 'medium' }
                ]).map((item, idx) => (
                  <div key={idx} className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors animate-fade-in" style={{animationDelay: `${idx * 100}ms`}}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">{item.file}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        item.severity === 'critical' ? 'bg-destructive/10 text-destructive' : 
                        item.severity === 'high' ? 'bg-accent/10 text-accent' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        {item.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{item.issue}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>Impact: {item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Agent Activity */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">AI Agent Activity</h2>
                    <p className="text-sm text-muted-foreground">Real-time insights & automation</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-4">
                {[
                  { agent: 'Code Analyzer', task: 'Completed deep codebase analysis', confidence: 94, time: '2m ago' },
                  { agent: 'Migration Planner', task: 'Generated optimal migration sequence', confidence: 87, time: '5m ago' },
                  { agent: 'Risk Assessor', task: 'Simulated migration outcomes', confidence: 91, time: '8m ago' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border-l-2 border-primary animate-fade-in" style={{animationDelay: `${idx * 100}ms`}}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-foreground">{item.agent}</span>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.task}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${item.confidence}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-primary">{item.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Migration Progress */}
          <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Migration Progress</h2>
                  <p className="text-sm text-muted-foreground">Phase 1: Critical CSS & Layout</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">28.4% Complete</span>
            </div>
            
            <div className="mb-6">
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-500" style={{ width: '28.4%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Files Updated', value: '42', icon: FileCode },
                { label: 'Issues Resolved', value: '67', icon: CheckCircle },
                { label: 'Team Velocity', value: '8.7/day', icon: TrendingUp },
                { label: 'Est. Completion', value: '12 days', icon: Clock }
              ].map((stat, idx) => (
                <div key={idx} className="p-4 bg-muted/30 rounded-lg animate-fade-in" style={{animationDelay: `${idx * 50}ms`}}>
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'CSS Issues', total: 145, nonCompliant: 89, color: 'primary', icon: Code },
              { category: 'JavaScript', total: 312, nonCompliant: 78, color: 'accent', icon: FileCode },
              { category: 'HTML Elements', total: 45, nonCompliant: 12, color: 'secondary', icon: GitBranch },
              { category: 'Web APIs', total: 121, nonCompliant: 32, color: 'destructive', icon: Zap }
            ].map((cat, idx) => (
              <div key={idx} className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${idx * 100}ms`}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 bg-${cat.color}/10 text-${cat.color} rounded-lg flex items-center justify-center`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{cat.category}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Files</span>
                    <span className="font-semibold text-foreground">{cat.total}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Issues Found</span>
                    <span className="font-semibold text-destructive">{cat.nonCompliant}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mt-3">
                    <div className={`h-full bg-${cat.color} rounded-full transition-all duration-500`} style={{ width: `${((cat.total - cat.nonCompliant) / cat.total * 100).toFixed(0)}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <AccessibilityPanel />
    </div>
  );
};

const Index = () => {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
};

export default Index;
};

export default Index;
