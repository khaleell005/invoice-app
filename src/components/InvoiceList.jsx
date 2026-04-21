import { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import FilterDropdown from './FilterDropdown';
import InvoiceCardContent from './InvoiceCardContent';

export default function InvoiceList({ onSelect, onNew }) {
  const { invoices } = useInvoices();
  const [filter, setFilter] = useState('all');

  const filtered =
    filter === 'all' ? invoices : invoices.filter((i) => i.status === filter);

  return (
    <div
      className="invoice-list-container"
      style={{
        padding: '72px 24px 24px',
        maxWidth: 780,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 40,
          marginTop: 16,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: 'var(--text1)',
              letterSpacing: -1,
            }}
          >
            Invoices
          </h1>
          <p
            style={{ fontSize: 12, color: 'var(--text2)', marginTop: 4, fontWeight: 500 }}
          >
            <span className="hide-mobile">
              {filtered.length === 0
                ? 'No invoices'
                : `There are ${filtered.length} total invoice${
                    filtered.length !== 1 ? 's' : ''
                  }`}
            </span>
            <span className="show-mobile">
              {filtered.length} invoice{filtered.length !== 1 ? 's' : ''}
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <FilterDropdown filter={filter} setFilter={setFilter} />
          <button
            onClick={onNew}
            style={{
              background: 'var(--purple)',
              color: 'white',
              borderRadius: 24,
              padding: '16px 15px 16px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: -0.25,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--purple-light)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--purple)')}
          >
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path
                  d="M6.313 10.023V6.312H10.023V4.688H6.313V0.977H4.688V4.688H0.977V6.312H4.688V10.023H6.313Z"
                  fill="#7C5DFA"
                />
              </svg>
            </span>
            <span className="hide-mobile">New Invoice</span>
            <span className="show-mobile">New</span>
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', paddingTop: 80 }}>
          <svg
            width="242"
            height="200"
            viewBox="0 0 242 200"
            fill="none"
            style={{ marginBottom: 40, opacity: 0.5 }}
          >
            <ellipse cx="121" cy="175" rx="60" ry="14" fill="var(--border)" opacity="0.5" />
            <rect
              x="60"
              y="20"
              width="122"
              height="150"
              rx="8"
              fill="var(--card)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <rect x="76" y="40" width="90" height="8" rx="4" fill="var(--border)" />
            <rect x="76" y="60" width="60" height="6" rx="3" fill="var(--border)" opacity={0.6} />
            <rect x="76" y="90" width="90" height="6" rx="3" fill="var(--border)" opacity={0.4} />
            <rect
              x="76"
              y="106"
              width="70"
              height="6"
              rx="3"
              fill="var(--border)"
              opacity={0.4}
            />
            <circle cx="121" cy="148" r="12" fill="var(--purple)" opacity={0.2} />
          </svg>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--text1)',
              marginBottom: 16,
            }}
          >
            Nothing here
          </h2>
          <p
            style={{
              fontSize: 13,
              color: 'var(--text2)',
              maxWidth: 220,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Create an invoice by clicking the <strong>New Invoice</strong>{' '}
            button and get started
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((inv) => (
            <li key={inv.id}>
              <button
                onClick={() => onSelect(inv.id)}
                style={{
                  width: '100%',
                  background: 'var(--card)',
                  border: '1px solid transparent',
                  borderRadius: 8,
                  padding: '16px 24px',
                  display: 'grid',
                  cursor: 'pointer',
                  alignItems: 'center',
                  textAlign: 'left',
                  color: 'inherit',
                }}
                className="invoice-card"
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--purple)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <InvoiceCardContent inv={inv} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}