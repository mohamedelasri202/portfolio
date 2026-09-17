import React, { useState, useRef, useEffect } from 'react';
import { DEVELOPER_PROFILE, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData';
import type { AppId } from '../types/os';

interface TerminalConsoleProps {
  onOpenApp?: (id: AppId) => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ onOpenApp }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div style={{ color: 'var(--text-secondary)' }}>
          <div style={{ color: '#38bdf8', fontWeight: 600 }}>WebOS Developer Terminal v2.4</div>
          <div>Type <span style={{ color: '#4ade80' }}>'help'</span> to view available system commands.</div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        output = (
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '6px', fontSize: '0.8rem' }}>
            <span style={{ color: '#4ade80' }}>help</span><span>Display available commands</span>
            <span style={{ color: '#4ade80' }}>about</span><span>Print developer bio & overview</span>
            <span style={{ color: '#4ade80' }}>projects</span><span>List all engineering projects</span>
            <span style={{ color: '#4ade80' }}>skills</span><span>Display key tech stack proficiencies</span>
            <span style={{ color: '#4ade80' }}>contact</span><span>Output email & social links</span>
            <span style={{ color: '#4ade80' }}>cat resume</span><span>View resume preview</span>
            <span style={{ color: '#4ade80' }}>date</span><span>Print current system date & time</span>
            <span style={{ color: '#4ade80' }}>clear</span><span>Clear terminal screen</span>
            <span style={{ color: '#4ade80' }}>sudo hire</span><span>Execute hiring sequence</span>
          </div>
        );
        break;

      case 'about':
        output = (
          <div>
            <div style={{ color: '#38bdf8', fontWeight: 600 }}>{DEVELOPER_PROFILE.name}</div>
            <div>{DEVELOPER_PROFILE.role}</div>
            <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{DEVELOPER_PROFILE.bio}</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ color: '#38bdf8' }}>Available Projects:</div>
            {PROJECTS.map((p) => (
              <div key={p.id} style={{ fontSize: '0.8rem' }}>
                <span style={{ color: '#4ade80' }}>• {p.title}</span> <span style={{ color: 'var(--text-muted)' }}>({p.category})</span> - {p.shortDescription}
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <div style={{ color: '#818cf8', fontWeight: 600 }}>{cat.category}:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '2px' }}>
                  {cat.items.map((item) => (
                    <span key={item.name} style={{ color: 'var(--text-secondary)' }}>
                      {item.name} ({item.level}%)
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div>
            <div>Email: <span style={{ color: '#38bdf8' }}>{DEVELOPER_PROFILE.email}</span></div>
            <div>GitHub: <span style={{ color: '#38bdf8' }}>{DEVELOPER_PROFILE.github}</span></div>
            <div>LinkedIn: <span style={{ color: '#38bdf8' }}>{DEVELOPER_PROFILE.linkedin}</span></div>
          </div>
        );
        break;

      case 'cat':
        if (parts[1]?.toLowerCase().includes('resume')) {
          if (onOpenApp) onOpenApp('resume');
          output = <div style={{ color: '#34d399' }}>Opening Resume Viewer window...</div>;
        } else {
          output = <div style={{ color: '#f87171' }}>Usage: cat resume.pdf</div>;
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'date':
        output = <div style={{ color: '#38bdf8' }}>{new Date().toString()}</div>;
        break;

      case 'sudo':
        if (parts[1]?.toLowerCase() === 'hire') {
          output = (
            <div style={{ color: '#34d399', fontWeight: 600 }}>
              🚀 Access Granted! Launching priority candidate sequence. Contacting {DEVELOPER_PROFILE.email}...
            </div>
          );
        } else {
          output = <div style={{ color: '#f87171' }}>Permission granted. Try 'sudo hire'.</div>;
        }
        break;

      default:
        output = <div style={{ color: '#f87171' }}>Command not recognized: '{cmd}'. Type 'help' for available commands.</div>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        flex: 1,
        background: '#04070d',
        color: '#f8fafc',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.84rem',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {history.map((item, idx) => (
        <div key={idx} style={{ marginBottom: '12px' }}>
          {item.command !== 'welcome' && (
            <div style={{ display: 'flex', gap: '8px', color: '#94a3b8', marginBottom: '2px' }}>
              <span style={{ color: '#38bdf8' }}>mohamed@web-os</span>
              <span style={{ color: '#64748b' }}>:</span>
              <span style={{ color: '#818cf8' }}>~</span>
              <span style={{ color: '#94a3b8' }}>$</span>
              <span style={{ color: '#f8fafc' }}>{item.command}</span>
            </div>
          )}
          <div>{item.output}</div>
        </div>
      ))}

      <form onSubmit={handleCommandSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#38bdf8' }}>mohamed@web-os</span>
        <span style={{ color: '#64748b' }}>:</span>
        <span style={{ color: '#818cf8' }}>~</span>
        <span style={{ color: '#94a3b8' }}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f8fafc',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
          }}
          autoFocus
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};
