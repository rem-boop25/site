"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { categories, cities } from '@/app/data/registrationData';

export default function RequestFormPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    city: '',
    deadline: '',
    urgency: 'normal',
    contactPhone: user?.phone || '',
    attachments: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Требует: сохранение на бэк, загрузка файлов, отправка уведомлений
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        budget: '',
        city: '',
        deadline: '',
        urgency: 'normal',
        contactPhone: user?.phone || '',
        attachments: [],
      });
      setStep(1);
    }, 3000);
  };

  return (
    <ProtectedRoute requiredRoles={['admin', 'manager', 'client']}>
      <div className="max-w-3xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📝 Создать заказ</h1>
          <p className="text-gray-600">Опишите необходимую работу и найдите лучшего исполнителя</p>
        </div>

        {/* Прогресс */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">Шаг {step} из 3</p>
        </div>

        {/* Форма успеха */}
        {showSuccess && (
          <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
            <p className="text-3xl mb-2">✅</p>
            <h3 className="text-lg font-bold text-green-700 mb-1">Заказ создан!</h3>
            <p className="text-sm text-green-600">Исполнители получат уведомление о вашем заказе</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          {/* ШАГ 1: Основная информация */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Название проекта *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Например: Ремонт кухни в 2-комнатной квартире"
                  maxLength="100"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Подробное описание *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Расскажите подробно о работе:
- Что нужно сделать
- Размеры помещения
- Материалы (если есть)
- Особые требования
- История объекта"
                  rows="6"
                  maxLength="1000"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Категория работ *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Выберите</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Срочность</label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="normal">🟢 Обычная</option>
                    <option value="urgent">🟡 Срочно</option>
                    <option value="veryurgent">🔴 Очень срочно</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ШАГ 2: Параметры и сроки */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Город *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Выберите город</option>
                    {cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Бюджет (₽) *</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="100000"
                    min="5000"
                    step="1000"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Предполагаемая дата начала *</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Контактный телефон *</label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder={user?.phone}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  💡 <strong>Совет:</strong> Более подробная информация привлечёт больше предложений от исполнителей
                </p>
              </div>
            </div>
          )}

          {/* ШАГ 3: Подтверждение */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-gray-900">Проверьте информацию</h3>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Название:</span>
                    <span className="font-medium text-gray-900">{formData.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Категория:</span>
                    <span className="font-medium text-gray-900">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Город:</span>
                    <span className="font-medium text-gray-900">{formData.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Бюджет:</span>
                    <span className="font-medium text-gray-900">{parseInt(formData.budget).toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Срочность:</span>
                    <span className="font-medium text-gray-900">
                      {formData.urgency === 'normal' ? '🟢 Обычная' : formData.urgency === 'urgent' ? '🟡 Срочно' : '🔴 Очень срочно'}
                    </span>
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                <input type="checkbox" defaultChecked className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Я согласен с условиями</p>
                  <p className="text-sm text-gray-600">Я принимаю публичную оферту и обязуюсь рассчитаться с исполнителем</p>
                </div>
              </label>
            </div>
          )}

          {/* Кнопки навигации */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                ← Назад
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && (!formData.title || !formData.description || !formData.category)) {
                    alert('Заполните все обязательные поля');
                    return;
                  }
                  if (step === 2 && (!formData.city || !formData.budget || !formData.deadline)) {
                    alert('Заполните все обязательные поля');
                    return;
                  }
                  setStep(step + 1);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Далее →
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-bold text-lg"
              >
                ✅ Опубликовать заказ
              </button>
            )}
          </div>
        </form>

        {/* Информация о комиссии */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <p className="text-sm text-yellow-700">
            <strong>📋 Комиссия платформы:</strong> При успешном выполнении заказа платформа возьмёт 10% комиссии от стоимости проекта.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}