// Real Baseline Analysis using web-features package
import { features } from 'web-features';

export type BaselineStatus = 'widely' | 'newly' | 'limited' | false;

export interface BaselineFeature {
  id: string;
  name: string;
  status: BaselineStatus;
  since?: string;
  supportData?: {
    chrome?: string;
    firefox?: string;
    safari?: string;
    edge?: string;
  };
}

export class BaselineAnalyzer {
  private featuresMap: Map<string, BaselineFeature>;

  constructor() {
    this.featuresMap = new Map();
    this.loadFeatures();
  }

  private loadFeatures() {
    // Load all web-features data into our map
    Object.entries(features).forEach(([id, feature]: [string, any]) => {
      this.featuresMap.set(id, {
        id,
        name: feature.name || id,
        status: feature.status?.baseline || false,
        since: feature.status?.baseline_high_date || feature.status?.baseline_low_date,
        supportData: feature.status?.support || {}
      });
    });
  }

  // Analyze a feature by name or ID
  analyzeFeature(featureName: string): BaselineFeature | null {
    // Direct lookup
    if (this.featuresMap.has(featureName)) {
      return this.featuresMap.get(featureName)!;
    }

    // Search by name (case-insensitive)
    const normalized = featureName.toLowerCase();
    for (const [id, feature] of this.featuresMap.entries()) {
      if (feature.name.toLowerCase().includes(normalized) || id.toLowerCase().includes(normalized)) {
        return feature;
      }
    }

    return null;
  }

  // Get all features by baseline status
  getFeaturesByStatus(status: BaselineStatus): BaselineFeature[] {
    return Array.from(this.featuresMap.values()).filter(f => f.status === status);
  }

  // Get features that match a query
  searchFeatures(query: string): BaselineFeature[] {
    const normalized = query.toLowerCase();
    return Array.from(this.featuresMap.values()).filter(
      f => f.name.toLowerCase().includes(normalized) || f.id.toLowerCase().includes(normalized)
    );
  }

  // Calculate risk level based on baseline status
  getRiskLevel(status: BaselineStatus): 'critical' | 'high' | 'medium' | 'low' {
    switch (status) {
      case false:
      case 'limited':
        return 'critical';
      case 'newly':
        return 'high';
      case 'widely':
        return 'low';
      default:
        return 'medium';
    }
  }

  // Get human-readable status
  getStatusLabel(status: BaselineStatus): string {
    switch (status) {
      case 'widely':
        return 'Widely Available';
      case 'newly':
        return 'Newly Available';
      case 'limited':
        return 'Limited Availability';
      case false:
        return 'Not Baseline';
      default:
        return 'Unknown';
    }
  }

  // Get CSS features
  getCSSFeatures(): BaselineFeature[] {
    return Array.from(this.featuresMap.values()).filter(
      f => f.id.startsWith('css-') || f.name.toLowerCase().includes('css')
    );
  }

  // Get JavaScript features  
  getJSFeatures(): BaselineFeature[] {
    return Array.from(this.featuresMap.values()).filter(
      f => f.id.includes('javascript') || f.id.includes('ecmascript') || f.name.toLowerCase().includes('javascript')
    );
  }

  // Get HTML features
  getHTMLFeatures(): BaselineFeature[] {
    return Array.from(this.featuresMap.values()).filter(
      f => f.id.startsWith('html-') || f.id.includes('element')
    );
  }

  // Get Web API features
  getWebAPIFeatures(): BaselineFeature[] {
    return Array.from(this.featuresMap.values()).filter(
      f => f.id.includes('api') || f.name.toLowerCase().includes('api')
    );
  }

  // Get all features
  getAllFeatures(): BaselineFeature[] {
    return Array.from(this.featuresMap.values());
  }

  // Get summary statistics
  getStatistics() {
    const all = this.getAllFeatures();
    return {
      total: all.length,
      widely: all.filter(f => f.status === 'widely').length,
      newly: all.filter(f => f.status === 'newly').length,
      limited: all.filter(f => f.status === 'limited').length,
      notBaseline: all.filter(f => f.status === false).length
    };
  }
}

export const baselineAnalyzer = new BaselineAnalyzer();
