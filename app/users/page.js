"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ReviewsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  const reviews = [
    {
      id: 1,
      author: 'Александр С.',
      authorAvatar: 'АС',
      rating: 5,
      title: 'Отличная работа!',
      text: 'Петр выполнил ремонт кухни на высочайшем уровне. Все сделано аккуратно, в срок и по согласованной цене. Рекомендую!',
      project: 'Ремонт кухни в квартире',
      date: '2024-01-25',
      verified: true,
      likes: 45,
      replies: 2,
      status: 'published',
      reply: 'Спасибо большое, Александр! Было приятно работать. Готов помочь и в будущем!',
    },
    {
      id: 2,
      author: 'Мария В.',
      authorAvatar: 'МВ',
      rating: 5,
      title: 'Профессионально и чисто',
      text: 'Проделал отличную работу в ванной комнате. Очень внимательно относится к деталям, всегда в курсе графика. Спасибо!',
      project: 'Отделка ванной комнаты',
      date: '2024-01-20',
      verified: true,
      likes: 38,
      replies: 1,
      status: 'published',
      reply: 'Мария, спасибо за доверие! Рад, что всё понравилось.',
    },
    {
      id: 3,
      author: 'Петр Р.',
      authorAvatar: 'ПР',
      rating: 4,
      title: 'Хороший исполнитель',
      text: 'Выполнил работы по укладке паркета. Качество хорошее, выполнил в срок. Немного дороговато, но результат оправдан.',
      project: 'Укладка паркета',
      date: '2024-01-18',
      verified: true,
      likes: 22,
      replies: 0,
      status: 'published',
      reply: null,
    },
    {
      id: 4,
      author: 'Анна Л.',
      authorAvatar: 'АЛ',
      rating: 5,
      title: 'Лучше не найти!',
      text: 'Петр - настоящий профессионал. Советовал оптимальные решения, не навязывал ненужное. Результат превзошёл ожидания!',
      project: 'Укладка паркета в доме',
      date: '2024-01-15',
      verified: true,
      likes: 56,
      replies: 3,
      status: 'published',
      reply: 'Спасибо, Анна! Ваше доверие - лучшая награда для меня.',
    },
    {
      id: 5,
      author: 'Иван Т.',
      authorAvatar: 'ИТ',
      rating: 4,
      title: 'Выполнил в срок',
      text: 'Прошу его помощи уже второй раз. Качество стабильно высокое, общается вежливо. Рекомендую!',
      project: 'Подготовка стен',
      date: '2024-01-10',
      verified: true,
      likes: 18,
      replies: 0,
      status: 'published',
      reply: null,
    },
    {
      id: 6,
      author: 'Константин Б.',
      authorAvatar: 'КБ',
      rating: 5,
      title: 'Профессиональная кладка',
      text: 'Облицовка стен кирпичом выполнена идеально. Все швы ровные, работа чистая. Спасибо за внимание к деталям!',
      project: 'Облицовка стен кирпичом',
      date: '2024-01-05',
      verified: true,
      likes: 31,
      replies: 1,
      status: 'published',
      reply: 'Константин, благодарю за возможность поработать на вашем объекте!',
    },
  ];

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    if (filter === 'positive') return review.rating >= 4;
    if (filter === 'negative') return review.rating < 4;
    if (filter === 'verified') return review.verified;
    return true;
  });

  const stats = {
    totalReviews: reviews.length,
    avgRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    verified: reviews.filter(r => r.verified).length,
    totalLikes: reviews.reduce((sum, r) => sum + r.likes, 0),
  };

  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const handleReply = () => {
    if (replyText.trim()) {
      alert('Ответ добавлен. Требует подключения к бэку для сохранения.');
      setReplyText('');
      setShowReplyModal(false);
    }
  };

  return (
    <ProtectedRoute requiredRoles={['executor']}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">⭐ Отзывы</h1>
          <p className="text-gray-600">Отзывы от заказчиков о ваших работах</p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Средняя оценка', value: `⭐ ${stats.avgRating}`, icon: '📊' },
            { label: 'Всего отзывов', value: stats.totalReviews, icon: '📋' },
            { label: 'Проверённые', value: stats.verified, icon: '✅' },
            { label: 'Лайков', value: stats.totalLikes, icon: '❤️' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Распределение оценок */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">📊 Распределение оценок</h3>

            {[5, 4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-gray-900 w-6">{rating}⭐</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(ratingDistribution[rating] / stats.totalReviews) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-6 text-right">{ratingDistribution[rating]}</span>
              </div>
            ))}
          </div>

          {/* Фильтры */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'Все отзывы' },
                { value: 'positive', label: '👍 Положительные (4-5)' },
                { value: 'negative', label: '👎 Критические (1-3)' },
                { value: 'verified', label: '✅ Проверённые' },
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
          </div>
        </div>

        {/* Список отзывов */}
        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Верхняя часть */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {review.authorAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-gray-900">{review.author}</p>
                        {review.verified && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                            ✓ Проверённый отзыв
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {review.verified ? `Выполнил заказ: ${review.project}` : review.project}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="flex gap-0.5 justify-end mb-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">{new Date(review.date).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>

                {/* Заголовок и текст */}
                <div className="mb-3">
                  <h4 className="font-bold text-gray-900 mb-1">{review.title}</h4>
                  <p className="text-gray-600">{review.text}</p>
                </div>

                {/* Статистика отзыва */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <button
                    onClick={() => alert('Требует подключения системы лайков')}
                    className="flex items-center gap-1 hover:text-red-600 transition"
                  >
                    ❤️ {review.likes}
                  </button>
                  <button
                    onClick={() => setSelectedReview(selectedReview === review.id ? null : review.id)}
                    className="flex items-center gap-1 hover:text-blue-600 transition"
                  >
                    💬 {review.replies}
                  </button>
                </div>
              </div>

              {/* Ответ исполнителя */}
              {review.reply && (
                <div className="bg-blue-50 border-t border-blue-200 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      ПК
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-blue-700 mb-1">Петр Кузнецов (Исполнитель)</p>
                      <p className="text-blue-600 text-sm">{review.reply}</p>
                      <p className="text-xs text-blue-600 mt-2">Ответ давно опубликован</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Кнопка ответа */}
              {!review.reply && selectedReview === review.id && (
                <div className="bg-gray-50 border-t border-gray-200 p-6">
                  <button
                    onClick={() => setShowReplyModal(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                  >
                    💬 Ответить
                  </button>

                  {showReplyModal && (
                    <div className="mt-4 p-4 bg-white border border-blue-200 rounded-lg">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Напишите ответ на отзыв..."
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-3"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleReply}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                        >
                          ✅ Опубликовать
                        </button>
                        <button
                          onClick={() => {
                            setShowReplyModal(false);
                            setReplyText('');
                          }}
                          className="flex-1 px-3 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium text-sm"
                        >
                          ❌ Отмена
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Нет отзывов</h3>
            <p className="text-gray-600">Отзывы появятся после выполнения первых заказов</p>
          </div>
        )}

        {/* Советы по улучшению рейтинга */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Как улучшить рейтинг</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'Быстрые ответы', desc: 'Отвечайте на сообщения в течение часа' },
              { icon: '✨', title: 'Качество работ', desc: 'Выполняйте работы внимательно и аккуратно' },
              { icon: '🤝', title: 'Общение', desc: 'Регулярно обновляйте клиента о ходе работ' },
              { icon: '⏱️', title: 'Пунктуальность', desc: 'Придерживайтесь установленных сроков' },
              { icon: '💬', title: 'Реагируйте', desc: 'Отвечайте на критические отзывы вежливо' },
              { icon: '📸', title: 'Портфолио', desc: 'Добавляйте фото выполненных работ' },
            ].map((tip, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-green-100">
                <p className="text-3xl mb-2">{tip.icon}</p>
                <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Информация о системе отзывов */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8 text-center">
          <p className="text-gray-700 mb-2">
            <strong>📊 Рейтинг обновляется</strong> каждый час на основе новых отзывов
          </p>
          <p className="text-sm text-gray-600">
            Требует подключения: системы рейтинга, уведомлений, модерации отзывов
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}