"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function PortfolioPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [selectedWork, setSelectedWork] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWork, setNewWork] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    completionDate: '',
  });

  const portfolioWorks = [
    {
      id: 1,
      title: 'Ремонт кухни в квартире',
      category: 'Отделка',
      description: 'Полный ремонт кухни: демонтаж старой плитки, укладка новой керамической плитки, установка мебели и отделка стен.',
      images: ['🖼️', '🎨', '📸'],
      budget: 150000,
      completionDate: '2024-01-20',
      duration: '35 дней',
      client: 'Александр С.',
      rating: 5,
      views: 342,
      likes: 48,
      comments: 12,
      beforeAfter: true,
      details: {
        area: '12 кв.м',
        materials: ['Керамическая плитка', 'Краска', 'Фанера'],
        team: ['Петр К.', 'Иван П.'],
        highlights: [
          'Полный демонтаж старой отделки',
          'Укладка плитки класса А',
          'Установка новой мебели',
          'Электромонтажные работы',
        ],
      },
    },
    {
      id: 2,
      title: 'Покраска фасада дома',
      category: 'Малярные работы',
      description: 'Полная покраска внешнего фасада двухэтажного дома с предварительной подготовкой поверхности и грунтовкой.',
      images: ['🎨', '🏠', '📸'],
      budget: 120000,
      completionDate: '2023-10-31',
      duration: '28 дней',
      client: 'ООО Стройка',
      rating: 4.9,
      views: 256,
      likes: 38,
      comments: 8,
      beforeAfter: true,
      details: {
        area: '450 кв.м',
        materials: ['Краска акриловая', 'Грунтовка', 'Лак'],
        team: ['Иван П.', 'Петр К.'],
        highlights: [
          'Подготовка поверхности (шпатлёвка)',
          'Грунтовка в 2 слоя',
          'Покраска в 2 слоя',
          'Финишная отделка',
        ],
      },
    },
    {
      id: 3,
      title: 'Отделка ванной комнаты',
      category: 'Сантехника',
      description: 'Современная отделка ванной с гидроизоляцией, укладкой плитки и установкой сантехники. Дизайн выполнен в минималистском стиле.',
      images: ['🚿', '🛁', '📸'],
      budget: 95000,
      completionDate: '2024-01-15',
      duration: '22 дня',
      client: 'Мария В.',
      rating: 5,
      views: 189,
      likes: 31,
      comments: 6,
      beforeAfter: true,
      details: {
        area: '8 кв.м',
        materials: ['Плитка мозаика', 'Гидроизоляция', 'Сантехника'],
        team: ['Петр К.'],
        highlights: [
          'Гидроизоляция всех поверхностей',
          'Укладка плитки мозаика',
          'Установка ванны и унитаза',
          'Монтаж полочек и аксессуаров',
        ],
      },
    },
    {
      id: 4,
      title: 'Подготовка стен к обойному покрытию',
      category: 'Отделка',
      description: 'Профессиональная подготовка стен включает шпатлёвку, грунтовку и шлифовку для идеально ровной поверхности.',
      images: ['📐', '🎨', '✨'],
      budget: 35000,
      completionDate: '2023-12-10',
      duration: '14 дней',
      client: 'Петр Р.',
      rating: 4.8,
      views: 178,
      likes: 24,
      comments: 5,
      beforeAfter: true,
      details: {
        area: '65 кв.м',
        materials: ['Шпатлёвка', 'Грунтовка', 'Наждачная бумага'],
        team: ['Алексей М.'],
        highlights: [
          'Удаление старой краски и обоев',
          'Шпатлёвка в 3 слоя',
          'Шлифовка под уровень',
          'Финальная грунтовка',
        ],
      },
    },
    {
      id: 5,
      title: 'Укладка паркета',
      category: 'Подготовка поверхностей',
      description: 'Профессиональная укладка паркета премиум класса с последующей шлифовкой и лакированием для долговечного результата.',
      images: ['🪵', '✨', '🏡'],
      budget: 180000,
      completionDate: '2024-01-10',
      duration: '18 дней',
      client: 'Анна Л.',
      rating: 5,
      views: 234,
      likes: 41,
      comments: 9,
      beforeAfter: true,
      details: {
        area: '85 кв.м',
        materials: ['Паркет дуб', 'Лак паркетный', 'Краска'],
        team: ['Сергей В.'],
        highlights: [
          'Выравнивание основания',
          'Укладка паркета по схеме',
          'Шлифовка поверхности',
          'Лакирование в 3 слоя',
        ],
      },
    },
    {
      id: 6,
      title: 'Облицовка стен кирпичом',
      category: 'Кладка',
      description: 'Облицовка стен керамическим кирпичом с использованием специального раствора. Работы выполнены с высокой точностью.',
      images: ['🧱', '🏗️', '📸'],
      budget: 280000,
      completionDate: '2023-11-25',
      duration: '45 дней',
      client: 'Константин Б.',
      rating: 4.9,
      views: 156,
      likes: 28,
      comments: 7,
      beforeAfter: true,
      details: {
        area: '120 кв.м',
        materials: ['Кирпич керамический', 'Раствор кладочный', 'Гидроизоляция'],
        team: ['Василий П.', 'Дмитрий К.'],
        highlights: [
          'Подготовка основания',
          'Кладка в 1.5 кирпича',
          'Расшивка швов',
          'Гидроизоляция',
        ],
      },
    },
  ];

  const categories = ['Все', 'Отделка', 'Малярные работы', 'Сантехника', 'Подготовка поверхностей', 'Кладка'];

  const filteredWorks = portfolioWorks.filter(work => {
    if (filter === 'Все') return true;
    return work.category === filter;
  });

  const stats = {
    totalWorks: portfolioWorks.length,
    totalViews: portfolioWorks.reduce((sum, w) => sum + w.views, 0),
    totalLikes: portfolioWorks.reduce((sum, w) => sum + w.likes, 0),
    avgRating: (portfolioWorks.reduce((sum, w) => sum + w.rating, 0) / portfolioWorks.length).toFixed(1),
  };

  const handleAddWork = (e) => {
    e.preventDefault();
    // Требует: загрузка изображений, сохранение на бэк
    alert('Работа добавлена в портфолио. Требует подключения системы загрузки изображений.');
    setNewWork({ title: '', category: '', description: '', budget: '', completionDate: '' });
    setShowAddModal(false);
  };

  return (
    <ProtectedRoute requiredRoles={['executor']}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🖼️ Портфолио</h1>
            <p className="text-gray-600">Ваши лучшие работы и проекты</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-bold"
          >
            + Добавить работу
          </button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Работ в портфолио', value: stats.totalWorks, icon: '📋' },
            { label: 'Просмотров', value: stats.totalViews, icon: '👁️' },
            { label: 'Лайков', value: stats.totalLikes, icon: '❤️' },
            { label: 'Средний рейтинг', value: `⭐ ${stats.avgRating}`, icon: '⭐' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Фильтры по категориям */}
        <div className="mb-8 flex gap-2 flex-wrap overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Сетка работ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredWorks.map(work => (
            <div
              key={work.id}
              onClick={() => setSelectedWork(selectedWork === work.id ? null : work.id)}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 transition cursor-pointer group"
            >
              {/* Изображение */}
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-5xl group-hover:scale-110 transition overflow-hidden">
                {work.images[0]}
              </div>

              {/* Информация */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{work.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{work.category}</p>

                {/* Рейтинг и статистика */}
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <span>⭐ {work.rating}</span>
                    <span>👁️ {work.views}</span>
                    <span>❤️ {work.likes}</span>
                  </div>
                </div>

                {/* Информация о проекте */}
                <div className="space-y-1 text-xs text-gray-600 mb-3">
                  <p>💰 {work.budget.toLocaleString('ru-RU')} ₽</p>
                  <p>📅 {new Date(work.completionDate).toLocaleDateString('ru-RU')}</p>
                  <p>⏱️ {work.duration}</p>
                </div>

                {/* Развёрнутые детали */}
                {selectedWork === work.id && (
                  <div className="border-t border-gray-200 pt-4 mt-4 space-y-4">
                    <p className="text-gray-600 text-sm">{work.description}</p>

                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">📋 Детали проекта</p>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p>Площадь: {work.details.area}</p>
                        <p>Клиент: {work.client}</p>
                        <p>Команда: {work.details.team.join(', ')}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">📝 Основные работы</p>
                      <ul className="space-y-1 text-xs text-gray-600">
                        {work.details.highlights.map((h, idx) => (
                          <li key={idx}>✓ {h}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-2">🛠️ Материалы</p>
                      <div className="flex flex-wrap gap-1">
                        {work.details.materials.map((m, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {work.beforeAfter && (
                      <div className="p-3 bg-blue-50 rounded-lg text-center">
                        <p className="text-sm text-blue-600 font-semibold">📸 До и после</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => alert('Требует подключения системы редактирования')}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-xs"
                      >
                        ✏️ Редактировать
                      </button>
                      <button
                        onClick={() => alert('Требует подключения системы удаления')}
                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-xs"
                      >
                        🗑️ Удалить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Нет работ в этой категории</h3>
            <p className="text-gray-600">Добавьте свои работы, чтобы привлечь больше клиентов</p>
          </div>
        )}

        {/* Советы по портфолио */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Рекомендации для успеха</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📸', title: 'Качественные фото', desc: 'Добавляйте фотографии до и после, крупные планы деталей' },
              { icon: '📝', title: 'Подробные описания', desc: 'Описывайте использованные материалы и особенности работы' },
              { icon: '⭐', title: 'Отзывы клиентов', desc: 'Просите клиентов оставлять отзывы о вашей работе' },
            ].map((tip, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 text-center">
                <p className="text-3xl mb-2">{tip.icon}</p>
                <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Модальное окно добавления работы */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md shadow-lg w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🖼️ Добавить работу в портфолио</h3>

              <form onSubmit={handleAddWork} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Название работы</label>
                  <input
                    type="text"
                    value={newWork.title}
                    onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
                    placeholder="Ремонт кухни"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Категория</label>
                  <select
                    value={newWork.category}
                    onChange={(e) => setNewWork({ ...newWork, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Выберите категорию</option>
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Описание</label>
                  <textarea
                    value={newWork.description}
                    onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}
                    placeholder="Опишите работу, материалы, особенности"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Бюджет (₽)</label>
                    <input
                      type="number"
                      value={newWork.budget}
                      onChange={(e) => setNewWork({ ...newWork, budget: e.target.value })}
                      placeholder="100000"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Дата завершения</label>
                    <input
                      type="date"
                      value={newWork.completionDate}
                      onChange={(e) => setNewWork({ ...newWork, completionDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-500">Требует подключения системы загрузки изображений (S3, Cloudinary)</p>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    ✅ Добавить
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
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