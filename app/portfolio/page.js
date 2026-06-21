"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);

  const profileData = {
    admin: {
      name: 'Максим Гусев',
      role: 'Администратор',
      email: 'admin@rempro.ru',
      phone: '+7 (999) 123-45-67',
      city: 'Москва',
      avatar: 'МГ',
      joinDate: '2023-06-15',
      description: 'Администратор платформы RemPro',
      stats: {
        usersManaged: 1247,
        projectsModerated: 5420,
        supportTickets: 342,
      },
    },
    manager: {
      name: 'Иван Петров',
      role: 'Менеджер',
      email: 'manager@rempro.ru',
      phone: '+7 (999) 234-56-78',
      city: 'Санкт-Петербург',
      avatar: 'ИП',
      joinDate: '2023-08-20',
      description: 'Менеджер проектов',
      stats: {
        activeProjects: 24,
        completedProjects: 187,
        totalRevenue: 2450000,
      },
    },
    executor: {
      name: 'Петр Кузнецов',
      role: 'Исполнитель',
      email: 'executor@rempro.ru',
      phone: '+7 (999) 345-67-89',
      city: 'Москва',
      avatar: 'ПК',
      joinDate: '2023-10-01',
      description: 'Квалифицированный маляр и отделочник',
      rating: 4.9,
      reviews: 127,
      completedJobs: 84,
      earnings: 385000,
      specializations: ['Отделка', 'Малярные работы', 'Подготовка поверхностей'],
      experience: '8 лет',
      qualification: 'Эксперт',
      hourlyRate: 650,
      hasTools: 'Свой инструмент',
      workSchedule: ['Будни', 'Выходные'],
      verified: true,
      portfolio: [
        { id: 1, title: 'Ремонт кухни', image: '🖼️', views: 342 },
        { id: 2, title: 'Покраска фасада', image: '🎨', views: 256 },
        { id: 3, title: 'Отделка ванной', image: '🚿', views: 189 },
      ],
      badges: ['Паспорт проверен', 'Быстрый ответ', 'Друг платформы'],
    },
    client: {
      name: 'Александр Соколов',
      role: 'Заказчик',
      email: 'client@rempro.ru',
      phone: '+7 (999) 456-78-90',
      city: 'Москва',
      avatar: 'АС',
      joinDate: '2023-11-05',
      description: 'Активный заказчик ремонтных услуг',
      stats: {
        activeProjects: 2,
        completedProjects: 5,
        totalSpent: 725000,
      },
      preferences: {
        preferredCategories: ['Отделка', 'Сантехника', 'Электрика'],
        paymentMethods: ['Наличные', 'Безналичные'],
      },
    },
  };

  const userProfile = profileData[user?.role] || profileData.client;

  const reviews = [
    { id: 1, author: 'Иван П.', rating: 5, text: 'Отличная работа! Всё на уровне', date: '2024-01-20', verified: true },
    { id: 2, author: 'Мария С.', rating: 5, text: 'Проделал отличную работу, очень доволен', date: '2024-01-18', verified: true },
    { id: 3, author: 'Петр К.', rating: 4, text: 'Хороший исполнитель, выполнил в срок', date: '2024-01-15', verified: true },
    { id: 4, author: 'Анна Л.', rating: 5, text: 'Профессионально, чисто, без замечаний', date: '2024-01-10', verified: true },
  ];

  const recentActivity = [
    { id: 1, action: 'Завершён проект', project: 'Ремонт кухни', date: '2024-01-20' },
    { id: 2, action: 'Получена оплата', amount: '35 000 ₽', date: '2024-01-19' },
    { id: 3, action: 'Начата работа', project: 'Укладка плитки', date: '2024-01-18' },
    { id: 4, action: 'Оставлен отзыв', text: 'Отличная работа!', date: '2024-01-17' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Верхняя часть профиля */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 overflow-hidden">
        {/* Баннер */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

        {/* Информация профиля */}
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
            <div className="flex items-end gap-6 mb-6 md:mb-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
                {userProfile.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{userProfile.name}</h1>
                <p className="text-gray-600 mb-2">{userProfile.role}</p>
                {user?.role === 'executor' && userProfile.verified && (
                  <p className="text-sm text-green-600 font-semibold">✅ Верифицирован</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditMode(!editMode)}
                disabled
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium"
              >
                ✏️ Редактировать
              </button>
              {user?.role === 'executor' && (
                <Link
                  href="/messages"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  💬 Написать
                </Link>
              )}
            </div>
          </div>

          {/* Основная информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: '📧', label: 'Email', value: userProfile.email },
              { icon: '📱', label: 'Телефон', value: userProfile.phone },
              { icon: '📍', label: 'Город', value: userProfile.city },
              { icon: '📅', label: 'Член с', value: new Date(userProfile.joinDate).toLocaleDateString('ru-RU') },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className="font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Описание */}
          <p className="text-gray-600">{userProfile.description}</p>
        </div>
      </div>

      {/* Вкладки */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        {['overview', 'reviews', 'activity', 'portfolio'].map(tab => {
          if (tab === 'portfolio' && user?.role !== 'executor') return null;
          
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium transition whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-blue-600'
                  : 'text-gray-600 hover:text-gray-900 border-b-transparent'
              }`}
            >
              {tab === 'overview' && '📊 Обзор'}
              {tab === 'reviews' && `⭐ Отзывы (${reviews.length})`}
              {tab === 'activity' && '📈 Активность'}
              {tab === 'portfolio' && '🖼️ Портфолио'}
            </button>
          );
        })}
      </div>

      {/* ВКЛАДКА: ОБЗОР */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Статистика */}
            {(user?.role === 'executor' || user?.role === 'manager') && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Статистика</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user?.role === 'executor' ? (
                    <>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Рейтинг</p>
                        <p className="text-3xl font-bold text-blue-600">⭐ {userProfile.rating}</p>
                        <p className="text-xs text-gray-600 mt-1">{userProfile.reviews} отзывов</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Завершено работ</p>
                        <p className="text-3xl font-bold text-green-600">{userProfile.completedJobs}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Заработано</p>
                        <p className="text-3xl font-bold text-purple-600">{(userProfile.earnings / 1000).toFixed(0)}K ₽</p>
                      </div>
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Опыт</p>
                        <p className="text-3xl font-bold text-yellow-600">{userProfile.experience}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Активные проекты</p>
                        <p className="text-3xl font-bold text-blue-600">{userProfile.stats.activeProjects}</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Завершено</p>
                        <p className="text-3xl font-bold text-green-600">{userProfile.stats.completedProjects}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Объём</p>
                        <p className="text-3xl font-bold text-purple-600">{(userProfile.stats.totalRevenue / 1000000).toFixed(1)}M ₽</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Информация об исполнителе */}
            {user?.role === 'executor' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Специализация</h2>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Специализации</p>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.specializations.map((spec, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Квалификация</p>
                      <p className="font-bold text-gray-900">{userProfile.qualification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Цена в час</p>
                      <p className="font-bold text-gray-900">{userProfile.hourlyRate} ₽</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Инструмент</p>
                      <p className="font-bold text-gray-900">{userProfile.hasTools}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">График</p>
                      <p className="font-bold text-gray-900">{userProfile.workSchedule.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Значки/Бейджи */}
            {user?.role === 'executor' && userProfile.badges && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">🏆 Достижения</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {userProfile.badges.map((badge, idx) => (
                    <div key={idx} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                      <p className="text-2xl mb-2">✨</p>
                      <p className="font-semibold text-gray-900 text-sm">{badge}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Боковая панель */}
          <div className="space-y-8">
            {/* Контакты */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">💬 Связаться</h3>

              <div className="space-y-3">
                <button
                  onClick={() => alert(`Требует подключения к системе уведомлений\nEmail: ${userProfile.email}`)}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  📧 Email
                </button>
                <button
                  onClick={() => alert(`Требует подключения к платформе мессенджеров\nТелефон: ${userProfile.phone}`)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                >
                  📱 WhatsApp
                </button>
                <button
                  onClick={() => alert(`Требует интеграции с системой звонков`)}
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium text-sm"
                >
                  ☎️ Звонок
                </button>
              </div>
            </div>

            {/* Статус */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">🟢 Статус</h3>
              <p className="text-sm text-gray-600 mb-2">Последняя активность</p>
              <p className="font-bold text-gray-900">Сейчас онлайн</p>
              <p className="text-xs text-gray-500 mt-2">⏰ 2 минуты назад</p>
            </div>

            {/* Информация о верификации */}
            {user?.role === 'executor' && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <h3 className="font-bold text-green-700 mb-3">✅ Верификация</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-green-600">✓ Паспорт проверен</p>
                  <p className="text-green-600">✓ ИНН подтверждён</p>
                  <p className="text-green-600">✓ Номер телефона подтверждён</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ВКЛАДКА: ОТЗЫВЫ */}
      {activeTab === 'reviews' && user?.role === 'executor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{review.author}</p>
                    {review.verified && (
                      <p className="text-xs text-green-600">✓ Проверённый отзыв</p>
                    )}
                  </div>
                  <span className="text-sm">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="text-gray-600 mb-2">{review.text}</p>
                <p className="text-xs text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-fit">
            <h3 className="font-bold text-gray-900 mb-4">📊 Рейтинг</h3>

            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-blue-600 mb-1">⭐ {userProfile.rating}</p>
              <p className="text-sm text-gray-600">{userProfile.reviews} отзывов</p>
            </div>

            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="flex items-center gap-2 mb-2">
                <span className="text-xs">{'⭐'.repeat(stars)}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(stars === 5 ? 100 : stars === 4 ? 80 : 0) / 100 * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">{stars === 5 ? 100 : stars === 4 ? 25 : 2}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ВКЛАДКА: АКТИВНОСТЬ */}
      {activeTab === 'activity' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {recentActivity.map(activity => (
              <div key={activity.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex items-start gap-4">
                <div className="text-2xl flex-shrink-0">
                  {activity.action.includes('Проект') && '📁'}
                  {activity.action.includes('Оплата') && '💰'}
                  {activity.action.includes('Работа') && '🔄'}
                  {activity.action.includes('Отзыв') && '⭐'}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.project || activity.amount || activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-fit">
            <h3 className="font-bold text-gray-900 mb-4">📈 Активность по времени</h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600 mb-1">На этой неделе</p>
                <p className="font-bold text-gray-900">8 действий</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">На этом месяце</p>
                <p className="font-bold text-gray-900">32 действия</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Среднее в день</p>
                <p className="font-bold text-gray-900">1.2 действия</p>
              </div>
            </div>

            <button disabled className="w-full mt-6 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium text-sm">
              📊 Подробная статистика
            </button>
          </div>
        </div>
      )}

      {/* ВКЛАДКА: ПОРТФОЛИО */}
      {activeTab === 'portfolio' && user?.role === 'executor' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🖼️ Мои работы</h2>
            <button disabled className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium">
              + Добавить работу
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProfile.portfolio.map(work => (
              <div key={work.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-6xl group-hover:scale-110 transition">
                  {work.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{work.title}</h3>
                  <p className="text-sm text-gray-600">👁️ {work.views} просмотров</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-gray-700 mb-3">Добавьте больше работ, чтобы привлечь больше заказчиков</p>
            <button disabled className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium">
              📸 Загрузить фотографии
            </button>
            <p className="text-xs text-gray-500 mt-3">Требует системы загрузки изображений и хранилища</p>
          </div>
        </div>
      )}
    </div>
  );
}