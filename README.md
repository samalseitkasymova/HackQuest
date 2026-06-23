# HackQuest / HackQuest Full Project

Полноценный дипломный проект: React frontend из Figma-дизайна + Java Spring Boot backend + база данных.

## Структура

```text
HackQuest_FullProject/
├── frontend/   # React + TypeScript + Vite дизайн из Figma
└── backend/    # Java Spring Boot API + JPA + database
```

## Что уже есть

- Главный экран из Figma-дизайна
- Login page
- Register page
- Dashboard, Testing, Lab, Missions, Leaderboard, Admin, Profile
- Java backend
- Таблица users
- Таблица scores
- Таблица questions
- Регистрация с сохранением в базу
- Логин через backend
- Пароль сохраняется в BCrypt, не обычным текстом
- Проверка username: нельзя только цифры

## Запуск backend

Нужны Java 17 и Maven.

```bash
cd backend
mvn spring-boot:run
```

Backend запускается на:

```text
http://localhost:8080
```

База по умолчанию H2, файл создается тут:

```text
backend/data/hackquest.mv.db
```

H2 console:

```text
http://localhost:8080/h2-console
```

Данные для H2 console:

```text
JDBC URL: jdbc:h2:file:./data/hackquest
User: sa
Password: пусто
```

## Запуск frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend запускается на:

```text
http://localhost:5173
```

## PostgreSQL қосу / подключить PostgreSQL

В `backend/src/main/resources/application.properties` закомментируй H2 строки и включи PostgreSQL строки:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hackquest_db
spring.datasource.username=postgres
spring.datasource.password=12345
spring.jpa.hibernate.ddl-auto=update
```

Перед этим создай базу:

```sql
CREATE DATABASE hackquest_db;
```

## API

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/users/{id}
POST /api/scores
GET  /api/leaderboard
```
