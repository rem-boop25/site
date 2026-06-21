"use client";

import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useState } from 'react';

export default function MyTasksPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');

  const tasks = [
    {
      id: 1,
      title: 'Демонтаж старой плитки',
      status: 'completed',
      project: 'Ремонт кухни в квартире',
      projectId: 1,
      date: '2024-01-20',
      deadline: '2024-01-21',
      completedDate: '2024-01-20',
      budget: 15000,
      spent: 15000,
      description: 'Полный демонтаж керамической плитки со стен кухни с использованием специального инструмента',
      client: 'Александр С.',
      priority: 'normal',
      progress: 100,
      attachments: 2,
      comments: 3,
      checklist: [
        { id: 1, text: 'Подготовка инструментов', completed: true },
        { id: 2, text: 'Демонтаж плитки', completed: true },
        { id: 3, text: 'Очистка поверхности', completed: true },
        { id: 4, text: 'Фотографирование', completed: true },
      ],
    },
    {
      id: 2,
      title: 'Укладка новой плитки',
      status: 'active',
      project: 'Ремонт кухни в квартире',
      projectId: 1,
      date: '2024-01-21',
      deadline: '2024-02-05',
      completedDate: null,
      budget: 35000,
      spent: 18000,
      description: 'Укладка качественной керамической плитки на стены и пол кухни с использованием клея премиум класса',
      client: 'Александр С.',
      priority: 'high',
      progress: 52,
      attachments: 5,
      comments: 8,
      checklist: [
        { id: 1, text: 'Подготовка поверхности', completed: true },
        { id: 2, text: 'Нанесение клея', completed: true },
        { id: 3, text: 'Укладка плитки на стены', completed: false },
        { id: 4, text: 'Укладка плитки на пол', completed: false },
        { id: 5, text: 'Затирка швов', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Установка новой мебели',
      status: 'pending',
      project: 'Ремонт кухни в квартире',
      projectId: 1,
      date: '2024-01-25',
      deadline: '2024-02-10',
      completedDate: null,
      budget: 50000,
      spent: 0,
      description: 'Установка новой кухонной мебели, включая шкафчики, столешницу и встроенную технику',
      client: 'Александр С.',
      priority: 'normal',
      progress: 0,
      attachments: 3,
      comments: 2,
      checklist: [
        { id: 1, text: 'Доставка мебели', completed: false },
        { id: 2, text: 'Сборка каркаса', completed: false },
        { id: 3, text: 'Установка фасадов', completed: false },
        { id: 4, text: 'Монтаж столешницы', completed: false },
      ],
    },
    {
      id: 4,
      title: 'Электромонтажные работы',
      status: 'pending',
      project: 'Замена электропроводки',
      projectId: 4,
      date: '2024-02-01',
      deadline: '2024-02-15',
      completedDate: null,
      budget: 80000,
      spent: 0,
      description: 'Прокладка новой электропроводки в стенах, установка розеток и выключателей',
      client: 'Иван Т.',
      priority: 'high',
      progress: 0,
      attachments: 4,
      comments: 1,
      checklist: [
        { id: 1, text: 'Согласование схемы', completed: false },
        { id: 2, text: 'Прокладка кабелей', completed: false },
        { id: 3, text: 'Установка розеток', completed: false },
        { id: 4, text: 'Тестирование системы', completed: false },
      ],
    },
    {
      id: 5,
      title: 'Гидроизоляция ванной',
      status: 'completed',
      project: 'Ремонт ванной комнаты',
      projectId: 2,
      date: '2024-01-10',
      deadline: '2024-01-15',
      completedDate: '2024-01-14',
      budget: 25000,
      spent: 25000,
      description: 'Нанесение гидроизоляционного покрытия на все поверхности ванной комнаты',
      client: 'Мария В.',
      priority: 'normal',
      progress: 100,
      attachments: 2,
      comments: 4,
      checklist: [
        { id: 1, text: 'Подготовка поверхности', completed: true },
        { id: 2, text: 'Нанесение первого слоя', completed: true },
        { id: 3, text: 'Нанесение второго слоя', completed: true },
        { id: 4, text: 'Проверка герметичности', completed: true },
      ],
    },
    {
      id: 6,
      title: 'Укладка паркета',
      status: 'active',
      project: 'Отделка жилого дома',
      projectId: 5,
      date: '2024-02-03',
      deadline: '2024-02-20',
      completedDate: null,
      budget: 45000,
      spent: 22000,
      description: 'Укладка паркета премиум класса в жилых комнатах с последующей обработкой',
      client: 'Петр Р.',
      priority: 'normal',
      progress: 48,
      attachments: 6,
      comments: 5,
      checklist: [
        { id: 1, text: 'Подготовка основания', completed: true },
        { id: 2, text: 'Укладка паркета 1 комната', completed: true },
        { id: 3, text: 'Укладка паркета 2 комната', completed: false },
        { id: 4, text: 'Шлифовка поверхности', completed: false },
        { id: 5, text: 'Лакирование', completed: false },
      ],
    },
  ];

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { label: 'В работе', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: '🔄' };
      case 'pending':
        return { label: 'Ожидание', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: '⏳' };
      case 'completed':
        return { label: 'Завершена', color: 'bg-green-50 text-green-700 border-green-200', icon: '✅' };
      default:
        return { label: status, color: 'bg-gray-50 text-gray-700 border-gray-200', icon: '❓' };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'high':
        return { label: 'Высокий', color: 'text-red-600', icon: '🔴' };
      case 'normal':
        return { label: 'Обычный', color: 'text-yellow-600', icon: '🟡' };
      case 'low':
        return { label: 'Низкий', color: 'text-green-600', icon: '🟢' };
      default:
        return { label: priority, color: 'text-gray-600', icon: '⚪' };
    }
  };

  const currentTask = selectedTask ? tasks.find(t => t.id === selectedTask) : null;
  const stats = {
    total: tasks.length,
    active: tasks.filter(t => t.status === 'active').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    earnedToday: 45000,
    hoursSpent: 32,
  };

  return (
    <ProtectedRoute requiredRoles={['executor']}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">✅ Мои задачи</h1>
          <p className="text-gray-600">Управление задачами и проектами</p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Всего задач', value: stats.total, icon: '📋' },
            { label: 'В работе', value: stats.active, icon: '🔄', color: 'bg-yellow-50' },
            { label: 'Завершены', value: stats.completed, icon: '✅', color: 'bg-green-50' },
            { label: 'Ожидание', value: stats.pending, icon: '⏳', color: 'bg-blue-50' },
            { label: 'Заработано сегодня', value: `${(stats.earnedToday / 1000).toFixed(0)}К ₽`, icon: '💰', color: 'bg-purple-50' },
          ].map((stat, idx) => (
            <div key={idx} className={`rounded-2xl border border-gray-200 p-4 shadow-sm ${stat.color || 'bg-white'}`}>
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Фильтры */}
        <div className="mb-8 flex gap-2 flex-wrap">
          {[
            { value: 'all', label: 'Все задачи' },
            { value: 'active', label: '🔄 В работе' },
            { value: 'completed', label: '✅ Завершены' },
            { value: 'pending', label: '⏳ Ожидание' },
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

        {/* Список задач */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {filteredTasks.map(task => {
              const statusInfo = getStatusInfo(task.status);
              const priorityInfo = getPriorityInfo(task.priority);
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task.id === selectedTask ? null : task.id)}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition p-6 cursor-pointer"
                >
                  {/* Заголовок */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${priorityInfo.color}`}>
                          {priorityInfo.icon} {priorityInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Информация о проекте */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>📁 {task.project}</span>
                    <span>👤 {task.client}</span>
                  </div>

                  {/* Прогресс */}
                  {task.status !== 'pending' && (
                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium text-gray-600">Прогресс</span>
                        <span className="text-xs font-bold text-blue-600">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Финансовая информация */}
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <p className="text-gray-600">Бюджет: <span className="font-bold text-gray-900">{task.spent.toLocaleString('ru-RU')} / {task.budget.toLocaleString('ru-RU')} ₽</span></p>
                      <p className="text-gray-600 text-xs">до {task.deadline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">💬 {task.comments} | 📎 {task.attachments}</p>
                    </div>
                  </div>

                  {/* Развёрнутые детали */}
                  {selectedTask === task.id && (
                    <div className="border-t border-gray-200 mt-4 pt-4 space-y-4">
                      <div>
                        <p className="font-bold text-gray-900 mb-2">Описание</p>
                        <p className="text-gray-600 text-sm">{task.description}</p>
                      </div>

                      {/* Чеклист */}
                      <div>
                        <p className="font-bold text-gray-900 mb-2">
                          Чеклист ({task.checklist.filter(c => c.completed).length}/{task.checklist.length})
                        </p>
                        <div className="space-y-2">
                          {task.checklist.map(item => (
                            <label key={item.id} className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.completed}
                                readOnly
                                className="w-4 h-4 accent-blue-600"
                              />
                              <span className={item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}>
                                {item.text}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Кнопки действий */}
                      <div className="flex gap-2 pt-4 border-t border-gray-200">
                        {task.status === 'active' && (
                          <>
                            <button
                              onClick={() => {
                                setUpdateStatus('completed');
                                setShowUpdateModal(true);
                              }}
                              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                            >
                              ✅ Завершить
                            </button>
                            <button disabled className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium text-sm">
                              💬 Сообщение
                            </button>
                          </>
                        )}
                        {task.status === 'pending' && (
                          <button
                            onClick={() => {
                              setUpdateStatus('active');
                              setShowUpdateModal(true);
                            }}
                            className="flex-1 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium text-sm"
                          >
                            🔄 Начать работу
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Боковая панель - Календарь */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">📅 График</h3>

              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-semibold">Срок сегодня</p>
                  <p className="font-bold text-gray-900 mt-1">0 задач</p>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-xs text-yellow-600 font-semibold">Срок на этой неделе</p>
                  <p className="font-bold text-gray-900 mt-1">2 задачи</p>
                </div>

                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-xs text-red-600 font-semibold">Просрочены</p>
                  <p className="font-bold text-gray-900 mt-1">0 задач</p>
                </div>

                <button disabled className="w-full mt-4 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium text-sm">
                  📈 История работ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно обновления статуса */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {updateStatus === 'completed' ? '✅ Завершить задачу?' : '🔄 Начать задачу?'}
              </h3>
              <p className="text-gray-600 mb-6">
                {updateStatus === 'completed'
                  ? 'Убедитесь, что вся работа выполнена корректно'
                  : 'Вы начнёте работу по этой задаче'}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Отмена
                </button>
                <button
                  onClick={() => {
                    setShowUpdateModal(false);
                    alert(`Задача обновлена на статус: ${updateStatus}`);
                  }}
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition font-medium ${
                    updateStatus === 'completed'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {updateStatus === 'completed' ? '✅ Да, завершить' : '🔄 Да, начать'}
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredTasks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Нет задач</h3>
            <p className="text-gray-600">Все ваши задачи выполнены или нет новых заказов</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}