import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { TrendingUp, TrendingDown, Users, Globe, Clock, Activity } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { useAnalytics } from '../hooks/useProjects';

const Analytics = () => {
  const [currentProjectId, setCurrentProjectId] = useState('project-dashboard');
  const { data: analyticsData, isLoading } = useAnalytics(currentProjectId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const {
    currentCompliance = 66.1,
    complianceTrend = 12.3,
    browserCoverage = 95,
    browserTrend = 8.7,
    avgFixTime = 18,
    fixTimeTrend = -15,
    complianceHistory: apiComplianceHistory,
    browserBreakdown: apiBrowserBreakdown,
    issuesTrend: apiIssuesTrend
  } = analyticsData || {};

  // Use API data with fallbacks
  const complianceHistory = apiComplianceHistory?.length > 0 ? apiComplianceHistory : [
    { month: 'Sep', score: 45 },
    { month: 'Oct', score: 52 },
    { month: 'Nov', score: 58 },
    { month: 'Dec', score: 61 },
    { month: 'Jan', score: 66 },
  ];

  const browserBreakdown = apiBrowserBreakdown?.length > 0 ? apiBrowserBreakdown : [
    { name: 'Chrome', coverage: 95, color: 'bg-primary' },
    { name: 'Firefox', coverage: 88, color: 'bg-secondary' },
    { name: 'Safari', coverage: 72, color: 'bg-accent' },
    { name: 'Edge', coverage: 91, color: 'bg-primary/70' },
  ];

  const issuesTrend = apiIssuesTrend?.length > 0 ? apiIssuesTrend : [
    { week: 'Week 1', resolved: 23, new: 12 },
    { week: 'Week 2', resolved: 45, new: 8 },
    { week: 'Week 3', resolved: 67, new: 15 },
    { week: 'Week 4', resolved: 89, new: 11 },
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      <Header
        currentProjectId={currentProjectId}
        onProjectChange={setCurrentProjectId}
      />
      <div className="flex w-full">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground mb-8">Track your compatibility improvements over time</p>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatsCard
                icon={Activity}
                value={`${currentCompliance.toFixed(1)}%`}
                label="Current Compliance"
                progress={currentCompliance}
                trend={`+${complianceTrend}%`}
                trendUp={true}
                variant="primary"
              />
              <StatsCard
                icon={Users}
                value={`${browserCoverage.toFixed(1)}%`}
                label="Browser Coverage"
                progress={browserCoverage}
                trend={`+${browserTrend}%`}
                trendUp={true}
                variant="success"
              />
              <StatsCard
                icon={Clock}
                value={`${avgFixTime} days`}
                label="Avg. Fix Time"
                progress={35}
                trend={`${fixTimeTrend}%`}
                trendUp={true}
                variant="warning"
              />
            </div>

            {/* Compliance Trend Chart */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-8 animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Compliance Score Trend
              </h2>
              <div className="flex items-end justify-between gap-4">
                {complianceHistory.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full bg-muted rounded-t-lg overflow-hidden" style={{ height: '160px' }}>
                      <div
                        className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all duration-500 hover:from-primary/80"
                        style={{ height: `${(item.score / 100) * 160}px` }}
                      />
                      <div className="absolute top-2 left-0 right-0 text-center text-sm font-bold text-foreground">
                        {item.score}%
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Browser Coverage */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-secondary" />
                  Browser Coverage
                </h2>
                <div className="space-y-4">
                  {browserBreakdown.map((browser, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{browser.name}</span>
                        <span className="text-sm font-bold text-foreground">{browser.coverage}%</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${browser.color} rounded-full transition-all duration-500`}
                          style={{ width: `${browser.coverage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Issues Resolution Trend */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border animate-fade-in">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" />
                  Issues Resolution
                </h2>
                <div className="space-y-4">
                  {issuesTrend.map((week, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-20 text-sm text-muted-foreground font-medium">{week.week}</div>
                      <div className="flex-1 flex gap-2">
                        <div className="flex-1 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-secondary" />
                          <div className="flex-1 h-8 bg-secondary/20 rounded-lg overflow-hidden">
                            <div 
                              className="h-full bg-secondary flex items-center justify-end px-2 text-xs font-bold text-white transition-all duration-500"
                              style={{ width: `${(week.resolved / 100) * 100}%` }}
                            >
                              {week.resolved}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-destructive" />
                          <div className="flex-1 h-8 bg-destructive/20 rounded-lg overflow-hidden">
                            <div 
                              className="h-full bg-destructive flex items-center justify-end px-2 text-xs font-bold text-white transition-all duration-500"
                              style={{ width: `${(week.new / 100) * 100}%` }}
                            >
                              {week.new}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end gap-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-secondary rounded-sm" />
                      <span className="text-xs text-muted-foreground">Resolved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive rounded-sm" />
                      <span className="text-xs text-muted-foreground">New Issues</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
