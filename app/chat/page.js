"use client";

import { useState } from 'react';
import { users } from '../data/users';
import { messages as initialMessages } from '../data/messages';

export default function ChatPage() {
  // Фильтруем пользователей (только заказчики и исполнители)
  const chatUsers = users.filter(u => u.role === 'executor' || u.role === 'customer');
  
  // Состояния
  const [activeChat, setActiveChat] = useState(chatUsers[0]); // По умолчанию выбран первый чат
  const [localMessages, setLocalMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  
  // Состояние для переключения видов на мобилке (список или сам чат)
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Обработчик отправки сообщения
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      orderId: 1, // Демо-привязка
      senderId: 1, // ID текущего пользователя (отправителя)
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setLocalMessages([...localMessages, newMessage]);
    setInputValue('');
    alert('Сообщение отправлено (демо)');
  };

  // Обработчик выбора чата
  const handleSelectChat = (user) => {
    setActiveChat(user);
    setIsMobileChatOpen(true);
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden max-w-6xl mx-auto">
      
      {/* ЛЕВАЯ ПАНЕЛЬ: Список чатов */}
      <div className={`w-full md:w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-bold text-gray-800">Сообщения</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chatUsers.map(user => {
            // Имитация последнего сообщения (берем первое попавшееся)
            const lastMsg = localMessages.find(m => m.senderId === user.id) || localMessages[0];
            
            return (
              <div 
                key={user.id}
                onClick={() => handleSelectChat(user)}
                className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 transition shadow-sm ${activeChat?.id === user.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'hover:bg-gray-100 bg-white border-l-4 border-l-transparent'}`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">{user.name}</h3>
                    <span className="text-xs text-gray-400">{lastMsg?.timestamp || '12:00'}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {lastMsg?.text || 'Нет сообщений'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ПРАВАЯ ПАНЕЛЬ: Окно переписки */}
      <div className={`w-full md:w-2/3 bg-white flex flex-col ${!isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        
        {activeChat ? (
          <>
            {/* Шапка чата */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3 shadow-sm z-10">
              <button 
                onClick={() => setIsMobileChatOpen(false)}
                className="md:hidden p-2 -ml-2 text-gray-500 hover:text-blue-600"
              >
                ← Назад
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {activeChat.avatar}
              </div>
              <div>
                <h2 className="font-bold text-gray-800 text-sm">{activeChat.name}</h2>
                <span className="text-xs text-green-500">В сети</span>
              </div>
            </div>

            {/* Область сообщений */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
              {localMessages.map(msg => {
                // Имитация: если senderId === 1 (это мы), иначе собеседник
                const isMe = msg.senderId === 1;
                
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
                      <p>{msg.text}</p>
                      <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Ввод сообщения */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white flex items-center gap-2">
              <button type="button" className="p-2 text-gray-400 hover:text-blue-600 transition">📎</button>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите сообщение..." 
                className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full px-4 py-2 text-sm outline-none transition"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ➤
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Выберите чат из списка слева
          </div>
        )}

      </div>
    </div>
  );
}