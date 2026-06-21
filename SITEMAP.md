# REMPRO — Карта связей страниц

## ПУБЛИЧНЫЕ СТРАНИЦЫ (без авторизации)
- login.html → register.html, forgot-password.html, help.html, terms.html, privacy.html
- register.html → login.html, terms.html, privacy.html
- forgot-password.html → login.html
- 404.html → dashboard.html (после входа)
- maintenance.html → (нет ссылок, только форма подписки)
- terms.html → privacy.html, login.html
- privacy.html → terms.html, login.html

## ВНУТРЕННИЕ СТРАНИЦЫ (после авторизации)

### Основная навигация (верхнее меню):
- dashboard.html → projects, search, messages, notifications, finance, profile, settings, help
- projects.html → dashboard, search, workers, panels, reports, admin, manager
- search.html → dashboard, projects, finance, workers
- messages.html → dashboard, notifications, profile
- notifications.html → dashboard, messages, settings
- finance.html → dashboard, projects, reports, documents
- calendar.html → dashboard, projects, notifications
- documents.html → dashboard, finance, reports
- reviews.html → dashboard, portfolio, profile
- portfolio.html → dashboard, reviews, projects
- workers.html → dashboard, projects, search, manager
- panels.html → dashboard, reports, admin
- reports.html → dashboard, panels, finance, admin
- specializations.html → dashboard, profile, settings
- admin.html → admin-users, admin-logs, admin-payments, admin-settings
- manager.html → dashboard, projects, workers, search
- settings.html → dashboard, profile, personal-data, help
- notifications.html → dashboard, messages, settings
- help.html → dashboard, settings, profile
- profile.html → dashboard, personal-data, settings, specializations, portfolio, reviews
- personal-data.html → profile, settings
- request-form.html → dashboard, projects
- admin-users.html → admin, admin-logs, admin-payments, admin-settings
- admin-logs.html → admin, admin-users, admin-payments, admin-settings
- admin-payments.html → admin, admin-users, admin-logs, admin-settings
- admin-settings.html → admin, admin-users, admin-logs, admin-payments

### Ключевые переходы:
1. Из dashboard.html:
   - Клик по проекту → projects.html (детали)
   - Клик по уведомлению → notifications.html
   - Клик по сообщению → messages.html
   - Клик по финансам → finance.html
   - Клик по аватару → profile.html

2. Из profile.html:
   - "Личные данные" → personal-data.html
   - "Специализация" → specializations.html
   - "Настройки" → settings.html
   - "Портфолио" → portfolio.html
   - "Отзывы" → reviews.html

3. Из admin.html:
   - "Пользователи" → admin-users.html
   - "Логи" → admin-logs.html
   - "Платежи" → admin-payments.html
   - "Настройки" → admin-settings.html

4. Из projects.html:
   - "Создать проект" → request-form.html
   - Клик по проекту → project-detail.html (будущая страница)
   - Фильтры → search.html

5. Из search.html:
   - Клик по заданию → task-detail.html (будущая страница)
   - "Откликнуться" → messages.html

6. Из finance.html:
   - "Вывести средства" → settings.html (раздел платежей)
   - Клик по транзакции → documents.html

7. Из specializations.html:
   - Клик по категории → открывается соответствующий раздел
   - "Назад" → profile.html

8. Из help.html:
   - "Создать тикет" → форма на той же странице
   - "Контакты" → открывает email/телефон

9. Из documents.html:
   - Клик по документу → открывается PDF/DOC
   - "Загрузить" → форма загрузки

10. Из reviews.html:
    - "Ответить" → форма ответа на отзыв
    - Клик по отзыву → profile.html (профиль автора)

11. Из portfolio.html:
    - "Добавить работу" → форма добавления
    - Клик по работе → project-detail.html (будущая страница)

12. Из notifications.html:
    - Клик по уведомлению → соответствующая страница (проект/сообщение/финансы)
    - "Отметить все" → помечает все как прочитанные

13. Из messages.html:
    - Клик по диалогу → открывается чат
    - "Новое сообщение" → выбор получателя

14. Из calendar.html:
    - Клик по дню → список событий
    - "Событие" → форма создания события

15. Из panels.html:
    - Клик по панели → открывается панель
    - "Создать панель" → форма создания

16. Из reports.html:
    - Клик по типу отчёта → меняется содержимое
    - "Скачать" → скачивает PDF/Excel

17. Из settings.html:
    - Разделы переключаются без перехода
    - "Сохранить" → сохраняет настройки

18. Из workers.html:
    - Клик по рабочему → worker-detail.html (будущая страница)
    - "Назначить" → messages.html или форма назначения

19. Из manager.html:
    - Клик по задаче → task-detail.html (будущая страница)
    - "Назначить исполнителя" → workers.html

20. Из admin-users.html:
    - Клик по пользователю → профиль пользователя
    - "Редактировать" → форма редактирования
    - "Заблокировать" → подтверждение действия

21. Из admin-logs.html:
    - "Экспорт" → скачивает CSV/JSON
    - Клик по записи → детали лога

22. Из admin-payments.html:
    - Клик по транзакции → детали платежа
    - "Возврат" → форма возврата

23. Из admin-settings.html:
    - Разделы переключаются без перехода
    - "Сохранить" → сохраняет настройки
    - "Опасная зона" → подтверждение действия