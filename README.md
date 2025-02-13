# Realtime App

## 📌 Overview

Realtime App is a web application that provides real-time website metrics using a **Vite + Preact** frontend and a web service backend. The frontend consumes API data and displays real-time analytics.

## 🚀 Features

- 📊 Real-time website metrics visualization
- ⚡ Fast and lightweight frontend built with **Vite + Preact**
- 🔌 WebSocket or polling-based real-time data updates
- 📡 REST API backend integration

## 🏗️ Project Structure

```
realtime_app/
│── backend/      # Backend web service (API & WebSocket server)
│── frontend/     # Frontend application (Vite + Preact)
│── README.md     # Project documentation
```

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/rauberJv/realtime_app.git
cd realtime_app
```

### 2️⃣ Setup & Run Backend

Navigate to the backend directory and install dependencies:

```sh
cd backend
npm install  # or yarn install
```

Start the backend server:

```sh
npm run dev  # or yarn dev
```

### 3️⃣ Setup & Run Frontend

Navigate to the frontend directory and install dependencies:

```sh
cd ../frontend
npm install  # or yarn install
```

Start the frontend app:

```sh
npm run dev  # or yarn dev
```

By default, the frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000` (configurable in environment variables).

## 🖥️ Usage

1. Open the frontend app in a browser.
2. Connect to the backend API to fetch real-time website metrics.
3. Monitor metrics in real time with dynamic updates.

## 🔧 Configuration

You can configure environment variables for both frontend and backend in `.env` files.

**Example for Backend (`.env`):**

```
PORT=3000
DATABASE_URL=mongodb://localhost:27017/realtime_db
```

**Example for Frontend (`.env`):**

```
VITE_API_URL=http://localhost:3000
```

## 🔮 Future Work

### Frontend Enhancements

- Expand data visualization by integrating additional chart types.
- Optimize data processing and structure for improved performance and scalability.
- Develop advanced analytical functions to extract deeper insights from real-time data.
- Implement a customizable dashboard to allow users to tailor metrics to their needs.
- Explore caching strategies to reduce API load and improve responsiveness.

### Backend Improvements

- Refactor and enhance data structure to adopt a more scalable and maintainable architecture.
- Improve API performance by implementing indexing and query optimizations.
- Introduce a **time-series database** to efficiently manage and query real-time data.
- Implement a hybrid storage solution, utilizing a time-series database for real-time data and a relational or NoSQL database for long-term storage.
- Enhance API flexibility to support dynamic data queries and filtering.
- Improve security and authentication to ensure data integrity and controlled access.

## 🏗️ Architecture Decisions

### Frontend
- **Chart.js over D3.js**: Selected for its ease of use, performance, and smaller footprint. Chart.js provides sufficient flexibility for this project while avoiding the steep learning curve and complexity of D3.js.
- **React Context for state management**: A lightweight and performant alternative to Redux or other state management libraries. It ensures efficient state updates without unnecessary re-renders while keeping the application simple and scalable.
- **Vite + Preact over Next.js**: Since server-side rendering was not required, Vite + Preact was chosen for its blazing-fast build times, optimized performance, and smaller bundle size, resulting in a highly responsive user experience.
- **Native Fetch API over Axios**: The Fetch API natively supports modern JavaScript and provides all the required functionality without introducing additional dependencies, making the application leaner and more maintainable.
- **Component-based architecture**: Components are designed to be reusable and agnostic, ensuring high modularity. Only real-time data is stored in Context to avoid prop drilling and enhance maintainability while minimizing unnecessary state updates.

### Backend
- **Express.js over heavier frameworks**: Opting for plain Express.js ensures flexibility and better control over request handling while avoiding the overhead associated with full-fledged frameworks like NestJS. This decision keeps the backend lightweight, scalable, and easy to maintain.
- **REST API with real-time data handling**: The backend is designed to efficiently serve real-time metrics while maintaining a clean, scalable structure. A simple REST API is sufficient for most queries, while real-time updates are handled efficiently via WebSockets or polling strategies.

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, open issues, or submit pull requests.

---

💡 **Need help?** Open an issue or reach out! 🚀

