import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { InvoiceProvider, useInvoices } from './context/InvoiceContext';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import InvoiceList from './components/InvoiceList';
import InvoiceDetail from './components/InvoiceDetail';
import InvoiceForm from './components/InvoiceForm';

function AppContent() {
  const { deleteInvoice, markAsPaid } = useInvoices();
  const [view, setView] = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    setView('detail');
  };

  const handleBack = () => {
    setView('list');
    setSelectedId(null);
  };

  const handleNew = () => {
    setEditId(null);
    setFormOpen(true);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditId(null);
  };

  const handleDelete = (id) => {
    deleteInvoice(id);
    handleBack();
  };

  const handleMarkPaid = (id) => {
    markAsPaid(id);
    setView('detail');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div id="sidebar-desktop" style={{ display: 'flex' }}>
        <Sidebar />
      </div>
      <div id="nav-mobile" style={{ display: 'none' }}>
        <MobileNav />
      </div>
      <main
        id="main-layout"
        style={{
          flex: 1,
          minHeight: '100vh',
          background: 'var(--bg1)',
          paddingLeft: 103,
          transition: 'background 0.2s',
        }}
      >
        {view === 'list' && (
          <InvoiceList onSelect={handleSelect} onNew={handleNew} />
        )}
        {view === 'detail' && selectedId && (
          <InvoiceDetail
            id={selectedId}
            onBack={handleBack}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onMarkPaid={handleMarkPaid}
          />
        )}
      </main>
      {formOpen && (
        <InvoiceForm editId={editId} onClose={handleCloseForm} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <InvoiceProvider>
        <AppContent />
      </InvoiceProvider>
    </ThemeProvider>
  );
}