import React, { createContext, useContext, useState } from 'react';
import { projects as initialProjects } from '../data/projects.js';
import type { Project } from '../components/ProjectsPage';

interface ProjectsContextValue {
  projects: Project[];
  addProject: (p: Project) => void;
  addNote: (projectId: string, note: { id: string; author: string; date: string; text: string }) => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects as Project[]);

  function addProject(p: Project) {
    setProjects((prev) => [...prev, p]);
  }

  function addNote(projectId: string, note: { id: string; author: string; date: string; text: string }) {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, notes: [...p.notes, note] } : p))
    );
  }

  return (
    <ProjectsContext.Provider value={{ projects, addProject, addNote }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects must be used inside ProjectsProvider');
  return ctx;
}
