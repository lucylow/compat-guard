// API Service Layer for CompatGuard

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
      return this.getMockAnalytics();
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
      return this.getMockIssues();
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
    return [
      {
        id: 'project-1',
        name: 'E-Commerce Platform',
        path: '/projects/ecommerce',
        lastScan: new Date(),
        compliance: 66.1,
        issues: 211,
        status: 'active'
      }
    ];
  }

  private getMockScanResult(projectId: string): ScanResult {
    return {
      projectId,
      timestamp: new Date(),
      compliance: 66.1,
      totalIssues: 211,
      criticalIssues: 23,
      browserCoverage: 95,
      avgFixTime: 18,
      categories: {
        css: { total: 145, issues: 89 },
        javascript: { total: 312, issues: 78 },
        html: { total: 45, issues: 12 },
        webApi: { total: 121, issues: 32 }
      },
      issues: this.getMockIssues(),
      complianceHistory: [
        { month: 'Sep', score: 45 },
        { month: 'Oct', score: 52 },
        { month: 'Nov', score: 58 },
        { month: 'Dec', score: 61 },
        { month: 'Jan', score: 66 }
      ],
      browserBreakdown: [
        { name: 'Chrome', coverage: 95, color: 'bg-primary' },
        { name: 'Firefox', coverage: 88, color: 'bg-secondary' },
        { name: 'Safari', coverage: 72, color: 'bg-accent' },
        { name: 'Edge', coverage: 91, color: 'bg-primary/70' }
      ]
    };
  }

  private getMockIssues(): Issue[] {
    return [
      {
        id: 'issue-1',
        file: 'Modal.jsx',
        issue: '<dialog> element not supported',
        severity: 'critical',
        impact: '100% users',
        line: 42,
        suggestion: 'Use polyfill or fallback to div-based modal',
        category: 'html'
      },
      {
        id: 'issue-2',
        file: 'ProductGrid.css',
        issue: 'CSS Subgrid not widely supported',
        severity: 'high',
        impact: '18% users',
        line: 15,
        suggestion: 'Use CSS Grid fallback',
        category: 'css'
      },
      {
        id: 'issue-3',
        file: 'arrayHelpers.js',
        issue: 'Array.flatMap compatibility issue',
        severity: 'medium',
        impact: '7% users',
        line: 23,
        suggestion: 'Add polyfill or use alternative',
        category: 'javascript'
      }
    ];
  }

  private getMockAnalytics(): AnalyticsData {
    return {
      currentCompliance: 66.1,
      complianceTrend: 12.3,
      browserCoverage: 95.0,
      browserTrend: 8.7,
      avgFixTime: 18,
      fixTimeTrend: -15,
      complianceHistory: [
        { month: 'Sep', score: 45 },
        { month: 'Oct', score: 52 },
        { month: 'Nov', score: 58 },
        { month: 'Dec', score: 61 },
        { month: 'Jan', score: 66 }
      ],
      browserBreakdown: [
        { name: 'Chrome', coverage: 95, color: 'bg-primary' },
        { name: 'Firefox', coverage: 88, color: 'bg-secondary' },
        { name: 'Safari', coverage: 72, color: 'bg-accent' },
        { name: 'Edge', coverage: 91, color: 'bg-primary/70' }
      ],
      issuesTrend: [
        { week: 'Week 1', resolved: 23, new: 12 },
        { week: 'Week 2', resolved: 45, new: 8 },
        { week: 'Week 3', resolved: 67, new: 15 },
        { week: 'Week 4', resolved: 89, new: 11 }
      ]
    };
  }
}

export const apiService = new ApiService();
