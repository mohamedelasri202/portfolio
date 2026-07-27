import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import type { Language } from '../i18n/translations';
import { TRANSLATIONS } from '../i18n/translations';
import { Mail, Send, CheckCircle, GitBranch, Globe, ExternalLink } from 'lucide-react';

interface ContactAppProps {
  currentLang?: Language;
}

export const ContactApp: React.FC<ContactAppProps> = ({ currentLang = 'fr' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const t = TRANSLATIONS[currentLang].contactApp;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      // 1. Send via Formspree API directly to mohamedelasri971@gmail.com
      await fetch(`https://formspree.io/f/mohamedelasri971@gmail.com`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Nouveau message portfolio',
          message: formData.message,
          _replyto: formData.email,
        }),
      });
    } catch (err) {
      console.log('Formspree submission error fallback to mailto', err);
    } finally {
      // 2. Trigger mailto client backup link
      const mailtoSubject = encodeURIComponent(formData.subject || `Message de ${formData.name} via Portfolio`);
      const mailtoBody = encodeURIComponent(
        `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:${DEVELOPER_PROFILE.email}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');

      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <div style={{ flex: 1, display: 'flex', background: '#0b0f19', color: 'var(--text-primary)', height: '100%', padding: '24px', overflowY: 'auto' }}>
      <div style={{ flex: 1, maxWidth: '580px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={20} color="#34d399" /> {t.title}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {t.sub} (Destination: <strong style={{ color: 'var(--accent-blue)' }}>{DEVELOPER_PROFILE.email}</strong>)
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
              Un e-mail de confirmation a été transmis à <strong style={{ color: '#fff' }}>{DEVELOPER_PROFILE.email}</strong>.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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
                  background: 'rgba(30, 41, 59, 0.6)',
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
                  background: 'rgba(30, 41, 59, 0.6)',
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
                background: 'rgba(30, 41, 59, 0.6)',
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
              placeholder="Bonjour Mohamed, je vous contacte concernant une opportunité de développement Java Spring Boot / Full Stack..."
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '12px',
              background: 'var(--accent-blue)',
              color: '#090d16',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '4px',
            }}
          >
            <Send size={15} />
            <span>{isSubmitting ? t.sending : t.send}</span>
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-glass)' }}>
          <a
            href={`mailto:${DEVELOPER_PROFILE.email}`}
            style={{ color: 'var(--accent-blue)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600 }}
          >
            <Mail size={14} /> Envoyer via Email Client Direct <ExternalLink size={12} />
          </a>

          <div style={{ display: 'flex', gap: '14px' }}>
            <a href={DEVELOPER_PROFILE.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
              <GitBranch size={14} /> GitHub
            </a>
            <a href={DEVELOPER_PROFILE.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
              <Globe size={14} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
