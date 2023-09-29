# YoDrive - курсовая работа

## Архитектура

.NET 7 + React js

## Запуск приложения

- Запустить Docker Desktop
- Из корня проекта пишем в терминале команду docker-compose up --build

## Описание проекта

### Курсовой проект по дисциплине «Базы данных» (5-ый семестр)

### 1. Введение

Цель: практическое закрепление материала, изученного в курсе «Базы данных» (4 семестр).
Предмет: программное обеспечение с графическим интерфейсом для работы с базой данных.
Тема: каршеринг (YoDrive).
Выполняют: Платонова Дарья, Ильдюков Дмитрий, Таныгин Вадим.

### 2. Основания для разработки

Выбор данной темы обоснован тем, что она предоставляет возможность для разработки интересного проекта, который позволит наилучшим образом соответствовать всем требованиям, предъявляемым к выполнению курсовой работы.

### 3. Предметная область и описание проекта

Предметной областью является каршеринг, позволяющий пользователям брать машины в посуточную аренду. Графическое представление предметной области реализовано в ER-диаграмме.

### 3.1 Различие между ролями

user – имеет полный доступ ко всеми клиентскими функциональным возможностям сайта (просмотр общей информации, создание и редактирование личного кабинета, бронирование автомобилей).

admin – имеет возможность добавления/удаления автомобилей и редактирования информации о них.

### 3.2 Стандартный функционал

### 3.2.1 Главная страница

На главной странице присутствует общая информация о компании, предпросмотр доступных автомобилей. В навигационном меню пользователь может авторизоваться, в случае нового клиента доступна регистрация. С главной страницы пользователь также может перейти на страницу бронирования авто, либо в личный кабинет (для авторизированных пользователей, иначе предлагается регистрация) с помощью меню.

### 3.2.2 Страница бронирования

На странице бронирования предоставляется пользователю широкий выбор доступных автомобилей. Для каждого из них отображается информация о названии модели, рейтинге, годе выпуска, типе коробки передач, типе кузова и стоимости аренды в сутки. Рейтинг позволяет увидеть отзывы к каждому автомобилю.

Функционал страницы содержит следующие возможности:
1) фильтрация по:
- временному/ценовому интервалу
- класс/марка/модель
- коробка передач
2) сортировка по:
- цене
- рейтингу

Для авторизованных пользователей доступна возможность бронирования подходящего автомобиля. Для неавторизованных пользователей предлагается авторизация/регистрация.

    3.2.2 - 1 Бронирование автомобиля
	
	При нажатии кнопки «забронировать» открывается окно, в котором пользователь еще раз может увидеть информацию об автомобиле, итоговой стоимости,  выбрать на календаре необходимый месяц и дату/ы из доступных(свободных) дат и в конечном случае забронировать, либо отменить операцию.

### 3.2.3 Личный кабинет

Данная страница доступна только для зарегистрировавшихся и авторизованных пользователей, иначе, при попытке перехода на данную страницу, будет предложена авторизация/регистрация.

Тут пользователю доступны следующие возможности:
- отредактировать личные данные, загрузить свое фото, либо удалить аккаунт
- просмотреть историю броней, оставить отзыв на каждую бронь
- перейти на страницу бронирования
- выйти из профиля


    	3.2.3 - 1 История броней

    	На данной странице также доступна функция фильтрация по месяцам, с помощью который пользователь может увидеть все брони, которые были совершены в данном месяце, и оставить на каждую из них свой отзыв (оценка по 5 бальной шкале и текстовое описание). Каждая бронь в свою очередь содержит информацию о наименовании автомобиля, стоимости в сутки, общей стоимости, дате бронирования и отзыве соответственно.

### 3.2.4 Регистрация

Для регистрации в соответствующем окне необходимо ввести следующие данные: ФИО, e-mail, номер телефона и пароль.



### 3.2.5 Вход

Для входа в соответствующем окне потребуется ввести e-mail и пароль.

### 3.2.6 Аналитика

Для admin-а доступна страница статистики: ежемесячный доход, поток посетителей за день (+-).


### 4. ER - диаграмма 

