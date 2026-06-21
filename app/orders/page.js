"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { orders } from '../data/orders';
import { users } from '../data/users';
import { messages } from '../data/messages';
import { estimates } from '../data/estimates';

const STATUS_MAP = {
  open: { label: 'Открыт', color: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'В работе', color: 'bg-yellow-100 text-yellow-700' },
  completed: { label: 'Завершен', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Отменен', color: 'bg-gray-100 text-gray-700' },
};

const ESTIMATE_STATUS = {
  draft: 'Черновик',
  proposed: 'На рассмотрении',
  approved: 'Утверждена',
  rejected: 'Отклонена',
};

export default function OrderDetails() {
  const { id } = useParams();
  
  const [order, setOrder] = useState(null);
  const [estimate, setEstimate] = useState(null);
  const [orderMessages, setOrderMessages] = useState([]);
  const [executors, setExecutors] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [assignedExecutor, setAssignedExecutor] = useState(null);

  useEffect(() => {
    // 1. Ищем заказ
    const foundOrder = orders.find(o => o.id === parseInt(id));
    if (!foundOrder) return;
    setOrder(foundOrder);

    // 2. Участники (Заказчик и Исполнитель)
    setCustomer(users.find(u => u.name === foundOrder.customerName) || { name: foundOrder.customerName, avatar: '👤', rating: 5.0 });
    if (foundOrder.executorName) {
      setAssignedExecutor(users.find(u => u.name === foundOrder.executorName));
    }

    // 3. Смета
    const foundEstimate = estimates.find(e => e.orderId === parseInt(id));
    if (foundEstimate) setEstimate(foundEstimate);

    // 4. Отклики (Мок: берем нескольких исполнителей)
    const availableExecutors = users.filter(u => u.role === 'executor');
    setExecutors(availableExecutors.map((ex, i) => ({
      ...ex,
      mockPrice: foundOrder.budget * (0.8 + Math.random() * 0.4), // Разброс цен
      mockDays: Math.floor(Math.random() * 10) + 3 // 3-12 дней
    })));

    // 5. Чат (Последние 3 сообщения для заказа)
    const filteredMsgs = messages.filter(m => m.orderId === parseInt(id)) || messages;
    setOrderMessages(filteredMsgs.slice(-3));
    
  }, [id]);

  if (!order) return <div className="p-8 text-center text-gray-500">Загрузка данных заказа...</div>;

  // Обработчики действий
  const handleEstimateAction = (newStatus) => {
    setEstimate({ ...estimate, status: newStatus });
    alert(`Статус сметы изменен на: ${ESTIMATE_STATUS[newStatus]}`);
  };

  const handleAcceptExecutor = (exec) => {
    setOrder(prev => ({ ...prev, status: 'in_progress', executorName: exec.name }));
    setAssignedExecutor(exec);
    alert(`Исполнитель ${exec.name} успешно назначен на проект!`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Link href="/orders" className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Назад к списку</Link>

      {/* Шапка заказа */}
      <div className="bg-white border rounded-lg p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{order.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_MAP[order.status]?.color}`}>
              {STATUS_MAP[order.status]?.label}
            </span>
          </div>
          <div className="text-gray-500 text-sm">Заказ №{order.id} • {order.createdAt}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Бюджет:</div>
          <div className="text-2xl font-extrabold text-gray-900">{order.budget.toLocaleString()} ₽</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="space-y-6">
          
          {/* Инфо */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Информация</h2>
            <div className="space-y-3">
              <div><span className="text-gray-500 text-sm">Категория:</span> <span className="font-medium ml-2">{order.category}</span></div>
              <div><span className="text-gray-500 text-sm">Адрес:</span> <span className="font-medium ml-2">г. Калининград, ул. Ленина</span></div>
              <div>
                <span className="block text-gray-500 text-sm mb-1">Описание:</span>
                <p className="text-gray-800 text-sm leading-relaxed">{order.description || 'Описание отсутствует.'}</p>
              </div>
            </div>
          </div>

          {/* Участники */}
          <div className="bg-white border rounded-lg p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 uppercase font-bold mb-3">Заказчик</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">{customer?.avatar}</div>
                <div>
                  <div className="font-bold text-sm text-gray-800">{customer?.name}</div>
                  <div className="text-xs text-yellow-500">★ {customer?.rating}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase font-bold mb-3">Исполнитель</div>
              {assignedExecutor ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">{assignedExecutor.avatar}</div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">{assignedExecutor.name}</div>
                    <div className="text-xs text-yellow-500">★ {assignedExecutor.rating}</div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-400 italic flex items-center h-10">Исполнитель не назначен</div>
              )}
            </div>
          </div>

          {/* Смета */}
          {estimate && (
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-lg font-bold">Смета</h2>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">{ESTIMATE_STATUS[estimate.status]}</span>
              </div>
              
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 border-b">
                      <th className="px-4 py-2 font-medium">Наименование</th>
                      <th className="px-4 py-2 font-medium">Кол-во</th>
                      <th className="px-4 py-2 font-medium">Цена</th>
                      <th className="px-4 py-2 font-medium text-right">Сумма</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estimate.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-50">
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3">{item.quantity} шт.</td>
                        <td className="px-4 py-3">{item.price.toLocaleString()} ₽</td>
                        <td className="px-4 py-3 text-right font-medium">{(item.quantity * item.price).toLocaleString()} ₽</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan="3" className="px-4 py-3 font-bold text-right">Итого:</td>
                      <td className="px-4 py-3 font-bold text-right text-blue-600">{estimate.totalAmount.toLocaleString()} ₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {(estimate.status === 'draft' || estimate.status === 'proposed') && (
                <div className="flex gap-3 justify-end mt-4">
                  <button onClick={() => handleEstimateAction('rejected')} className="px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50">Отклонить</button>
                  <button onClick={() => handleEstimateAction('approved')} className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600">Утвердить смету</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="space-y-6">
          
          {/* Отклики */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Отклики исполнителей</h2>
            {order.status !== 'open' ? (
              <div className="text-sm text-gray-500 p-4 text-center bg-gray-50 rounded-lg">Отклики заблокированы (Заказ {order.status === 'completed' ? 'завершен' : 'в работе'}).</div>
            ) : (
              <div className="space-y-3">
                {executors.map(ex => (
                  <div key={ex.id} className="border border-gray-100 p-4 rounded-lg flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-blue-200 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">{ex.avatar}</div>
                      <div>
                        <div className="font-bold text-sm text-gray-900">{ex.name}</div>
                        <div className="text-xs text-yellow-500">★ {ex.rating} <span className="text-gray-400 ml-1">• Готов за {ex.mockDays} дн.</span></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                      <span className="font-semibold text-gray-800">{Math.round(ex.mockPrice).toLocaleString()} ₽</span>
                      <button onClick={() => handleAcceptExecutor(ex)} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700">Принять</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Чат (превью) */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Чат по заказу</h2>
            <div className="space-y-3 mb-4 bg-gray-50 p-4 rounded-xl">
              {orderMessages.map((m, i) => (
                <div key={i} className={`flex ${m.senderId === 1 ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 max-w-[80%] rounded-2xl text-sm ${m.senderId === 1 ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border rounded-tl-none border-gray-200 text-gray-800'}`}>
                    {m.text}
                    <div className={`text-[10px] mt-1 text-right ${m.senderId === 1 ? 'text-blue-200' : 'text-gray-400'}`}>{m.timestamp}</div>
                  </div>
                </div>
              ))}
              {orderMessages.length === 0 && <div className="text-sm text-gray-400 text-center">Нет сообщений.</div>}
            </div>
            <Link href="/chat" className="block w-full py-2 bg-gray-100 text-gray-700 text-center rounded-lg text-sm font-semibold hover:bg-gray-200 transition">
              Перейти в полноценный чат
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}