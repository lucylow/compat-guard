import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, Project, ScanResult, AnalyticsData, Issue } from '../services/api';

// Projects
export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => apiService.getProjects()
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => apiService.getProject(id),
    enabled: !!id
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, path }: { name: string; path: string }) =>
      apiService.createProject(name, path),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    }
  });
};

// Scanning
export const useScanProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => apiService.scanProject(projectId),
    onSuccess: (data, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
      queryClient.invalidateQueries({ queryKey: ['scans', projectId] });
      queryClient.invalidateQueries({ queryKey: ['analytics', projectId] });
      queryClient.invalidateQueries({ queryKey: ['issues', projectId] });
    }
  });
};

export const useLatestScan = (projectId: string) => {
  return useQuery({
    queryKey: ['scans', projectId],
    queryFn: () => apiService.getLatestScan(projectId),
    enabled: !!projectId,
    refetchInterval: 30000 // Refetch every 30 seconds
  });
};

// Analytics
export const useAnalytics = (projectId: string) => {
  return useQuery({
    queryKey: ['analytics', projectId],
    queryFn: () => apiService.getAnalytics(projectId),
    enabled: !!projectId
  });
};

// Issues
export const useIssues = (projectId: string, filters?: { severity?: string; category?: string }) => {
  return useQuery({
    queryKey: ['issues', projectId, filters],
    queryFn: () => apiService.getIssues(projectId, filters),
    enabled: !!projectId
  });
};

// Export
export const useExportReport = () => {
  return useMutation({
    mutationFn: ({ projectId, format }: { projectId: string; format: 'json' | 'csv' | 'pdf' }) =>
      apiService.exportReport(projectId, format)
  });
};
