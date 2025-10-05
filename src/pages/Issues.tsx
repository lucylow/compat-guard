import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { AlertTriangle, Filter, FileCode, Users, Lightbulb, Code } from 'lucide-react';
import { useIssues } from '../hooks/useProjects';

const Issues = () => {
  const [currentProjectId, setCurrentProjectId] = useState('project-1');
  const [severityFilter, setSeverityFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const { data: issues, isLoading } = useIssues(currentProjectId, {
    severity: severityFilter || undefined,
    category: categoryFilter || undefined
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high': return 'bg-accent/10 text-accent border-accent/20';
      case 'medium': return 'bg-primary/10 text-primary border-primary/20';
      case 'low': return 'bg-secondary/10 text-secondary border-secondary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'css': return Code;
      case 'javascript': return FileCode;
      case 'html': return FileCode;
      case 'webApi': return Users;
      default: return AlertTriangle;
    }
  };

  const issuesByCategory = issues?.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const issuesBySeverity = issues?.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentProjectId={currentProjectId}
        onProjectChange={setCurrentProjectId}
      />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">Issues</h1>
              <p className="text-muted-foreground">
                {issues?.length || 0} compatibility issues found
              </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                <div className="text-sm text-muted-foreground mb-1">Critical</div>
                <div className="text-2xl font-bold text-destructive">
                  {issuesBySeverity['critical'] || 0}
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                <div className="text-sm text-muted-foreground mb-1">High</div>
                <div className="text-2xl font-bold text-accent">
                  {issuesBySeverity['high'] || 0}
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                <div className="text-sm text-muted-foreground mb-1">Medium</div>
                <div className="text-2xl font-bold text-primary">
                  {issuesBySeverity['medium'] || 0}
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
                <div className="text-sm text-muted-foreground mb-1">Low</div>
                <div className="text-2xl font-bold text-secondary">
                  {issuesBySeverity['low'] || 0}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Filters</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Severity
                  </label>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">All Categories</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="html">HTML</option>
                    <option value="webApi">Web API</option>
                  </select>
                </div>
              </div>
              {(severityFilter || categoryFilter) && (
                <button
                  onClick={() => {
                    setSeverityFilter('');
                    setCategoryFilter('');
                  }}
                  className="mt-4 text-sm text-primary hover:text-primary/80"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Issues List */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Loading issues...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {issues?.map((issue, idx) => {
                  const CategoryIcon = getCategoryIcon(issue.category);
                  return (
                    <div
                      key={idx}
                      className={`bg-card rounded-xl p-6 shadow-sm border ${getSeverityColor(issue.severity)} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <CategoryIcon className="w-5 h-5 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <code className="text-sm font-semibold text-foreground bg-muted px-2 py-1 rounded">
                                {issue.file}
                              </code>
                              {issue.line && (
                                <span className="text-xs text-muted-foreground">
                                  Line {issue.line}
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">
                              {issue.issue}
                            </h3>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-medium uppercase bg-muted text-muted-foreground">
                            {issue.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getSeverityColor(issue.severity)}`}>
                            {issue.severity}
                          </span>
                        </div>
                      </div>

                      <div className="pl-8 space-y-3">
                        <div className="flex items-start gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">Impact: </span>
                            <span className="text-foreground font-medium">{issue.impact}</span>
                          </div>
                        </div>

                        {issue.suggestion && (
                          <div className="flex items-start gap-2 text-sm p-3 bg-primary/5 rounded-lg border border-primary/20">
                            <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-primary font-medium">Suggestion: </span>
                              <span className="text-foreground">{issue.suggestion}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {issues?.length === 0 && (
                  <div className="text-center py-12 bg-card rounded-xl border border-border">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium text-foreground mb-2">No issues found</p>
                    <p className="text-sm text-muted-foreground">
                      {severityFilter || categoryFilter
                        ? 'Try adjusting your filters'
                        : 'Your project is fully compliant!'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Issues;
