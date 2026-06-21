"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Моки проектов
  const allProjects = [
    {
      id: 1,
      title: 'Ремонт кухни в квартире',
      status: 'active',
      budget: 150000,
      spent: 95000,
      progress: 65,
      client: 'Александр С.',
      category: 'Отделка',
      team: ['ИП', 'ПК', 'АМ'],
      startDate: '2024-01-15',
      dueDate: '2024-03-15',
    },
    {
      id: 2,
      title: 'Ремонт ванной комнаты',
      status: 'planning',
      budget: 80000,
      spent: 0,
      progress: 0,
      client: 'Мария В.',
      category: 'Сантехника',
      team: ['ИП'],
      startDate: '2024-04-01',
      dueDate: '2024-05-15',
    },
    {
      id: 3,
      title: 'Покраска фасада дома',
      status: 'completed',
      budget: 120000,
      spent: 120000,
      progress: 100,
      client: 'ООО Стройка',
      category: 'Малярные работы',
      team: ['ИП', 'ПК'],
      startDate: '2023-09-01',
      dueDate: '2023-10-31',
    },
    {
      id: 4,
      title: 'Замена электропроводки',
      status: 'active',
      budget: 200000,
      spent: 150000,
      progress: 75,
      client: 'Иван П.',
      category: 'Электрика',
      team: ['АМ', 'СВ'],
      startDate: '2024-01-20',
      dueDate: '2024-03-20',
    },
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { label: 'В работе', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
      case 'planning':
        return { label: 'Планирование', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'completed':
        return { label: 'Завершена', color: 'bg-green-50 text-green-700 border-green-200' };
      case 'paused':
        return { label: 'Приостановлена', color: 'bg-gray-50 text-gray-700 border-gray-200' };
      default:
        return { label: status, color: 'bg-gray-50 text-gray-700 border-gray-200' };
    }
  };

  const filteredProjects = allProjects
    .filter(project => {
      if (filter !== 'all' && project.status !== filter) return false;
      if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📊 Проекты</h1>
          <p className="text-gray-600">Управление всеми проектами и их сметами</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold">
          + Новый проект
        </button>
      </div>

      {/* Фильтры и поиск */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="🔍 Поиск проектов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все проекты</option>
            <option value="planning">Планирование</option>
            <option value="active">В работе</option>
            <option value="completed">Завершены</option>
          </select>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['all', 'planning', 'active', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'Все' : status === 'planning' ? 'Планирование' : status === 'active' ? 'В работе' : 'Завершены'}
            </button>
          ))}
        </div>
      </div>

      {/* Список проектов */}
      <div className="grid grid-cols-1 gap-6">
        {filteredProjects.map(project => {
          const statusInfo = getStatusInfo(project.status);
          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition p-6 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg border text-sm font-semibold ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                    <span className="text-sm text-gray-600">📁 {project.category}</span>
                    <span className="text-sm text-gray-600">👤 {project.client}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {project.spent.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="text-sm text-gray-600">
                    из {project.budget.toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>

              {/* Прогресс */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Прогресс</span>
                  <span className="text-sm font-bold text-blue-600">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Команда */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {project.team.map((member, idx) => (
                    <div
                      key={idx}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                    >
                      {member}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  до {new Date(project.dueDate).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Проекты не найдены</h3>
          <p className="text-gray-600">Попробуйте изменить фильтры или создайте новый проект</p>
        </div>
      )}
    </div>
  );
}