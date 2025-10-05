// Comprehensive Mock Data for API Service
import { Project, ScanResult, Issue, AnalyticsData } from './api';

export const mockProjects: Project[] = [
  {
    id: 'project-dashboard',
    name: 'Dashboard',
    path: '/projects/dashboard',
    lastScan: new Date('2024-01-15T10:30:00Z'),
    compliance: 66.1,
    issues: 211,
    status: 'active'
  },
  {
    id: 'techshop-pro',
    name: 'TechShop Pro',
    path: '/projects/techshop',
    lastScan: new Date('2024-01-15T10:30:00Z'),
    compliance: 87.4,
    issues: 3,
    status: 'active'
  },
  {
    id: 'growthcorp-landing',
    name: 'GrowthCorp Landing',
    path: '/projects/growthcorp',
    lastScan: new Date('2024-01-14T15:20:00Z'),
    compliance: 92.1,
    issues: 3,
    status: 'active'
  },
  {
    id: 'fittracker-mobile',
    name: 'FitTracker Mobile',
    path: '/projects/fittracker',
    lastScan: new Date('2024-01-13T09:15:00Z'),
    compliance: 79.5,
    issues: 3,
    status: 'active'
  }
];

// Platform-specific issues
const techshopIssues: Issue[] = [
  {
    id: 'ECOM-001',
    file: 'src/components/ProductGrid.jsx',
    issue: 'CSS Container Queries - newly available baseline feature',
    severity: 'medium',
    impact: 'Affects 25% of users on older browsers',
    line: 45,
    suggestion: 'Add @container fallback using @supports for browsers without container query support',
    category: 'css'
  },
  {
    id: 'ECOM-002',
    file: 'src/hooks/useInfiniteScroll.js',
    issue: 'IntersectionObserver - widely available, no action needed',
    severity: 'low',
    impact: 'Minimal impact - 98% browser support',
    line: 12,
    suggestion: 'Already using polyfill, no changes needed',
    category: 'webApi'
  },
  {
    id: 'ECOM-003',
    file: 'src/styles/checkout.css',
    issue: 'CSS :has() selector - limited availability',
    severity: 'critical',
    impact: 'Affects checkout conversion - 30% of users',
    line: 156,
    suggestion: 'Use JavaScript-based solution or wait for wider support. Critical for conversion optimization.',
    category: 'css'
  }
];

const growthcorpIssues: Issue[] = [
  {
    id: 'MKTG-001',
    file: 'components/HeroCarousel.vue',
    issue: 'CSS Scroll Snap - widely available',
    severity: 'low',
    impact: 'Minimal - 95% browser support',
    line: 78,
    suggestion: 'Current implementation is safe for production',
    category: 'css'
  },
  {
    id: 'MKTG-002',
    file: 'layouts/testimonials.vue',
    issue: 'CSS Grid subgrid - limited availability',
    severity: 'critical',
    impact: 'Layout breaks for 35% of Safari users',
    line: 234,
    suggestion: 'Use nested CSS Grid with explicit sizing as fallback',
    category: 'css'
  },
  {
    id: 'MKTG-003',
    file: 'composables/useScrollAnimations.js',
    issue: 'Web Animations API - newly available',
    severity: 'medium',
    impact: 'Animations fail for 15% of users',
    line: 89,
    suggestion: 'Add CSS-based fallback animations for unsupported browsers',
    category: 'webApi'
  }
];

const fittrackerIssues: Issue[] = [
  {
    id: 'MOB-001',
    file: 'src/components/ModalOverlay.jsx',
    issue: 'CSS backdrop-filter - newly available',
    severity: 'medium',
    impact: 'Visual degradation on older mobile devices',
    line: 45,
    suggestion: 'Use solid background as fallback for older devices',
    category: 'css'
  },
  {
    id: 'MOB-002',
    file: 'src/utils/shareWorkout.js',
    issue: 'Web Share API - limited availability',
    severity: 'critical',
    impact: 'Core sharing functionality unavailable for 40% of users',
    line: 123,
    suggestion: 'Implement manual share options (copy link, social media buttons) as fallback',
    category: 'webApi'
  },
  {
    id: 'MOB-003',
    file: 'src/styles/safeArea.css',
    issue: 'CSS env() function for safe areas - widely available',
    severity: 'low',
    impact: 'Well supported on modern mobile devices',
    line: 12,
    suggestion: 'Current implementation is production-ready',
    category: 'css'
  }
];

export const mockIssues: Issue[] = [
  {
    id: 'issue-1',
    file: 'src/components/Modal.jsx',
    issue: '<dialog> element not supported in older browsers',
    severity: 'critical',
    impact: '100% of IE11 users, 18% of mobile users',
    line: 42,
    suggestion: 'Use dialog-polyfill library or implement fallback with role="dialog" and aria attributes',
    category: 'html'
  },
  {
    id: 'issue-2',
    file: 'src/styles/ProductGrid.css',
    issue: 'CSS Subgrid not widely supported',
    severity: 'high',
    impact: '18% users (Safari < 16)',
    line: 15,
    suggestion: 'Use nested CSS Grid or fallback to flexbox with feature detection',
    category: 'css'
  },
  {
    id: 'issue-3',
    file: 'src/utils/arrayHelpers.js',
    issue: 'Array.flatMap() requires polyfill for older browsers',
    severity: 'medium',
    impact: '7% users (IE11, older Android)',
    line: 23,
    suggestion: 'Add core-js polyfill or use .map().flat() as alternative',
    category: 'javascript'
  },
  {
    id: 'issue-4',
    file: 'src/components/LazyImage.tsx',
    issue: 'IntersectionObserver API not supported in IE11',
    severity: 'medium',
    impact: '12% users',
    line: 67,
    suggestion: 'Use intersection-observer polyfill from npm',
    category: 'webApi'
  },
  {
    id: 'issue-5',
    file: 'src/styles/layout.css',
    issue: 'CSS Container Queries experimental feature',
    severity: 'high',
    impact: '25% users (Firefox < 110, Safari < 16)',
    line: 89,
    suggestion: 'Use media queries as fallback or wait for broader support',
    category: 'css'
  },
  {
    id: 'issue-6',
    file: 'src/utils/dateHelpers.js',
    issue: 'Intl.RelativeTimeFormat not supported in older browsers',
    severity: 'low',
    impact: '5% users',
    line: 34,
    suggestion: 'Use date-fns or moment.js library for formatting',
    category: 'javascript'
  },
  {
    id: 'issue-7',
    file: 'src/components/VideoPlayer.jsx',
    issue: 'HTMLVideoElement.requestPictureInPicture() limited support',
    severity: 'low',
    impact: '8% users (Safari iOS)',
    line: 156,
    suggestion: 'Feature detect and provide graceful degradation',
    category: 'webApi'
  },
  {
    id: 'issue-8',
    file: 'src/styles/animations.css',
    issue: 'View Transitions API not yet baseline',
    severity: 'medium',
    impact: '35% users',
    line: 45,
    suggestion: 'Progressive enhancement - use CSS transitions as fallback',
    category: 'css'
  },
  {
    id: 'issue-9',
    file: 'src/components/Form.tsx',
    issue: 'FormData.entries() requires polyfill for IE11',
    severity: 'medium',
    impact: '10% users',
    line: 78,
    suggestion: 'Use formdata-polyfill or manual form serialization',
    category: 'javascript'
  },
  {
    id: 'issue-10',
    file: 'src/components/Notifications.tsx',
    issue: 'Notification API permission handling varies',
    severity: 'low',
    impact: '6% users',
    line: 92,
    suggestion: 'Implement robust permission checking with fallbacks',
    category: 'webApi'
  },
  {
    id: 'issue-11',
    file: 'src/styles/typography.css',
    issue: 'CSS :has() selector limited support',
    severity: 'high',
    impact: '22% users (Firefox < 121)',
    line: 12,
    suggestion: 'Use JavaScript-based solution or wait for broader support',
    category: 'css'
  },
  {
    id: 'issue-12',
    file: 'src/utils/clipboard.js',
    issue: 'Clipboard API async methods not in IE11',
    severity: 'critical',
    impact: '100% IE11 users',
    line: 28,
    suggestion: 'Use document.execCommand as fallback for older browsers',
    category: 'javascript'
  },
  {
    id: 'issue-13',
    file: 'src/components/FileUpload.tsx',
    issue: 'File System Access API experimental',
    severity: 'low',
    impact: '45% users (not in Firefox/Safari)',
    line: 134,
    suggestion: 'Use traditional file input as fallback',
    category: 'webApi'
  },
  {
    id: 'issue-14',
    file: 'src/styles/colors.css',
    issue: 'CSS color-mix() function limited support',
    severity: 'medium',
    impact: '20% users',
    line: 67,
    suggestion: 'Pre-calculate mixed colors or use CSS variables',
    category: 'css'
  },
  {
    id: 'issue-15',
    file: 'src/utils/stringHelpers.js',
    issue: 'String.prototype.replaceAll() not in older browsers',
    severity: 'low',
    impact: '8% users',
    line: 45,
    suggestion: 'Use regex with global flag or polyfill',
    category: 'javascript'
  },
  {
    id: 'issue-16',
    file: 'src/components/Chart.tsx',
    issue: 'ResizeObserver API requires polyfill',
    severity: 'medium',
    impact: '15% users',
    line: 203,
    suggestion: 'Add resize-observer-polyfill package',
    category: 'webApi'
  },
  {
    id: 'issue-17',
    file: 'src/styles/grid.css',
    issue: 'CSS aspect-ratio property limited support',
    severity: 'high',
    impact: '18% users (Safari < 15)',
    line: 34,
    suggestion: 'Use padding-top hack as fallback',
    category: 'css'
  },
  {
    id: 'issue-18',
    file: 'src/utils/promises.js',
    issue: 'Promise.allSettled() not in IE11',
    severity: 'medium',
    impact: '10% users',
    line: 56,
    suggestion: 'Use promise-polyfill or manual implementation',
    category: 'javascript'
  },
  {
    id: 'issue-19',
    file: 'src/components/Share.tsx',
    issue: 'Web Share API not supported in desktop browsers',
    severity: 'low',
    impact: '30% users (desktop)',
    line: 89,
    suggestion: 'Provide manual share options as fallback',
    category: 'webApi'
  },
  {
    id: 'issue-20',
    file: 'src/styles/scroll.css',
    issue: 'scroll-snap properties inconsistent behavior',
    severity: 'medium',
    impact: '12% users',
    line: 78,
    suggestion: 'Test across browsers and provide JavaScript fallback',
    category: 'css'
  },
  {
    id: 'issue-21',
    file: 'src/utils/objectHelpers.js',
    issue: 'Object.fromEntries() not in IE11',
    severity: 'medium',
    impact: '10% users',
    line: 91,
    suggestion: 'Use reduce() or polyfill from core-js',
    category: 'javascript'
  },
  {
    id: 'issue-22',
    file: 'src/components/AudioPlayer.tsx',
    issue: 'Web Audio API compatibility issues',
    severity: 'low',
    impact: '7% users',
    line: 167,
    suggestion: 'Feature detect and provide HTML5 audio fallback',
    category: 'webApi'
  },
  {
    id: 'issue-23',
    file: 'src/styles/filters.css',
    issue: 'CSS backdrop-filter performance issues on low-end devices',
    severity: 'medium',
    impact: '15% users (mobile)',
    line: 23,
    suggestion: 'Use media queries to disable on low-end devices',
    category: 'css'
  }
];

export const mockScanResults: Record<string, ScanResult> = {
  'project-dashboard': {
    projectId: 'project-dashboard',
    timestamp: new Date('2024-01-15T10:30:00Z'),
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
    issues: mockIssues.slice(0, 10),
    complianceHistory: [
      { month: 'Sep', score: 45 },
      { month: 'Oct', score: 52 },
      { month: 'Nov', score: 58 },
      { month: 'Dec', score: 61 },
      { month: 'Jan', score: 66 }
    ],
    browserBreakdown: [
      { name: 'Chrome', coverage: 98, color: 'bg-primary' },
      { name: 'Firefox', coverage: 95, color: 'bg-secondary' },
      { name: 'Safari', coverage: 88, color: 'bg-accent' },
      { name: 'Edge', coverage: 97, color: 'bg-primary/70' },
      { name: 'Samsung Internet', coverage: 82, color: 'bg-secondary/70' }
    ]
  },
  'techshop-pro': {
    projectId: 'techshop-pro',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    compliance: 87.4,
    totalIssues: 3,
    criticalIssues: 1,
    browserCoverage: 92,
    avgFixTime: 4,
    categories: {
      css: { total: 450, issues: 2 },
      javascript: { total: 680, issues: 0 },
      html: { total: 125, issues: 0 },
      webApi: { total: 89, issues: 1 }
    },
    issues: techshopIssues,
    complianceHistory: [
      { month: 'Sep', score: 78 },
      { month: 'Oct', score: 81 },
      { month: 'Nov', score: 84 },
      { month: 'Dec', score: 86 },
      { month: 'Jan', score: 87 }
    ],
    browserBreakdown: [
      { name: 'Chrome', coverage: 98, color: 'bg-primary' },
      { name: 'Firefox', coverage: 95, color: 'bg-secondary' },
      { name: 'Safari', coverage: 82, color: 'bg-accent' },
      { name: 'Edge', coverage: 97, color: 'bg-primary/70' },
      { name: 'Samsung Internet', coverage: 88, color: 'bg-secondary/70' }
    ]
  },
  'growthcorp-landing': {
    projectId: 'growthcorp-landing',
    timestamp: new Date('2024-01-14T15:20:00Z'),
    compliance: 92.1,
    totalIssues: 3,
    criticalIssues: 1,
    browserCoverage: 95,
    avgFixTime: 3,
    categories: {
      css: { total: 280, issues: 2 },
      javascript: { total: 340, issues: 0 },
      html: { total: 95, issues: 0 },
      webApi: { total: 45, issues: 1 }
    },
    issues: growthcorpIssues,
    complianceHistory: [
      { month: 'Sep', score: 85 },
      { month: 'Oct', score: 87 },
      { month: 'Nov', score: 89 },
      { month: 'Dec', score: 91 },
      { month: 'Jan', score: 92 }
    ],
    browserBreakdown: [
      { name: 'Chrome', coverage: 99, color: 'bg-primary' },
      { name: 'Firefox', coverage: 97, color: 'bg-secondary' },
      { name: 'Safari', coverage: 91, color: 'bg-accent' },
      { name: 'Edge', coverage: 98, color: 'bg-primary/70' },
      { name: 'Samsung Internet', coverage: 89, color: 'bg-secondary/70' }
    ]
  },
  'fittracker-mobile': {
    projectId: 'fittracker-mobile',
    timestamp: new Date('2024-01-13T09:15:00Z'),
    compliance: 79.5,
    totalIssues: 3,
    criticalIssues: 1,
    browserCoverage: 88,
    avgFixTime: 5,
    categories: {
      css: { total: 320, issues: 1 },
      javascript: { total: 520, issues: 0 },
      html: { total: 110, issues: 0 },
      webApi: { total: 78, issues: 2 }
    },
    issues: fittrackerIssues,
    complianceHistory: [
      { month: 'Sep', score: 72 },
      { month: 'Oct', score: 74 },
      { month: 'Nov', score: 76 },
      { month: 'Dec', score: 78 },
      { month: 'Jan', score: 79 }
    ],
    browserBreakdown: [
      { name: 'Chrome', coverage: 96, color: 'bg-primary' },
      { name: 'Firefox', coverage: 92, color: 'bg-secondary' },
      { name: 'Safari', coverage: 75, color: 'bg-accent' },
      { name: 'Edge', coverage: 94, color: 'bg-primary/70' },
      { name: 'Samsung Internet', coverage: 83, color: 'bg-secondary/70' }
    ]
  }
};

export const mockAnalyticsData: Record<string, AnalyticsData> = {
  'project-1': {
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
      { name: 'Chrome', coverage: 98, color: 'bg-primary' },
      { name: 'Firefox', coverage: 95, color: 'bg-secondary' },
      { name: 'Safari', coverage: 88, color: 'bg-accent' },
      { name: 'Edge', coverage: 97, color: 'bg-primary/70' }
    ],
    issuesTrend: [
      { week: 'Week 1', resolved: 23, new: 12 },
      { week: 'Week 2', resolved: 45, new: 8 },
      { week: 'Week 3', resolved: 67, new: 15 },
      { week: 'Week 4', resolved: 89, new: 11 }
    ]
  },
  'project-2': {
    currentCompliance: 84.2,
    complianceTrend: 8.5,
    browserCoverage: 98.0,
    browserTrend: 5.2,
    avgFixTime: 12,
    fixTimeTrend: -22,
    complianceHistory: [
      { month: 'Sep', score: 72 },
      { month: 'Oct', score: 76 },
      { month: 'Nov', score: 79 },
      { month: 'Dec', score: 82 },
      { month: 'Jan', score: 84 }
    ],
    browserBreakdown: [
      { name: 'Chrome', coverage: 99, color: 'bg-primary' },
      { name: 'Firefox', coverage: 98, color: 'bg-secondary' },
      { name: 'Safari', coverage: 96, color: 'bg-accent' },
      { name: 'Edge', coverage: 99, color: 'bg-primary/70' }
    ],
    issuesTrend: [
      { week: 'Week 1', resolved: 12, new: 5 },
      { week: 'Week 2', resolved: 18, new: 3 },
      { week: 'Week 3', resolved: 25, new: 7 },
      { week: 'Week 4', resolved: 34, new: 4 }
    ]
  }
};

// Helper function to get mock data with variations
export function generateMockScanResult(projectId: string): ScanResult {
  const baseData = mockScanResults[projectId] || mockScanResults['project-1'];

  // Add some random variation to simulate real-time changes
  const variation = Math.random() * 2 - 1; // -1 to 1

  return {
    ...baseData,
    timestamp: new Date(),
    compliance: Math.max(0, Math.min(100, baseData.compliance + variation)),
    totalIssues: Math.max(0, baseData.totalIssues + Math.floor(Math.random() * 5 - 2))
  };
}

export function generateMockAnalytics(projectId: string): AnalyticsData {
  return mockAnalyticsData[projectId] || mockAnalyticsData['project-1'];
}

export function getIssuesByFilter(projectId: string, filters?: {
  severity?: string;
  category?: string;
}): Issue[] {
  // Select issues based on project
  let issues: Issue[] = [];

  switch (projectId) {
    case 'techshop-pro':
      issues = [...techshopIssues];
      break;
    case 'growthcorp-landing':
      issues = [...growthcorpIssues];
      break;
    case 'fittracker-mobile':
      issues = [...fittrackerIssues];
      break;
    default:
      issues = [...mockIssues];
  }

  if (filters?.severity) {
    issues = issues.filter(i => i.severity === filters.severity);
  }

  if (filters?.category) {
    issues = issues.filter(i => i.category === filters.category);
  }

  return issues;
}
