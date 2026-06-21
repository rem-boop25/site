"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  // Моки данных для чатов
  const chats = [
    {
      id: 1,
      name: 'Иван Петров',
      avatar: 'ИП',
      role: 'Исполнитель',
      status: 'online',
      lastMessage: 'Когда можно приехать?',
      timestamp: '2024-01-20 14:30',
      unread: 2,
      messages: [
        { id: 1, sender: 'user', text: 'Здравствуйте! Готовы начать работы?', time: '10:00' },
        { id: 2, sender: 'chat', text: 'Да, готов! Когда нужно приехать?', time: '10:05' },
        { id: 3, sender: 'user', text: 'Завтра в 9 утра', time: '10:10' },
        { id: 4, sender: 'chat', text: 'Когда можно приехать?', time: '14:30' },
      ],
    },
    {
      id: 2,
      name: 'Петр Кузнецов',
      avatar: 'ПК',
      role: 'Заказчик',
      status: 'offline',
      lastMessage: 'Спасибо за работу!',
      timestamp: '2024-01-19 16:20',
      unread: 0,
      messages: [
        { id: 1, sender: 'chat', text: 'Спасибо за работу!', time: '16:20' },
      ],
    },
    {
      id: 3,
      name: 'Компания "БыстроРемонт"',
      avatar: 'БР',
      role: 'Менеджер',
      status: 'online',
      lastMessage: 'Проверьте смету',
      timestamp: '2024-01-20 13:45',
      unread: 1,
      messages: [
        { id: 1, sender: 'chat', text: 'Проверьте смету', time: '13:45' },
      ],
    },
  ];

  const currentChat = chats.find(c => c.id === selectedChat);
  const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);

  return (
    <div className="max-w-6xl mx-auto h-full">
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">💬 Сообщения</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Список чатов */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="🔍 Поиск чатов..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map(chat => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition text-left flex items-center gap-3 ${
                  selectedChat === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {chat.avatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{chat.name}</p>
                  <p className="text-xs text-gray-600 truncate">{chat.lastMessage}</p>
                </div>

                {chat.unread > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Чат */}
        {currentChat && (
          <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col">
            {/* Шапка чата */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {currentChat.avatar}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    currentChat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{currentChat.name}</p>
                  <p className="text-xs text-gray-600">{currentChat.status === 'online' ? '🟢 онлайн' : '🔴 оффлайн'}</p>
                </div>
              </div>
              <button className="text-gray-600 hover:text-gray-900 text-xl">⋮</button>
            </div>

            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentChat.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-600'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ввод сообщения */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Введите сообщение..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}