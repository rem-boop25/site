export const estimates = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  orderId: i + 1,
  items: [{ name: 'Материалы', quantity: 1, price: 10000 }, { name: 'Работа', quantity: 1, price: 5000 }],
  totalAmount: 15000,
  status: ['draft', 'proposed', 'approved', 'rejected', 'approved'][i]
}));