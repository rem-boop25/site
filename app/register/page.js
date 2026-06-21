"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { cities, categories, experienceLevels, paymentMethods, workSchedules } from '@/app/data/registrationData';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [basicInfo, setBasicInfo] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '',
  });

  const [phoneCode, setPhoneCode] = useState('');
  const [verificationAttempts, setVerificationAttempts] = useState(0);

  const [executorProfile, setExecutorProfile] = useState({
    specializations: [],
    experience: '',
    qualification: 'specialist',
    hourlyRate: '',
    hasTools: 'partial',
    workSchedule: [],
  });

  const [clientProfile, setClientProfile] = useState({
    companyName: '',
    inn: '',
    preferredCategories: [],
    paymentMethods: [],
  });

  const validateBasicInfo = () => {
    const newErrors = {};

    if (!basicInfo.firstName || basicInfo.firstName.length < 2) {
      newErrors.firstName = 'Имя должно содержать минимум 2 символа';
    }

    if (!basicInfo.lastName || basicInfo.lastName.length < 2) {
      newErrors.lastName = 'Фамилия должна содержать минимум 2 символа';
    }

    if (!basicInfo.phone || basicInfo.phone.replace(/\D/g, '').length !== 11) {
      newErrors.phone = 'Введите корректный номер телефона (11 цифр)';
    }

    if (basicInfo.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (basicInfo.password !== basicInfo.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(basicInfo.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!basicInfo.city) {
      newErrors.city = 'Выберите город';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!role) {
        setErrors({ role: 'Выберите вашу роль' });
        return;
      }
      setStep(2);
      setErrors({});
    } else if (step === 2) {
      if (validateBasicInfo()) {
        setStep(3);
      }
    } else if (step === 3) {
      if (phoneCode === '1234') {
        setStep(4);
        setErrors({});
      } else {
        setVerificationAttempts(verificationAttempts + 1);
        setErrors({ phoneCode: 'Неверный код. Попыток осталось: ' + (3 - verificationAttempts) });
        if (verificationAttempts >= 2) {
          setErrors({ phoneCode: 'Слишком много попыток. Попробуйте позже.' });
        }
      }
    } else if (step === 4) {
      if (role === 'executor') {
        if (executorProfile.specializations.length === 0) {
          setErrors({ specializations: 'Выберите минимум одну специализацию' });
          return;
        }
      }
      setStep(5);
      setErrors({});
    } else if (step === 5) {
      completeRegistration();
    }
  };

  const completeRegistration = () => {
    setLoading(true);
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: `${basicInfo.firstName} ${basicInfo.lastName}`,
        firstName: basicInfo.firstName,
        lastName: basicInfo.lastName,
        email: basicInfo.email,
        phone: basicInfo.phone,
        password: basicInfo.password,
        role: role,
        avatar: basicInfo.firstName[0] + basicInfo.lastName[0],
        city: basicInfo.city,
        categories: role === 'executor' ? executorProfile.specializations : clientProfile.preferredCategories,
        rating: 0,
        description: '',
        ...(role === 'executor' && {
          experience: executorProfile.experience,
          qualification: executorProfile.qualification,
          hourlyRate: executorProfile.hourlyRate,
          hasTools: executorProfile.hasTools,
          workSchedule: executorProfile.workSchedule,
          verified: false,
        }),
        ...(role === 'client' && {
          companyName: clientProfile.companyName,
          inn: clientProfile.inn,
          paymentMethods: clientProfile.paymentMethods,
        }),
      };

      const { password, ...userWithoutPassword } = newUser;
      login(userWithoutPassword);
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  const toggleCategory = (category) => {
    if (role === 'executor') {
      setExecutorProfile({
        ...executorProfile,
        specializations: executorProfile.specializations.includes(category)
          ? executorProfile.specializations.filter(c => c !== category)
          : [...executorProfile.specializations, category],
      });
    } else {
      setClientProfile({
        ...clientProfile,
        preferredCategories: clientProfile.preferredCategories.includes(category)
          ? clientProfile.preferredCategories.filter(c => c !== category)
          : [...clientProfile.preferredCategories, category],
      });
    }
  };

  const togglePaymentMethod = (method) => {
    setClientProfile({
      ...clientProfile,
      paymentMethods: clientProfile.paymentMethods.includes(method)
        ? clientProfile.paymentMethods.filter(m => m !== method)
        : [...clientProfile.paymentMethods, method],
    });
  };

  const toggleWorkSchedule = (schedule) => {
    setExecutorProfile({
      ...executorProfile,
      workSchedule: executorProfile.workSchedule.includes(schedule)
        ? executorProfile.workSchedule.filter(s => s !== schedule)
        : [...executorProfile.workSchedule, schedule],
    });
  };

  const stepLabels = ['Выбор роли', 'Основная информация', 'Подтверждение', 'Профиль', 'Готово!'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          {/* Логотип */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                R
              </div>
            </Link>
          </div>

          {/* Прогресс-бар */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              {stepLabels.map((label, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full transition ${
                    index < step ? 'bg-blue-500' : index === step - 1 ? 'bg-blue-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-sm text-gray-600">
              Шаг {step} из {stepLabels.length}: {stepLabels[step - 1]}
            </p>
          </div>

          {/* ШАГИ РЕГИСТРАЦИИ */}

          {/* Шаг 1: Выбор роли */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Кто вы?</h2>

              {errors.role && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {errors.role}
                </div>
              )}

              <div className="space-y-3 mb-6">
                {[
                  { value: 'client', label: '💼 Я заказчик', desc: 'Ищу исполнителей' },
                  { value: 'executor', label: '👷 Я исполнитель', desc: 'Выполняю работы' },
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition text-left cursor-pointer ${
                      role === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <p className="font-bold text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-gray-600">
                Сотрудник платформы?{' '}
                <Link href="/login" className="text-blue-600 font-medium hover:underline">
                  Вход для сотрудников
                </Link>
              </p>
            </div>
          )}

          {/* Шаг 2: Основная информация */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Основная информация</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Имя</label>
                  <input
                    type="text"
                    value={basicInfo.firstName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, firstName: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                      errors.firstName ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="Иван"
                  />
                  {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Фамилия</label>
                  <input
                    type="text"
                    value={basicInfo.lastName}
                    onChange={(e) => setBasicInfo({ ...basicInfo, lastName: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                      errors.lastName ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="Петров"
                  />
                  {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Телефон</label>
                  <input
                    type="tel"
                    value={basicInfo.phone}
                    onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                      errors.phone ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="+7 (999) 123-45-67"
                  />
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    value={basicInfo.email}
                    onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                      errors.email ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Пароль</label>
                  <input
                    type="password"
                    value={basicInfo.password}
                    onChange={(e) => setBasicInfo({ ...basicInfo, password: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                      errors.password ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Подтвердите пароль</label>
                  <input
                    type="password"
                    value={basicInfo.confirmPassword}
                    onChange={(e) => setBasicInfo({ ...basicInfo, confirmPassword: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                      errors.confirmPassword ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Город</label>
                  <select
                    value={basicInfo.city}
                    onChange={(e) => setBasicInfo({ ...basicInfo, city: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${
                      errors.city ? 'border-red-400' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Выберите город</option>
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Шаг 3: Подтверждение телефона */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Подтвердите телефон</h2>
              <p className="text-center text-sm text-gray-600 mb-6">
                На номер {basicInfo.phone} отправлен SMS-код
              </p>

              {errors.phoneCode && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                  {errors.phoneCode}
                </div>
              )}

              <input
                type="text"
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength="4"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm text-center text-2xl tracking-widest font-bold mb-6"
                placeholder="0000"
              />

              <p className="text-center text-xs text-gray-600 mb-6">
                💡 Код для тестирования: <strong>1234</strong>
              </p>
            </div>
          )}

          {/* Шаг 4: Детали профиля */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {role === 'executor' ? 'Ваша специализация' : 'Предпочитаемые работы'}
              </h2>

              {role === 'executor' && (
                <>
                  {errors.specializations && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                      {errors.specializations}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Специализация</label>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategory(cat)}
                            className={`p-2 rounded-lg border transition text-sm font-medium cursor-pointer ${
                              executorProfile.specializations.includes(cat)
                                ? 'bg-blue-50 border-blue-500 text-blue-600'
                                : 'border-gray-200 text-gray-900 hover:border-blue-500'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Опыт работы (лет)</label>
                      <input
                        type="number"
                        value={executorProfile.experience}
                        onChange={(e) => setExecutorProfile({ ...executorProfile, experience: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Квалификация</label>
                      <select
                        value={executorProfile.qualification}
                        onChange={(e) => setExecutorProfile({ ...executorProfile, qualification: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                      >
                        {experienceLevels.map(level => (
                          <option key={level} value={level.toLowerCase()}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Цена в час (₽)</label>
                      <input
                        type="number"
                        value={executorProfile.hourlyRate}
                        onChange={(e) => setExecutorProfile({ ...executorProfile, hourlyRate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                        placeholder="500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">График работы</label>
                      <div className="space-y-2">
                        {workSchedules.map(schedule => (
                          <label key={schedule} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={executorProfile.workSchedule.includes(schedule)}
                              onChange={() => toggleWorkSchedule(schedule)}
                              className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                            />
                            <span className="text-sm text-gray-900">{schedule}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === 'client' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Название компании (опционально)</label>
                    <input
                      type="text"
                      value={clientProfile.companyName}
                      onChange={(e) => setClientProfile({ ...clientProfile, companyName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                      placeholder="ООО Компания"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">ИНН (опционально)</label>
                    <input
                      type="text"
                      value={clientProfile.inn}
                      onChange={(e) => setClientProfile({ ...clientProfile, inn: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                      placeholder="7700000000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Предпочитаемые работы</label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => toggleCategory(cat)}
                          className={`p-2 rounded-lg border transition text-sm font-medium cursor-pointer ${
                            clientProfile.preferredCategories.includes(cat)
                              ? 'bg-blue-50 border-blue-500 text-blue-600'
                              : 'border-gray-200 text-gray-900 hover:border-blue-500'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">Способ оплаты</label>
                    <div className="space-y-2">
                      {paymentMethods.map(method => (
                        <label key={method} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={clientProfile.paymentMethods.includes(method)}
                            onChange={() => togglePaymentMethod(method)}
                            className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                          />
                          <span className="text-sm text-gray-900">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Шаг 5: Финальное подтверждение */}
          {step === 5 && (
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Поздравляем!</h2>
              <p className="text-gray-600 text-sm mb-6">
                {role === 'executor'
                  ? 'Ваш профиль создан. Он отправлен на верификацию. Модератор проверит ваши документы в течение 24-48 часов.'
                  : 'Ваш аккаунт успешно создан. Добро пожаловать на RemPro!'}
              </p>
            </div>
          )}

          {/* Кнопки навигации */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                ← Назад
              </button>
            )}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Загрузка...' : step === 5 ? 'Готово' : 'Далее →'}
            </button>
          </div>

          {/* Ссылка на вход */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Уже есть аккаунт?{' '}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}