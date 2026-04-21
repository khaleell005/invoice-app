import { createContext, useContext, useState, useEffect } from 'react';
import { SEED_DATA } from '../data/seedData';

const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(() => {
    try {
      const stored = localStorage.getItem('invoiceflow_v1');
      return stored ? JSON.parse(stored) : SEED_DATA;
    } catch {
      return SEED_DATA;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('invoiceflow_v1', JSON.stringify(invoices));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [invoices]);

  const addInvoice = (invoice) => {
    setInvoices((all) => [invoice, ...all]);
  };

  const updateInvoice = (invoice) => {
    setInvoices((all) => all.map((i) => (i.id === invoice.id ? invoice : i)));
  };

  const deleteInvoice = (id) => {
    setInvoices((all) => all.filter((i) => i.id !== id));
  };

  const markAsPaid = (id) => {
    setInvoices((all) =>
      all.map((i) => (i.id === id ? { ...i, status: 'paid' } : i))
    );
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        addInvoice,
        updateInvoice,
        deleteInvoice,
        markAsPaid,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoices() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoices must be used within an InvoiceProvider');
  }
  return context;
}