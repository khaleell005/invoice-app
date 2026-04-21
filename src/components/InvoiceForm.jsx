import { useState, useEffect } from 'react';
import { useInvoices } from '../context/InvoiceContext';
import { generateId } from '../data/seedData';

const EMPTY_FORM = {
  senderStreet: '',
  senderCity: '',
  senderPostCode: '',
  senderCountry: '',
  clientName: '',
  clientEmail: '',
  clientStreet: '',
  clientCity: '',
  clientPostCode: '',
  clientCountry: '',
  invoiceDate: new Date().toISOString().split('T')[0],
  paymentTerms: 30,
  projectDescription: '',
  items: [{ name: '', quantity: 1, price: 0, total: 0 }],
};

export default function InvoiceForm({ editId, onClose }) {
  const { invoices, addInvoice, updateInvoice } = useInvoices();

  const existing = editId ? invoices.find((i) => i.id === editId) : null;

  const initForm = () => {
    if (!existing) return EMPTY_FORM;
    return {
      senderStreet: existing.senderAddress.street,
      senderCity: existing.senderAddress.city,
      senderPostCode: existing.senderAddress.postCode,
      senderCountry: existing.senderAddress.country,
      clientName: existing.clientName,
      clientEmail: existing.clientEmail,
      clientStreet: existing.clientAddress.street,
      clientCity: existing.clientAddress.city,
      clientPostCode: existing.clientAddress.postCode,
      clientCountry: existing.clientAddress.country,
      invoiceDate: existing.invoiceDate,
      paymentTerms: existing.paymentTerms,
      projectDescription: existing.projectDescription,
      items: existing.items.map((i) => ({ ...i })),
    };
  };

  const [form, setForm] = useState(initForm);
  const [errors, setErrors] = useState({});
  const [overlayRef, setOverlayRef] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const setItem = (index, key, value) => {
    const items = [...form.items];
    items[index] = { ...items[index], [key]: value };
    if (key === 'quantity' || key === 'price') {
      items[index].total =
        Number(items[index].quantity || 0) * Number(items[index].price || 0);
    }
    setForm((f) => ({ ...f, items }));
  };

  const addItem = () =>
    setForm((f) => ({
      ...f,
      items: [...f.items, { name: '', quantity: 1, price: 0, total: 0 }],
    }));

  const removeItem = (index) =>
    setForm((f) => ({
      ...f,
      items: f.items.filter((_, idx) => idx !== index),
    }));

  const validate = () => {
    const errors = {};
    if (!form.clientName.trim()) errors.clientName = 'Required';
    if (
      !form.clientEmail.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.clientEmail)
    )
      errors.clientEmail = 'Valid email required';
    if (!form.senderStreet.trim()) errors.senderStreet = 'Required';
    if (!form.clientStreet.trim()) errors.clientStreet = 'Required';
    if (form.items.length === 0) errors.items = 'At least one item required';
    form.items.forEach((item, i) => {
      if (!item.name.trim()) errors[`item_name_${i}`] = 'Required';
      if (Number(item.quantity) <= 0) errors[`item_qty_${i}`] = 'Must be > 0';
      if (Number(item.price) < 0) errors[`item_price_${i}`] = 'Must be >= 0';
    });
    return errors;
  };

  const buildInvoice = (status) => {
    const total = form.items.reduce((sum, item) => sum + item.total, 0);
    return {
      id: existing ? existing.id : generateId(),
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      clientAddress: {
        street: form.clientStreet,
        city: form.clientCity,
        postCode: form.clientPostCode,
        country: form.clientCountry,
      },
      senderAddress: {
        street: form.senderStreet,
        city: form.senderCity,
        postCode: form.senderPostCode,
        country: form.senderCountry,
      },
      invoiceDate: form.invoiceDate,
      paymentTerms: Number(form.paymentTerms),
      projectDescription: form.projectDescription,
      items: form.items.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        price: Number(item.price),
        total: Number(item.total),
      })),
      status,
      total,
    };
  };

  const handleSend = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const invoice = buildInvoice('pending');
    existing ? updateInvoice(invoice) : addInvoice(invoice);
    onClose();
  };

  const handleDraft = () => {
    const invoice = buildInvoice('draft');
    existing ? updateInvoice(invoice) : addInvoice(invoice);
    onClose();
  };

  const total = form.items.reduce((sum, item) => sum + Number(item.total || 0), 0);

  return (
    <div
      ref={setOverlayRef}
      style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex' }}
      onClick={(e) => {
        if (e.target === overlayRef) onClose();
      }}
    >
      <div
        className="invoice-form-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={editId ? 'Edit invoice' : 'New invoice'}
        style={{
          background: 'var(--bg2)',
          width: 'min(616px, 100vw)',
          height: '100vh',
          overflowY: 'auto',
          padding: '72px 40px 40px',
          boxShadow: '0 0 0 1000px rgba(0,0,0,0.5)',
        }}
      >
        {editId ? (
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 48 }}>
            Edit <span style={{ color: 'var(--text3)' }}>#</span>
            {editId}
          </h2>
        ) : (
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 48 }}>
            New Invoice
          </h2>
        )}

        <section style={{ marginBottom: 40 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--purple)',
              marginBottom: 24,
            }}
          >
            Bill From
          </p>
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="senderStreet">Street Address</label>
            <input
              id="senderStreet"
              value={form.senderStreet}
              onChange={(e) => set('senderStreet', e.target.value)}
              className={errors.senderStreet ? 'error' : ''}
            />
            {errors.senderStreet && (
              <p style={{ fontSize: 10, color: 'var(--red)', marginTop: 4 }}>
                {errors.senderStreet}
              </p>
            )}
          </div>
          <div
            className="invoice-form-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
            }}
          >
            <div>
              <label htmlFor="senderCity">City</label>
              <input
                id="senderCity"
                value={form.senderCity}
                onChange={(e) => set('senderCity', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="senderPostCode">Post Code</label>
              <input
                id="senderPostCode"
                value={form.senderPostCode}
                onChange={(e) => set('senderPostCode', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="senderCountry">Country</label>
              <input
                id="senderCountry"
                value={form.senderCountry}
                onChange={(e) => set('senderCountry', e.target.value)}
              />
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--purple)',
              marginBottom: 24,
            }}
          >
            Bill To
          </p>
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="clientName">Client's Name</label>
            <input
              id="clientName"
              value={form.clientName}
              onChange={(e) => set('clientName', e.target.value)}
              className={errors.clientName ? 'error' : ''}
            />
            {errors.clientName && (
              <p style={{ fontSize: 10, color: 'var(--red)', marginTop: 4 }}>
                {errors.clientName}
              </p>
            )}
          </div>
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="clientEmail">Client's Email</label>
            <input
              id="clientEmail"
              type="email"
              value={form.clientEmail}
              onChange={(e) => set('clientEmail', e.target.value)}
              className={errors.clientEmail ? 'error' : ''}
            />
            {errors.clientEmail && (
              <p style={{ fontSize: 10, color: 'var(--red)', marginTop: 4 }}>
                {errors.clientEmail}
              </p>
            )}
          </div>
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="clientStreet">Street Address</label>
            <input
              id="clientStreet"
              value={form.clientStreet}
              onChange={(e) => set('clientStreet', e.target.value)}
              className={errors.clientStreet ? 'error' : ''}
            />
            {errors.clientStreet && (
              <p style={{ fontSize: 10, color: 'var(--red)', marginTop: 4 }}>
                {errors.clientStreet}
              </p>
            )}
          </div>
          <div
            className="invoice-form-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 16,
            }}
          >
            <div>
              <label htmlFor="clientCity">City</label>
              <input
                id="clientCity"
                value={form.clientCity}
                onChange={(e) => set('clientCity', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="clientPostCode">Post Code</label>
              <input
                id="clientPostCode"
                value={form.clientPostCode}
                onChange={(e) => set('clientPostCode', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="clientCountry">Country</label>
              <input
                id="clientCountry"
                value={form.clientCountry}
                onChange={(e) => set('clientCountry', e.target.value)}
              />
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <div
            className="invoice-form-grid-2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
              marginBottom: 24,
            }}
          >
            <div>
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                id="invoiceDate"
                type="date"
                value={form.invoiceDate}
                onChange={(e) => set('invoiceDate', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="paymentTerms">Payment Terms</label>
              <select
                id="paymentTerms"
                value={form.paymentTerms}
                onChange={(e) => set('paymentTerms', Number(e.target.value))}
              >
                <option value={1}>Net 1 Day</option>
                <option value={7}>Net 7 Days</option>
                <option value={14}>Net 14 Days</option>
                <option value={30}>Net 30 Days</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="projectDescription">Project Description</label>
            <input
              id="projectDescription"
              value={form.projectDescription}
              onChange={(e) => set('projectDescription', e.target.value)}
              placeholder="e.g. Graphic Design Service"
            />
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#777F98',
              marginBottom: 24,
            }}
          >
            Item List
          </h3>
          {errors.items && (
            <p
              style={{
                fontSize: 10,
                color: 'var(--red)',
                marginBottom: 12,
              }}
            >
              {errors.items}
            </p>
          )}
          <div
            className="invoice-form-item-list"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 60px 90px 90px 20px',
              gap: 8,
              marginBottom: 8,
              alignItems: 'center',
            }}
          >
            <label style={{ margin: 0 }}>Item Name</label>
            <label style={{ margin: 0, textAlign: 'center' }}>Qty.</label>
            <label style={{ margin: 0, textAlign: 'center' }}>Price</label>
            <label style={{ margin: 0, textAlign: 'center' }}>Total</label>
            <span />
          </div>
          {form.items.map((item, i) => (
            <div
              key={i}
              className="invoice-form-item-list"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 60px 90px 90px 20px',
                gap: 8,
                marginBottom: 16,
                alignItems: 'center',
              }}
            >
              <input
                aria-label="Item name"
                value={item.name}
                onChange={(e) => setItem(i, 'name', e.target.value)}
                className={errors[`item_name_${i}`] ? 'error' : ''}
              />
              <input
                aria-label="Quantity"
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => setItem(i, 'quantity', e.target.value)}
                style={{ textAlign: 'center' }}
                className={errors[`item_qty_${i}`] ? 'error' : ''}
              />
              <input
                aria-label="Price"
                type="number"
                min="0"
                step="0.01"
                value={item.price}
                onChange={(e) => setItem(i, 'price', e.target.value)}
                style={{ textAlign: 'right' }}
                className={errors[`item_price_${i}`] ? 'error' : ''}
              />
              <input
                aria-label="Total"
                readOnly
                value={Number(item.total || 0).toFixed(2)}
                style={{
                  textAlign: 'right',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text2)',
                  cursor: 'default',
                }}
              />
              <button
                onClick={() => removeItem(i)}
                aria-label={`Remove item ${item.name || i + 1}`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="13" height="16" viewBox="0 0 13 16" fill="none">
                  <path
                    d="M11.583 3.556h-2.99l-.872-1.455A1 1 0 007 1.5H5.5a1 1 0 00-.72.601L3.908 3.556H.917a.25.25 0 00-.25.25v.5a.25.25 0 00.25.25h.583V14a1 1 0 001 1h8a1 1 0 001-1V4.556h.583a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25z"
                    fill="#888EB0"
                  />
                </svg>
              </button>
            </div>
          ))}
          <button
            onClick={addItem}
            style={{
              width: '100%',
              background: 'var(--purple-dim)',
              color: 'var(--text3)',
              borderRadius: 24,
              padding: '16px',
              fontSize: 12,
              fontWeight: 700,
              marginTop: 8,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = 'var(--purple-dim)')
            }
          >
            + Add New Item
          </button>
        </section>

        {Object.keys(errors).length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 10, color: 'var(--red)', fontWeight: 700 }}>
              - All fields must be added
            </p>
            {form.items.length === 0 && (
              <p style={{ fontSize: 10, color: 'var(--red)' }}>
                - An item must be added
              </p>
            )}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            position: 'sticky',
            bottom: 0,
            background: 'var(--bg2)',
            padding: '16px 0',
          }}
        >
          {!editId && (
            <button
              onClick={onClose}
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
              Discard
            </button>
          )}
          <div className="invoice-form-actions" style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
            {editId ? (
              <button
                onClick={onClose}
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
            ) : (
              <button
                onClick={handleDraft}
                style={{
                  background: 'var(--draft-bg)',
                  color: 'var(--text3)',
                  borderRadius: 24,
                  padding: '16px 24px',
                  fontSize: 12,
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--border)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--draft-bg)')}
              >
                Save as Draft
              </button>
            )}
            <button
              onClick={handleSend}
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
              {editId ? 'Save Changes' : 'Save & Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}