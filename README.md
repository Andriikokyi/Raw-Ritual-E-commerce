# Raw Ritual — Vite + React + FastAPI

Premium wellness brand website. React фронтенд + Python бекенд.

---

## Структура проєкту

```
raw-ritual-react/
├── index.html
├── package.json
├── vite.config.js          ← проксіює /api → localhost:8000
├── src/
│   ├── main.jsx
│   ├── App.jsx             ← BrowserRouter + Routes
│   ├── styles/
│   │   └── global.css      ← дизайн-система (CSS змінні, компоненти)
│   ├── data/
│   │   └── products.js     ← статичні дані (до підключення БД)
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── Shop.jsx
│       ├── Product.jsx
│       ├── Story.jsx
│       └── Contact.jsx
└── backend/
    ├── main.py             ← FastAPI додаток
    ├── requirements.txt
    └── .env.example
```

---

## Запуск фронтенду

```bash
npm install
npm run dev
# → http://localhost:5173
```

Збірка для продакшн:
```bash
npm run build
npm run preview
```

---

## Запуск бекенду (FastAPI)

```bash
cd backend

# Створити virtualenv (рекомендовано)
python3 -m venv .venv
source .venv/bin/activate      # macOS / Linux
# .venv\Scripts\activate       # Windows

# Встановити залежності
pip install -r requirements.txt

# Налаштувати змінні середовища
cp .env.example .env
# (відредагуйте .env за потреби)

# Запустити сервер
uvicorn main:app --reload
# → http://localhost:8000
# → http://localhost:8000/docs  (Swagger UI)
```

Vite автоматично проксіює всі запити `/api/*` на `http://localhost:8000`,
тому в девелопменті обидва сервера запускаються одночасно.

---

## API Endpoints

| Метод | URL | Опис |
|-------|-----|------|
| GET | `/api/products` | Всі продукти (фільтри: `?category=bars&featured=true`) |
| GET | `/api/products/{slug}` | Один продукт |
| GET | `/api/categories` | Список категорій |
| POST | `/api/cart/preview` | Попередній розрахунок кошика |
| POST | `/api/contact` | Форма зворотного зв'язку |
| POST | `/api/newsletter` | Підписка на розсилку |

Інтерактивна документація: **http://localhost:8000/docs**

---

## Сторінки

| URL | Сторінка |
|-----|---------|
| `/` | Головна |
| `/shop` | Магазин (фільтр по категоріях) |
| `/product/:slug` | Картка продукту |
| `/story` | Про бренд |
| `/contact` | Контакти + FAQ |

---

## Наступні кроки (Phase 2)

- [ ] Підключити базу даних (PostgreSQL + SQLAlchemy)
- [ ] Автентифікація (JWT)
- [ ] Інтеграція платіжної системи (Stripe)
- [ ] Сторінки: Rituals, Journal, Ingredients
