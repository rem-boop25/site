"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function EstimatesPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newEstimate, setNewEstimate] = useState({
    projectName: '',
    clientName: '',
    description: '',
  });

  const estimates = [
    {
      id: 1,
      number: 'EST-2024-001',
      project: 'Ремонт кухни в квартире',
      client: 'Александр С.',
      createdDate: '2024-01-15',
      status: 'approved',
      totalAmount: 150000,
      items: [
        { id: 1, category: 'Демонтажные работы', description: 'Демонтаж старой плитки', qty: 1, price: 15000, total: 15000 },
        { id: 2, category: 'Материалы', description: 'Керамическая плитка класса А', qty: 20, price: 800, total: 16000 },
        { id: 3, category: 'Материалы', description: 'Клей для плитки премиум', qty: 50, price: 400, total: 20000 },
        { id: 4, category: 'Монтажные работы', description: 'Укладка плитки', qty: 1, price: 60000, total: 60000 },
        { id: 5, category: 'Монтажные работы', description: 'Затирка швов', qty: 1, price: 15000, total: 15000 },
        { id: 6, category: 'Прочее', description: 'Доставка материалов', qty: 1, price: 8000, total: 8000 },
        { id: 7, category: 'Прочее', description: 'Демонтаж мусора', qty: 1, price: 6000, total: 6000 },
      ],
      notes: 'Работы выполняются с использованием материалов премиум класса. Гарантия на работы - 2 года.',
      approvalDate: '2024-01-20',
      validUntil: '2024-04-15',
    },
    {
      id: 2,
      number: 'EST-2024-002',
      project: 'Покраска фасада',
      client: 'ООО Стройка',
      createdDate: '2024-01-18',
      status: 'pending',
      totalAmount: 120000,
      items: [
        { id: 1, category: 'Материалы', description: 'Краска акриловая 5л (x2)', qty: 2, price: 3500, total: 7000 },
        { id: 2, category: 'Материалы', description: 'Грунтовка', qty: 2, price: 2000, total: 4000 },
        { id: 3, category: 'Материалы', description: 'Малярный скотч и защита', qty: 1, price: 1500, total: 1500 },
        { id: 4, category: 'Работы', description: 'Подготовка поверхности', qty: 1, price: 35000, total: 35000 },
        { id: 5, category: 'Работы', description: 'Грунтовка фасада', qty: 1, price: 20000, total: 20000 },
        { id: 6, category: 'Работы', description: 'Покраска (2 слоя)', qty: 1, price: 50000, total: 50000 },
        { id: 7, category: 'Прочее', description: 'Аренда лесов', qty: 1, price: 2000, total: 2000 },
      ],
      notes: 'Смету необходимо согласовать с заказчиком перед началом работ.',
      approvalDate: null,
      validUntil: '2024-02-18',
    },
    {
      id: 3,
      number: 'EST-2024-003',
      project: 'Ремонт ванной',
      client: 'Мария В.',
      createdDate: '2024-01-20',
      status: 'revision',
      totalAmount: 80000,
      items: [
        { id: 1, category: 'Материалы', description: 'Гидроизоляция', qty: 1, price: 5000, total: 5000 },
        { id: 2, category: 'Материалы', description: 'Плитка для ванной', qty: 15, price: 600, total: 9000 },
        { id: 3, category: 'Работы', description: 'Гидроизоляция поверхности', qty: 1, price: 20000, total: 20000 },
        { id: 4, category: 'Работы', description: 'Укладка плитки', qty: 1, price: 25000, total: 25000 },
        { id: 5, category: 'Работы', description: 'Монтаж ванны и сантехники', qty: 1, price: 15000, total: 15000 },
        { id: 6, category: 'Прочее', description: 'Прочие материалы', qty: 1, price: 6000, total: 6000 },
      ],
      notes: 'Требуется уточнить размеры помещения. Смета требует корректировки.',
      approvalDate: null,
      validUntil: '2024-02-20',
    },
    {
      id: 4,
      number: 'EST-2024-004',
      project: 'Замена электропроводки',
      client: 'Иван Т.',
      createdDate: '2024-01-10',
      status: 'completed',
      totalAmount: 200000,
      items: [
        { id: 1, category: 'Материалы', description: 'Кабель ВВГ 2.5 (100м)', qty: 1, price: 8000, total: 8000 },
        { id: 2, category: 'Материалы', description: 'Кабель ВВГ 4 (50м)', qty: 1, price: 6000, total: 6000 },
        { id: 3, category: 'Материалы', description: 'Выключатели и розетки', qty: 20, price: 400, total: 8000 },
        { id: 4, category: 'Материалы', description: 'Автоматы и УЗО', qty: 1, price: 15000, total: 15000 },
        { id: 5, category: 'Материалы', description: 'Распределительные коробки', qty: 1, price: 3000, total: 3000 },
        { id: 6, category: 'Работы', description: 'Демонтаж старой проводки', qty: 1, price: 35000, total: 35000 },
        { id: 7, category: 'Работы', description: 'Прокладка новой проводки', qty: 1, price: 80000, total: 80000 },
        { id: 8, category: 'Работы', description: 'Тестирование и сдача', qty: 1, price: 25000, total: 25000 },
        { id: 9, category: 'Прочее', description: 'Акт проверки электросети', qty: 1, price: 5000, total: 5000 },
      ],
      notes: 'Смета согласована и работа выполнена. Акт передачи подписан.',
      approvalDate: '2024-01-12',
      validUntil: null,
    },
  ];

  const filteredEstimates = estimates.filter(est => {
    if (filter === 'all') return true;
    return est.status === filter;
  });

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved':
        return { label: 'Одобрена', color: 'bg-green-50 text-green-700 border-green-200', icon: '✅' };
      case 'pending':
        return { label: 'Ожидание', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: '⏳' };
      case 'revision':
        return { label: 'На доработку', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: '🔄' };
      case 'rejected':
        return { label: 'Отклонена', color: 'bg-red-50 text-red-700 border-red-200', icon: '❌' };
      case 'completed':
        return { label: 'Выполнена', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: '🏁' };
      default:
        return { label: status, color: 'bg-gray-50 text-gray-700 border-gray-200', icon: '❓' };
    }
  };

  const handleCreateEstimate = (e) => {
    e.preventDefault();
    // Требует: сохранение на бэк, генерация номера, отправка уведомления
    alert('Смета создана и отправлена клиенту');
    setNewEstimate({ projectName: '', clientName: '', description: '' });
    setShowCreateModal(false);
  };

  return (
    <ProtectedRoute requiredRoles={['manager', 'admin']}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Сметы</h1>
            <p className="text-gray-600">Управление сметами и расчётами проектов</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold"
          >
            + Новая смета
          </button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Всего смет', value: estimates.length, icon: '📋' },
            { label: 'На согласовании', value: estimates.filter(e => e.status === 'pending').length, icon: '⏳' },
            { label: 'Одобрено', value: estimates.filter(e => e.status === 'approved').length, icon: '✅' },
            { label: 'Сумма', value: `${(estimates.reduce((sum, e) => sum + e.totalAmount, 0) / 1000000).toFixed(1)}M ₽`, icon: '💰' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Фильтры */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {[
            { value: 'all', label: 'Все сметы' },
            { value: 'pending', label: '⏳ На согласовании' },
            { value: 'approved', label: '✅ Одобрено' },
            { value: 'revision', label: '🔄 На доработку' },
            { value: 'completed', label: '🏁 Выполнено' },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Список смет */}
        <div className="space-y-4">
          {filteredEstimates.map(estimate => {
            const statusInfo = getStatusInfo(estimate.status);
            const totalItems = estimate.items.length;
            return (
              <div
                key={estimate.id}
                onClick={() => setSelectedEstimate(selectedEstimate === estimate.id ? null : estimate.id)}
                className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition p-6 cursor-pointer"
              >
                {/* Верхняя часть */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{estimate.number}</h3>
                      <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${statusInfo.color}`}>
                        {statusInfo.icon} {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-gray-600">📁 {estimate.project}</p>
                    <p className="text-sm text-gray-600">👤 {estimate.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {estimate.totalAmount.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-sm text-gray-600">
                      {estimate.items.length} позиций
                    </p>
                  </div>
                </div>

                {/* Информация о датах */}
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                  <span>📅 Создана: {new Date(estimate.createdDate).toLocaleDateString('ru-RU')}</span>
                  {estimate.validUntil && (
                    <span>⏰ Действительна до: {new Date(estimate.validUntil).toLocaleDateString('ru-RU')}</span>
                  )}
                  {estimate.approvalDate && (
                    <span>✅ Одобрена: {new Date(estimate.approvalDate).toLocaleDateString('ru-RU')}</span>
                  )}
                </div>

                {/* Развёрнутые детали */}
                {selectedEstimate === estimate.id && (
                  <div className="border-t border-gray-200 pt-6 mt-4 space-y-6">
                    {/* Таблица позиций */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Состав сметы</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-3 font-semibold text-gray-900">Категория</th>
                              <th className="text-left py-2 px-3 font-semibold text-gray-900">Описание</th>
                              <th className="text-center py-2 px-3 font-semibold text-gray-900">Кол-во</th>
                              <th className="text-right py-2 px-3 font-semibold text-gray-900">Цена</th>
                              <th className="text-right py-2 px-3 font-semibold text-gray-900">Итого</th>
                            </tr>
                          </thead>
                          <tbody>
                            {estimate.items.map(item => (
                              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-2 px-3 text-gray-600">{item.category}</td>
                                <td className="py-2 px-3 text-gray-900">{item.description}</td>
                                <td className="py-2 px-3 text-center text-gray-600">{item.qty}</td>
                                <td className="py-2 px-3 text-right text-gray-600">{item.price.toLocaleString('ru-RU')} ₽</td>
                                <td className="py-2 px-3 text-right font-semibold text-gray-900">{item.total.toLocaleString('ru-RU')} ₽</td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50">
                              <td colSpan="4" className="py-3 px-3 text-right font-bold text-gray-900">
                                ИТОГО:
                              </td>
                              <td className="py-3 px-3 text-right font-bold text-lg text-blue-600">
                                {estimate.totalAmount.toLocaleString('ru-RU')} ₽
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Примечания */}
                    {estimate.notes && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">📝 Примечания</h4>
                        <p className="text-gray-600 p-3 bg-gray-50 rounded-lg text-sm">{estimate.notes}</p>
                      </div>
                    )}

                    {/* Кнопки действий */}
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => alert('Требует подключения к системе генерации PDF')}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                      >
                        📥 Скачать PDF
                      </button>
                      <button
                        onClick={() => alert('Требует подключения к системе отправки уведомлений')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                      >
                        📧 Отправить клиенту
                      </button>
                      {estimate.status === 'pending' && (
                        <>
                          <button
                            onClick={() => alert('Смета одобрена')}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                          >
                            ✅ Одобрить
                          </button>
                          <button
                            onClick={() => alert('Смета отклонена')}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                          >
                            ❌ Отклонить
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Модальное окно создания сметы */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md shadow-lg w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Создать смету</h3>

              <form onSubmit={handleCreateEstimate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Название проекта</label>
                  <input
                    type="text"
                    value={newEstimate.projectName}
                    onChange={(e) => setNewEstimate({ ...newEstimate, projectName: e.target.value })}
                    placeholder="Ремонт кухни"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">ФИО клиента</label>
                  <input
                    type="text"
                    value={newEstimate.clientName}
                    onChange={(e) => setNewEstimate({ ...newEstimate, clientName: e.target.value })}
                    placeholder="Александр С."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Описание</label>
                  <textarea
                    value={newEstimate.description}
                    onChange={(e) => setNewEstimate({ ...newEstimate, description: e.target.value })}
                    placeholder="Опишите работы и материалы"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <p className="text-xs text-gray-500">Требует подключения конструктора смет и расчётов</p>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    ✅ Создать
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    ❌ Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}