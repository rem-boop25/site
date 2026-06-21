"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { users } from '@/app/data/users';
import { ROLE_PERMISSIONS } from '@/config/roles';

export default function TestRolesPage() {
  const { user, login, logout } = useAuth();

  const handleLoginAsRole = (testUser) => {
    const { password, ...userWithoutPassword } = testUser;
    login(userWithoutPassword);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-1a1a1a mb-2">🧪 Тестирование ролей</h1>
      <p className="text-666 mb-8">Выберите роль для тестирования механики доступа</p>

      {/* Текущий пользователь */}
      {user && (
        <div className="bg-dbeafe border border-2563eb rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-2563eb mb-4">👤 Текущий пользователь</h2>
          <div className="space-y-2 mb-4">
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Роль:</strong> <span className="font-bold">{ROLE_PERMISSIONS[user.role]?.label}</span></p>
          </div>
          
          <div className="mb-6">
            <p className="text-sm font-semibold text-333 mb-2">Разрешения:</p>
            <div className="flex flex-wrap gap-2">
              {ROLE_PERMISSIONS[user.role]?.permissions.map(perm => (
                <span key={perm} className="bg-10b981 text-white px-2 py-1 rounded text-xs">
                  ✓ {perm}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-dc2626 text-white px-4 py-2 rounded-lg hover:bg-ef4444"
          >
            Выход
          </button>
        </div>
      )}

      {/* Таблица всех ролей */}
      <div className="bg-white rounded-2xl border border-e5e7eb p-6">
        <h2 className="text-lg font-bold text-1a1a1a mb-4">📋 Доступные роли</h2>
        
        <div className="space-y-4">
          {users.map(testUser => (
            <div 
              key={testUser.id}
              className="border border-e5e7eb rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-1a1a1a text-lg">{testUser.name}</h3>
                  <p className="text-sm text-666">
                    {testUser.email} / {testUser.password}
                  </p>
                  <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-eff6ff text-2563eb text-sm font-semibold">
                    {ROLE_PERMISSIONS[testUser.role]?.label}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs font-semibold text-666 mb-2">Разрешения:</p>
                <div className="flex flex-wrap gap-1">
                  {ROLE_PERMISSIONS[testUser.role]?.permissions.slice(0, 5).map(perm => (
                    <span key={perm} className="bg-f5f7fa text-666 px-2 py-0.5 rounded text-xs">
                      {perm}
                    </span>
                  ))}
                  {ROLE_PERMISSIONS[testUser.role]?.permissions.length > 5 && (
                    <span className="bg-f5f7fa text-666 px-2 py-0.5 rounded text-xs">
                      +{ROLE_PERMISSIONS[testUser.role]?.permissions.length - 5} ещё
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleLoginAsRole(testUser)}
                className="bg-3b82f6 text-white px-4 py-2 rounded-lg hover:bg-2563eb transition"
              >
                Войти как {ROLE_PERMISSIONS[testUser.role]?.label}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Инструкции для тестирования */}
      <div className="bg-fef3c7 border border-d97706 rounded-2xl p-6 mt-8">
        <h3 className="font-bold text-d97706 mb-3">📝 Что тестировать:</h3>
        <ul className="space-y-2 text-sm text-d97706">
          <li>✓ Видимость меню навигации (разные пункты для разных ролей)</li>
          <li>✓ Видимость кнопки "Создать" (только для admin, manager, client)</li>
          <li>✓ Разные боковые меню для разных ролей</li>
          <li>✓ Доступ к защищённым страницам</li>
          <li>✓ Отображение информации о роли в профиле</li>
          <li>✓ Разные данные в dashboard для каждой роли</li>
        </ul>
      </div>

      {/* Ссылки для тестирования */}
      <div className="bg-d1fae5 border border-10b981 rounded-2xl p-6 mt-8">
        <h3 className="font-bold text-10b981 mb-3">🔗 Страницы для тестирования:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <Link href="/dashboard" className="text-2563eb hover:underline">→ Dashboard</Link>
          <Link href="/projects" className="text-2563eb hover:underline">→ Projects</Link>
          <Link href="/messages" className="text-2563eb hover:underline">→ Messages</Link>
          <Link href="/finance" className="text-2563eb hover:underline">→ Finance</Link>
          <Link href="/my-tasks" className="text-2563eb hover:underline">→ My Tasks</Link>
          <Link href="/profile" className="text-2563eb hover:underline">→ Profile</Link>
        </div>
      </div>
    </div>
  );
}