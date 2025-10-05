// Report Export Service
// Generates and downloads compatibility reports

interface ExportReportData {
  report_id: string;
  generated_on: string;
  project: {
    name: string;
    type: string;
    frameworks: string[];
    target_baseline: string;
  };
  summary: {
    total_features_analyzed: number;
    baseline_compliant: number;
    requires_polyfill: number;
    requires_migration: number;
    compatibility_score: number;
  };
  detailed_issues: Array<{
    issue_id: string;
    feature: string;
    severity: string;
    description: string;
    location: string;
    baseline_status: string;
    browsers_affected: string[];
    migration_recommendation: string;
    estimated_fix_duration: string;
    business_impact: string;
  }>;
  migration_plan: {
    phases: Array<{
      name: string;
      tasks: string[];
      estimated_duration: string;
    }>;
    overall_estimated_duration: string;
  };
  recommendations: string[];
  contact_info: {
    generated_by: string;
    support_email: string;
  };
}

// Generate mock report data based on project
export function generateReportData(projectId: string): ExportReportData {
  const projectConfigs: Record<string, Partial<ExportReportData>> = {
    'project-dashboard': {
      project: {
        name: 'Dashboard',
        type: 'Web Dashboard Application',
        frameworks: ['React', 'TypeScript'],
        target_baseline: '2024'
      },
      summary: {
        total_features_analyzed: 245,
        baseline_compliant: 162,
        requires_polyfill: 48,
        requires_migration: 35,
        compatibility_score: 66.1
      },
      detailed_issues: [
        {
          issue_id: 'DASH-001',
          feature: 'CSS Subgrid',
          severity: 'high',
          description: 'Dashboard layout uses CSS subgrid which has limited browser support.',
          location: 'src/components/Dashboard.tsx',
          baseline_status: 'newly_available',
          browsers_affected: ['Firefox < 71', 'Safari < 16'],
          migration_recommendation: 'Add CSS Grid fallback with explicit grid-template-rows.',
          estimated_fix_duration: '8 hours',
          business_impact: 'high'
        },
        {
          issue_id: 'DASH-002',
          feature: 'Array.prototype.at()',
          severity: 'medium',
          description: 'Array negative indexing used in data processing utilities.',
          location: 'src/utils/dataProcessing.ts',
          baseline_status: 'newly_available',
          browsers_affected: ['Chrome < 92', 'Safari < 15.4'],
          migration_recommendation: 'Replace with array[array.length - n] pattern or add polyfill.',
          estimated_fix_duration: '4 hours',
          business_impact: 'medium'
        }
      ]
    },
    'techshop-pro': {
      project: {
        name: 'TechShop Pro',
        type: 'E-commerce Platform',
        frameworks: ['React', 'Next.js'],
        target_baseline: '2024'
      },
      summary: {
        total_features_analyzed: 127,
        baseline_compliant: 89,
        requires_polyfill: 23,
        requires_migration: 15,
        compatibility_score: 87.4
      },
      detailed_issues: [
        {
          issue_id: 'ECOM-003',
          feature: 'CSS :has() selector',
          severity: 'error',
          description: 'Dynamic form validation styling uses :has() selector which has limited browser support.',
          location: 'src/styles/checkout.css',
          baseline_status: 'limited_availability',
          browsers_affected: ['Firefox < 103', 'Safari < 15.4'],
          migration_recommendation: 'Replace with JavaScript-based class toggling.',
          estimated_fix_duration: '6 hours',
          business_impact: 'high'
        },
        {
          issue_id: 'ECOM-001',
          feature: 'CSS Container Queries',
          severity: 'warning',
          description: 'Used in responsive product layouts; newly available in baseline but fallback needed.',
          location: 'src/components/ProductGrid.jsx',
          baseline_status: 'newly_available',
          browsers_affected: ['Older versions of Edge and Firefox'],
          migration_recommendation: 'Add @supports rule fallback for older browsers.',
          estimated_fix_duration: '4 hours',
          business_impact: 'medium'
        }
      ]
    },
    'growthcorp-landing': {
      project: {
        name: 'GrowthCorp Landing',
        type: 'Marketing Website',
        frameworks: ['Vue3', 'Nuxt'],
        target_baseline: '2024'
      },
      summary: {
        total_features_analyzed: 98,
        baseline_compliant: 90,
        requires_polyfill: 5,
        requires_migration: 3,
        compatibility_score: 92.1
      },
      detailed_issues: [
        {
          issue_id: 'MARK-001',
          feature: 'CSS accent-color',
          severity: 'low',
          description: 'Custom form controls use accent-color property for brand consistency.',
          location: 'src/components/ContactForm.vue',
          baseline_status: 'newly_available',
          browsers_affected: ['Safari < 15.4'],
          migration_recommendation: 'Acceptable degradation - forms still functional with default colors.',
          estimated_fix_duration: '2 hours',
          business_impact: 'low'
        }
      ]
    },
    'fittracker-mobile': {
      project: {
        name: 'FitTracker Mobile',
        type: 'Mobile Application',
        frameworks: ['React Native', 'Expo'],
        target_baseline: '2024'
      },
      summary: {
        total_features_analyzed: 156,
        baseline_compliant: 124,
        requires_polyfill: 18,
        requires_migration: 14,
        compatibility_score: 79.5
      },
      detailed_issues: [
        {
          issue_id: 'MOB-001',
          feature: 'Intl.Segmenter',
          severity: 'medium',
          description: 'Text segmentation for workout notes uses Intl.Segmenter API.',
          location: 'src/utils/textProcessing.ts',
          baseline_status: 'limited_availability',
          browsers_affected: ['Android WebView < 87'],
          migration_recommendation: 'Add grapheme-splitter polyfill library.',
          estimated_fix_duration: '6 hours',
          business_impact: 'medium'
        }
      ]
    }
  };

  const config = projectConfigs[projectId] || projectConfigs['project-dashboard'];
  const timestamp = new Date().toISOString();
  const reportId = `REP-${timestamp.split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  return {
    report_id: reportId,
    generated_on: timestamp,
    project: config.project!,
    summary: config.summary!,
    detailed_issues: config.detailed_issues || [],
    migration_plan: {
      phases: [
        {
          name: 'Critical Fixes',
          tasks: config.detailed_issues?.filter(i => i.severity === 'error' || i.severity === 'high')
            .map(i => `Fix ${i.feature} in ${i.location}`) || [],
          estimated_duration: '16 hours'
        },
        {
          name: 'Medium Priority Issues',
          tasks: config.detailed_issues?.filter(i => i.severity === 'medium')
            .map(i => `Address ${i.feature} in ${i.location}`) || [],
          estimated_duration: '12 hours'
        },
        {
          name: 'Testing and Validation',
          tasks: [
            'Cross-browser regression testing',
            'User acceptance testing',
            'Performance validation'
          ],
          estimated_duration: '8 hours'
        }
      ],
      overall_estimated_duration: '36 hours'
    },
    recommendations: [
      'Prioritize critical compatibility issues affecting core user flows.',
      'Implement polyfills where feasible to speed adoption of modern features.',
      'Integrate CompatGuard into CI/CD pipeline for continuous enforcement.',
      'Schedule regular compatibility audits quarterly.',
      'Consider progressive enhancement strategy for experimental features.'
    ],
    contact_info: {
      generated_by: 'CompatGuard AI System',
      support_email: 'support@compatguard.dev'
    }
  };
}

// Export report as JSON file
export function exportAsJSON(projectId: string): void {
  const reportData = generateReportData(projectId);
  const jsonString = JSON.stringify(reportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `compatguard-report-${reportData.project.name.toLowerCase().replace(/\s+/g, '-')}-${reportData.report_id}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export report as CSV file
export function exportAsCSV(projectId: string): void {
  const reportData = generateReportData(projectId);

  const headers = ['Issue ID', 'Feature', 'Severity', 'Location', 'Baseline Status', 'Business Impact', 'Estimated Fix Duration', 'Recommendation'];
  const rows = reportData.detailed_issues.map(issue => [
    issue.issue_id,
    issue.feature,
    issue.severity,
    issue.location,
    issue.baseline_status,
    issue.business_impact,
    issue.estimated_fix_duration,
    issue.migration_recommendation
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `compatguard-report-${reportData.project.name.toLowerCase().replace(/\s+/g, '-')}-${reportData.report_id}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Export report as HTML file
export function exportAsHTML(projectId: string): void {
  const reportData = generateReportData(projectId);

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CompatGuard Report - ${reportData.project.name}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 1200px; margin: 40px auto; padding: 20px; background: #f9fafb; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; border-radius: 12px; margin-bottom: 30px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
    .stat-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .stat-value { font-size: 32px; font-weight: bold; color: #667eea; }
    .stat-label { color: #6b7280; margin-top: 8px; }
    .section { background: white; padding: 30px; border-radius: 12px; margin: 20px 0; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .issue { border-left: 4px solid #667eea; padding: 20px; margin: 15px 0; background: #f9fafb; border-radius: 8px; }
    .severity-high { border-left-color: #ef4444; }
    .severity-error { border-left-color: #dc2626; }
    .severity-medium { border-left-color: #f59e0b; }
    .severity-low { border-left-color: #10b981; }
    h1 { margin: 0; font-size: 32px; }
    h2 { color: #1f2937; margin-top: 0; }
    .meta { opacity: 0.9; font-size: 14px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>CompatGuard Compatibility Report</h1>
    <div class="meta">
      <div><strong>Project:</strong> ${reportData.project.name} (${reportData.project.type})</div>
      <div><strong>Frameworks:</strong> ${reportData.project.frameworks.join(', ')}</div>
      <div><strong>Generated:</strong> ${new Date(reportData.generated_on).toLocaleString()}</div>
      <div><strong>Report ID:</strong> ${reportData.report_id}</div>
    </div>
  </div>

  <div class="summary">
    <div class="stat-card">
      <div class="stat-value">${reportData.summary.compatibility_score}%</div>
      <div class="stat-label">Compatibility Score</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${reportData.summary.total_features_analyzed}</div>
      <div class="stat-label">Features Analyzed</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${reportData.summary.baseline_compliant}</div>
      <div class="stat-label">Baseline Compliant</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${reportData.summary.requires_migration}</div>
      <div class="stat-label">Requires Migration</div>
    </div>
  </div>

  <div class="section">
    <h2>Detailed Issues</h2>
    ${reportData.detailed_issues.map(issue => `
      <div class="issue severity-${issue.severity}">
        <h3>${issue.feature} <span style="background: #667eea; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px;">${issue.severity.toUpperCase()}</span></h3>
        <p><strong>Issue ID:</strong> ${issue.issue_id}</p>
        <p>${issue.description}</p>
        <p><strong>Location:</strong> <code>${issue.location}</code></p>
        <p><strong>Browsers Affected:</strong> ${issue.browsers_affected.join(', ')}</p>
        <p><strong>Business Impact:</strong> ${issue.business_impact}</p>
        <p><strong>Recommendation:</strong> ${issue.migration_recommendation}</p>
        <p><strong>Estimated Fix Duration:</strong> ${issue.estimated_fix_duration}</p>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h2>Migration Plan</h2>
    ${reportData.migration_plan.phases.map(phase => `
      <div style="margin: 20px 0;">
        <h3>${phase.name}</h3>
        <p><strong>Duration:</strong> ${phase.estimated_duration}</p>
        <ul>
          ${phase.tasks.map(task => `<li>${task}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
    <p><strong>Overall Estimated Duration:</strong> ${reportData.migration_plan.overall_estimated_duration}</p>
  </div>

  <div class="section">
    <h2>Recommendations</h2>
    <ul>
      ${reportData.recommendations.map(rec => `<li>${rec}</li>`).join('')}
    </ul>
  </div>

  <div class="section" style="text-align: center; color: #6b7280;">
    <p>Generated by ${reportData.contact_info.generated_by}</p>
    <p>Support: ${reportData.contact_info.support_email}</p>
  </div>
</body>
</html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `compatguard-report-${reportData.project.name.toLowerCase().replace(/\s+/g, '-')}-${reportData.report_id}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
