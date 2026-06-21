"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: '📊 Дашборд' },
    { href: '/orders', label: '📋 Заказы' },
    { href: '/executors', label: '👷 Исполнители' },
    { href: '/chat', label: '💬 Чаты' },
    { href: '/profile', label: '👤 Профиль' },
  ];

  return (
    <>
      <button 
        className="md:hidden fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        МЕНЮ
      </button>

      <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out z-40 flex flex-col pt-16 md:pt-0`}>
        <div className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname.includes(link.href) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}