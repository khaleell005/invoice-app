import { useState, useEffect, useRef } from 'react';

const FILTER_OPTIONS = ['all', 'draft', 'pending', 'paid'];

export default function FilterDropdown({ filter, setFilter }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: 'var(--text1)',
          fontSize: 12,
          fontWeight: 700,
          padding: '8px 4px',
        }}
      >
        <span className="hide-mobile">Filter by status</span>
        <span className="show-mobile">Filter</span>
        <svg
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          style={{
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          <path
            d="M1 1L5.5 5.5L10 1"
            stroke="#7C5DFA"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 16px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg2)',
            borderRadius: 8,
            padding: '24px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
            minWidth: 192,
            zIndex: 200,
          }}
        >
          {FILTER_OPTIONS.map((option) => (
            <label
              key={option}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                cursor: 'pointer',
                marginBottom: option === 'paid' ? 0 : 16,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--text1)',
                textTransform: 'capitalize',
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 2,
                  flexShrink: 0,
                  background: filter === option ? 'var(--purple)' : 'transparent',
                  border: `1px solid ${
                    filter === option ? 'var(--purple)' : 'var(--purple-dim)'
                  }`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {filter === option && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                checked={filter === option}
                onChange={() => {
                  setFilter(option);
                  setOpen(false);
                }}
                style={{ display: 'none' }}
              />
              {option === 'all' ? 'All' : option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}