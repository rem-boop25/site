"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function RequestsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const requests = [
    {
      id: 1,
      title: 'Ремонт кухни в квартире',
      status: 'active',
      budget: 150000,
      spent: 95000,
      category: 'Отделка',
      city: 'Москва',
      description: 'Требуется полный ремонт кухни: замена плитки, установка новой мебели, электромонтажные работы и сантехника.',
      createdDate: '2024-01-15',
      startDate: '2024-01-20',
      dueDate: '2024-03-15',
      progress: 65,
      executors: [
        { id: 1, name: 'Иван П.', role: 'Плиточник', avatar: 'ИП', rating: 4.9 },
        { id: 2, name: 'Петр К.', role: 'Столяр', avatar: 'ПК', rating: 4.8 },
        { id: 3, name: 'Алексей М.', role: 'Электрик', avatar: 'АМ', rating: 4.7 },
      ],
      tasks: [
        { id: 1, title: 'Демонтаж старой плитки', status: 'completed', executor: 'Иван П.' },
        { id: 2, title: 'Укладка новой плитки', status: 'active', executor: 'Иван П.' },
        { id: 3, title: 'Установка мебели', status: 'pending', executor: 'Петр К.' },
      ],
      messages: 24,
      documents: 5,
    },
    {
      id: 2,
      title: 'Покраска фасада дома',
      status: 'completed',
      budget: 120000,
      spent: 120000,
      category: 'Малярные работы',
      city: 'Санкт-Петербург',
      description: 'Полная покраска внешнего фасада двухэтажного дома с предварительной подготовкой поверхности.',
      createdDate: '2023-09-01',
      startDate: '2023-09-15',
      dueDate: '2023-10-31',
      progress: 100,
      executors: [
        { id: 1, name: 'Иван П.', role: 'Маляр', avatar: 'ИП', rating: 4.9 },
        { id: 2, name: 'Петр К.', role: 'Маляр', avatar: 'ПК', rating: 4.8 },
      ],
      tasks: [
        { id: 1, title: 'Подготовка поверхности', status: 'completed', executor: 'Иван П.' },
        { id: 2, title: 'Грунтовка', status: 'completed', executor: 'Петр К.' },
        { id: 3, title: 'Первый слой краски', status: 'completed', executor: 'Иван П.' },
        { id: 4, title: 'Второй слой краски', status: 'completed', executor: 'Иван П.' },
      ],
      messages: 18,
      documents: 8,
    },
    {
      id: 3,
      title: 'Ремонт ванной комнаты',
      status: 'pending',
      budget: 80000,
      spent: 0,
      category: 'Сантехника',
      city: 'Москва',
      description: 'Требуется ремонт ванной: гидроизоляция, укладка плитки, установка сантехники и аксессуаров.',
      createdDate: '2024-02-01',
      startDate: '2024-04-01',
      dueDate: '2024-05-15',
      progress: 0,
      executors: [],
      tasks: [],
      messages: 0,
      documents: 2,
    },
    {
      id: 4,
      title: 'Замена электропроводки',
      status: 'active',
      budget: 200000,
      spent: 150000,
      category: 'Электрика',
      city: 'Екатеринбург',
      description: 'Полная замена электропроводки в жилом доме. Требуется согласование с инспектором.',
      createdDate: '2024-01-20',
      startDate: '2024-01-28',
      dueDate: '2024-03-20',
      progress: 75,
      executors: [
        { id: 1, name: 'Алексей М.', role: 'Электрик', avatar: 'АМ', rating: 4.7 },
        { id: 2, name: 'Сергей В.', role: 'Электромонтёр', avatar: 'СВ', rating: 4.6 },
      ],
      tasks: [
        { id: 1, title: 'Демонтаж старой проводки', status: 'completed', executor: 'Алексей М.' },
        { id: 2, title: 'Укладка новой проводки', status: 'active', executor: 'Сергей В.' },
        { id: 3, title: 'Тестирование системы', status: 'pending', executor: 'Алексей М.' },
        { id: 4, title: 'Получение акта инспектора', status: 'pending', executor: 'Алексей М.' },
      ],
      messages: 32,
      documents: 6,
    },
    {
      id: 5,
      title: 'Установка кондиционера',
      status: 'cancelled',
      budget: 45000,
      spent: 0,
      category: 'Отопление',
      city: 'Москва',
      description: 'Отменён заказчиком',
      createdDate: '2024-01-10',
      startDate: null,
      dueDate: null,
      progress: 0,
      executors: [],
      tasks: [],
      messages: 3,
      documents: 1,
    },
  ];

  const filteredRequests = requests.filter(req => {
    if (filter !== 'all' && req.status !== filter) return false;
    if (searchTerm && !req.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { label: 'В работе', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: '🔄' };
      case 'pending':
        return { label: 'Ожидание', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: '⏳' };
      case 'completed':
        return { label: 'Завершён', color: 'bg-green-50 text-green-700 border-green-200', icon: '✅' };
      case 'cancelled':
        return { label: 'Отменён', color: 'bg-red-50 text-red-700 border-red-200', icon: '❌' };
      default:
        return { label: status, color: 'bg-gray-50 text-gray-700 border-gray-200', icon: '❓' };
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'active':
        return 'bg-yellow-100 text-yellow-700';
      case 'pending':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <ProtectedRoute requiredRoles={['client']}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🛒 Мои заказы</h1>
            <p className="text-gray-600">Ваши заказы и проекты</p>
          </div>
          <Link
            href="/request-form"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold"
          >
            + Новый заказ
          </Link>
        </div>

        {/* Фильтры и поиск */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="🔍 Поиск заказов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'active', 'completed', 'cancelled'].map(status => {
              const info = status === 'all' ? { label: 'Все заказы', icon: '📋' } : getStatusInfo(status);
              return (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    filter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? '📋 Все' : `${info.icon} ${info.label}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Список заказов */}
        <div className="space-y-6">
          {filteredRequests.map(request => {
            const statusInfo = getStatusInfo(request.status);
            return (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request.id === selectedRequest ? null : request.id)}
                className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition p-6 cursor-pointer"
              >
                {/* Верхняя часть */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{request.title}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${statusInfo.color}`}>
                        {statusInfo.icon} {statusInfo.label}
                      </span>
                      <span className="text-sm text-gray-600">📁 {request.category}</span>
                      <span className="text-sm text-gray-600">📍 {request.city}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {request.spent.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-sm text-gray-600">
                      из {request.budget.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>

                {/* Прогресс */}
                {request.status !== 'pending' && request.status !== 'cancelled' && (
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Прогресс</span>
                      <span className="text-sm font-bold text-blue-600">{request.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${request.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Краткая информация */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-4">
                    {request.executors.length > 0 && (
                      <span>👥 {request.executors.length} исполнителей</span>
                    )}
                    {request.tasks.length > 0 && (
                      <span>✅ {request.tasks.filter(t => t.status === 'completed').length}/{request.tasks.length} задач</span>
                    )}
                    {request.messages > 0 && (
                      <span>💬 {request.messages} сообщений</span>
                    )}
                    <span>📄 {request.documents} документов</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {request.createdDate ? new Date(request.createdDate).toLocaleDateString('ru-RU') : 'н/д'}
                  </span>
                </div>

                {/* Развёрнутые детали */}
                {selectedRequest === request.id && (
                  <div className="border-t border-gray-200 pt-6 mt-6 space-y-6">
                    {/* Описание */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Описание</h4>
                      <p className="text-gray-600">{request.description}</p>
                    </div>

                    {/* Даты */}
                    {request.startDate && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Начало</p>
                          <p className="font-bold text-gray-900">
                            {new Date(request.startDate).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Завершение</p>
                          <p className="font-bold text-gray-900">
                            {new Date(request.dueDate).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Исполнители */}
                    {request.executors.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Исполнители</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {request.executors.map(executor => (
                            <div key={executor.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                {executor.avatar}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{executor.name}</p>
                                <p className="text-xs text-gray-600">{executor.role} • ⭐ {executor.rating}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Задачи */}
                    {request.tasks.length > 0 && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Задачи ({request.tasks.length})</h4>
                        <div className="space-y-2">
                          {request.tasks.map(task => (
                            <div key={task.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getTaskStatusColor(task.status)}`}>
                                {task.status === 'completed' && '✅'}
                                {task.status === 'active' && '🔄'}
                                {task.status === 'pending' && '⏳'}
                              </span>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{task.title}</p>
                                <p className="text-xs text-gray-600">{task.executor}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Кнопки действий */}
                    {request.status === 'active' && (
                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button disabled className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium">
                          💬 Связаться
                        </button>
                        <button disabled className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium">
                          📋 Документы
                        </button>
                        <button disabled className="flex-1 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium">
                          ⭐ Оценить
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Заказов не найдено</h3>
            <p className="text-gray-600 mb-6">Попробуйте изменить фильтры или создайте новый заказ</p>
            <Link
              href="/request-form"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold"
            >
              + Создать заказ
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}