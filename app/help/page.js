export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">❓ Справка и поддержка</h1>
      <p className="text-gray-600 mb-8">Ответы на часто задаваемые вопросы</p>

      <div className="space-y-6">
        {[
          { q: 'Как создать проект?', a: '📌 [ЗАГЛУШКА] Напишите в поддержку' },
          { q: 'Как добавить исполнителей?', a: '📌 [ЗАГЛУШКА] Контакт: support@rempro.ru' },
          { q: 'Как вывести средства?', a: '📌 [ЗАГЛУШКА] Требует интеграции платёжной системы' },
        ].map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
        <p className="text-gray-700 mb-4">Не нашли ответ?</p>
        <button disabled className="bg-gray-300 text-gray-600 px-6 py-3 rounded-lg cursor-not-allowed font-bold">
          💬 Написать в поддержку (не работает)
        </button>
      </div>
    </div>
  );
}