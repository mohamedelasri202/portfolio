import React from 'react';
import { WALLPAPERS } from '../data/portfolioData';
import type { Wallpaper } from '../types/os';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { Monitor, Palette, RotateCcw, Check, Sparkles } from 'lucide-react';

interface SettingsAppProps {
  currentWallpaperId: string;
  currentLang?: Language;
  onSelectWallpaper: (wp: Wallpaper) => void;
  onResetLayout: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  currentWallpaperId,
  currentLang = 'fr',
  onSelectWallpaper,
  onResetLayout,
}) => {
  const t = TRANSLATIONS[currentLang].settingsApp;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0b0f19', color: 'var(--text-primary)', height: '100%', padding: '24px', overflowY: 'auto' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Monitor size={20} color="#38bdf8" /> {t.title}
      </h2>

      <div className="glass-card" style={{ padding: '20px', marginBottom: '20px', border: '1px solid var(--border-glass)' }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Palette size={16} color="#6366f1" /> {t.wallpaperSection}
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          {t.wallpaperSub}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
          {WALLPAPERS.map((wp) => {
            const isSelected = currentWallpaperId === wp.id;
            return (
              <div
                key={wp.id}
                onClick={() => onSelectWallpaper(wp)}
                style={{
                  height: '110px',
                  borderRadius: 'var(--radius-md)',
                  background: wp.previewUrl,
                  border: isSelected ? '2px solid var(--accent-blue)' : '1px solid var(--border-glass)',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 15px var(--accent-blue-glow)' : 'none',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                    {wp.name}
                  </span>
                  {isSelected && (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} color="#000" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card" style={{ padding: '20px', border: '1px solid var(--border-glass)' }}>
        <h3 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} color="#4ade80" /> {t.windowSection}
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          {t.windowSub}
        </p>

        <button
          onClick={onResetLayout}
          style={{
            padding: '10px 18px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#f87171',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RotateCcw size={14} /> {t.resetBtn}
        </button>
      </div>
    </div>
  );
};
