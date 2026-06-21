"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLE_PERMISSIONS } from '@/config/roles';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const moreRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) setIsMoreOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const linkClass = (path) => 
    `text-sm whitespace-nowrap transition-colors ${pathname === path ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'}`;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) return null;

  const roleInfo = user ? ROLE_PERMISSIONS[user.role] : null;

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 relative z-50">
      
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden text-2xl text-gray-700" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        <Link href="/dashboard" className="flex items-center gap-2 font-extrabold text-lg text-gray-900">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
            R
          </div>
          <span className="hidden sm:inline">REMPRO</span>
        </Link>
      </div>

      {/* Навигация зависит от роли */}
      <nav className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center gap-5 lg:gap-6 absolute md:static top-[60px] left-0 right-0 bg-white md:bg-transparent p-5 md:p-0 border-b md:border-none border-gray-200 flex-1 md:ml-10`}>
        {user && (
          <>
            <Link href="/dashboard" className={linkClass('/dashboard')}>Рабочий стол</Link>
            
            {['admin', 'manager'].includes(user.role) && (
              <Link href="/projects" className={linkClass('/projects')}>Проекты</Link>
            )}
            
            {user.role === 'executor' && (
              <Link href="/my-tasks" className={linkClass('/my-tasks')}>Мои задачи</Link>
            )}

            {user.role === 'client' && (
              <Link href="/requests" className={linkClass('/requests')}>Мои заказы</Link>
            )}

            <Link href="/chat" className={linkClass('/chat')}>Сообщения</Link>

            {['admin', 'manager', 'executor'].includes(user.role) && (
              <Link href="/finance" className={linkClass('/finance')}>Финансы</Link>
            )}

            {/* Меню "Ещё" с условной логикой */}
            <div className="relative group" ref={moreRef}>
              <button 
                className="text-sm text-gray-700 hover:text-blue-600 flex items-center gap-1 py-4 md:py-0 cursor-pointer"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
              >
                Ещё ▾
              </button>
              
              <div className={`${isMoreOpen ? 'block' : 'hidden'} md:group-hover:block absolute top-[100%] left-0 pt-2 z-50`}>
                <div className="w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 flex flex-col">
                  {user.role === 'admin' && (
                    <>
                      <Link href="/admin" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">⚙️ Администратор</Link>
                      <Link href="/users" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">👥 Пользователи</Link>
                      <Link href="/reports" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">📈 Отчёты</Link>
                      <div className="h-px bg-gray-200 my-1"></div>
                    </>
                  )}
                  
                  {user.role === 'manager' && (
                    <>
                      <Link href="/estimates" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">📋 Сметы</Link>
                      <Link href="/reports" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">📈 Отчёты</Link>
                      <div className="h-px bg-gray-200 my-1"></div>
                    </>
                  )}

                  {user.role === 'executor' && (
                    <>
                      <Link href="/portfolio" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">🖼️ Портфолио</Link>
                      <Link href="/reviews" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">⭐ Отзывы</Link>
                      <div className="h-px bg-gray-200 my-1"></div>
                    </>
                  )}

                  <Link href="/help" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">❓ Помощь</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      {/* Правый блок */}
      <div className="flex items-center gap-4 ml-auto md:ml-0">
        {user && ['admin', 'manager', 'client'].includes(user.role) && (
          <Link href="/request-form" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap hidden lg:block">
            + Создать
          </Link>
        )}
        
        {user ? (
          <div className="relative" ref={profileRef}>
            <button 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {user.avatar}
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs font-semibold text-gray-900 leading-none">{user.name.split(' ')[0]}</span>
                <span className="text-xs text-gray-600">{roleInfo?.label}</span>
              </div>
            </button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 flex flex-col z-50">
                <div className="px-4 py-3 border-b border-gray-200 mb-2">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-600">{roleInfo?.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                </div>
                
                <Link href="/profile" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">👤 Мой профиль</Link>
                <Link href="/settings" className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">⚙️ Настройки</Link>
                
                <div className="h-px bg-gray-200 my-2"></div>
                
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left cursor-pointer"
                >
                  🚪 Выйти
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
            Вход
          </Link>
        )}
      </div>
    </header>
  );
}