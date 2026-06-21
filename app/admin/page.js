"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const users = [
    { id: 1, name: 'Иван Петров', email: 'ivan@mail.ru', role: 'Исполнитель', status: 'active', joinDate: '2023-10-01', projects: 28, earnings: 385000 },
    { id: 2, name: 'Мария Сидорова', email: 'maria@mail.ru', role: 'Заказчик', status: 'active', joinDate: '2023-11-15', projects: 5, spent: 150000 },
    { id: 3, name: 'Петр Кузнецов', email: 'petr@mail.ru', role: 'Исполнитель', status: 'active', joinDate: '2023-09-20', projects: 42, earnings: 520000 },
    { id: 4, name: 'Анна Волкова', email: 'anna@mail.ru', role: 'Заказчик', status: 'active', joinDate: '2024-01-05', projects: 2, spent: 45000 },
    { id: 5, name: 'Сергей Морозов', email: 'sergey@mail.ru', role: 'Исполнитель', status: 'blocked', joinDate: '2023-08-10', projects: 15, earnings: 180000 },
    { id: 6, name: 'Елена Соколова', email: 'elena@mail.ru', role: 'Заказчик', status: 'inactive', joinDate: '2023-12-01', projects: 1, spent: 30000 },
    { id: 7, name: 'Дмитрий Лебедев', email: 'dmitry@mail.ru', role: 'Исполнитель', status: 'active', joinDate: '2023-07-15', projects: 56, earnings: 720000 },
    { id: 8, name: 'Ольга Козлова', email: 'olga@mail.ru', role: 'Заказчик', status: 'active', joinDate: '2024-01-10', projects: 3, spent: 95000 },
  ];

  const verificationQueue = [
    { id: 1, name: 'Василий П.', email: 'vasily@mail.ru', submitDate: '2024-01-20', documents: 3, status: 'pending' },
    { id: 2, name: 'Григорий М.', email: 'gregory@mail.ru', submitDate: '2024-01-19', documents: 3, status: 'pending' },
    { id: 3, name: 'Константин Р.', email: 'konstantin@mail.ru', submitDate: '2024-01-18', documents: 2, status: 'incomplete' },
    { id: 4, name: 'Владимир З.', email: 'vladimir@mail.ru', submitDate: '2024-01-17', documents: 3, status: 'pending' },
    { id: 5, name: 'Леонид К.', email: 'leonid@mail.ru', submitDate: '2024-01-16', documents: 3, status: 'pending' },
  ];

  const projects = [
    { id: 1, title: 'Ремонт кухни в квартире', status: 'active', budget: 150000, spent: 95000, progress: 65 },
    { id: 2, title: 'Покраска фасада дома', status: 'completed', budget: 120000, spent: 120000, progress: 100 },
    { id: 3, title: 'Ремонт ванной комнаты', status: 'pending', budget: 80000, spent: 0, progress: 0 },
    { id: 4, title: 'Замена электропроводки', status: 'active', budget: 200000, spent: 150000, progress: 75 },
  ];

  const systemStats = {
    totalUsers: 1247,
    newToday: 12,
    onVerification: 34,
    activeProjects: 156,
    totalTransactions: 15420000,
    platformCommission: 1542000,
    activeNow: 234,
    lastUpdate: '2024-01-20 14:35:00',
  };

  const activityLog = [
    { id: 1, action: 'Новый пользователь', details: 'Ольга К. зарегистрировалась как заказчик', time: '14:32', icon: '📝' },
    { id: 2, action: 'Проект завершен', details: 'Проект "Ремонт кухни" выполнен и оплачен', time: '14:15', icon: '✅' },
    { id: 3, action: 'Жалоба', details: 'Новая жалоба от пользователя на исполнителя', time: '13:48', icon: '⚠️' },
    { id: 4, action: 'Верификация', details: 'Документы Петра К. одобрены', time: '13:20', icon: '✔️' },
    { id: 5, action: 'Платёж', details: 'Выплачено 50 000 ₽ исполнителю', time: '12:56', icon: '💰' },
    { id: 6, action: 'Блокировка', details: 'Пользователь заблокирован за нарушение правил', time: '12:30', icon: '🚫' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      case 'blocked':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'incomplete':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return '🟢 Активен';
      case 'inactive':
        return '⚪ Неактивен';
      case 'blocked':
        return '🔴 Заблокирован';
      case 'pending':
        return '🟡 На проверке';
      case 'completed':
        return '✅ Завершен';
      case 'incomplete':
        return '🟠 Неполные данные';
      default:
        return status;
    }
  };

  return (
    <ProtectedRoute requiredRoles={['admin']}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">⚙️ Администратор</h1>
          <p className="text-gray-600">Управление платформой RemPro</p>
          <p className="text-xs text-gray-500 mt-2">Последнее обновление: {systemStats.lastUpdate}</p>
        </div>

        {/* Вкладки */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {['dashboard', 'users', 'verification', 'reports', 'system', 'projects'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'dashboard' && '📊 Обзор'}
                {tab === 'users' && '👥 Пользователи'}
                {tab === 'verification' && '✔️ Верификация'}
                {tab === 'reports' && '📈 Отчёты'}
                {tab === 'system' && '🔧 Система'}
                {tab === 'projects' && '📁 Проекты'}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* ВКЛАДКА: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Обзор системы</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Всего пользователей', value: systemStats.totalUsers, icon: '👥', color: 'bg-blue-50' },
                      { label: 'Новых сегодня', value: systemStats.newToday, icon: '📈', color: 'bg-green-50' },
                      { label: 'На верификации', value: systemStats.onVerification, icon: '✔️', color: 'bg-yellow-50' },
                      { label: 'Активных проектов', value: systemStats.activeProjects, icon: '📁', color: 'bg-purple-50' },
                    ].map((stat, idx) => (
                      <div key={idx} className={`${stat.color} rounded-xl p-6 border border-gray-200`}>
                        <p className="text-3xl mb-2">{stat.icon}</p>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Финансовая статистика */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">💰 Финансы</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Всего транзакций</span>
                        <span className="font-bold text-gray-900">{(systemStats.totalTransactions / 1000000).toFixed(1)}M ₽</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Комиссия платформы</span>
                        <span className="font-bold text-green-700">{(systemStats.platformCommission / 1000).toFixed(0)}K ₽</span>
                      </div>
                      <div className="h-px bg-green-200 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Средняя комиссия</span>
                        <span className="font-bold text-gray-900">10%</span>
                      </div>
                    </div>
                  </div>

                  {/* Активность в реальном времени */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">🟢 Активность сейчас</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Пользователей онлайн</span>
                        <span className="font-bold text-blue-700">{systemStats.activeNow}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Активных сессий</span>
                        <span className="font-bold text-gray-900">342</span>
                      </div>
                      <div className="h-px bg-blue-200 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Среднее время сессии</span>
                        <span className="font-bold text-gray-900">28 мин</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Лог активности */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Последняя активность</h3>
                  <div className="space-y-3">
                    {activityLog.map(log => (
                      <div key={log.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <span className="text-2xl flex-shrink-0">{log.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900">{log.action}</p>
                          <p className="text-sm text-gray-600">{log.details}</p>
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ВКЛАДКА: ПОЛЬЗОВАТЕЛИ */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Управление пользователями</h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Пользователь</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Роль</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Дата входа</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Статус</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-semibold text-gray-900">{u.name}</p>
                              <p className="text-xs text-gray-600">{u.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-gray-600">{u.role}</span>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {new Date(u.joinDate).toLocaleDateString('ru-RU')}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(u.status)}`}>
                              {getStatusLabel(u.status)}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => {
                                setSelectedUser(u);
                                setShowUserModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-700 font-medium text-xs"
                            >
                              Управление
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ВКЛАДКА: ВЕРИФИКАЦИЯ */}
            {activeTab === 'verification' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Верификация документов</h2>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center mb-6">
                  <p className="text-yellow-700">⏳ <strong>Ожидают проверки: {verificationQueue.length} исполнителей</strong></p>
                </div>

                <div className="space-y-3">
                  {verificationQueue.map(user => (
                    <div
                      key={user.id}
                      className="p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-yellow-300 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(user.status)}`}>
                          {getStatusLabel(user.status)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        <span>📅 Отправлено: {new Date(user.submitDate).toLocaleDateString('ru-RU')}</span>
                        <span>📄 Документов: {user.documents}/3</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => alert('Требует подключения системы просмотра документов')}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                        >
                          👁️ Просмотреть
                        </button>
                        <button
                          onClick={() => alert('Документы одобрены')}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                        >
                          ✅ Одобрить
                        </button>
                        <button
                          onClick={() => alert('Требует подключения системы уведомлений')}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                        >
                          ❌ Отклонить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ВКЛАДКА: ОТЧЁТЫ */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Отчёты и аналитика</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                    <h3 className="font-bold text-gray-900 mb-4">📈 График доходов</h3>
                    <div className="bg-white rounded h-48 flex items-center justify-center text-gray-500">
                      [График требует Chart.js]
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
                    <h3 className="font-bold text-gray-900 mb-4">📊 Распределение ролей</h3>
                    <div className="bg-white rounded h-48 flex items-center justify-center text-gray-500">
                      [Диаграмма требует Chart.js]
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">📥 Экспорт отчётов</h3>
                  <div className="flex gap-3">
                    <button disabled className="px-6 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed font-medium">
                      📊 Экспорт Excel
                    </button>
                    <button disabled className="px-6 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed font-medium">
                      📄 Экспорт PDF
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ВКЛАДКА: СИСТЕМА */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Состояние системы</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'База данных', status: 'healthy', latency: '2ms' },
                    { name: 'API сервер', status: 'healthy', latency: '45ms' },
                    { name: 'Хранилище', status: 'warning', latency: '120ms' },
                    { name: 'Уведомления', status: 'healthy', latency: '150ms' },
                  ].map((service, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-900">{service.name}</h4>
                        <span className={`w-3 h-3 rounded-full ${
                          service.status === 'healthy' ? 'bg-green-500' :
                          service.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Статус: <strong>{service.status === 'healthy' ? '🟢 Работает' : '🟡 Проблема'}</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                        Задержка: <strong>{service.latency}</strong>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ВКЛАДКА: ПРОЕКТЫ */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Управление проектами</h2>

                <div className="grid grid-cols-1 gap-4">
                  {projects.map(project => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-1">{project.title}</h4>
                          <p className="text-sm text-gray-600">
                            Бюджет: {project.budget.toLocaleString('ru-RU')} ₽ | Потрачено: {project.spent.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(project.status)}`}>
                          {project.status === 'active' && '🟢 Активен'}
                          {project.status === 'completed' && '✅ Завершен'}
                          {project.status === 'pending' && '🟡 На проверке'}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-600">Прогресс</span>
                          <span className="text-xs font-bold text-blue-600">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-gray-500">Нажмите для просмотра деталей →</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Модальное окно управления пользователем */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md shadow-lg w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Управление пользователем</h3>
              <p className="text-gray-600 mb-6">{selectedUser.name}</p>

              <div className="space-y-3 mb-6">
                <button
                  onClick={() => alert('Требует подключения к системе управления')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  📝 Изменить данные
                </button>
                <button
                  onClick={() => alert('Требует подключения к системе управления')}
                  className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
                >
                  🔒 {selectedUser.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
                </button>
                <button
                  onClick={() => alert('Требует подключения к системе отправки уведомлений')}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
                >
                  📧 Отправить сообщение
                </button>
              </div>

              <button
                onClick={() => setShowUserModal(false)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                ❌ Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}