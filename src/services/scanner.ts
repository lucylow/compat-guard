// CompatGuard Scanner Service
// Integrates with web-features for real Baseline compatibility scanning

import { ScanResult, Issue } from './api';
import { baselineAnalyzer, BaselineStatus } from './baselineAnalyzer';

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
    // Use real Baseline data from web-features package
    // Demo: analyze common web features that developers use
    
    const commonFeatures = [
      { name: 'dialog', file: 'src/components/Modal.jsx', line: 42, category: 'html' },
      { name: 'css-subgrid', file: 'src/styles/ProductGrid.css', line: 15, category: 'css' },
      { name: 'array-flat', file: 'src/utils/arrayHelpers.js', line: 23, category: 'javascript' },
      { name: 'intersectionobserver', file: 'src/components/LazyImage.tsx', line: 67, category: 'webApi' },
      { name: 'container-queries', file: 'src/styles/layout.css', line: 89, category: 'css' },
      { name: 'has-selector', file: 'src/styles/forms.css', line: 34, category: 'css' },
      { name: 'relative-time-format', file: 'src/utils/dateHelpers.js', line: 12, category: 'javascript' },
    ];

    const issues: Issue[] = [];

    for (const feature of commonFeatures) {
      const analysis = baselineAnalyzer.analyzeFeature(feature.name);
      
      if (analysis) {
        const severity = baselineAnalyzer.getRiskLevel(analysis.status);
        const statusLabel = baselineAnalyzer.getStatusLabel(analysis.status);
        
        issues.push({
          id: `issue-${feature.name}`,
          file: feature.file,
          issue: `${analysis.name} - ${statusLabel}`,
          severity,
          impact: this.getImpactMessage(analysis.status),
          line: feature.line,
          suggestion: this.getSuggestion(analysis.status, analysis.name),
          category: feature.category
        });
      }
    }

    return issues;
  }

  private getImpactMessage(status: BaselineStatus): string {
    switch (status) {
      case 'widely':
        return 'Minimal impact - widely supported across browsers';
      case 'newly':
        return 'Moderate impact - recently achieved baseline status';
      case 'limited':
        return 'High impact - limited browser support';
      case false:
        return 'Critical impact - not baseline, poor browser support';
      default:
        return 'Unknown impact';
    }
  }

  private getSuggestion(status: BaselineStatus, featureName: string): string {
    switch (status) {
      case 'widely':
        return 'Safe to use - feature is widely supported';
      case 'newly':
        return 'Consider polyfill for older browsers or progressive enhancement';
      case 'limited':
      case false:
        return `High risk - provide fallback or use alternative. Check caniuse.com for ${featureName} support`;
      default:
        return 'Verify browser support before using';
    }
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
