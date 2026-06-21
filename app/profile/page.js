"use client";

export default function Profile() {
  const handleSave = (e) => {
    e.preventDefault();
    alert('Настройки профиля успешно сохранены!');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Настройки профиля</h1>
      
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-3xl shadow-inner border border-gray-300">
          📷
        </div>
        <div>
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
            Загрузить фото
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
            <input type="text" defaultValue="Максим Гусев" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
            <input type="tel" defaultValue="+7 (999) 123-45-67" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" defaultValue="admin@rempro.ru" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Специализация (для Исполнителей)</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-blue-500">
              <option>Электрика</option>
              <option>Сантехника</option>
              <option>Отделка</option>
              <option>Ремонт под ключ</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 mt-6 flex justify-end">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}