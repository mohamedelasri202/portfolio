import React, { useState } from 'react';
import { PROJECTS, DEVELOPER_PROFILE } from '../data/portfolioData';
import type { ProjectItem } from '../types/os';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Folder,
  Search,
  ExternalLink,
  GitBranch,
  CheckCircle,
  Layers,
  Sparkles,
  Filter,
} from 'lucide-react';

interface FileExplorerProps {
  currentLang?: Language;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ currentLang = 'fr' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const t = TRANSLATIONS[currentLang].explorer;
  const projectsDict = TRANSLATIONS[currentLang].projectsData || {};

  const getCategoryLabel = (catId: string) => {
    switch (catId) {
      case 'All': return t.all;
      case 'Full Stack': return t.fullstack;
      case 'React & TS': return t.reactTs;
      case 'AI & Tools': return t.aiTools;
      case 'Web Apps': return t.webApps;
      default: return catId;
    }
  };

  const categories = [
    { id: 'All', label: t.all },
    { id: 'Full Stack', label: t.fullstack },
    { id: 'React & TS', label: t.reactTs },
    { id: 'AI & Tools', label: t.aiTools },
    { id: 'Web Apps', label: t.webApps },
  ];

  const filteredProjects = PROJECTS.filter((proj) => {
    const locProj = projectsDict[proj.id as keyof typeof projectsDict] || proj;
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Full Stack' && (proj.category === 'Full Stack' || proj.id === 'ecosim-2' || proj.id === 'smart-management')) ||
      (selectedCategory === 'AI & Tools' && (proj.id === 'ecosim-2' || proj.id === 'smart-management' || proj.techStack.includes('Spring AI') || proj.category === 'AI & Tools')) ||
      proj.category === selectedCategory;

    const matchesSearch =
      (locProj.title || proj.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (locProj.shortDescription || proj.shortDescription).toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getLocalizedProject = (proj: ProjectItem) => {
    const loc = projectsDict[proj.id as keyof typeof projectsDict];
    if (!loc) return proj;
    return {
      ...proj,
      title: loc.title || proj.title,
      shortDescription: loc.shortDescription || proj.shortDescription,
      fullDescription: loc.fullDescription || proj.fullDescription,
      highlights: loc.highlights || proj.highlights,
    };
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#121212', color: 'var(--text-primary)', height: '100%', overflow: 'hidden' }}>
      {/* Top Carousel Category Filter Bar */}
      <div
        className="category-carousel-bar"
        style={{
          background: 'rgba(24, 24, 27, 0.95)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', flex: 1, paddingBottom: '2px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginRight: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Layers size={13} color="#38bdf8" />
            <span>{t.directories}</span>
          </div>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1px solid var(--accent-blue)' : '1px solid var(--border-glass)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 600 : 400,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 0 12px rgba(56, 189, 248, 0.25)' : 'none',
                }}
              >
                <Folder size={14} color={isSelected ? '#38bdf8' : '#71717a'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px', overflowY: 'auto', position: 'relative' }}>
        {/* TOP PROMINENT BANNER: 53+ Public GitHub Repositories */}
        <div
          className="glass-card github-banner-card"
          style={{
            marginBottom: '16px',
            padding: '14px 18px',
            border: '1px solid var(--border-glass-bright)',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(28, 28, 32, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          }}
        >
          <div className="github-banner-info" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <GitBranch size={20} color="#38bdf8" />
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>
                {currentLang === 'fr' ? 'Plus de 53 Projets & Dépôts Publics sur GitHub' : 'Over 53 Public Repositories Available on GitHub'}
              </h4>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {currentLang === 'fr'
                  ? 'Explorez l\'intégralité du code source : microservices Java Spring Boot, applications PHP / Laravel, tests TDD (JUnit, Mockito) et pipelines DevOps CI/CD.'
                  : 'Explore full open-source repositories: Java Spring Boot microservices, PHP / Laravel applications, TDD testing (JUnit, Mockito), and DevOps CI/CD pipelines.'}
              </p>
            </div>
          </div>

          <a
            href={DEVELOPER_PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="github-banner-btn"
            style={{
              padding: '8px 16px',
              background: 'var(--accent-blue)',
              color: '#090d16',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 10px rgba(56, 189, 248, 0.3)',
            }}
          >
            <span>{currentLang === 'fr' ? 'Voir tout sur GitHub' : 'View All on GitHub'}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Search & Filter Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                background: 'rgba(28, 28, 32, 0.8)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={13} />
            <span>{t.category}: <strong style={{ color: 'var(--text-primary)' }}>{getCategoryLabel(selectedCategory)}</strong></span>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', paddingBottom: '16px' }}>
          {filteredProjects.map((rawProj) => {
            const project = getLocalizedProject(rawProj);
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="glass-card"
                style={{
                  padding: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div
                  style={{
                    height: '140px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid var(--border-glass)',
                  }}
                >
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: 'rgba(18, 18, 18, 0.88)', backdropFilter: 'blur(8px)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 600, color: 'var(--accent-blue)' }}>
                    {getCategoryLabel(project.category)}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {project.title}
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {project.shortDescription}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'auto' }}>
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '0.65rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-glass)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal Popup */}
        {selectedProject && (() => {
          const activeProj = getLocalizedProject(selectedProject);
          return (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(18, 18, 18, 0.95)',
                backdropFilter: 'blur(16px)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 100,
                overflowY: 'auto',
              }}
              className="animate-fade-in"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {getCategoryLabel(activeProj.category)}
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>{activeProj.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-primary)',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                  }}
                >
                  {t.back}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1 }}>
                <div>
                  <div
                    style={{
                      height: '240px',
                      borderRadius: 'var(--radius-md)',
                      backgroundImage: `url(${activeProj.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      marginBottom: '16px',
                      border: '1px solid var(--border-glass-bright)',
                    }}
                  />
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '8px' }}>{t.overview}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {activeProj.fullDescription}
                  </p>

                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '8px' }}>{t.highlights}</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeProj.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle size={14} color="#34d399" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: 'var(--bg-glass-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
                    <h4 style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Layers size={15} color="#38bdf8" /> {t.techUsed}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {activeProj.techStack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: 'rgba(56, 189, 248, 0.12)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            fontWeight: 500,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href={activeProj.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '12px',
                        background: 'var(--accent-blue)',
                        color: '#090d16',
                        borderRadius: 'var(--radius-md)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '0.85rem',
                      }}
                    >
                      <span>{t.launchDemo}</span>
                      <ExternalLink size={15} />
                    </a>

                    <a
                      href={activeProj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '12px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-primary)',
                        borderRadius: 'var(--radius-md)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '0.85rem',
                        border: '1px solid var(--border-glass)',
                      }}
                    >
                      <GitBranch size={15} />
                      <span>{t.viewGithub}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
