import React, { useState } from 'react';
import type { AppId, WindowState, Wallpaper } from '../types/os';
import { APPS } from '../data/portfolioData';
import { WindowFrame } from './WindowFrame';
import { FileExplorer } from '../apps/FileExplorer';
import { AboutMe } from '../apps/AboutMe';
import { TerminalConsole } from '../apps/TerminalConsole';
import { ResumeViewer } from '../apps/ResumeViewer';
import { SettingsApp } from '../apps/SettingsApp';
import { ContactApp } from '../apps/ContactApp';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Folder,
  User,
  Terminal,
  FileText,
  Settings,
  Mail,
  HelpCircle,
  Monitor,
  RotateCcw,
} from 'lucide-react';

interface DesktopProps {
  windows: Record<AppId, WindowState>;
  wallpaper: Wallpaper;
  activeAppId: AppId | null;
  currentLang: Language;
  onOpenApp: (id: AppId) => void;
  onCloseApp: (id: AppId) => void;
  onMinimizeApp: (id: AppId) => void;
  onMaximizeApp: (id: AppId) => void;
  onFocusApp: (id: AppId) => void;
  onSelectWallpaper: (wp: Wallpaper) => void;
  onResetLayout: () => void;
  onToggleLang: (lang: Language) => void;
}

const getDesktopIcon = (iconName: string) => {
  switch (iconName) {
    case 'Folder': return <Folder size={34} color="#38bdf8" />;
    case 'User': return <User size={34} color="#818cf8" />;
    case 'Terminal': return <Terminal size={34} color="#4ade80" />;
    case 'FileText': return <FileText size={34} color="#f472b6" />;
    case 'Settings': return <Settings size={34} color="#fbbf24" />;
    case 'Mail': return <Mail size={34} color="#34d399" />;
    default: return <HelpCircle size={34} color="#94a3b8" />;
  }
};

export const Desktop: React.FC<DesktopProps> = ({
  windows,
  wallpaper,
  currentLang,
  onOpenApp,
  onCloseApp,
  onMinimizeApp,
  onMaximizeApp,
  onFocusApp,
  onSelectWallpaper,
  onResetLayout,
  onToggleLang,
}) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const tDesktop = TRANSLATIONS[currentLang].desktop;
  const tApps = TRANSLATIONS[currentLang].apps;

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDesktopClick = () => {
    if (contextMenu) setContextMenu(null);
  };

  const renderAppContent = (appId: AppId) => {
    switch (appId) {
      case 'projects':
        return <FileExplorer currentLang={currentLang} />;
      case 'about':
        return <AboutMe currentLang={currentLang} onOpenApp={onOpenApp} />;
      case 'terminal':
        return <TerminalConsole onOpenApp={onOpenApp} />;
      case 'resume':
        return <ResumeViewer currentLang={currentLang} onSwitchLang={onToggleLang} />;
      case 'settings':
        return (
          <SettingsApp
            currentWallpaperId={wallpaper.id}
            currentLang={currentLang}
            onSelectWallpaper={onSelectWallpaper}
            onResetLayout={onResetLayout}
          />
        );
      case 'contact':
        return <ContactApp currentLang={currentLang} />;
      default:
        return null;
    }
  };

  return (
    <div
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      style={{
        width: '100vw',
        height: '100vh',
        paddingTop: '32px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
        ...wallpaper.style,
        transition: 'background 0.4s ease-in-out',
      }}
    >
      <div
        className="desktop-icons-container"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateRows: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '16px',
          padding: '24px',
          width: 'fit-content',
        }}
      >
        {APPS.filter((a) => a.showOnDesktop).map((app) => {
          const locApp = tApps[app.id as keyof typeof tApps];
          return (
            <div
              key={app.id}
              onClick={(e) => {
                e.stopPropagation();
                onOpenApp(app.id);
              }}
              style={{
                width: '90px',
                height: '96px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                cursor: 'pointer',
                padding: '6px',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div
                style={{
                  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
                  transition: 'transform 0.15s ease',
                }}
              >
                {getDesktopIcon(app.iconName)}
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: '#ffffff',
                  fontWeight: 500,
                  textAlign: 'center',
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.9)',
                  lineClamp: 1,
                  overflow: 'hidden',
                }}
              >
                {locApp?.shortName || app.shortName}
              </span>
            </div>
          );
        })}
      </div>

      {APPS.map((app) => {
        const win = windows[app.id];
        if (!win) return null;

        const locApp = tApps[app.id as keyof typeof tApps];
        const localizedWinState = {
          ...win,
          title: locApp?.title || win.title,
        };

        return (
          <WindowFrame
            key={app.id}
            windowState={localizedWinState}
            onClose={() => onCloseApp(app.id)}
            onMinimize={() => onMinimizeApp(app.id)}
            onMaximize={() => onMaximizeApp(app.id)}
            onFocus={() => onFocusApp(app.id)}
          >
            {renderAppContent(app.id)}
          </WindowFrame>
        );
      })}

      {contextMenu && (
        <div
          className="glass-panel animate-fade-in"
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            width: '210px',
            borderRadius: 'var(--radius-md)',
            padding: '6px 0',
            zIndex: 99999,
            boxShadow: 'var(--shadow-window)',
          }}
        >
          <button
            onClick={() => { onOpenApp('settings'); setContextMenu(null); }}
            style={{ width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left' }}
          >
            <Monitor size={14} /> {tDesktop.changeWallpaper}
          </button>
          <button
            onClick={() => { onOpenApp('terminal'); setContextMenu(null); }}
            style={{ width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left' }}
          >
            <Terminal size={14} /> {tDesktop.openTerminal}
          </button>
          <button
            onClick={() => { onOpenApp('projects'); setContextMenu(null); }}
            style={{ width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left' }}
          >
            <Folder size={14} /> {tDesktop.viewProjects}
          </button>
          <div style={{ height: '1px', background: 'var(--border-glass)', margin: '6px 0' }} />
          <button
            onClick={() => { onResetLayout(); setContextMenu(null); }}
            style={{ width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left' }}
          >
            <RotateCcw size={14} /> {tDesktop.resetLayout}
          </button>
        </div>
      )}
    </div>
  );
};
