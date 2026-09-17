import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';

interface ResumeViewerProps {
  currentLang?: Language;
  onSwitchLang?: (lang: Language) => void;
}

export const ResumeViewer: React.FC<ResumeViewerProps> = ({
  currentLang = 'fr',
  onSwitchLang,
}) => {
  const [selectedCvLang, setSelectedCvLang] = useState<'fr' | 'en'>(currentLang);

  const t = TRANSLATIONS[currentLang].resumeApp;

  const pdfPath = selectedCvLang === 'fr' ? '/Mohamed el asri Fr.pdf' : '/Mohamed el asri en.pdf';
  const fileName = selectedCvLang === 'fr' ? 'Mohamed el asri Fr.pdf  ' : 'Mohamed el asri en.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName;
    link.click();
  };

  const handleSelectLang = (lang: 'fr' | 'en') => {
    setSelectedCvLang(lang);
    if (onSwitchLang) onSwitchLang(lang);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#090d16', color: 'var(--text-primary)', height: '100%' }}>
      {/* Top Document Header Bar */}
      <div
        className="resume-header-bar"
        style={{
          height: '46px',
          background: 'rgba(15, 23, 42, 0.9)',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          fontSize: '0.82rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <FileText size={18} color="#f472b6" />
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            {fileName}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#4ade80', background: 'rgba(74, 222, 128, 0.12)', padding: '2px 8px', borderRadius: '10px' }}>
            {selectedCvLang === 'fr' ? 'PDF Original (FR)' : 'Official PDF (EN)'}
          </span>
        </div>

        {/* Language Selection Toggle Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-md)', padding: '3px', border: '1px solid var(--border-glass)' }}>
            <button
              onClick={() => handleSelectLang('fr')}
              style={{
                padding: '4px 12px',
                background: selectedCvLang === 'fr' ? 'var(--accent-blue)' : 'transparent',
                color: selectedCvLang === 'fr' ? '#000' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              <span>🇫🇷 Français (Original)</span>
            </button>
            <button
              onClick={() => handleSelectLang('en')}
              style={{
                padding: '4px 12px',
                background: selectedCvLang === 'en' ? 'var(--accent-blue)' : 'transparent',
                color: selectedCvLang === 'en' ? '#000' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              <span>🇬🇧 English</span>
            </button>
          </div>

          <button
            onClick={handleDownload}
            style={{
              padding: '6px 14px',
              background: 'var(--accent-blue)',
              color: '#090d16',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Download size={14} /> {t.downloadPdf}
          </button>
        </div>
      </div>

      {/* Main Document Display Area: Render exact uploaded PDF iframe */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#05070d' }}>
        <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative' }}>
          <iframe
            key={selectedCvLang}
            src={`${pdfPath}#toolbar=1`}
            title={`Mohamed El Asri CV ${selectedCvLang.toUpperCase()}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#0e1726',
            }}
          />
        </div>
      </div>
    </div>
  );
};
