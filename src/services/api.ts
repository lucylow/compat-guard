// API Service Layer for CompatGuard
import { mockProjects, mockIssues, generateMockScanResult, generateMockAnalytics, getIssuesByFilter } from './mockData';

export interface Project {
  id: string;
  name: string;
  path: string;
  lastScan?: Date;
  compliance: number;
  issues: number;
  status: 'active' | 'scanning' | 'error';
}

export interface ScanResult {
  projectId: string;
  timestamp: Date;
  compliance: number;
  totalIssues: number;
  criticalIssues: number;
  browserCoverage: number;
  avgFixTime: number;
  categories: {
    css: { total: number; issues: number };
    javascript: { total: number; issues: number };
    html: { total: number; issues: number };
    webApi: { total: number; issues: number };
  };
  issues: Issue[];
  complianceHistory: ComplianceDataPoint[];
  browserBreakdown: BrowserData[];
}

export interface Issue {
  id: string;
  file: string;
  issue: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  impact: string;
  line?: number;
  suggestion?: string;
  category: 'css' | 'javascript' | 'html' | 'webApi';
}

export interface ComplianceDataPoint {
  month: string;
  score: number;
}

export interface BrowserData {
  name: string;
  coverage: number;
  color: string;
}

export interface AnalyticsData {
  currentCompliance: number;
  complianceTrend: number;
  browserCoverage: number;
  browserTrend: number;
  avgFixTime: number;
  fixTimeTrend: number;
  complianceHistory: ComplianceDataPoint[];
  browserBreakdown: BrowserData[];
  issuesTrend: {
    week: string;
    resolved: number;
    new: number;
  }[];
}

class ApiService {
  private baseUrl: string = '/api';
  private mockMode: boolean = true; // Toggle for development

  // Project Management
  async getProjects(): Promise<Project[]> {
    if (this.mockMode) {
      return this.getMockProjects();
    }
    const response = await fetch(`${this.baseUrl}/projects`);
    return response.json();
  }

  async getProject(id: string): Promise<Project> {
    if (this.mockMode) {
      const projects = await this.getMockProjects();
      return projects.find(p => p.id === id) || projects[0];
    }
    const response = await fetch(`${this.baseUrl}/projects/${id}`);
    return response.json();
  }

  async createProject(name: string, path: string): Promise<Project> {
    if (this.mockMode) {
      return {
        id: `project-${Date.now()}`,
        name,
        path,
        compliance: 0,
        issues: 0,
        status: 'active'
      };
    }
    const response = await fetch(`${this.baseUrl}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, path })
    });
    return response.json();
  }

  // Scanning
  async scanProject(projectId: string): Promise<ScanResult> {
    if (this.mockMode) {
      return this.getMockScanResult(projectId);
    }
    const response = await fetch(`${this.baseUrl}/projects/${projectId}/scan`, {
      method: 'POST'
    });
    return response.json();
  }

  async getLatestScan(projectId: string): Promise<ScanResult> {
    if (this.mockMode) {
      return this.getMockScanResult(projectId);
    }
    const response = await fetch(`${this.baseUrl}/projects/${projectId}/scans/latest`);
    return response.json();
  }

  // Analytics
  async getAnalytics(projectId: string): Promise<AnalyticsData> {
    if (this.mockMode) {
      return this.getMockAnalytics(projectId);
    }
    const response = await fetch(`${this.baseUrl}/projects/${projectId}/analytics`);
    return response.json();
  }

  // Issues
  async getIssues(projectId: string, filters?: {
    severity?: string;
    category?: string;
  }): Promise<Issue[]> {
    if (this.mockMode) {
      return this.getMockIssues(projectId, filters);
    }
    const params = new URLSearchParams(filters as any);
    const response = await fetch(`${this.baseUrl}/projects/${projectId}/issues?${params}`);
    return response.json();
  }

  // Export
  async exportReport(projectId: string, format: 'json' | 'csv' | 'pdf' = 'json'): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/projects/${projectId}/export?format=${format}`);
    return response.blob();
  }

  // Mock Data Providers
  private getMockProjects(): Project[] {
    return mockProjects;
  }

  private getMockScanResult(projectId: string): ScanResult {
    return generateMockScanResult(projectId);
  }

  private getMockIssues(projectId?: string, filters?: { severity?: string; category?: string }): Issue[] {
    return getIssuesByFilter(projectId || 'project-1', filters);
  }

  private getMockAnalytics(projectId?: string): AnalyticsData {
    return generateMockAnalytics(projectId || 'project-1');
  }
}

export const apiService = new ApiService();
