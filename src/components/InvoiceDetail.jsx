import { useState } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import StatusBadge from './StatusBadge';
import DeleteModal from './DeleteModal';
import { addDays, formatDate, formatMoney } from '../data/seedData';

export default function InvoiceDetail({ id, onBack, onEdit, onDelete, onMarkPaid }) {
  const { invoices } = useInvoices();
  const [showDelete, setShowDelete] = useState(false);

  const invoice = invoices.find((i) => i.id === id);

  if (!invoice) return null;

  const due = addDays(invoice.invoiceDate, invoice.paymentTerms);

  return (
    <div
      className="invoice-detail-container"
      style={{
        padding: '72px 24px 24px',
        maxWidth: 780,
        margin: '0 auto',
        width: '100%',
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text1)',
          fontSize: 12,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 32,
          marginTop: 16,
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text3)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text1)')}
      >
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path
            d="M6 1L2 5L6 9"
            stroke="#7C5DFA"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Go back
      </button>

      <div
        className="invoice-detail-actions"
        style={{
          background: 'var(--card)',
          borderRadius: 8,
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'var(--text2)', fontWeight: 500 }}>
            Status
          </span>
          <StatusBadge status={invoice.status} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} className="detail-actions">
          {invoice.status !== 'paid' && (
            <button
              onClick={() => onEdit(id)}
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
              Edit
            </button>
          )}
          <button
            onClick={() => setShowDelete(true)}
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
          {invoice.status === 'pending' && (
            <button
              onClick={() => onMarkPaid(id)}
              style={{
                background: 'var(--purple)',
                color: 'white',
                borderRadius: 24,
                padding: '16px 24px',
                fontSize: 12,
                fontWeight: 700,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--purple-light)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'var(--purple)')
              }
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      <div
        className="invoice-detail-card"
        style={{
          background: 'var(--card)',
          borderRadius: 8,
          padding: '48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              <span style={{ color: 'var(--text3)' }}>#</span>
              {invoice.id}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text2)' }}>
              {invoice.projectDescription || 'No description'}
            </p>
          </div>
          <div
            style={{
              textAlign: 'right',
              fontSize: 12,
              color: 'var(--text2)',
              lineHeight: 1.8,
            }}
          >
            <p>{invoice.senderAddress.street}</p>
            <p>{invoice.senderAddress.city}</p>
            <p>{invoice.senderAddress.postCode}</p>
            <p>{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
            gap: 32,
            marginBottom: 48,
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 12 }}>
              Invoice Date
            </p>
            <p style={{ fontSize: 15, fontWeight: 700 }}>
              {formatDate(invoice.invoiceDate)}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 12 }}>
              Payment Due
            </p>
            <p style={{ fontSize: 15, fontWeight: 700 }}>
              {formatDate(due)}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 12 }}>
              Bill To
            </p>
            <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>
              {invoice.clientName}
            </p>
            <div
              style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.8 }}
            >
              <p>{invoice.clientAddress.street}</p>
              <p>{invoice.clientAddress.city}</p>
              <p>{invoice.clientAddress.postCode}</p>
              <p>{invoice.clientAddress.country}</p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 12 }}>
              Sent to
            </p>
            <p style={{ fontSize: 15, fontWeight: 700 }}>
              {invoice.clientEmail}
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg1)',
            borderRadius: '8px 8px 0 0',
            padding: '32px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto',
              gap: 16,
              marginBottom: 24,
              color: 'var(--text2)',
              fontSize: 12,
            }}
          >
            <span>Item Name</span>
            <span style={{ textAlign: 'center', minWidth: 40 }}>QTY.</span>
            <span style={{ textAlign: 'right', minWidth: 70 }}>Price</span>
            <span style={{ textAlign: 'right', minWidth: 70 }}>Total</span>
          </div>
          {invoice.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto auto',
                gap: 16,
                marginBottom: 16,
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700 }}>
                {item.name}
              </span>
              <span
                style={{
                  textAlign: 'center',
                  minWidth: 40,
                  fontSize: 12,
                  color: 'var(--text2)',
                  fontWeight: 700,
                }}
              >
                {item.quantity}
              </span>
              <span
                style={{
                  textAlign: 'right',
                  minWidth: 70,
                  fontSize: 12,
                  color: 'var(--text2)',
                  fontWeight: 700,
                }}
              >
                {formatMoney(item.price)}
              </span>
              <span
                style={{
                  textAlign: 'right',
                  minWidth: 70,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {formatMoney(item.total)}
              </span>
            </div>
          ))}
        </div>
        <div
          style={{
            background: 'var(--total-bg)',
            borderRadius: '0 0 8px 8px',
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 12, color: 'var(--total-text)', opacity: 0.8 }}>
            Amount Due
          </span>
          <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--total-text)' }}>
            {formatMoney(invoice.total)}
          </span>
        </div>
      </div>

      {showDelete && (
        <DeleteModal
          id={id}
          onCancel={() => setShowDelete(false)}
          onConfirm={() => {
            onDelete(id);
            setShowDelete(false);
          }}
        />
      )}
    </div>
  );
}