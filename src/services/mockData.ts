// Comprehensive Mock Data for API Service
import { Project, ScanResult, Issue, AnalyticsData } from './api';

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    name: 'E-Commerce Platform',
    path: '/projects/ecommerce',
    lastScan: new Date('2024-01-15T10:30:00Z'),
    compliance: 66.1,
    issues: 211,
    status: 'active'
  },
  {
    id: 'project-2',
    name: 'Marketing Website',
    path: '/projects/marketing',
    lastScan: new Date('2024-01-14T15:20:00Z'),
    compliance: 84.2,
    issues: 45,
    status: 'active'
  },
  {
    id: 'project-3',
    name: 'Admin Dashboard',
    path: '/projects/admin',
    lastScan: new Date('2024-01-13T09:15:00Z'),
    compliance: 58.9,
    issues: 342,
    status: 'active'
  },
  {
    id: 'project-4',
    name: 'Mobile Web App',
    path: '/projects/mobile',
    lastScan: new Date('2024-01-15T11:45:00Z'),
    compliance: 91.5,
    issues: 23,
    status: 'active'
  },
  {
    id: 'project-5',
    name: 'Customer Portal',
    path: '/projects/portal',
    lastScan: new Date('2024-01-12T14:30:00Z'),
    compliance: 72.3,
    issues: 156,
    status: 'active'
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
  'project-1': {
    projectId: 'project-1',
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
  'project-2': {
    projectId: 'project-2',
    timestamp: new Date('2024-01-14T15:20:00Z'),
    compliance: 84.2,
    totalIssues: 45,
    criticalIssues: 5,
    browserCoverage: 98,
    avgFixTime: 12,
    categories: {
      css: { total: 78, issues: 23 },
      javascript: { total: 156, issues: 12 },
      html: { total: 34, issues: 4 },
      webApi: { total: 67, issues: 6 }
    },
    issues: mockIssues.slice(5, 10),
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
      { name: 'Edge', coverage: 99, color: 'bg-primary/70' },
      { name: 'Samsung Internet', coverage: 94, color: 'bg-secondary/70' }
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
  let issues = [...mockIssues];

  if (filters?.severity) {
    issues = issues.filter(i => i.severity === filters.severity);
  }

  if (filters?.category) {
    issues = issues.filter(i => i.category === filters.category);
  }

  return issues;
}
