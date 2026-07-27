import React, { useState, useRef } from 'react';
import type { WindowState } from '../types/os';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface WindowFrameProps {
  windowState: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
}) => {
  const [position, setPosition] = useState(windowState.position);
  const [size, setSize] = useState(windowState.size);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const windowPosStartRef = useRef({ x: 0, y: 0 });
  const sizeStartRef = useRef({ width: 0, height: 0 });

  const handlePointerDownHeader = (e: React.PointerEvent) => {
    if (windowState.isMaximized) return;
    onFocus();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    windowPosStartRef.current = { ...position };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveHeader = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    const newX = Math.max(0, Math.min(window.innerWidth - 100, windowPosStartRef.current.x + dx));
    const newY = Math.max(30, Math.min(window.innerHeight - 100, windowPosStartRef.current.y + dy));
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUpHeader = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    }
  };

  const handlePointerDownResize = (e: React.PointerEvent) => {
    if (windowState.isMaximized) return;
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    sizeStartRef.current = { ...size };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveResize = (e: React.PointerEvent) => {
    if (!isResizing) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const newW = Math.max(450, Math.min(window.innerWidth - position.x, sizeStartRef.current.width + dx));
    const newH = Math.max(300, Math.min(window.innerHeight - position.y - 60, sizeStartRef.current.height + dy));
    setSize({ width: newW, height: newH });
  };

  const handlePointerUpResize = (e: React.PointerEvent) => {
    if (isResizing) {
      setIsResizing(false);
      try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    }
  };

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const frameStyle: React.CSSProperties = windowState.isMaximized
    ? {
        position: 'fixed',
        top: 32,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 100px)',
        zIndex: windowState.zIndex,
        borderRadius: 0,
      }
    : {
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex: windowState.zIndex,
        borderRadius: 'var(--radius-lg)',
      };

  return (
    <div
      onClick={onFocus}
      className="glass-panel animate-fade-in"
      style={{
        ...frameStyle,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-window)',
        overflow: 'hidden',
        border: '1px solid var(--border-glass-bright)',
      }}
    >
      {/* Window Title Header Bar */}
      <div
        onPointerDown={handlePointerDownHeader}
        onPointerMove={handlePointerMoveHeader}
        onPointerUp={handlePointerUpHeader}
        onDoubleClick={onMaximize}
        style={{
          height: '38px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 14px',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
      >
        {/* Left Side: Window Title */}
        <div
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--text-secondary)',
            letterSpacing: '0.3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {windowState.title}
        </div>

        {/* Right Side: 3 Control Buttons (Minimize, Maximize, Close) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="traffic-btn traffic-minimize"
            title="Réduire / Minimize"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ffbd2e',
              border: '1px solid #dea123',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <Minus size={7} color="#5c4300" style={{ opacity: 0.8 }} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="traffic-btn traffic-maximize"
            title="Agrandir / Maximize"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#27c93f',
              border: '1px solid #1aab29',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            {windowState.isMaximized ? <Minimize2 size={6} color="#0d4d14" /> : <Maximize2 size={6} color="#0d4d14" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="traffic-btn traffic-close"
            title="Fermer / Close"
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#ff5f56',
              border: '1px solid #e0443e',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <X size={7} color="#4c0000" style={{ opacity: 0.8 }} />
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {children}
      </div>

      {/* Resize Handle */}
      {!windowState.isMaximized && (
        <div
          onPointerDown={handlePointerDownResize}
          onPointerMove={handlePointerMoveResize}
          onPointerUp={handlePointerUpResize}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '16px',
            height: '16px',
            cursor: 'nwse-resize',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};
