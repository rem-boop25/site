"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { users } from '@/app/data/users';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@rempro.ru');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        const { password, ...userWithoutPassword } = user;
        login(userWithoutPassword);
        router.push('/dashboard');
      } else {
        setError('Неверный email или пароль');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eff6ff to-f5f7fa flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Карточка логина */}
        <div className="bg-white rounded-2xl border border-e5e7eb shadow-lg p-8 mb-6">
          {/* Логотип */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-3b82f6 to-2563eb flex items-center justify-center text-white text-2xl font-bold">
              R
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center text-1a1a1a mb-1">REMPRO</h1>
          <p className="text-center text-666 mb-8 text-sm">Платформа поиска исполнителей в строительстве</p>

          {/* Сообщение об ошибке */}
          {error && (
            <div className="mb-6 p-4 bg-fee2e2 border border-dc2626 text-dc2626 rounded-xl text-sm font-medium flex items-start gap-3">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

                    {/* Форма */}
                    <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-333 mb-2">Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-e5e7eb rounded-lg focus:outline-none focus:ring-2 focus:ring-3b82f6 focus:border-transparent transition text-sm"
                placeholder="ваш@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-333 mb-2">Пароль</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-e5e7eb rounded-lg focus:outline-none focus:ring-2 focus:ring-3b82f6 focus:border-transparent transition text-sm"
                placeholder="••••••••"
              />
            </div>

            {/* КНОПКА ВХОДА */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 mt-8"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Загрузка...
                </span>
              ) : (
                '🚪 Войти в систему'
              )}
            </button>
          </form>

          {/* Разделитель */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-e5e7eb"></div>
            <span className="text-xs text-999">или</span>
            <div className="flex-1 h-px bg-e5e7eb"></div>
          </div>
          <Link 
            href="/register"
            className="block w-full text-center bg-d1fae5 text-10b981 px-4 py-3 rounded-lg hover:bg-10b981 hover:text-white transition font-semibold text-sm mb-6 border border-10b981 border-opacity-30"
          >
            📝 Создать аккаунт
          </Link>
          {/* Ссылка на быстрое тестирование */}
          <Link 
            href="/test-roles"
            className="block w-full text-center bg-d1fae5 text-10b981 px-4 py-3 rounded-lg hover:bg-10b981 hover:text-white transition font-semibold text-sm mb-6 border border-10b981 border-opacity-30"
          >
            🧪 Быстрое тестирование ролей
          </Link>
        </div>

        {/* Тестовые аккаунты для быстрого входа */}
        <div className="bg-white rounded-2xl border border-e5e7eb p-6 shadow-sm">
          <h3 className="font-bold text-1a1a1a mb-4 text-sm">📋 Быстрый вход</h3>
          
          <div className="space-y-2">
            {[
              { role: '👤 Admin', email: 'admin@rempro.ru', pass: 'admin123' },
              { role: '👔 Manager', email: 'manager@rempro.ru', pass: 'manager123' },
              { role: '👷 Executor', email: 'executor@rempro.ru', pass: 'executor123' },
              { role: '💼 Client', email: 'client@rempro.ru', pass: 'client123' },
            ].map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.pass);
                }}
                className="w-full text-left p-3 rounded-lg border border-e5e7eb hover:border-3b82f6 hover:bg-eff6ff transition flex items-center justify-between group"
              >
                <div className="text-sm">
                  <p className="font-semibold text-333">{account.role}</p>
                  <p className="text-xs text-666">{account.email}</p>
                </div>
                <span className="text-xl group-hover:scale-110 transition">→</span>
              </button>
            ))}
          </div>

          <p className="text-xs text-666 mt-4 text-center italic">
            Клик на аккаунт заполнит поля выше
          </p>
        </div>
      </div>
    </div>
  );
}