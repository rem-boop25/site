"use client";

import { useState } from 'react';
import Link from 'next/link';
import { users } from '../data/users';

export default function ExecutorsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const executors = users.filter((user) => {
    if (user.role !== 'executor') return false;
    if (selectedCategory === 'Все') return true;
    return user.categories.includes(selectedCategory);
  });

  const allCategories = ['Все', 'Отделка', 'Сантехника', 'Электрика', 'Малярные работы', 'Кровля', 'Плотницкие работы', 'Потолки'];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex text-yellow-400 text-sm">
        {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>★</span>)}
        {hasHalfStar && <span>★</span>}
        {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-gray-300">★</span>)}
        <span className="ml-2 text-gray-600 font-medium text-xs pt-[2px]">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Исполнители</h1>
        
        <div className="flex items-center gap-2">
          <label htmlFor="categoryFilter" className="text-sm font-medium text-gray-600">Специализация:</label>
          <select 
            id="categoryFilter"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-e5e7eb rounded-xl px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-2563eb focus:border-2563eb shadow-sm"
          >
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {executors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executors.map(executor => (
            <div 
              key={executor.id}
              className="bg-white border border-e5e7eb rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-3b82f6 to-2563eb flex items-center justify-center text-white text-xl font-bold shadow-sm flex-shrink-0">
                  {executor.avatar}
                </div>
                
                <div className="pt-1">
                  <h3 className="text-lg font-bold text-1a1a1a leading-tight mb-1">{executor.name}</h3>
                  {renderStars(executor.rating)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 flex-1">
                {executor.categories.length > 0 ? (
                  executor.categories.map((cat, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-eff6ff text-2563eb px-3 py-1 rounded-xl text-xs font-semibold"
                    >
                      {cat}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-999 italic">Нет категорий</span>
                )}
              </div>

              <Link 
                href={`/profile`}
                className="w-full text-center block bg-f5f7fa border border-e5e7eb hover:bg-f9fafb hover:border-e8e8e8 text-333 font-medium py-2.5 rounded-lg transition text-sm"
              >
                Смотреть профиль
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-e5e7eb rounded-2xl shadow-sm">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-semibold text-1a1a1a mb-1">Никого не найдено</h3>
          <p className="text-666">По выбранной категории "{selectedCategory}" нет исполнителей.</p>
          <button 
            onClick={() => setSelectedCategory('Все')}
            className="mt-4 text-2563eb font-medium hover:underline"
          >
            Сбросить фильтр
          </button>
        </div>
      )}
    </div>
  );
}