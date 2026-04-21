import { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge';
import { addDays, formatDate, formatMoney } from '../data/seedData';

export default function InvoiceCardContent({ inv }) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const due = addDays(inv.invoiceDate, inv.paymentTerms);

  if (isDesktop) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto auto auto auto',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--text1)',
            marginRight: 16,
          }}
        >
          <span style={{ color: 'var(--text3)' }}>#</span>
          {inv.id}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>
          Due {formatDate(due)}
        </span>
        <span
          style={{
            fontSize: 12,
            color: 'var(--text2)',
            fontWeight: 500,
            textAlign: 'center',
            minWidth: 120,
          }}
        >
          {inv.clientName}
        </span>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text1)',
            textAlign: 'right',
            minWidth: 100,
          }}
        >
          {formatMoney(inv.total)}
        </span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            minWidth: 110,
            marginLeft: 8,
          }}
        >
          <StatusBadge status={inv.status} />
        </div>
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          style={{ marginLeft: 4 }}
        >
          <path
            d="M1 1L5 5L1 9"
            stroke="#7C5DFA"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700 }}>
          <span style={{ color: 'var(--text3)' }}>#</span>
          {inv.id}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text2)' }}>
          {inv.clientName}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <p
            style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 8 }}
          >
            Due {formatDate(due)}
          </p>
          <p style={{ fontSize: 16, fontWeight: 700 }}>
            {formatMoney(inv.total)}
          </p>
        </div>
        <StatusBadge status={inv.status} />
      </div>
    </div>
  );
}