// Mock Data Loader Service
// Loads all enhanced mock data for CompatGuard

import aiCollaborationData from '../../mock-data/ai-collaboration-network.json';
import portfolioData from '../../mock-data/portfolio-analysis.json';
import codeIntelligenceData from '../../mock-data/code-intelligence.json';
import predictiveAnalyticsData from '../../mock-data/predictive-analytics.json';
import teamCollaborationData from '../../mock-data/team-collaboration.json';
import browserIntelligenceData from '../../mock-data/browser-intelligence.json';
import advancedPolyfillsData from '../../mock-data/advanced-polyfills.json';
import advancedConfigurationData from '../../mock-data/advanced-configuration.json';

export class MockDataService {
  // AI Collaboration
  getAICollaboration() {
    return aiCollaborationData;
  }

  getRecentCollaborations() {
    return aiCollaborationData.agentCollaboration.recentCollaborations;
  }

  getCrossProjectLearning() {
    return aiCollaborationData.crossProjectLearning;
  }

  // Portfolio Analysis
  getPortfolio() {
    return portfolioData;
  }

  getProjectBreakdown() {
    return portfolioData.projectBreakdown;
  }

  getCrossProjectInsights() {
    return portfolioData.crossProjectInsights;
  }

  // Code Intelligence
  getCodeIntelligence() {
    return codeIntelligenceData;
  }

  getSmartRefactoring() {
    return codeIntelligenceData.smartRefactoring;
  }

  getCodeQualityMetrics() {
    return codeIntelligenceData.codeQualityMetrics;
  }

  // Predictive Analytics
  getPredictiveAnalytics() {
    return predictiveAnalyticsData;
  }

  getMigrationTimeline() {
    return predictiveAnalyticsData.predictiveModels.migrationTimeline;
  }

  getAnomalyDetection() {
    return predictiveAnalyticsData.anomalyDetection;
  }

  // Team Collaboration
  getTeamCollaboration() {
    return teamCollaborationData;
  }

  getWorkflowIntegrations() {
    return teamCollaborationData.workflowIntegrations;
  }

  getTeamPerformance() {
    return teamCollaborationData.teamPerformance;
  }

  // Browser Intelligence
  getBrowserIntelligence() {
    return browserIntelligenceData;
  }

  getMarketAnalysis() {
    return browserIntelligenceData.marketAnalysis;
  }

  getProactiveRecommendations() {
    return browserIntelligenceData.proactiveRecommendations;
  }

  // Advanced Polyfills
  getAdvancedPolyfills() {
    return advancedPolyfillsData;
  }

  getPolyfillStrategies() {
    return advancedPolyfillsData.intelligentPolyfilling.dynamicPolyfillStrategies;
  }

  getPolyfillOptimization() {
    return advancedPolyfillsData.polyfillOptimization;
  }

  // Configuration
  getOrganizationPolicies() {
    return advancedConfigurationData.organizationPolicies;
  }

  getCustomRules() {
    return advancedConfigurationData.customRules;
  }
}

export const mockDataService = new MockDataService();
