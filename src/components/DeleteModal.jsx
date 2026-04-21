import { useEffect, useRef } from 'react';

export default function DeleteModal({ id, onCancel, onConfirm }) {
  const ref = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    ref.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="del-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--modal-overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 500,
        padding: 24,
      }}
    >
      <div
        ref={ref}
        tabIndex={-1}
        style={{
          background: 'var(--bg2)',
          borderRadius: 8,
          padding: '48px',
          maxWidth: 480,
          width: '100%',
          outline: 'none',
        }}
      >
        <h2
          id="del-title"
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--text1)',
            marginBottom: 16,
          }}
        >
          Confirm Deletion
        </h2>
        <p
          style={{
            fontSize: 13,
            color: 'var(--text2)',
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              background: 'var(--purple-dim)',
              color: 'var(--text3)',
              borderRadius: 24,
              padding: '16px 24px',
              fontSize: 12,
              fontWeight: 700,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'var(--purple-dim)')
            }
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: 'var(--red)',
              color: 'white',
              borderRadius: 24,
              padding: '16px 24px',
              fontSize: 12,
              fontWeight: 700,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--red-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--red)')}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}