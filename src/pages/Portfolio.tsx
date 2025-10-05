import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { FolderOpen, Users, Code, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { mockDataService } from '../services/mockDataLoader';

const Portfolio = () => {
  const { portfolio, projectBreakdown, crossProjectInsights } = mockDataService.getPortfolio();

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'very-low': return 'text-secondary bg-secondary/10';
      case 'low': return 'text-secondary bg-secondary/10';
      case 'medium': return 'text-accent bg-accent/10';
      case 'high': return 'text-destructive bg-destructive/10';
      case 'critical': return 'text-destructive bg-destructive/20';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-destructive bg-destructive/10';
      case 'high': return 'text-accent bg-accent/10';
      case 'medium': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">Portfolio Overview</h1>
            <p className="text-muted-foreground mb-8">Cross-project compliance and optimization</p>

            {/* Portfolio Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <FolderOpen className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Total Projects</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{portfolio.totalProjects}</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">Developers</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{portfolio.totalDevelopers}</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Lines of Code</span>
                </div>
                <div className="text-3xl font-bold text-foreground">{portfolio.totalCodeLines}</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Aggregate Compliance</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-bold text-foreground">{portfolio.aggregateCompliance}%</div>
                  <span className="text-sm text-secondary capitalize">{portfolio.trend}</span>
                </div>
              </div>
            </div>

            {/* Project Breakdown */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Project Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectBreakdown.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-gradient-to-br from-muted/50 to-transparent rounded-lg border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-1">{project.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm px-2 py-0.5 bg-primary/10 text-primary rounded capitalize">
                            {project.framework}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded capitalize ${getRiskColor(project.riskLevel)}`}>
                            {project.riskLevel} risk
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${getImpactColor(project.businessImpact)}`}>
                        {project.businessImpact}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Compliance</div>
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-foreground">{project.complianceScore}%</div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${project.complianceScore}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Migration</div>
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-foreground">{project.migrationProgress}%</div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden mt-1">
                          <div
                            className="h-full bg-secondary rounded-full"
                            style={{ width: `${project.migrationProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-muted-foreground mb-2">Key Issues:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.keyIssues.map((issue, iIdx) => (
                          <span key={iIdx} className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded">
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{project.teamSize} developers</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Project Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Common Issues */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  Common Issues Across Projects
                </h2>
                <div className="space-y-4">
                  {crossProjectInsights.commonIssues.map((issue, idx) => (
                    <div key={idx} className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground">{issue.feature}</span>
                        <span className="text-xs px-2 py-1 bg-destructive/20 text-destructive rounded">
                          {issue.affectedProjects} projects
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Total user impact: <span className="font-medium text-destructive">{issue.totalUserImpact}</span>
                      </div>
                      <div className="text-sm text-primary">
                        💡 {issue.recommendedSolution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Optimization */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  Resource Optimization
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">Shared Components</span>
                      <span className="text-2xl font-bold text-secondary">
                        {crossProjectInsights.resourceOptimization.sharedComponents}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reusable across multiple projects
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">Migration Patterns</span>
                      <span className="text-2xl font-bold text-primary">
                        {crossProjectInsights.resourceOptimization.reusableMigrationPatterns}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Proven solutions ready to apply
                    </p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">Knowledge Transfer</span>
                      <span className="text-lg font-bold text-accent">
                        {crossProjectInsights.resourceOptimization.crossTeamKnowledgeTransfer}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Regular cross-team sessions
                    </p>
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

export default Portfolio;
