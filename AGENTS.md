🤖 О ПРОЕКТЕ
Название: RemPro — Платформа для поиска исполнителей и заказчиков в строительстве

Тип: Статичный фронтенд-макет (Mock Data)

Статус: Разработка MVP

Стек: Next.js 14+ (App Router) + Tailwind CSS

🎯 ГЛАВНАЯ ЦЕЛЬ
Разработать полноценный статичный веб-интерфейс платформы RemPro в точном соответствии с дизайном из файла dashboard.html. Все страницы должны использовать единую стилистику — серо-белая гамма, синие акценты (#3b82f6), скругления, тени, типографика.

🧠 КЛЮЧЕВЫЕ ПРИНЦИПЫ РАЗРАБОТКИ
Принцип	Описание
Единый стиль	Все страницы копируют стиль dashboard.html
Mock First	Все данные — захардкоженные массивы в папке data/
Client First	Все страницы используют "use client"
Mobile First	Адаптивность от мобильных устройств к десктопу
Tailwind Only	Только утилитарные классы, строго по дизайну
🎨 ДИЗАЙН-СИСТЕМА (ИЗ DASHBOARD.HTML)
Цветовая схема
css
/* Основные цвета из макета */
--primary: #3b82f6;        /* Синий (кнопки, акценты) */
--primary-hover: #2563eb;  /* Темно-синий (при наведении) */
--primary-light: #eff6ff;  /* Светло-синий (фон кнопок) */
--primary-bg: #dbeafe;     /* Синий для бейджей (в работе) */

--gray-50: #f5f7fa;        /* Фон страницы */
--gray-100: #f9fafb;       /* Фон элементов (нотификации) */
--gray-200: #e8e8e8;       /* Границы */
--gray-300: #e5e7eb;       /* Границы карточек */
--gray-400: #888;          /* Второстепенный текст */
--gray-500: #666;          /* Подписи */
--gray-600: #333;          /* Основной текст */
--gray-700: #1a1a1a;       /* Заголовки */

--white: #ffffff;          /* Фон карточек */
--black: #000000;

/* Статусы */
--status-progress-bg: #dbeafe;
--status-progress-text: #2563eb;
--status-pending-bg: #fef3c7;
--status-pending-text: #d97706;
--status-done-bg: #d1fae5;
--status-done-text: #059669;

/* Дополнительно */
--green: #10b981;          /* Зеленый (завершено) */
--red: #ef4444;            /* Красный (выход) */
--shadow: 0 2px 8px rgba(0,0,0,0.04);
--border-radius: 16px;     /* Карточки */
--border-radius-sm: 12px;  /* Меню */
--border-radius-xs: 8px;   /* Кнопки */
Tailwind-классы для стилей из макета
javascript
// Фон страницы
<body className="bg-[#f5f7fa] min-h-screen">

// Карточка
<div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">

// Кнопка основная (синяя)
<button className="bg-[#3b82f6] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#2563eb] transition">

// Кнопка быстрого действия
<button className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white hover:border-[#3b82f6] hover:bg-[#eff6ff] transition">

// Бейдж статуса "В работе"
<span className="bg-[#dbeafe] text-[#2563eb] px-3 py-1 rounded-full text-xs font-semibold">

// Бейдж статуса "Завершено"
<span className="bg-[#d1fae5] text-[#059669] px-3 py-1 rounded-full text-xs font-semibold">

// Бейдж статуса "Ожидает"
<span className="bg-[#fef3c7] text-[#d97706] px-3 py-1 rounded-full text-xs font-semibold">

// Заголовок страницы
<h1 className="text-[28px] font-bold text-[#1a1a1a] mb-6">

// Заголовок карточки
<h2 className="text-lg font-semibold mb-5">

// Статистика
<div className="bg-white rounded-2xl p-6 border-t-4 border-[#3b82f6] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
  <div className="text-sm text-[#666] mb-2">Активные проекты</div>
  <div className="text-[32px] font-bold text-[#1a1a1a]">12</div>
</div>

// Уведомление
<div className="p-3 bg-[#f9fafb] rounded-xl text-sm border-l-4 border-[#3b82f6]">
  Новый заказ на монтаж вентиляции
  <div className="text-[11px] text-[#999] mt-1">2 часа назад</div>
</div>

// Аватар (круг с инициалами)
<div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e40af] flex items-center justify-center text-white text-xs font-semibold">
  МГ
</div>

// Таблица (как в макете)
<table className="w-full border-collapse">
  <thead>
    <tr>
      <th className="text-left text-[13px] text-[#888] font-medium py-3 px-2 border-b border-gray-200">№</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-4 px-2 border-b border-[#f5f5f5] text-sm">1</td>
    </tr>
  </tbody>
</table>

// Dropdown меню
<div className="relative">
  <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-xl shadow-lg min-w-[220px] z-50 py-2 mt-1">
    <a className="block px-4 py-2.5 text-sm text-[#333] hover:bg-[#f5f7fa] hover:text-[#3b82f6]">📅 Календарь</a>
  </div>
</div>

// Разделитель в меню
<div className="h-px bg-gray-200 my-2"></div>

// Выход (красный)
<a className="block px-4 py-2.5 text-sm text-[#ef4444] hover:bg-[#fee2e2] hover:text-[#dc2626]">🚪 Выйти</a>
📁 СТРУКТУРА ПРОЕКТА
text
src/
├── app/
│   ├── (pages)/
│   │   ├── dashboard/
│   │   │   └── page.js              # ✅ Готов (аналог dashboard.html)
│   │   ├── projects/
│   │   │   └── page.js              # Список проектов
│   │   ├── search/
│   │   │   └── page.js              # Поиск заказов/исполнителей
│   │   ├── messages/
│   │   │   └── page.js              # Сообщения/чаты
│   │   ├── notifications/
│   │   │   └── page.js              # Уведомления
│   │   ├── finance/
│   │   │   └── page.js              # Финансы/транзакции
│   │   ├── calendar/
│   │   │   └── page.js              # Календарь
│   │   ├── documents/
│   │   │   └── page.js              # Документы
│   │   ├── reviews/
│   │   │   └── page.js              # Отзывы
│   │   ├── portfolio/
│   │   │   └── page.js              # Портфолио
│   │   ├── workers/
│   │   │   └── page.js              # Рабочие/исполнители
│   │   ├── panels/
│   │   │   └── page.js              # Аналитические панели
│   │   ├── reports/
│   │   │   └── page.js              # Отчёты
│   │   ├── specializations/
│   │   │   └── page.js              # Специализации
│   │   ├── admin/
│   │   │   └── page.js              # Администратор
│   │   ├── manager/
│   │   │   └── page.js              # Менеджер
│   │   ├── request-form/
│   │   │   └── page.js              # Форма создания заявки
│   │   ├── profile/
│   │   │   └── page.js              # Профиль пользователя
│   │   ├── personal-data/
│   │   │   └── page.js              # Персональные данные
│   │   ├── settings/
│   │   │   └── page.js              # Настройки
│   │   ├── help/
│   │   │   └── page.js              # Помощь
│   │   └── login/
│   │       └── page.js              # Вход
│   ├── layout.js                     # Главный лейаут
│   └── page.js                       # Редирект на /dashboard
├── components/
│   ├── Header.jsx                    # ✅ УЖЕ СУЩЕСТВУЕТ (НЕ ТРОГАТЬ!)
│   ├── Sidebar.jsx                   # Боковое меню (адаптивное)
│   ├── StatsCard.jsx                 # Карточка статистики
│   ├── OrderTable.jsx                # Таблица заказов
│   ├── QuickActions.jsx              # Быстрые действия
│   ├── NotificationsList.jsx         # Список уведомлений
│   ├── StatusBadge.jsx               # Бейдж статуса
│   ├── DropdownMenu.jsx              # Выпадающее меню
│   └── Avatar.jsx                    # Аватар с инициалами
├── data/
│   ├── orders.js                     # Заказы
│   ├── projects.js                   # Проекты
│   ├── users.js                      # Пользователи
│   ├── messages.js                   # Сообщения
│   ├── notifications.js              # Уведомления
│   ├── payments.js                   # Платежи
│   ├── reviews.js                    # Отзывы
│   ├── portfolio.js                  # Портфолио
│   ├── workers.js                    # Рабочие
│   ├── specializations.js            # Специализации
│   └── reports.js                    # Отчёты
└── types/
    └── index.ts                      # TypeScript-интерфейсы
🧩 КОМПОНЕНТЫ (ИЗ ДИЗАЙНА)
StatsCard.jsx
jsx
"use client";

export default function StatsCard({ label, value, color = 'blue', borderColor = '#3b82f6' }) {
  return (
    <div className="bg-white rounded-2xl p-6 border-t-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" style={{ borderTopColor: borderColor }}>
      <div className="text-sm text-[#666] mb-2">{label}</div>
      <div className={`text-[32px] font-bold text-[#1a1a1a] ${color === 'green' ? 'text-[#10b981]' : color === 'blue' ? 'text-[#3b82f6]' : ''}`}>
        {value}
      </div>
    </div>
  );
}
StatusBadge.jsx
jsx
"use client";

const statusConfig = {
  'В работе': { bg: '#dbeafe', text: '#2563eb' },
  'Завершено': { bg: '#d1fae5', text: '#059669' },
  'Ожидает': { bg: '#fef3c7', text: '#d97706' },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig['Ожидает'];
  
  return (
    <span 
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: config.bg, color: config.text }}
    >
      {status}
    </span>
  );
}
QuickActions.jsx
jsx
"use client";

import Link from 'next/link';

const actions = [
  { href: '/request-form', icon: '📋', label: 'Создать заявку' },
  { href: '/projects', icon: '📁', label: 'Новый проект' },
  { href: '/workers', icon: '👥', label: 'Добавить клиента' },
  { href: '/reports', icon: '📊', label: 'Сформировать отчёт' },
];

export default function QuickActions() {
  return (
    <div className="flex flex-col gap-2.5">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white hover:border-[#3b82f6] hover:bg-[#eff6ff] transition text-sm font-medium"
        >
          <span className="text-lg">{action.icon}</span>
          {action.label}
        </Link>
      ))}
    </div>
  );
}
NotificationsList.jsx
jsx
"use client";

export default function NotificationsList({ notifications }) {
  return (
    <div className="flex flex-col gap-3 mt-5">
      {notifications.map((notif, index) => (
        <div key={index} className="p-3 bg-[#f9fafb] rounded-xl text-sm border-l-4 border-[#3b82f6]">
          {notif.text}
          <div className="text-[11px] text-[#999] mt-1">{notif.time}</div>
        </div>
      ))}
    </div>
  );
}
OrderTable.jsx
jsx
"use client";

import StatusBadge from './StatusBadge';

export default function OrderTable({ orders }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left text-[13px] text-[#888] font-medium py-3 px-2 border-b border-gray-200">№</th>
          <th className="text-left text-[13px] text-[#888] font-medium py-3 px-2 border-b border-gray-200">Заказчик</th>
          <th className="text-left text-[13px] text-[#888] font-medium py-3 px-2 border-b border-gray-200">Описание</th>
          <th className="text-left text-[13px] text-[#888] font-medium py-3 px-2 border-b border-gray-200">Срок</th>
          <th className="text-left text-[13px] text-[#888] font-medium py-3 px-2 border-b border-gray-200">Статус</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="py-4 px-2 border-b border-[#f5f5f5] text-sm">{order.id}</td>
            <td className="py-4 px-2 border-b border-[#f5f5f5] text-sm">{order.customer}</td>
            <td className="py-4 px-2 border-b border-[#f5f5f5] text-sm">{order.description}</td>
            <td className="py-4 px-2 border-b border-[#f5f5f5] text-sm">{order.deadline}</td>
            <td className="py-4 px-2 border-b border-[#f5f5f5]">
              <StatusBadge status={order.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
📝 СТИЛИ HEADER (ДЛЯ ВСЕХ СТРАНИЦ)
jsx
// Header.jsx (уже существует, структура должна быть такой)
<header className="flex items-center px-6 py-3 bg-white border-b border-gray-200 gap-4 relative">
  <div className="flex items-center gap-2.5 font-semibold text-base whitespace-nowrap">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e40af] flex items-center justify-center text-white text-xs font-semibold">
      RP
    </div>
    REMPRO
  </div>
  
  <nav className="flex items-center gap-5 flex-1">
    <Link href="/dashboard" className="text-sm text-[#333] hover:text-[#3b82f6] active:text-[#3b82f6]">Рабочий стол</Link>
    {/* ... остальные ссылки */}
  </nav>
  
  <div className="flex items-center gap-4">
    <button className="bg-[#3b82f6] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#2563eb] transition">
      + Создать
    </button>
    <div className="relative">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e40af] flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
        МГ
      </div>
      {/* Dropdown меню */}
    </div>
  </div>
</header>
📦 МОКОВЫЕ ДАННЫЕ (ДЛЯ DASHBOARD)
data/orders.js
javascript
export const orders = [
  { id: 1, customer: 'ООО «Стройка»', description: 'Монтаж электропроводки', deadline: '10.06.2026', status: 'В работе' },
  { id: 2, customer: 'ИП Петров', description: 'Установка кондиционера', deadline: '08.06.2026', status: 'Завершено' },
  { id: 3, customer: 'АО «Офис+»', description: 'Ремонт сантехники', deadline: '12.06.2026', status: 'Ожидает' },
  { id: 4, customer: 'ООО «ДомСервис»', description: 'Сборка мебели', deadline: '07.06.2026', status: 'Завершено' },
  { id: 5, customer: 'Иванов А.С.', description: 'Укладка плитки', deadline: '15.06.2026', status: 'В работе' },
];
data/notifications.js
javascript
export const notifications = [
  { text: 'Новый заказ на монтаж вентиляции', time: '2 часа назад' },
  { text: 'Заказчик оставил отзыв (5 ★)', time: '5 часов назад' },
  { text: 'Напоминание: сдать отчёт до 15.06', time: '1 день назад' },
];
🎯 СТРАНИЦА DASHBOARD (ГОТОВЫЙ КОД)
jsx
"use client";

import StatsCard from '@/components/StatsCard';
import OrderTable from '@/components/OrderTable';
import QuickActions from '@/components/QuickActions';
import NotificationsList from '@/components/NotificationsList';
import { orders } from '@/data/orders';
import { notifications } from '@/data/notifications';

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-8 pb-16">
      <h1 className="text-[28px] font-bold text-[#1a1a1a] mb-6">Рабочий стол</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatsCard label="Активные проекты" value="12" color="blue" />
        <StatsCard label="Завершённые" value="147" color="green" borderColor="#10b981" />
        <StatsCard label="Доход" value="285 000 ₽" color="default" />
        <StatsCard label="Рейтинг" value="4.8" color="default" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <h2 className="text-lg font-semibold mb-5">Последние заказы</h2>
          <OrderTable orders={orders} />
        </div>

        <div>
          <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <h3 className="text-base font-semibold mb-4">Быстрые действия</h3>
            <QuickActions />
            <NotificationsList notifications={notifications} />
          </div>
        </div>
      </div>
    </div>
  );
}
✅ КРИТЕРИИ КАЧЕСТВА
Точное соответствие дизайну — все цвета, отступы, скругления, тени из dashboard.html

Все компоненты с хуками используют "use client"

Адаптивность — Mobile First (как в макете: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4)

Типизация — TypeScript-интерфейсы для всех данных

Импорты — import Link from 'next/link', import { useRouter, usePathname } from 'next/navigation'

Навигация — через <Link> с активными классами active:text-[#3b82f6]

Статусы — цветные бейджи (3 вида: В работе, Завершено, Ожидает)

Dropdown — при наведении/клике, с разделителями

Аватар — круг с инициалами, градиент

Кнопки — синие, с ховер-эффектами

🚫 ЧЕГО НЕ ДЕЛАТЬ
❌ Не использовать сторонние UI-библиотеки

❌ Не использовать CSS-модули или styled-components

❌ Не делать реальные API-запросы (только моковые данные)

❌ Не трогать файл components/Header.jsx

❌ Не менять цветовую схему (строго из макета)

❌ Не использовать другие шрифты (только системные)

📌 ВАЖНО
Все страницы должны выглядеть как dashboard.html — это эталон дизайна. Если в макете есть элемент, он должен быть реализован точно так же на всех страницах.

Цвета строго из макета:

Синий: #3b82f6, #2563eb, #dbeafe, #eff6ff

Серый: #f5f7fa, #f9fafb, #e8e8e8, #e5e7eb, #666, #333, #1a1a1a, #888, #999

Зеленый: #10b981, #d1fae5, #059669

Желтый: #fef3c7, #d97706

Красный: #ef4444, #fee2e2, #dc2626

Скругления: rounded-2xl (16px) для карточек, rounded-xl (12px) для меню, rounded-lg (8px) для кнопок.