import { useState } from 'react';
import type { AppId, WindowState, Wallpaper } from './types/os';
import { APPS, WALLPAPERS } from './data/portfolioData';
import { TopBar } from './components/TopBar';
import { Desktop } from './components/Desktop';
import { Dock } from './components/Dock';
import type { Language } from './i18n/translations';

const createDefaultWindows = (): Record<AppId, WindowState> => {
  const initialWindows: Partial<Record<AppId, WindowState>> = {};
  let currentZ = 10;

  APPS.forEach((app, index) => {
    const isOpenByDefault = app.id === 'projects' || app.id === 'about';
    const isMinimizedByDefault = app.id === 'about';

    const offsetX = 100 + index * 40;
    const offsetY = 60 + index * 30;

    initialWindows[app.id] = {
      id: app.id,
      title: app.title,
      isOpen: isOpenByDefault,
      isMinimized: isMinimizedByDefault,
      isMaximized: false,
      zIndex: isOpenByDefault ? ++currentZ : 1,
      position: { x: Math.min(offsetX, window.innerWidth - 600), y: Math.min(offsetY, window.innerHeight - 500) },
      size: { width: app.defaultWidth, height: app.defaultHeight },
    };
  });

  return initialWindows as Record<AppId, WindowState>;
};

export function App() {
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(createDefaultWindows);
  const [activeAppId, setActiveAppId] = useState<AppId | null>('projects');
  const [wallpaper, setWallpaper] = useState<Wallpaper>(WALLPAPERS[0]);
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [maxZIndex, setMaxZIndex] = useState<number>(20);

  const handleOpenApp = (id: AppId) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setActiveAppId(id);

    setWindows((prev) => {
      const currentWin = prev[id];
      return {
        ...prev,
        [id]: {
          ...currentWin,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      };
    });
  };

  const handleCloseApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
      },
    }));
    if (activeAppId === id) {
      setActiveAppId(null);
    }
  };

  const handleMinimizeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true,
      },
    }));
    if (activeAppId === id) {
      setActiveAppId(null);
    }
  };

  const handleMaximizeApp = (id: AppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  };

  const handleFocusApp = (id: AppId) => {
    if (windows[id]?.zIndex === maxZIndex && activeAppId === id) return;
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setActiveAppId(id);

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: nextZ,
      },
    }));
  };

  const handleResetLayout = () => {
    setWindows(createDefaultWindows());
    setActiveAppId('projects');
  };

  const handleDockAppClick = (id: AppId) => {
    const win = windows[id];
    if (!win.isOpen) {
      handleOpenApp(id);
    } else if (win.isMinimized) {
      handleOpenApp(id);
    } else if (activeAppId === id) {
      handleMinimizeApp(id);
    } else {
      handleFocusApp(id);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <TopBar
        activeAppId={activeAppId}
        currentLang={currentLang}
        onOpenApp={handleOpenApp}
        onResetLayout={handleResetLayout}
        onToggleLang={setCurrentLang}
      />

      <Desktop
        windows={windows}
        wallpaper={wallpaper}
        activeAppId={activeAppId}
        currentLang={currentLang}
        onOpenApp={handleOpenApp}
        onCloseApp={handleCloseApp}
        onMinimizeApp={handleMinimizeApp}
        onMaximizeApp={handleMaximizeApp}
        onFocusApp={handleFocusApp}
        onSelectWallpaper={setWallpaper}
        onResetLayout={handleResetLayout}
        onToggleLang={setCurrentLang}
      />

      <Dock
        windows={windows}
        activeAppId={activeAppId}
        onAppClick={handleDockAppClick}
      />
    </div>
  );
}

export default App;
