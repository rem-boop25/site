"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function FinancePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Моки данных для финансов
  const financialData = {
    totalEarned: 285000,
    totalSpent: 95000,
    balance: 190000,
    thisMonth: 45000,
    transactions: [
      { id: 1, type: 'income', description: 'Оплата за проект "Ремонт кухни"', amount: 150000, date: '2024-01-15', status: 'completed' },
      { id: 2, type: 'expense', description: 'Материалы для проекта', amount: -25000, date: '2024-01-14', status: 'completed' },
      { id: 3, type: 'income', description: 'Оплата за проект "Покраска фасада"', amount: 120000, date: '2024-01-10', status: 'completed' },
      { id: 4, type: 'expense', description: 'Комиссия платформы', amount: -5000, date: '2024-01-09', status: 'completed' },
      { id: 5, type: 'income', description: 'Авансовый платёж', amount: 50000, date: '2024-01-08', status: 'pending' },
    ],
    invoices: [
      { id: 1, number: 'INV-2024-001', project: 'Ремонт кухни', amount: 150000, date: '2024-01-15', status: 'paid' },
      { id: 2, number: 'INV-2024-002', project: 'Покраска фасада', amount: 120000, date: '2024-01-10', status: 'paid' },
      { id: 3, number: 'INV-2024-003', project: 'Ремонт ванной', amount: 80000, date: '2024-02-01', status: 'pending' },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершено';
      case 'pending':
        return 'В ожидании';
      case 'paid':
        return 'Оплачено';
      case 'cancelled':
        return 'Отменено';
      default:
        return status;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Финансы</h1>
        <p className="text-gray-600">Управление доходами, расходами и счётами</p>
      </div>

      {/* Карточки статистики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Всего заработано */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600 mb-2">Всего заработано</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(financialData.totalEarned)}</p>
          <p className="text-xs text-green-600">📈 +15% за месяц</p>
        </div>

        {/* Всего потрачено */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600 mb-2">Всего потрачено</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(financialData.totalSpent)}</p>
          <p className="text-xs text-red-600">📉 -5% за месяц</p>
        </div>

        {/* Текущий баланс */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600 mb-2">Текущий баланс</p>
          <p className="text-3xl font-bold text-blue-600 mb-2">{formatCurrency(financialData.balance)}</p>
          <p className="text-xs text-gray-600">Доступно для вывода</p>
        </div>

        {/* В этом месяце */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600 mb-2">В этом месяце</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(financialData.thisMonth)}</p>
          <p className="text-xs text-gray-600">Доход за январь</p>
        </div>
      </div>

      {/* Вкладки */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex border-b border-gray-200">
          {['overview', 'transactions', 'invoices'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-4 font-medium transition text-center ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'overview' && '📊 Обзор'}
              {tab === 'transactions' && '📝 Операции'}
              {tab === 'invoices' && '🧾 Счёта'}
            </button>
          ))}
        </div>

        {/* Вкладка: Обзор */}
        {activeTab === 'overview' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Финансовый обзор</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* График доходов */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Доходы по месяцам</h3>
                <div className="space-y-4">
                  {[
                    { month: 'Ноябрь', amount: 180000, percent: 70 },
                    { month: 'Декабрь', amount: 220000, percent: 85 },
                    { month: 'Январь', amount: 285000, percent: 100 },
                  ].map(item => (
                    <div key={item.month}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{item.month}</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Источники доходов */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Источники доходов</h3>
                <div className="space-y-3">
                  {[
                    { source: 'Проекты', amount: 240000, percent: 84 },
                    { source: 'Консультации', amount: 30000, percent: 11 },
                    { source: 'Обучение', amount: 15000, percent: 5 },
                  ].map(item => (
                    <div key={item.source} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.source}</p>
                        <p className="text-xs text-gray-600">{item.percent}% от всех доходов</p>
                      </div>
                      <p className="font-bold text-gray-900">{formatCurrency(item.amount)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Вкладка: Операции */}
        {activeTab === 'transactions' && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">История операций</h2>

            <div className="space-y-3">
              {financialData.transactions.map(tx => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      tx.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {tx.type === 'income' ? '⬇️' : '⬆️'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{tx.description}</p>
                      <p className="text-xs text-gray-600">
                        {new Date(tx.date).toLocaleDateString('ru-RU', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'income' ? '+' : ''}{formatCurrency(tx.amount)}
                    </p>
                    <p className={`text-xs px-2 py-1 rounded ${getStatusColor(tx.status)}`}>
                      {getStatusLabel(tx.status)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Вкладка: Счёта */}
        {activeTab === 'invoices' && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Счёта</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                + Создать счёт
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Номер</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Проект</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Сумма</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Дата</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Статус</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {financialData.invoices.map(invoice => (
                    <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-4 font-medium text-gray-900">{invoice.number}</td>
                      <td className="py-4 px-4 text-gray-600">{invoice.project}</td>
                      <td className="py-4 px-4 text-right font-bold text-gray-900">{formatCurrency(invoice.amount)}</td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(invoice.date).toLocaleDateString('ru-RU')}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                          {getStatusLabel(invoice.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button className="text-blue-600 hover:underline text-sm font-medium">
                          📥 Скачать
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Кнопка вывода средств */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Готовы вывести средства?</h3>
            <p className="text-sm text-gray-600">
              Доступно для вывода: <span className="font-bold">{formatCurrency(financialData.balance)}</span>
            </p>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-bold">
            💳 Вывести средства
          </button>
        </div>
      </div>
    </div>
  );
}