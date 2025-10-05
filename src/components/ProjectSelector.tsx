import React, { useState } from 'react';
import { ChevronDown, FolderOpen, Plus } from 'lucide-react';
import { useProjects, useCreateProject } from '../hooks/useProjects';
import { useToast } from './Toast';

interface ProjectSelectorProps {
  currentProjectId: string;
  onProjectChange: (projectId: string) => void;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  currentProjectId,
  onProjectChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectPath, setNewProjectPath] = useState('');

  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const { showToast } = useToast();

  const currentProject = projects?.find(p => p.id === currentProjectId);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newProjectPath) return;

    try {
      const newProject = await createProject.mutateAsync({
        name: newProjectName,
        path: newProjectPath
      });
      showToast(`Project "${newProjectName}" created successfully`, 'Success', 'success');
      onProjectChange(newProject.id);
      setShowNewProject(false);
      setNewProjectName('');
      setNewProjectPath('');
      setIsOpen(false);
    } catch (error) {
      showToast('Failed to create project', 'Error', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
        <FolderOpen className="w-5 h-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors w-64"
      >
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-primary" />
          <div className="text-left">
            <div className="text-sm font-semibold text-foreground">
              {currentProject?.name || 'Select Project'}
            </div>
            {currentProject && (
              <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                {currentProject.path}
              </div>
            )}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Project List */}
          <div className="p-2">
            {projects?.map(project => (
              <button
                key={project.id}
                onClick={() => {
                  onProjectChange(project.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                  project.id === currentProjectId
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{project.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{project.path}</div>
                </div>
                {project.id === currentProjectId && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* New Project Button */}
          <div className="border-t border-border p-2">
            <button
              onClick={() => setShowNewProject(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">New Project</span>
            </button>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNewProject(false)}>
          <div className="bg-card rounded-xl p-6 shadow-xl max-w-md w-full m-4" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-foreground mb-4">Create New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="My Awesome Project"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Path
                </label>
                <input
                  type="text"
                  value={newProjectPath}
                  onChange={e => setNewProjectPath(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="/path/to/project"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewProject(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createProject.isPending}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {createProject.isPending ? 'Creating...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
