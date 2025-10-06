// Real integration with WebStatus.dev API for Baseline data
export interface BaselineStatus {
  baseline: 'widely' | 'newly' | 'limited' | false;
  baseline_low_date?: string;
  baseline_high_date?: string;
}

export interface WebFeature {
  id: string;
  name: string;
  description?: string;
  baseline?: BaselineStatus;
  spec?: string;
  mdn_url?: string;
  browser_implementations?: Record<string, { version?: string; status?: string }>;
}

class WebStatusService {
  private baseUrl = 'https://api.webstatus.dev/v1';
  private cache = new Map<string, WebFeature>();

  async searchFeatures(query: string): Promise<WebFeature[]> {
    try {
      const response = await fetch(`${this.baseUrl}/features?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to fetch features');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('WebStatus API error:', error);
      return [];
    }
  }

  async getFeature(featureId: string): Promise<WebFeature | null> {
    if (this.cache.has(featureId)) {
      return this.cache.get(featureId)!;
    }

    try {
      const response = await fetch(`${this.baseUrl}/features/${featureId}`);
      if (!response.ok) return null;
      const feature = await response.json();
      this.cache.set(featureId, feature);
      return feature;
    } catch (error) {
      console.error('WebStatus API error:', error);
      return null;
    }
  }

  async analyzeCode(code: string): Promise<Array<{ feature: string; baseline: BaselineStatus; suggestion: string }>> {
    const features: Array<{ feature: string; baseline: BaselineStatus; suggestion: string }> = [];
    
    // Detect CSS features
    const cssFeatures = [
      { pattern: /container-type:|container-name:|@container/g, id: 'css-container-queries', name: 'CSS Container Queries' },
      { pattern: /:has\(/g, id: 'css-has', name: 'CSS :has() selector' },
      { pattern: /color-mix\(/g, id: 'css-color-mix', name: 'CSS color-mix()' },
      { pattern: /view-transition-name:/g, id: 'view-transitions', name: 'View Transitions API' },
      { pattern: /@layer/g, id: 'css-cascade-layers', name: 'CSS Cascade Layers' },
      { pattern: /color-scheme:/g, id: 'css-color-scheme', name: 'CSS color-scheme' },
    ];

    // Detect JS features
    const jsFeatures = [
      { pattern: /\.at\(/g, id: 'array-at', name: 'Array.at()' },
      { pattern: /structuredClone\(/g, id: 'structured-clone', name: 'structuredClone()' },
      { pattern: /\.findLast\(/g, id: 'array-findlast', name: 'Array.findLast()' },
      { pattern: /import\.meta/g, id: 'import-meta', name: 'import.meta' },
    ];

    const allFeatures = [...cssFeatures, ...jsFeatures];

    for (const { pattern, id, name } of allFeatures) {
      if (pattern.test(code)) {
        const feature = await this.getFeature(id);
        if (feature?.baseline) {
          features.push({
            feature: name,
            baseline: feature.baseline,
            suggestion: this.getSuggestion(feature.baseline, name)
          });
        }
      }
    }

    return features;
  }

  private getSuggestion(baseline: BaselineStatus, featureName: string): string {
    if (baseline.baseline === 'widely') {
      return `✓ ${featureName} is widely available - safe to use`;
    } else if (baseline.baseline === 'newly') {
      return `⚠ ${featureName} is newly available - consider polyfills for older browsers`;
    } else if (baseline.baseline === 'limited') {
      return `⚠ ${featureName} has limited support - use with caution and provide fallbacks`;
    } else {
      return `❌ ${featureName} is not Baseline - avoid or provide comprehensive polyfills`;
    }
  }

  getBaselineStatusColor(baseline: BaselineStatus): string {
    if (baseline.baseline === 'widely') return 'text-green-600';
    if (baseline.baseline === 'newly') return 'text-yellow-600';
    if (baseline.baseline === 'limited') return 'text-orange-600';
    return 'text-red-600';
  }

  getBaselineStatusLabel(baseline: BaselineStatus): string {
    if (baseline.baseline === 'widely') return 'Widely Available';
    if (baseline.baseline === 'newly') return 'Newly Available';
    if (baseline.baseline === 'limited') return 'Limited Availability';
    return 'Not Baseline';
  }
}

export const webStatusApi = new WebStatusService();
