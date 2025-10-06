import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, XCircle } from 'lucide-react';
import { BaselineStatus } from '@/services/baselineAnalyzer';

interface BaselineStatusBadgeProps {
  status: BaselineStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function BaselineStatusBadge({ status, size = 'md' }: BaselineStatusBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2'
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'widely':
        return {
          label: 'Widely Available',
          icon: CheckCircle2,
          className: 'bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20'
        };
      case 'newly':
        return {
          label: 'Newly Available',
          icon: AlertTriangle,
          className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20'
        };
      case 'limited':
        return {
          label: 'Limited',
          icon: AlertCircle,
          className: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border border-orange-500/20'
        };
      case false:
        return {
          label: 'Not Baseline',
          icon: XCircle,
          className: 'bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20'
        };
      default:
        return {
          label: 'Unknown',
          icon: AlertCircle,
          className: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border border-gray-500/20'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} ${config.className}`}>
      <Icon size={iconSizes[size]} />
      {config.label}
    </span>
  );
}
