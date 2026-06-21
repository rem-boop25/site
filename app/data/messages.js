export const messages = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  orderId: 1, // привязка к первому заказу для тестов
  senderId: i % 2 === 0 ? 1 : 2,
  text: `Тестовое сообщение ${i + 1}`,
  timestamp: `10:${i < 10 ? '0' + i : i}`,
  isRead: true
}));