# Инструкции по обновлению навигации во всех страницах

## ШАГ 1: Обновить внутренние страницы

Для каждой из следующих страниц нужно заменить существующий `<header>` на универсальный шаблон:

**Список файлов для обновления:**
1. dashboard.html
2. projects.html
3. workers.html
4. search.html
5. admin.html
6. manager.html
7. panels.html
8. reports.html
9. settings.html
10. notifications.html
11. messages.html
12. calendar.html
13. finance.html
14. help.html
15. documents.html
16. reviews.html
17. portfolio.html
18. profile.html
19. personal-data.html
20. request-form.html
21. specializations.html
22. admin-users.html
23. admin-logs.html
24. admin-payments.html
25. admin-settings.html

**Что заменить:**
Найти блок `<header>...</header>` и заменить его на шаблон из `nav-template.html` (ШАБЛОН 1).

**Дополнительно:**
Добавить в `<style>` стили для выпадающих меню (из ШАБЛОН 1).
Добавить в `<script>` скрипт для закрытия меню (из ШАБЛОН 1).

## ШАГ 2: Обновить публичные страницы

Для каждой из следующих страниц нужно заменить существующий `.top-bar` на универсальный шаблон:

**Список файлов для обновления:**
1. login.html
2. register.html
3. forgot-password.html
4. 404.html
5. maintenance.html
6. terms.html
7. privacy.html

**Что заменить:**
Найти блок `<div class="top-bar">...</div>` и заменить его на шаблон из `nav-template.html` (ШАБЛОН 2).

## ШАГ 3: Добавить активный класс для текущей страницы

В каждой странице найти ссылку на текущую страницу в навигации и добавить класс `active`:

Пример для dashboard.html:
```html
<a href="dashboard.html" class="active">Рабочий стол</a>