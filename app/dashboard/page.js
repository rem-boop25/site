"use client";
import { orders } from '../data/orders';

export default function Dashboard() {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Обзорная панель</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="text-4xl">📁</div>
          <div>
            <div className="text-gray-500 text-sm">Всего заказов</div>
            <div className="text-2xl font-bold text-gray-800">124</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="text-4xl">👷</div>
          <div>
            <div className="text-gray-500 text-sm">Активных исполнителей</div>
            <div className="text-2xl font-bold text-gray-800">45</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="text-4xl">✅</div>
          <div>
            <div className="text-gray-500 text-sm">Завершенных проектов</div>
            <div className="text-2xl font-bold text-green-600">89</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 font-semibold text-gray-700">Последние заказы</div>
        <div className="divide-y divide-gray-100">
          {recentOrders.map(o => (
            <div key={o.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <div className="font-medium text-blue-600">{o.title}</div>
                <div className="text-xs text-gray-500">{o.customerName} • {o.createdAt}</div>
              </div>
              <div className="font-semibold text-gray-800">{o.budget.toLocaleString()} ₽</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}