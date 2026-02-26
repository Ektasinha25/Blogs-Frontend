# Blogs Frontend

A modern React-based blogging platform frontend built with Vite, featuring user authentication, article management, and AI-powered content assistance.

---

## 1️⃣ Approach

### Architecture Overview

The application follows a **component-based architecture** with clear separation of concerns:

- **Components**: Reusable UI components organized by feature (Auth, Articles, Layout)
- **Context API**: Centralized state management for authentication
- **Services**: API integration layer for backend communication
- **Pages**: Route-level components for different views

### Folder Structure

```
src/
├── components/                    # Reusable UI components
│   ├── Articles/
│   │   ├── ArticleDetail.jsx     # Article detail view
│   │   ├── ArticleList.jsx       # List all articles
│   │   ├── CreateArticle.jsx     # Create new article
│   │   └── EditArticle.jsx       # Edit existing article
│   ├── Auth/
│   │   ├── Login.jsx             # User login form
│   │   └── Signup.jsx            # User registration form
│   └── Layout/
│       ├── Navbar.jsx            # Navigation header
│       └── Footer.jsx            # Footer component
├── context/
│   └── AuthContext.jsx           # Authentication state management
├── pages/
│   ├── Dashboard.jsx             # User dashboard
│   └── Home.jsx                  # Home page
├── services/
│   ├── aiService.js              # AI API integration
│   ├── api.js                    # Axios instance configuration
│   ├── articleService.js         # Article CRUD operations
│   └── authService.js            # Authentication API calls
├── utils/
│   └── ProtectedRoute.jsx        # Route protection utility
├── App.jsx                       # Main application component
├── App.css                       # Application styles
├── main.jsx                      # Application entry point
└── index.css                     # Global styles
```

### Key Design Decisions

- **Vite** for fast development server and optimized production builds
- **React Hooks & Context API** for lightweight state management without Redux
- **Protected Routes** to restrict access to authenticated pages
- **Service Layer Pattern** to decouple API calls from UI components
- **Component Composition** for maintainability and reusability
- **Axios** for consistent HTTP request handling

---

## 2️⃣ AI Usage

### AI Tools Used

- **GitHub Copilot**: Code generation and intelligent refactoring suggestions
- **ChatGPT**: Architecture planning, component design patterns, and problem-solving

### Where AI Helped

- ✅ **Code Generation**: Scaffolding React components, hooks, and API service methods
- ✅ **Refactoring**: Improving component structure and reducing code duplication
- ✅ **API Design**: Structuring service layer calls and error handling patterns
- ✅ **UI Ideas**: Layout suggestions and component composition patterns
- ✅ **Documentation**: Generated initial component comments and documentation

### Manual Review & Corrections

- ✅ All authentication logic thoroughly tested and verified
- ✅ API endpoints validated against backend implementation
- ✅ Error handling and edge cases reviewed and enhanced
- ✅ Accessibility standards and responsive design tested manually
- ✅ State management flow validated for correctness
- ✅ Security considerations reviewed (token storage, CORS, etc.)

---

## 3️⃣ Setup Instructions

### Prerequisites

- **Node.js** v16 or higher
- **npm** v7+ or **yarn** v1.22+
- **Backend API** running and accessible (see backend setup below)
- **Git** for version control

### Environment Variables

Create a `.env` file in the root directory of the frontend project:

```env
VITE_API_URL=http://localhost:5000/api
VITE_AI_API_KEY=your_ai_api_key_here
```

**Environment Variables Explanation:**

- `VITE_API_URL`: Backend API base URL (adjust port if different)
- `VITE_AI_API_KEY`: API key for AI service integration

### Backend Setup

**Prerequisites for Backend:**

- Node.js v16+
- MongoDB or your chosen database
- Git

**Steps:**

1. Clone the backend repository:

   ```bash
   git clone <backend-repo-url>
   cd Blogs-Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in backend root:

   ```env
   PORT=5000
   DATABASE_URL=mongodb://localhost:27017/blogs
   JWT_SECRET=your_jwt_secret_key
   AI_API_KEY=your_ai_api_key
   NODE_ENV=development
   ```

4. Run database migrations (if applicable):

   ```bash
   npm run migrate
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   Backend should be running at `http://localhost:5000`

### Frontend Setup

1. Clone the frontend repository:

   ```bash
   git clone <frontend-repo-url>
   cd Blogs-Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file with backend URL:

   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_AI_API_KEY=your_ai_api_key_here
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Frontend will open at `http://localhost:5173`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build locally
npm run preview

# Deploy built files from `dist/` folder to hosting
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

---

## Features

✨ **User Authentication** - Secure login and signup  
📝 **Article Management** - Create, read, update, delete articles  
🤖 **AI Integration** - AI-powered content assistance  
🎨 **Responsive Design** - Works on desktop, tablet, and mobile  
🔐 **Protected Routes** - Secure page access control

---

## Tech Stack

- **Frontend Framework**: React 18+
- **Build Tool**: Vite
- **State Management**: Context API
- **HTTP Client**: Axios
- **Styling**: CSS3
- **Routing**: React Router (if used)

---

## Troubleshooting

**Port Already in Use:**

```bash
# Windows
netstat -ano | findstr :5173

# macOS/Linux
lsof -i :5173
```

**Backend Connection Issues:**

- Verify `VITE_API_URL` matches your backend URL
- Check if backend is running
- Verify CORS settings on backend

**Dependencies Issues:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request
