import React, { useState } from 'react';
import { DEVELOPER_PROFILE, SKILL_CATEGORIES } from '../data/portfolioData';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import {
  User,
  Briefcase,
  Code,
  Award,
  Download,
  Mail,
  MapPin,
  Sparkles,
  Calendar,
  Globe,
  GitBranch,
  Phone,
} from 'lucide-react';

interface AboutMeProps {
  currentLang?: Language;
  onOpenApp: (id: any) => void;
}

export const AboutMe: React.FC<AboutMeProps> = ({ currentLang = 'fr', onOpenApp }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'experience'>('profile');

  const t = TRANSLATIONS[currentLang].aboutMe;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0b0f19', color: 'var(--text-primary)', height: '100%', overflowY: 'auto' }}>
      {/* Header Banner */}
      <div
        className="about-header-banner"
        style={{
          padding: '24px 28px',
          background: '#0f172a',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Profile Photo */}
        <img
          src={DEVELOPER_PROFILE.avatarUrl}
          alt={DEVELOPER_PROFILE.name}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            objectFit: 'cover',
            border: '2px solid var(--accent-blue)',
            boxShadow: '0 4px 20px rgba(56, 189, 248, 0.3)',
            flexShrink: 0,
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff' }}>{DEVELOPER_PROFILE.name}</h2>
            <span style={{ fontSize: '0.72rem', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '2px 10px', borderRadius: '12px', border: '1px solid rgba(52, 211, 153, 0.3)', fontWeight: 600 }}>
              {t.status}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--accent-blue)', fontWeight: 500, marginBottom: '6px' }}>
            {t.role}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} /> {DEVELOPER_PROFILE.location}
            </span>
            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              <Mail size={13} /> {DEVELOPER_PROFILE.email}
            </a>
            <a
              href={`tel:${DEVELOPER_PROFILE.phone.replace(/\s+/g, '')}`}
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              <Phone size={13} /> {DEVELOPER_PROFILE.phone}
            </a>
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-blue)', textDecoration: 'none' }}
            >
              <GitBranch size={13} /> GitHub
            </a>
            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-blue)', textDecoration: 'none' }}
            >
              <Globe size={13} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="about-header-actions" style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onOpenApp('contact')}
            style={{
              padding: '8px 14px',
              background: 'var(--accent-blue)',
              color: '#090d16',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Mail size={14} /> {t.hireMe}
          </button>
          <button
            onClick={() => onOpenApp('resume')}
            style={{
              padding: '8px 14px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 500,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Download size={14} /> {t.viewCv}
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="about-tabs-bar" style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', background: 'rgba(15, 23, 42, 0.4)', padding: '0 24px' }}>
        {[
          { id: 'profile', label: t.bioTab, icon: User },
          { id: 'skills', label: t.skillsTab, icon: Code },
          { id: 'experience', label: t.expTab, icon: Briefcase },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '12px 18px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--accent-blue)' : '2px solid transparent',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.84rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div style={{ padding: '24px', flex: 1 }}>
        {activeTab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="about-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {t.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    textAlign: 'center',
                    border: '1px solid var(--border-glass)',
                  }}
                >
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-blue)', marginBottom: '2px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ padding: '20px', border: '1px solid var(--border-glass)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#38bdf8" /> {t.philosophyTitle}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                {t.philosophyText}
              </p>
            </div>

            <div className="glass-card" style={{ padding: '20px', border: '1px solid var(--border-glass)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={16} color="#34d399" /> {t.languagesTitle}
              </h3>
              <div style={{ display: 'flex', gap: '20px', fontSize: '0.84rem' }}>
                {t.languages.map((l) => (
                  <div key={l.name} style={{ display: 'flex', gap: '6px' }}>
                    <strong style={{ color: 'var(--accent-blue)' }}>{l.name}:</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '20px', border: '1px solid var(--border-glass)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={16} color="#0284c7" /> {cat.category}
                </h3>
                <div className="about-skills-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {cat.items.map((skill) => (
                    <div key={skill.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{skill.name}</span>
                        <span style={{ color: 'var(--text-muted)' }}>{skill.experience} • {skill.level}%</span>
                      </div>
                      <div style={{ height: '6px', width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${skill.level}%`,
                            background: '#0284c7',
                            borderRadius: '4px',
                            transition: 'width 0.8s ease-in-out',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'experience' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {t.experiences.map((exp, idx) => (
              <div key={idx} className="glass-card about-exp-card" style={{ padding: '20px', border: '1px solid var(--border-glass)', display: 'flex', gap: '16px' }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ padding: '6px 12px', borderRadius: '20px', background: 'rgba(56, 189, 248, 0.12)', color: 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={13} /> {exp.period}
                  </div>
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '2px' }}>{exp.role}</h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-blue)', marginBottom: '8px' }}>
                    {exp.company} • <span style={{ color: 'var(--text-muted)' }}>{exp.location}</span>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                    {exp.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {exp.technologies.map((tech) => (
                      <span key={tech} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', border: '1px solid var(--border-glass)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
