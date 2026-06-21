"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [notifications, setNotifications] = useState({
    emailNewRequest: true,
    emailMessages: true,
    emailPayment: true,
    pushNotifications: true,
    emailWeeklyReport: false,
  });
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    allowMessages: true,
    allowCalls: true,
    showRating: true,
  });
  const [showSuccess, setShowSuccess] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Требует: валидация, хеширование, сохранение на бэк
    if (passwordData.new !== passwordData.confirm) {
      alert('Пароли не совпадают');
      return;
    }
    if (passwordData.new.length < 6) {
      alert('Пароль должен быть минимум 6 символов');
      return;
    }
    setShowSuccess('password');
    setPasswordData({ current: '', new: '', confirm: '' });
    setShowPasswordForm(false);
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const handleNotificationsChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
    setShowSuccess('notifications');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  const handlePrivacyChange = (key) => {
    setPrivacy({ ...privacy, [key]: !privacy[key] });
    setShowSuccess('privacy');
    setTimeout(() => setShowSuccess(''), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">⚙️ Настройки</h1>

      {/* Вкладки */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        {['account', 'notifications', 'privacy', 'billing'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-medium transition whitespace-nowrap border-b-2 ${
              activeTab === tab
                ? 'text-blue-600 border-b-blue-600'
                : 'text-gray-600 hover:text-gray-900 border-b-transparent'
            }`}
          >
            {tab === 'account' && '👤 Аккаунт'}
            {tab === 'notifications' && '🔔 Уведомления'}
            {tab === 'privacy' && '🔒 Приватность'}
            {tab === 'billing' && '💳 Платежи'}
          </button>
        ))}
      </div>

      {/* ВКЛАДКА: АККАУНТ */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          {showSuccess === 'password' && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start gap-3">
              <span>✅</span>
              <div>
                <p className="font-semibold">Пароль изменён</p>
                <p className="text-sm">Ваш пароль успешно обновлён</p>
              </div>
            </div>
          )}

          {/* Профиль */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Информация профиля</h2>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                {user?.avatar}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <button disabled className="mt-3 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed text-sm">
                  Изменить аватар
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Имя</label>
                <input
                  type="text"
                  value={user?.firstName || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Требует подключения к бэку для изменения</p>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Фамилия</label>
                <input
                  type="text"
                  value={user?.lastName || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Телефон</label>
                <input
                  type="tel"
                  value={user?.phone || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Город</label>
                <input
                  type="text"
                  value={user?.city || ''}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Роль</label>
                <input
                  type="text"
                  value={
                    user?.role === 'admin' ? 'Администратор' :
                    user?.role === 'manager' ? 'Менеджер' :
                    user?.role === 'executor' ? 'Исполнитель' :
                    'Заказчик'
                  }
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            <button disabled className="mt-6 px-6 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium">
              📝 Редактировать профиль
            </button>
          </div>

          {/* Безопасность */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Безопасность</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Пароль</p>
                  <p className="text-sm text-gray-600">Последнее изменение: неизвестно</p>
                </div>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  🔐 Изменить
                </button>
              </div>

              {showPasswordForm && (
                <form onSubmit={handlePasswordChange} className="p-6 bg-blue-50 border border-blue-200 rounded-lg space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Текущий пароль</label>
                    <input
                      type="password"
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Новый пароль</label>
                    <input
                      type="password"
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Подтвердите пароль</label>
                    <input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      ✅ Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                      ❌ Отмена
                    </button>
                  </div>
                </form>
              )}

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900">Двухфакторная аутентификация</p>
                  <p className="text-sm text-gray-600">Требует подключения к бэку</p>
                </div>
                <button disabled className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium text-sm">
                  Включить
                </button>
              </div>
            </div>
          </div>

          {/* Сессии */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Активные сессии</h2>

            <div className="space-y-3">
              {[
                { device: 'Chrome на Windows', location: 'Москва', lastActive: 'Сейчас', icon: '💻' },
                { device: 'Safari на iPhone', location: 'Санкт-Петербург', lastActive: '2 часа назад', icon: '📱' },
              ].map((session, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{session.icon}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{session.device}</p>
                      <p className="text-sm text-gray-600">📍 {session.location} • {session.lastActive}</p>
                    </div>
                  </div>
                  <button disabled className="px-3 py-1 text-red-600 hover:text-red-700 text-sm cursor-not-allowed">
                    Выход
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА: УВЕДОМЛЕНИЯ */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          {showSuccess === 'notifications' && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start gap-3">
              <span>✅</span>
              <div>
                <p className="font-semibold">Настройки сохранены</p>
                <p className="text-sm">Ваши предпочтения уведомлений обновлены</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Email уведомления</h2>

            <div className="space-y-4">
              {[
                { key: 'emailNewRequest', label: 'Новые заказы', desc: 'Получайте уведомления о новых заказах в ваших категориях' },
                { key: 'emailMessages', label: 'Новые сообщения', desc: 'Когда вам пишут заказчики или исполнители' },
                { key: 'emailPayment', label: 'Платежи', desc: 'Подтверждение платежей и выплат' },
                { key: 'emailWeeklyReport', label: 'Еженедельный отчёт', desc: 'Статистика за неделю по вашим проектам' },
              ].map(item => (
                <label key={item.key} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <input
                    type="checkbox"
                    checked={notifications[item.key]}
                    onChange={() => handleNotificationsChange(item.key)}
                    className="w-5 h-5 mt-1 cursor-pointer accent-blue-600"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Push уведомления</h2>

            <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <input
                type="checkbox"
                checked={notifications.pushNotifications}
                onChange={() => handleNotificationsChange('pushNotifications')}
                className="w-5 h-5 mt-1 cursor-pointer accent-blue-600"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Включить push уведомления</p>
                <p className="text-sm text-gray-600">Требует подключения приложения к сервисам уведомлений</p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* ВКЛАДКА: ПРИВАТНОСТЬ */}
      {activeTab === 'privacy' && (
        <div className="space-y-6">
          {showSuccess === 'privacy' && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start gap-3">
              <span>✅</span>
              <div>
                <p className="font-semibold">Настройки сохранены</p>
                <p className="text-sm">Параметры приватности обновлены</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Видимость профиля</h2>

            <div className="space-y-4">
              {[
                { key: 'showProfile', label: 'Видимый профиль', desc: 'Другие пользователи смогут видеть ваш профиль' },
                { key: 'allowMessages', label: 'Разрешить сообщения', desc: 'Люди смогут писать вам' },
                { key: 'allowCalls', label: 'Разрешить звонки', desc: 'Люди смогут вам звонить' },
                { key: 'showRating', label: 'Показывать рейтинг', desc: 'Публично отображать ваш рейтинг' },
              ].map(item => (
                <label key={item.key} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                  <input
                    type="checkbox"
                    checked={privacy[item.key]}
                    onChange={() => handlePrivacyChange(item.key)}
                    className="w-5 h-5 mt-1 cursor-pointer accent-blue-600"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Блокировка</h2>

            <div className="space-y-3">
              {[
                { name: 'Иван П.', reason: 'Неуважительное поведение' },
                { name: 'Петр К.', reason: 'Спам' },
              ].map((blocked, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{blocked.name}</p>
                    <p className="text-sm text-gray-600">{blocked.reason}</p>
                  </div>
                  <button className="px-3 py-1 text-red-600 hover:text-red-700 text-sm font-medium">
                    Разблокировать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ВКЛАДКА: ПЛАТЕЖИ */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Способы оплаты</h2>

            <div className="space-y-4 mb-6">
              {[
                { type: 'Карта Visa', last4: '4242', expiry: '12/25', default: true },
                { type: 'Карта Mastercard', last4: '5555', expiry: '08/24', default: false },
              ].map((card, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <p className="font-semibold text-gray-900">{card.type} •••• {card.last4}</p>
                      <p className="text-sm text-gray-600">Действует до {card.expiry}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {card.default && <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs font-semibold">По умолчанию</span>}
                    <button disabled className="px-3 py-1 text-red-600 text-sm cursor-not-allowed">
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button disabled className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-medium">
              + Добавить карту
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Выплаты</h2>

            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Доступный баланс:</span>
                  <span className="font-bold text-gray-900">150 000 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">На выплате:</span>
                  <span className="font-bold text-gray-900">25 000 ₽</span>
                </div>
              </div>

              <button disabled className="w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed font-bold">
                💸 Вывести средства
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">Требует подключения платёжной системы (Stripe, Yandex.Kassa)</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">История платежей</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Дата</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Описание</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Сумма</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: '2024-01-20', desc: 'Выплата за проект', amount: '50 000 ₽', status: '✅ Выплачено' },
                    { date: '2024-01-15', desc: 'Комиссия платформы', amount: '-5 000 ₽', status: '✅ Списано' },
                    { date: '2024-01-10', desc: 'Выплата за проект', amount: '80 000 ₽', status: '✅ Выплачено' },
                  ].map((payment, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4">{payment.date}</td>
                      <td className="py-3 px-4">{payment.desc}</td>
                      <td className="py-3 px-4 text-right font-semibold">{payment.amount}</td>
                      <td className="py-3 px-4">{payment.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Опасная зона */}
      <div className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-red-700 mb-4">🚨 Опасная зона</h2>

        <div className="space-y-4">
          <button disabled className="w-full px-6 py-3 bg-red-100 text-red-700 rounded-lg cursor-not-allowed font-bold hover:bg-red-200 transition">
            📥 Скачать мои данные
          </button>

          <button disabled className="w-full px-6 py-3 bg-red-600 text-white rounded-lg cursor-not-allowed font-bold hover:bg-red-700 transition">
            🗑️ Удалить аккаунт
          </button>
        </div>

        <p className="text-xs text-red-600 mt-4">Требует подключения к бэку и подтверждения по email</p>
      </div>
    </div>
  );
}