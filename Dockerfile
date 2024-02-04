# Використовуємо офіційний образ Node.js
FROM node:18.17.0

# Створюємо робочий каталог для додатку
WORKDIR /app

# Копіюємо файли package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів додатку
COPY . .

# Вказуємо порт, на якому працює додаток
EXPOSE 3000

# Встановлюємо PostgreSQL та налаштовуємо його
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Копіюємо SQL-скрипт для створення бази даних та користувача
COPY init-db.sql /docker-entrypoint-initdb.d/

# Запускаємо додаток та PostgreSQL при старті контейнера
CMD ["sh", "-c", "service postgresql start && node index.js"]
