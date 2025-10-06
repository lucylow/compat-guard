// CompatGuard Scanner Service
// Uses mock data for browser-based demo

import { ScanResult, Issue } from './api';

export interface ScanOptions {
  targetBaseline?: number;
  includePolyfills?: boolean;
  frameworks?: string[];
  excludePaths?: string[];
}

export class CompatGuardScanner {
  private isScanning: boolean = false;

  async scan(projectPath: string, options: ScanOptions = {}): Promise<ScanResult> {
    if (this.isScanning) {
      throw new Error('Scan already in progress');
    }

    this.isScanning = true;

    try {
      // In a real implementation, this would:
      // 1. Traverse the project directory
      // 2. Parse files (JS, CSS, HTML)
      // 3. Check against baseline compatibility data
      // 4. Generate issues and recommendations

      const result = await this.performScan(projectPath, options);
      return result;
    } finally {
      this.isScanning = false;
    }
  }

  private async performScan(projectPath: string, options: ScanOptions): Promise<ScanResult> {
    // Simulate scanning process
    await this.delay(2000);

    // Mock scan result - in production, this would be real analysis
    const issues = this.analyzeProject(projectPath, options);
    const categories = this.categorizeIssues(issues);
    const compliance = this.calculateCompliance(categories);

    return {
      projectId: 'current-project',
      timestamp: new Date(),
      compliance,
      totalIssues: issues.length,
      criticalIssues: issues.filter(i => i.severity === 'critical').length,
      browserCoverage: 95,
      avgFixTime: 18,
      categories,
      issues,
      complianceHistory: this.getHistoricalData(),
      browserBreakdown: this.getBrowserData()
    };
  }

  private analyzeProject(projectPath: string, options: ScanOptions): Issue[] {
    // Demo: analyze common web features
    return [
      {
        id: 'issue-dialog',
        file: 'src/components/Modal.jsx',
        issue: '<dialog> element - Newly Available (Baseline 2022)',
        severity: 'medium',
        impact: 'Moderate - recently achieved baseline status',
        line: 42,
        suggestion: 'Safe to use with polyfill for older browsers',
        category: 'html'
      },
      {
        id: 'issue-subgrid',
        file: 'src/styles/ProductGrid.css',
        issue: 'CSS Subgrid - Newly Available (Baseline 2024)',
        severity: 'medium',
        impact: 'Moderate - recent baseline feature',
        line: 15,
        suggestion: 'Use nested Grid fallback for older browsers',
        category: 'css'
      },
      {
        id: 'issue-flatmap',
        file: 'src/utils/arrayHelpers.js',
        issue: 'Array.prototype.flatMap() - Widely Available',
        severity: 'low',
        impact: 'Minimal - widely supported',
        line: 23,
        suggestion: 'Safe to use',
        category: 'javascript'
      },
      {
        id: 'issue-intersection-observer',
        file: 'src/components/LazyImage.tsx',
        issue: 'IntersectionObserver API - Widely Available',
        severity: 'low',
        impact: 'Minimal - widely supported',
        line: 67,
        suggestion: 'Safe to use',
        category: 'webApi'
      }
    ];
  }

  private categorizeIssues(issues: Issue[]) {
    const categories = {
      css: { total: 0, issues: 0 },
      javascript: { total: 0, issues: 0 },
      html: { total: 0, issues: 0 },
      webApi: { total: 0, issues: 0 }
    };

    issues.forEach(issue => {
      if (categories[issue.category]) {
        categories[issue.category].issues++;
      }
    });

    // Mock totals - in production would count all files scanned
    categories.css.total = 145;
    categories.javascript.total = 312;
    categories.html.total = 45;
    categories.webApi.total = 121;

    return categories;
  }

  private calculateCompliance(categories: any): number {
    const totalFiles = Object.values(categories).reduce((sum: number, cat: any) => sum + cat.total, 0);
    const totalIssues = Object.values(categories).reduce((sum: number, cat: any) => sum + cat.issues, 0);
    return Math.round(((totalFiles - totalIssues) / totalFiles) * 1000) / 10;
  }

  private getHistoricalData() {
    return [
      { month: 'Sep', score: 45 },
      { month: 'Oct', score: 52 },
      { month: 'Nov', score: 58 },
      { month: 'Dec', score: 61 },
      { month: 'Jan', score: 66 }
    ];
  }

  private getBrowserData() {
    return [
      { name: 'Chrome', coverage: 95, color: 'bg-primary' },
      { name: 'Firefox', coverage: 88, color: 'bg-secondary' },
      { name: 'Safari', coverage: 72, color: 'bg-accent' },
      { name: 'Edge', coverage: 91, color: 'bg-primary/70' }
    ];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isCurrentlyScanning(): boolean {
    return this.isScanning;
  }
}

export const scanner = new CompatGuardScanner();
