import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Bot, TrendingUp, AlertTriangle, Sparkles, Target, Clock, Shield } from 'lucide-react';
import { mockDataService } from '../services/mockDataLoader';

const Insights = () => {
  const { recentCollaborations, collaborationEfficiency } = mockDataService.getAICollaboration().agentCollaboration;
  const { patternsDiscovered } = mockDataService.getCrossProjectLearning();
  const { migrationTimeline, performanceForecast } = mockDataService.getPredictiveAnalytics().predictiveModels;
  const { recentAnomalies } = mockDataService.getAnomalyDetection();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">AI Insights</h1>
            <p className="text-muted-foreground mb-8">Intelligent analysis and predictive recommendations</p>

            {/* AI Collaboration Efficiency */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Avg Decision Time</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{collaborationEfficiency.averageDecisionTime}</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-secondary" />
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{collaborationEfficiency.successRate}%</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Conflict Resolution</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{collaborationEfficiency.conflictResolutionRate}%</div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Knowledge Sharing</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{collaborationEfficiency.knowledgeSharingScore}</div>
              </div>
            </div>

            {/* Recent AI Collaborations */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Recent AI Agent Collaborations
              </h2>
              {recentCollaborations.map((collab, idx) => (
                <div key={idx} className="mb-6 last:mb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{collab.trigger}</h3>
                      <p className="text-sm text-muted-foreground">
                        {collab.agentsInvolved.length} agents · {collab.collaborationPattern} pattern
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                      {(collab.outcome.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>

                  {/* Collaboration Timeline */}
                  <div className="space-y-2 mb-4 pl-4 border-l-2 border-primary/30">
                    {collab.interactions.map((interaction, iIdx) => (
                      <div key={iIdx} className="pl-4">
                        <div className="text-sm">
                          <span className="font-medium text-primary">{interaction.from}</span>
                          {' → '}
                          <span className="font-medium text-secondary">{interaction.to}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{interaction.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Outcome */}
                  <div className="bg-secondary/5 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground mb-1">{collab.outcome.decision}</div>
                        <div className="text-sm text-muted-foreground">
                          Impact: {collab.outcome.expectedUserImpact} · Performance: {collab.outcome.performanceGain}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Cross-Project Learning */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  Cross-Project Learning
                </h2>
                <div className="space-y-4">
                  {patternsDiscovered.map((pattern, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-semibold text-foreground">{pattern.pattern}</code>
                        <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                          {pattern.successRate}% success
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Discovered in: <span className="font-medium">{pattern.discoveredIn}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Applied to: {pattern.appliedTo.join(', ')}
                      </div>
                      <div className="text-sm font-medium text-primary">
                        Time saved: {pattern.timeSaved}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Migration Timeline */}
              <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Predictive Migration Timeline
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
                    <div className="font-semibold text-foreground mb-1">Current Phase</div>
                    <div className="text-muted-foreground">{migrationTimeline.currentPhase}</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-foreground">Predicted Completion</span>
                      <span className="text-primary font-bold">{migrationTimeline.predictedCompletion}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${migrationTimeline.confidence * 100}%` }}
                        />
                      </div>
                      <span className="font-medium">{(migrationTimeline.confidence * 100).toFixed(0)}% confidence</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-2">Risk Factors</div>
                    <div className="space-y-2">
                      {migrationTimeline.riskFactors.map((risk, idx) => (
                        <div key={idx} className="p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{risk.factor}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              risk.impact === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-accent/10 text-accent'
                            }`}>
                              {risk.impact} impact
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Mitigation: {risk.mitigation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Anomaly Detection */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Anomaly Detection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentAnomalies.map((anomaly, idx) => (
                  <div key={idx} className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="font-semibold text-foreground capitalize">
                          {anomaly.type.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        anomaly.severity === 'high' ? 'bg-destructive/20 text-destructive' : 'bg-accent/20 text-accent'
                      }`}>
                        {anomaly.severity}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      <code className="bg-muted px-1 py-0.5 rounded">{anomaly.file || anomaly.component}</code>
                    </div>
                    <div className="text-sm text-foreground mb-2">{anomaly.issue}</div>
                    <div className="text-sm text-primary font-medium mb-1">
                      💡 {anomaly.recommendation}
                    </div>
                    <div className="text-sm text-secondary font-semibold">
                      Savings: {anomaly.savings}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Insights;
