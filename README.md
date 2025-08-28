# 🐉 Dragon Ball App

A modern web application to explore the Dragon Ball universe, built with React and TypeScript. Discover characters, their transformations, and maintain a favorites list.

## 🚀 What is this project?

Dragon Ball App is a **Single Page Application (SPA)** that consumes the [Dragon Ball API](https://dragonball-api.com/) to display detailed information about characters from the famous anime. Users can browse through a complete list of characters, search by name, view specific details, and mark their favorites.

### ✨ Key Features

- 📋 **Character list** with basic information
- 🔍 **Real-time search** by name
- 📱 **Detailed view** of each character with transformations
- ❤️ **Persistent favorites** system
- 🎨 **Responsive** and modern design
- ⚡ **Optimized loading** with lazy loading

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-19.1.1-61dafb?logo=react) | `19.1.1` | Main framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6?logo=typescript) | `5.8.3` | Static typing |
| ![Vite](https://img.shields.io/badge/Vite-7.1.2-646cff?logo=vite) | `7.1.2` | Build tool and dev server |
| ![React Query](https://img.shields.io/badge/TanStack%20Query-5.85.5-ff4154?logo=react-query) | `5.85.5` | Server state management |
| ![React Router](https://img.shields.io/badge/React%20Router-7.8.1-ca4245?logo=react-router) | `7.8.1` | Routing |
| ![Sass](https://img.shields.io/badge/Sass-1.90.0-cc6699?logo=sass) | `1.90.0` | CSS preprocessor |
| ![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6e9f18?logo=vitest) | `3.2.4` | Testing framework |

## 🚀 How to Run the Application

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x

### Installation and Execution

```bash
# Clone the repository
git clone https://github.com/DanielaHelen/dragon-ball-app.git

# Navigate to directory
cd dragon-ball-app

# Install dependencies
npm install

# Run in development mode
npm run dev

# The application will be available at http://localhost:5173
```

### Available Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm test            # Run tests with coverage
npm run lint        # Code linter
npm run format      # Format code
npm run deploy      # Deploy to GitHub Pages
```

## 🏗️ Project Architecture

The application follows a well-defined **layered architecture** that promotes separation of concerns and facilitates maintenance:

```
src/
├── components/          # Reusable components
├── pages/              # Main pages
├── domain/             # Business logic and types
├── services/           # API calls and configuration
├── context/            # Global state with Context API
└── assets/             # Static resources
```

### 🎯 Architecture Rationale

- **Domain-Driven Design**: The `domain` folder centralizes business logic
- **Layer separation**: Each layer has a specific responsibility
- **Atomic components**: Small and reusable components
- **Context API**: For simple global state (favorites)
- **React Query**: For efficient server state management

## 🔧 Technical Features

### 📡 **State Management**
- **TanStack Query** for API caching and synchronization
- **Context API** for favorites state
- **React Router** for navigation state

### ⚡ **Performance Optimizations**
- **Lazy loading** of pages with `React.lazy()`
- **Suspense** for loading states
- **Memoization** with React Query cache
- **Automatic code splitting** with Vite

### 🧪 **Testing**
- **Vitest** as test runner
- **Testing Library** for component tests
- **Integrated coverage reports**
- Unit tests for business logic

### 🔒 **Code Quality**
- **ESLint** with strict rules
- **TypeScript** for strong typing
- **Husky** for pre-commit hooks
- **Commitlint** for consistent messages

### 🌐 **API Integration**
- **Axios** for HTTP calls
- **Robust error handling**
- **Consistent loading states**
- **Retry logic** with React Query

## 📱 Features

### 🏠 **Main Page**
- Paginated character list
- Real-time search
- Dynamic filters
- Responsive cards

### 👤 **Character Details**
- Complete character information
- Transformations list
- High-quality images
- Smooth navigation

### ❤️ **Favorites System**
- Mark/unmark favorites
- localStorage persistence
- Visual indicators
- Synchronized state

## 🚀 Deploy

The application is deployed using **Vercel**.

**Production URL**: [https://dragon-ball-app-danielahelen.vercel.app](https://dragon-ball-app-black.vercel.app/)
