"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id;
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Мок данные проектов
  const projectsData = {
    1: {
      id: 1,
      title: 'Ремонт кухни в квартире',
      status: 'active',
      budget: 150000,
      spent: 95000,
      progress: 65,
      category: 'Отделка',
      city: 'Москва',
      client: 'Александр С.',
      clientEmail: 'alexander@mail.ru',
      clientPhone: '+7 (999) 123-45-67',
      createdDate: '2024-01-15',
      startDate: '2024-01-20',
      dueDate: '2024-03-15',
      description: 'Полный ремонт кухни: демонтаж старой плитки, укладка новой керамической плитки, установка мебели и отделка стен.',
      executors: [
        { id: 1, name: 'Петр К.', role: 'Плиточник', avatar: 'ПК', rating: 4.9 },
        { id: 2, name: 'Иван П.', role: 'Электрик', avatar: 'ИП', rating: 4.8 },
      ],
      tasks: [
        { id: 1, title: 'Демонтаж старой плитки', status: 'completed', executor: 'Петр К.', dueDate: '2024-01-28' },
        { id: 2, title: 'Укладка новой плитки', status: 'active', executor: 'Петр К.', dueDate: '2024-02-10' },
        { id: 3, title: 'Электромонтажные работы', status: 'pending', executor: 'Иван П.', dueDate: '2024-02-15' },
        { id: 4, title: 'Установка мебели', status: 'pending', executor: 'Петр К.', dueDate: '2024-03-01' },
      ],
      expenses: [
        { id: 1, category: 'Материалы', description: 'Керамическая плитка', amount: 16000, date: '2024-01-20' },
        { id: 2, category: 'Работы', description: 'Демонтаж', amount: 15000, date: '2024-01-25' },
        { id: 3, category: 'Материалы', description: 'Клей для плитки', amount: 2000, date: '2024-01-25' },
        { id: 4, category: 'Работы', description: 'Укладка плитки (частичная)', amount: 42000, date: '2024-02-05' },
        { id: 5, category: 'Материалы', description: 'Электроматериалы', amount: 4000, date: '2024-02-10' },
      ],
      messages: 24,
      documents: [
        { id: 1, name: 'Смета', type: 'pdf', size: '2.3 MB', uploadDate: '2024-01-15' },
        { id: 2, name: 'Договор', type: 'pdf', size: '1.8 MB', uploadDate: '2024-01-16' },
        { id: 3, name: 'Фото до начала работ', type: 'zip', size: '15.4 MB', uploadDate: '2024-01-20' },
        { id: 4, name: 'Акт выполненных работ', type: 'pdf', size: '0.9 MB', uploadDate: '2024-02-10' },
      ],
      timeline: [
        { date: '2024-01-15', event: 'Проект создан' },
        { date: '2024-01-16', event: 'Договор подписан' },
        { date: '2024-01-20', event: 'Работы начались' },
        { date: '2024-01-28', event: 'Демонтаж завершен' },
        { date: '2024-02-05', event: 'Укладка плитки начата' },
      ],
    },
    2: {
      id: 2,
      title: 'Покраска фасада дома',
      status: 'completed',
      budget: 120000,
      spent: 120000,
      progress: 100,
      category: 'Малярные работы',
      city: 'Санкт-Петербург',
      client: 'ООО Стройка',
      clientEmail: 'info@stroyka.ru',
      clientPhone: '+7 (999) 234-56-78',
      createdDate: '2023-09-01',
      startDate: '2023-09-15',
      dueDate: '2023-10-31',
      description: 'Полная покраска внешнего фасада двухэтажного дома с предварительной подготовкой поверхности.',
      executors: [
        { id: 1, name: 'Иван П.', role: 'Маляр', avatar: 'ИП', rating: 4.9 },
        { id: 2, name: 'Петр К.', role: 'Маляр', avatar: 'ПК', rating: 4.8 },
      ],
      tasks: [
        { id: 1, title: 'Подготовка поверхности', status: 'completed', executor: 'Иван П.', dueDate: '2023-09-20' },
        { id: 2, title: 'Грунтовка', status: 'completed', executor: 'Петр К.', dueDate: '2023-09-25' },
        { id: 3, title: 'Первый слой краски', status: 'completed', executor: 'Иван П.', dueDate: '2023-10-01' },
        { id: 4, title: 'Второй слой краски', status: 'completed', executor: 'Иван П.', dueDate: '2023-10-10' },
      ],
      expenses: [
        { id: 1, category: 'Материалы', description: 'Краска 20л', amount: 7000, date: '2023-09-15' },
        { id: 2, category: 'Работы', description: 'Подготовка', amount: 35000, date: '2023-09-20' },
        { id: 3, category: 'Работы', description: 'Покраска', amount: 70000, date: '2023-10-01' },
        { id: 4, category: 'Материалы', description: 'Грунтовка', amount: 4000, date: '2023-09-18' },
        { id: 5, category: 'Материалы', description: 'Вспомогательные материалы', amount: 4000, date: '2023-09-20' },
      ],
      messages: 18,
      documents: [
        { id: 1, name: 'Смета', type: 'pdf', size: '1.2 MB', uploadDate: '2023-09-01' },
        { id: 2, name: 'Договор', type: 'pdf', size: '1.5 MB', uploadDate: '2023-09-02' },
        { id: 3, name: 'Акт выполненных работ', type: 'pdf', size: '1.1 MB', uploadDate: '2023-10-31' },
      ],
      timeline: [
        { date: '2023-09-01', event: 'Проект создан' },
        { date: '2023-09-15', event: 'Работы начались' },
        { date: '2023-10-31', event: 'Проект завершен' },
      ],
    },
    3: {
      id: 3,
      title: 'Ремонт ванной комнаты',
      status: 'pending',
      budget: 80000,
      spent: 0,
      progress: 0,
      category: 'Сантехника',
      city: 'Москва',
      client: 'Мария В.',
      clientEmail: 'maria@mail.ru',
      clientPhone: '+7 (999) 345-67-89',
      createdDate: '2024-02-01',
      startDate: '2024-04-01',
      dueDate: '2024-05-15',
      description: 'Требуется ремонт ванной: гидроизоляция, укладка плитки, установка сантехники и аксессуаров.',
      executors: [],
      tasks: [],
      expenses: [],
      messages: 3,
      documents: [
        { id: 1, name: 'Смета', type: 'pdf', size: '0.8 MB', uploadDate: '2024-02-01' },
      ],
      timeline: [
        { date: '2024-02-01', event: 'Проект создан' },
      ],
    },
    4: {
      id: 4,
      title: 'Замена электропроводки',
      status: 'active',
      budget: 200000,
      spent: 150000,
      progress: 75,
      category: 'Электрика',
      city: 'Екатеринбург',
      client: 'Иван Т.',
      clientEmail: 'ivan@mail.ru',
      clientPhone: '+7 (999) 456-78-90',
      createdDate: '2024-01-20',
      startDate: '2024-01-28',
      dueDate: '2024-03-20',
      description: 'Полная замена электропроводки в жилом доме. Требуется согласование с инспектором.',
      executors: [
        { id: 1, name: 'Алексей М.', role: 'Главный электрик', avatar: 'АМ', rating: 4.7 },
      ],
      tasks: [
        { id: 1, title: 'Демонтаж старой проводки', status: 'completed', executor: 'Алексей М.', dueDate: '2024-02-05' },
        { id: 2, title: 'Укладка новой проводки', status: 'active', executor: 'Алексей М.', dueDate: '2024-02-25' },
        { id: 3, title: 'Тестирование системы', status: 'pending', executor: 'Алексей М.', dueDate: '2024-03-10' },
      ],
      expenses: [
        { id: 1, category: 'Материалы', description: 'Кабель ВВГ', amount: 14000, date: '2024-01-28' },
        { id: 2, category: 'Работы', description: 'Демонтаж', amount: 35000, date: '2024-02-05' },
        { id: 3, category: 'Работы', description: 'Прокладка кабелей', amount: 80000, date: '2024-02-15' },
        { id: 4, category: 'Материалы', description: 'Автоматы и УЗО', amount: 15000, date: '2024-02-10' },
        { id: 5, category: 'Материалы', description: 'Прочие материалы', amount: 6000, date: '2024-02-20' },
      ],
      messages: 32,
      documents: [
        { id: 1, name: 'Смета', type: 'pdf', size: '1.5 MB', uploadDate: '2024-01-20' },
        { id: 2, name: 'Договор', type: 'pdf', size: '2.0 MB', uploadDate: '2024-01-21' },
        { id: 3, name: 'Схема электросети', type: 'pdf', size: '3.2 MB', uploadDate: '2024-01-25' },
      ],
      timeline: [
        { date: '2024-01-20', event: 'Проект создан' },
        { date: '2024-01-28', event: 'Работы начались' },
        { date: '2024-02-05', event: 'Демонтаж завершен' },
        { date: '2024-02-15', event: 'Прокладка кабелей' },
      ],
    },
  };

  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <p className="text-6xl mb-4">❌</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Проект не найден</h1>
        <Link href="/projects" className="text-blue-600 hover:underline font-medium">
          Вернуться к списку проектов
        </Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'pending':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
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
    <div className="max-w-7xl mx-auto">
      {/* Навигация и заголовок */}
      <div className="mb-8">
        <Link href="/projects" className="text-blue-600 hover:underline text-sm font-medium mb-4 inline-block">
          ← Вернуться к проектам
        </Link>

        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600">📁 {project.category} • 📍 {project.city}</p>
          </div>
          <span className={`px-4 py-2 rounded-lg border font-semibold ${getStatusColor(project.status)}`}>
            {project.status === 'active' && '🟢 В работе'}
            {project.status === 'pending' && '🟡 На проверке'}
            {project.status === 'completed' && '✅ Завершен'}
          </span>
        </div>
      </div>

      {/* Финансовая информация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Бюджет</p>
          <p className="text-3xl font-bold text-gray-900">{project.budget.toLocaleString('ru-RU')} ₽</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Потрачено</p>
          <p className="text-3xl font-bold text-blue-600">{project.spent.toLocaleString('ru-RU')} ₽</p>
          <p className="text-xs text-gray-500 mt-1">{Math.round((project.spent / project.budget) * 100)}% от бюджета</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Прогресс</p>
          <p className="text-3xl font-bold text-green-600">{project.progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Вкладки */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {['overview', 'tasks', 'expenses', 'documents', 'timeline'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium transition whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'overview' && '📋 Обзор'}
              {tab === 'tasks' && '✅ Задачи'}
              {tab === 'expenses' && '💰 Расходы'}
              {tab === 'documents' && '📄 Документы'}
              {tab === 'timeline' && '📅 История'}
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* ОБЗОР */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Описание</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📅 Сроки</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Создан</p>
                      <p className="font-semibold text-gray-900">{new Date(project.createdDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Начало</p>
                      <p className="font-semibold text-gray-900">{new Date(project.startDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Завершение</p>
                      <p className="font-semibold text-gray-900">{new Date(project.dueDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">👤 Клиент</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Имя</p>
                      <p className="font-semibold text-gray-900">{project.client}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900 break-all">{project.clientEmail}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Телефон</p>
                      <p className="font-semibold text-gray-900">{project.clientPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {project.executors.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">👷 Исполнители</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.executors.map(executor => (
                      <div key={executor.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                            {executor.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{executor.name}</p>
                            <p className="text-xs text-gray-600">{executor.role}</p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">⭐ {executor.rating}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ЗАДАЧИ */}
          {activeTab === 'tasks' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">✅ Задачи ({project.tasks.length})</h3>
              {project.tasks.length > 0 ? (
                <div className="space-y-3">
                  {project.tasks.map(task => (
                    <div key={task.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{task.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getTaskStatusColor(task.status)}`}>
                          {task.status === 'completed' && '✅ Готово'}
                          {task.status === 'active' && '🔄 В работе'}
                          {task.status === 'pending' && '⏳ Ожидание'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>👤 {task.executor}</p>
                        <p>📅 До {new Date(task.dueDate).toLocaleDateString('ru-RU')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">Задач нет</p>
              )}
            </div>
          )}

          {/* РАСХОДЫ */}
          {activeTab === 'expenses' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Расходы</h3>
              {project.expenses.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-semibold text-gray-900">Категория</th>
                        <th className="text-left py-2 px-4 font-semibold text-gray-900">Описание</th>
                        <th className="text-right py-2 px-4 font-semibold text-gray-900">Сумма</th>
                        <th className="text-left py-2 px-4 font-semibold text-gray-900">Дата</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.expenses.map(expense => (
                        <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-600">{expense.category}</td>
                          <td className="py-3 px-4 text-gray-900">{expense.description}</td>
                          <td className="py-3 px-4 text-right font-semibold text-gray-900">{expense.amount.toLocaleString('ru-RU')} ₽</td>
                          <td className="py-3 px-4 text-gray-600">{new Date(expense.date).toLocaleDateString('ru-RU')}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan="2" className="py-3 px-4 text-right font-bold text-gray-900">ИТОГО:</td>
                        <td className="py-3 px-4 text-right font-bold text-blue-600 text-lg">
                          {project.expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString('ru-RU')} ₽
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">Расходов нет</p>
              )}
            </div>
          )}

          {/* ДОКУМЕНТЫ */}
          {activeTab === 'documents' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">📄 Документы</h3>
              {project.documents.length > 0 ? (
                <div className="space-y-3">
                  {project.documents.map(doc => (
                    <div key={doc.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center hover:shadow-md transition">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {doc.type === 'pdf' && '📄'}
                          {doc.type === 'zip' && '📦'}
                          {doc.type === 'xlsx' && '📊'}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-600">{doc.size} • {new Date(doc.uploadDate).toLocaleDateString('ru-RU')}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => alert('Требует подключения системы скачивания файлов')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                      >
                        ⬇️
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-center py-8">Документов нет</p>
              )}
            </div>
          )}

          {/* ИСТОРИЯ */}
          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">📅 История проекта</h3>
              <div className="space-y-4">
                {project.timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                      {idx !== project.timeline.length - 1 && <div className="w-1 h-12 bg-gray-200"></div>}
                    </div>
                    <div className="pb-4">
                      <p className="font-semibold text-gray-900">{item.event}</p>
                      <p className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-3 mt-8 pb-8">
        {project.status === 'active' && (
          <>
            <button disabled className="flex-1 px-6 py-3 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed font-bold">
              💬 Связаться с исполнителем
            </button>
            <button disabled className="flex-1 px-6 py-3 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed font-bold">
              📊 Просмотреть отчёт
            </button>
          </>
        )}
        {project.status === 'completed' && (
          <button disabled className="flex-1 px-6 py-3 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed font-bold">
            ⭐ Оставить отзыв
          </button>
        )}
      </div>
    </div>
  );
}