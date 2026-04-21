# InvoiceFlow - Invoice Management Application

A fully functional, responsive invoice management application built with React. Create, manage, and track invoices with ease.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete invoices
- **Form Validations**: Client name, email format, required fields, positive quantities/prices
- **Status Management**: Draft, Pending, Paid statuses with proper workflow
- **Status Filtering**: Filter invoices by All, Draft, Pending, or Paid
- **Theme Toggle**: Light/Dark mode with preference persistence (localStorage)
- **Responsive Design**: Mobile, Tablet, and Desktop layouts
- **Hover States**: Interactive hover states on all buttons, links, and invoice cards

## Architecture

### Technology Stack

- **React 18** with functional components and hooks
- **Vite** for build tooling
- **CSS Variables** for theming
- **localStorage** for data persistence

### Project Structure

```
src/
├── components/
│   ├── DeleteModal.jsx      # Delete confirmation modal
│   ├── FilterDropdown.jsx   # Status filter dropdown
│   ├── InvoiceCardContent.jsx  # Invoice card display
│   ├── InvoiceDetail.jsx     # Invoice detail view
│   ├── InvoiceForm.jsx       # Create/Edit invoice form
│   ├── InvoiceList.jsx      # Main invoice list
│   ├── MobileNav.jsx        # Mobile navigation
│   ├── Sidebar.jsx          # Desktop sidebar
│   └── StatusBadge.jsx       # Status badge component
├── context/
│   ├── InvoiceContext.jsx   # Invoice state management
│   └── ThemeContext.jsx     # Theme state management
├── data/
│   └── seedData.js         # Initial data and utilities
├── App.jsx                 # Main App component
├── index.css              # Global styles
└── main.jsx              # Entry point
```

### Data Model

```javascript
{
  id: string,              // Unique invoice ID (e.g., "RT3080")
  clientName: string,
  clientEmail: string,
  clientAddress: {
    street, city, postCode, country
  },
  senderAddress: {
    street, city, postCode, country
  },
  invoiceDate: string,      // ISO date string
  paymentTerms: number,   // Days until due (1, 7, 14, 30)
  projectDescription: string,
  items: Array<{
    name, quantity, price, total
  }>,
  status: 'draft' | 'pending' | 'paid',
  total: number
}
```

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/khaleell005/invoice-app.git
cd invoice-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This application is configured for easy deployment to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Accessibility

- Semantic HTML with proper heading hierarchy
- Form labels associated with inputs
- ARIA attributes on interactive elements
- Keyboard navigation support (Escape to close modals)
- Focus management in modals
- WCAG AA color contrast compliance

## Trade-offs & Improvements

### Current Limitations

1. **Single File Storage**: Uses localStorage which has size limits (~5MB)
2. **No Backend**: All data is client-side only
3. **No Multi-user**: Single user context

### Potential Improvements

1. **Backend API**: Connect to Node.js/Express or Next.js API routes
2. **Database**: Use PostgreSQL or MongoDB for persistent storage
3. **Authentication**: Add user login/signup
4. **PDF Export**: Generate downloadable PDF invoices
5. **Email Integration**: Send invoices via email
6. **Invoice Templates**: Pre-built templates for common invoicing scenarios

## License

MIT License