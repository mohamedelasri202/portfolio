import React, { useState, useEffect } from 'react';
import type { AppId } from '../types/os';
import { APPS, DEVELOPER_PROFILE } from '../data/portfolioData';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Sliders,
  Wifi,
  Volume2,
  Battery,
  Terminal,
  Monitor,
  RotateCcw,
  Sparkles,
  Info,
  ExternalLink,
} from 'lucide-react';

interface TopBarProps {
  activeAppId: AppId | null;
  currentLang: Language;
  onOpenApp: (id: AppId) => void;
  onResetLayout: () => void;
  onToggleLang: (lang: Language) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeAppId,
  currentLang,
  onOpenApp,
  onResetLayout,
  onToggleLang,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [showOsMenu, setShowOsMenu] = useState(false);
  const [showControlCenter, setShowControlCenter] = useState(false);

  const t = TRANSLATIONS[currentLang].topBar;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeApp = APPS.find((a) => a.id === activeAppId);

  return (
    <div
      style={{
        height: '32px',
        width: '100vw',
        background: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-glass)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontSize: '0.8rem',
        fontWeight: 500,
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowOsMenu(!showOsMenu);
              setShowControlCenter(false);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: showOsMenu ? 'var(--accent-blue)' : 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
            }}
          >
            <Sparkles size={14} color="#38bdf8" />
            <span>WebOS</span>
          </button>

          {showOsMenu && (
            <div
              className="glass-panel animate-fade-in"
              style={{
                position: 'absolute',
                top: '34px',
                left: 0,
                width: '210px',
                borderRadius: 'var(--radius-md)',
                padding: '6px 0',
                boxShadow: 'var(--shadow-window)',
              }}
            >
              <button
                onClick={() => { onOpenApp('about'); setShowOsMenu(false); }}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textAlign: 'left',
                }}
              >
                <Info size={14} /> {t.aboutDev}
              </button>
              <button
                onClick={() => { onOpenApp('settings'); setShowOsMenu(false); }}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textAlign: 'left',
                }}
              >
                <Sliders size={14} /> {t.systemPref}
              </button>
              <button
                onClick={() => { onOpenApp('terminal'); setShowOsMenu(false); }}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textAlign: 'left',
                }}
              >
                <Terminal size={14} /> {t.launchTerminal}
              </button>
              <div style={{ height: '1px', background: 'var(--border-glass)', margin: '6px 0' }} />
              <button
                onClick={() => { onResetLayout(); setShowOsMenu(false); }}
                style={{
                  width: '100%',
                  padding: '8px 14px',
                  background: 'none',
                  border: 'none',
                  color: '#f87171',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textAlign: 'left',
                }}
              >
                <RotateCcw size={14} /> {t.resetLayout}
              </button>
            </div>
          )}
        </div>

        <div style={{ color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{activeApp ? activeApp.shortName : t.desktopWorkspace}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Portfolio Language Toggle Button */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '2px', border: '1px solid var(--border-glass)' }}>
          <button
            onClick={() => onToggleLang('fr')}
            style={{
              padding: '2px 8px',
              background: currentLang === 'fr' ? 'var(--accent-blue)' : 'transparent',
              color: currentLang === 'fr' ? '#000' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.72rem',
              cursor: 'pointer',
            }}
          >
            🇫🇷 FR
          </button>
          <button
            onClick={() => onToggleLang('en')}
            style={{
              padding: '2px 8px',
              background: currentLang === 'en' ? 'var(--accent-blue)' : 'transparent',
              color: currentLang === 'en' ? '#000' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.72rem',
              cursor: 'pointer',
            }}
          >
            🇬🇧 EN
          </button>
        </div>

        <div
          className="topbar-status-icons"
          onClick={() => {
            setShowControlCenter(!showControlCenter);
            setShowOsMenu(false);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <Wifi size={14} color="#38bdf8" />
          <Volume2 size={14} />
          <Battery size={15} color="#4ade80" />
        </div>

        <div className="topbar-date-time" style={{ display: 'flex', gap: '8px', color: 'var(--text-primary)', fontWeight: 500 }}>
          <span>{dateStr}</span>
          <span style={{ color: 'var(--accent-blue)', fontFamily: 'var(--font-mono)' }}>{timeStr}</span>
        </div>
      </div>

      {showControlCenter && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            position: 'absolute',
            top: '36px',
            right: '16px',
            width: '280px',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            boxShadow: 'var(--shadow-window)',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{t.controlCenter}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-blue)', background: 'rgba(56,189,248,0.1)', padding: '2px 8px', borderRadius: '10px' }}>v2.4</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <button
              onClick={() => { onOpenApp('settings'); setShowControlCenter(false); }}
              style={{
                padding: '10px',
                background: 'var(--bg-glass-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
              }}
            >
              <Monitor size={18} color="#38bdf8" />
              <span>{t.wallpapers}</span>
            </button>
            <button
              onClick={() => { onOpenApp('contact'); setShowControlCenter(false); }}
              style={{
                padding: '10px',
                background: 'var(--bg-glass-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
              }}
            >
              <ExternalLink size={18} color="#6366f1" />
              <span>{t.hireDev}</span>
            </button>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            {DEVELOPER_PROFILE.name} • {DEVELOPER_PROFILE.status}
          </div>
        </div>
      )}
    </div>
  );
};
