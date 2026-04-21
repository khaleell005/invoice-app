export const SEED_DATA = [
  {
    id: 'RT3080',
    clientName: 'Jensen Huang',
    clientEmail: 'jensenhuang@mail.com',
    clientAddress: {
      street: '106 Kendell Street',
      city: 'Sharborough',
      postCode: 'E1 8EF',
      country: 'United Kingdom'
    },
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    invoiceDate: '2021-08-19',
    paymentTerms: 30,
    projectDescription: 'Re-branding',
    items: [
      { name: 'Brand Guidelines', quantity: 1, price: 1800.90, total: 1800.90 }
    ],
    status: 'paid',
    total: 1800.90
  },
  {
    id: 'XM9141',
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    clientAddress: {
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom'
    },
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    invoiceDate: '2021-08-21',
    paymentTerms: 30,
    projectDescription: 'Graphic Design',
    items: [
      { name: 'Banner Design', quantity: 1, price: 156.00, total: 156.00 },
      { name: 'Email Design', quantity: 2, price: 200.00, total: 400.00 }
    ],
    status: 'pending',
    total: 556.00
  },
  {
    id: 'RG0314',
    clientName: 'John Morrison',
    clientEmail: 'jmorrison@mail.com',
    clientAddress: {
      street: 'Apartement 120 Olney Road',
      city: 'Blackburn',
      postCode: 'BB1 1EW',
      country: 'United Kingdom'
    },
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    invoiceDate: '2021-09-24',
    paymentTerms: 7,
    projectDescription: 'Logo Concept',
    items: [
      { name: 'Logo Sketches', quantity: 1, price: 102.04, total: 102.04 },
      { name: 'Logo Prototype', quantity: 3, price: 500.00, total: 1500.00 },
      { name: 'Logo Final', quantity: 1, price: 4100.29, total: 4100.29 },
      { name: 'Email Template', quantity: 2, price: 1100.00, total: 2200.00 },
      { name: 'Invoice', quantity: 1, price: 6100.00, total: 6100.00 }
    ],
    status: 'paid',
    total: 14002.33
  },
  {
    id: 'RT2080',
    clientName: 'Alysa Werner',
    clientEmail: 'awerner@mail.com',
    clientAddress: {
      street: '2 Stratford Drive',
      city: 'Bervington',
      postCode: 'BU9 2WD',
      country: 'United Kingdom'
    },
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    invoiceDate: '2021-10-11',
    paymentTerms: 1,
    projectDescription: 'Re-branding',
    items: [
      { name: 'New Logo', quantity: 1, price: 102.04, total: 102.04 }
    ],
    status: 'pending',
    total: 102.04
  },
  {
    id: 'AA1449',
    clientName: 'Mellisa Clarke',
    clientEmail: 'mellisa.c@mail.com',
    clientAddress: {
      street: '79 Dover Road',
      city: 'Westhall',
      postCode: 'IV1 3NE',
      country: 'United Kingdom'
    },
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    invoiceDate: '2021-10-13',
    paymentTerms: 1,
    projectDescription: 'Logo and Art Direction',
    items: [
      { name: 'Logo Design', quantity: 1, price: 102.04, total: 102.04 },
      { name: 'Brand Guidelines', quantity: 1, price: 3930.29, total: 3930.29 }
    ],
    status: 'pending',
    total: 4032.33
  },
  {
    id: 'TY9141',
    clientName: 'Thomas Wayne',
    clientEmail: 'thomas.wayne@mail.com',
    clientAddress: {
      street: '3 Whitedell Close',
      city: 'Gotham',
      postCode: 'G1 1AB',
      country: 'United States'
    },
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    invoiceDate: '2021-10-30',
    paymentTerms: 1,
    projectDescription: 'Website Redesign',
    items: [
      { name: 'Wireframes', quantity: 1, price: 400.00, total: 400.00 },
      { name: 'UI Design', quantity: 1, price: 3200.00, total: 3200.00 },
      { name: 'CMS Integration', quantity: 1, price: 2555.91, total: 2555.91 }
    ],
    status: 'pending',
    total: 6155.91
  },
  {
    id: 'FV2353',
    clientName: 'Anita Wainwright',
    clientEmail: 'anita.wainwright@mail.com',
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: ''
    },
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom'
    },
    invoiceDate: '2021-11-12',
    paymentTerms: 7,
    projectDescription: '',
    items: [
      { name: 'Motion Reel', quantity: 1, price: 3102.04, total: 3102.04 }
    ],
    status: 'draft',
    total: 3102.04
  },
];

export function generateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  return (
    chars[Math.floor(Math.random() * 26)] +
    chars[Math.floor(Math.random() * 26)] +
    nums[Math.floor(Math.random() * 10)] +
    nums[Math.floor(Math.random() * 10)] +
    nums[Math.floor(Math.random() * 10)] +
    nums[Math.floor(Math.random() * 10)]
  );
}

export function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function formatMoney(n) {
  return '£ ' + Number(n || 0).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}