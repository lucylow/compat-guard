import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, Shield, AlertTriangle, Info } from 'lucide-react';
import { baselineAnalyzer, BaselineFeature } from '@/services/baselineAnalyzer';
import { BaselineStatusBadge } from '@/components/BaselineStatusBadge';
import { Sidebar } from '@/components/Sidebar';

export default function BaselineExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const stats = useMemo(() => baselineAnalyzer.getStatistics(), []);

  const features = useMemo(() => {
    let results: BaselineFeature[] = [];

    // Get features by category
    if (categoryFilter === 'css') {
      results = baselineAnalyzer.getCSSFeatures();
    } else if (categoryFilter === 'javascript') {
      results = baselineAnalyzer.getJSFeatures();
    } else if (categoryFilter === 'html') {
      results = baselineAnalyzer.getHTMLFeatures();
    } else if (categoryFilter === 'webapi') {
      results = baselineAnalyzer.getWebAPIFeatures();
    } else {
      results = baselineAnalyzer.getAllFeatures();
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        f => f.name.toLowerCase().includes(query) || f.id.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      if (statusFilter === 'notBaseline') {
        results = results.filter(f => f.status === false);
      } else {
        results = results.filter(f => f.status === statusFilter);
      }
    }

    return results.slice(0, 100); // Limit to 100 for performance
  }, [searchQuery, statusFilter, categoryFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="min-h-screen pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Baseline Explorer</h1>
            <p className="text-muted-foreground">
              Explore {stats.total} web features and their Baseline status using real web-features data
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="text-green-500" size={24} />
                <h3 className="font-semibold">Widely Available</h3>
              </div>
              <p className="text-3xl font-bold">{stats.widely}</p>
              <p className="text-sm text-muted-foreground">Safe to use</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="text-yellow-500" size={24} />
                <h3 className="font-semibold">Newly Available</h3>
              </div>
              <p className="text-3xl font-bold">{stats.newly}</p>
              <p className="text-sm text-muted-foreground">Recently baseline</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="text-orange-500" size={24} />
                <h3 className="font-semibold">Limited</h3>
              </div>
              <p className="text-3xl font-bold">{stats.limited}</p>
              <p className="text-sm text-muted-foreground">Use with caution</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Info className="text-red-500" size={24} />
                <h3 className="font-semibold">Not Baseline</h3>
              </div>
              <p className="text-3xl font-bold">{stats.notBaseline}</p>
              <p className="text-sm text-muted-foreground">Avoid or polyfill</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="html">HTML</option>
                <option value="webapi">Web APIs</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Status</option>
                <option value="widely">Widely Available</option>
                <option value="newly">Newly Available</option>
                <option value="limited">Limited</option>
                <option value="notBaseline">Not Baseline</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">
                {features.length} Feature{features.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Feature</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Since</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Feature ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {features.map((feature) => (
                    <tr key={feature.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium">{feature.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <BaselineStatusBadge status={feature.status} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {feature.since || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                        {feature.id}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {features.length === 0 && (
              <div className="px-6 py-12 text-center text-muted-foreground">
                <p>No features found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
