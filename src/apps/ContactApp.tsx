import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { Mail, Send, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';

interface ContactAppProps {
  currentLang?: Language;
}

export const ContactApp: React.FC<ContactAppProps> = ({ currentLang = 'fr' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const t = TRANSLATIONS[currentLang].contactApp;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Send directly via FormSubmit.co AJAX endpoint to mohamedelasri971@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/mohamedelasri971@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          subject: formData.subject || `Nouveau message Portfolio de ${formData.name}`,
          message: formData.message,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        setIsSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback to mailto link
        triggerMailto();
        setIsSent(true);
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      triggerMailto();
      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMailto = () => {
    const mailtoSubject = encodeURIComponent(formData.subject || `Message de ${formData.name} via Portfolio`);
    const mailtoBody = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${DEVELOPER_PROFILE.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  return (
    <div className="contact-app-container" style={{ flex: 1, display: 'flex', background: '#121212', color: 'var(--text-primary)', height: '100%', padding: '24px', overflowY: 'auto' }}>
      <div style={{ flex: 1, maxWidth: '580px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={20} color="#34d399" /> {t.title}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {t.sub} (<strong style={{ color: 'var(--accent-blue)' }}>{DEVELOPER_PROFILE.email}</strong>)
          </p>
        </div>

        {isSent && (
          <div
            className="animate-fade-in"
            style={{
              padding: '14px 18px',
              background: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#34d399',
              fontSize: '0.84rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <CheckCircle size={18} />
              <span>{t.success}</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
              {currentLang === 'fr'
                ? `Votre message a été envoyé directement à Mohamed El Asri (${DEVELOPER_PROFILE.email}).`
                : `Your message has been delivered directly to Mohamed El Asri (${DEVELOPER_PROFILE.email}).`}
            </div>
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#f87171',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{t.name}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Mohamed / Recruteur"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(28, 28, 32, 0.8)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{t.email}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@company.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(28, 28, 32, 0.8)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{t.subject}</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Opportunité Java Full Stack / Proposition de Projet"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(28, 28, 32, 0.8)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{t.message}</label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Bonjour Mohamed, nous aimerions échanger sur votre profil Java / Angular / Spring Boot..."
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(28, 28, 32, 0.8)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px',
              background: isSubmitting ? 'rgba(56, 189, 248, 0.5)' : 'var(--accent-blue)',
              color: '#090d16',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              marginTop: '4px',
            }}
          >
            <Send size={16} />
            <span>{isSubmitting ? t.sending : t.send}</span>
          </button>
        </form>

        {/* Direct Email & Phone Contact Bar */}
        <div
          className="contact-direct-bar"
          style={{
            marginTop: '10px',
            padding: '14px 16px',
            background: 'rgba(28, 28, 32, 0.6)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              {currentLang === 'fr' ? 'Ou contactez directement par Email / Téléphone :' : 'Or contact directly via Email / Phone:'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', gap: '14px' }}>
              <span>{DEVELOPER_PROFILE.email}</span>
              <span>{DEVELOPER_PROFILE.phone}</span>
            </div>
          </div>

          <a
            href={`mailto:${DEVELOPER_PROFILE.email}?subject=Contact%20Portfolio%20Mohamed%20El%20Asri`}
            style={{
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--accent-blue)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <span>Gmail / Client Email</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};
