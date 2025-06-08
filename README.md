# REST Api - Vue 3 + TypeScript + Tailwind CSS Template

## Overview

A modern, production-ready Vue 3 template with authentication flow, featuring:

- Vue 3 Composition API
- TypeScript support
- Tailwind CSS for styling
- Pinia for state management
- Vue Router with navigation guards
- Complete authentication system (login/register/profile)
- Responsive design with mobile-friendly components
- API client with JWT token handling

## Features

✅ **Authentication System**  
- User registration with form validation
- Login/logout functionality
- Protected routes
- JWT token handling with automatic header injection

✅ **User Management**  
- Profile viewing and updating
- List of all registered users

✅ **Modern UI Components**  
- Responsive navbar with mobile menu
- Form validation with error states
- Loading indicators
- Success/error notifications
- Clean, minimalist design

✅ **Developer Experience**  
- TypeScript support throughout
- Well-organized project structure
- Centralized state management
- Environment variables configuration
- Pre-configured API client

## Project Structure

```
src/
├── assets/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.vue
│   │   └── RegisterForm.vue
│   ├── Navbar.vue
│   └── User/
│       ├── ProfileForm.vue
│       └── UserList.vue
├── composables/
│   └── useAuth.ts
├── router/
│   └── index.ts
├── stores/
│   └── auth.ts
├── types/
│   └── auth.d.ts
├── views/
│   ├── Auth/
│   │   ├── LoginView.vue
│   │   └── RegisterView.vue
│   ├── HomeView.vue
│   └── User/
│       ├── ProfileView.vue
│       └── UsersView.vue
├── App.vue
└── main.ts
```

## Installation

1. Clone the repository:
```bash
git clone git@github.com:tomc02/vue-api-template.git
cd vue-api-template
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## Configuration

### Environment Variables

| Variable             | Description                          | Default               |
|----------------------|--------------------------------------|-----------------------|
| VITE_API_URL         | Base URL for API requests            | http://localhost:3000 |
| REGION               | Region for Google deployment         | us-east1              |
| GOOGLE_PROJECT_ID    | ID of Google Cloud project           | your-project-id       |


## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## API Integration

The template includes a pre-configured Axios instance with:

- Base URL from environment variables
- Automatic JWT token injection
- Error handling

```typescript
// main.ts
import axios from 'axios';

// Set base URL for API
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

## Customization

### Adding New Pages

1. Create a new component in `views/`
2. Add a route in `router/index.ts`
3. Use the `Navbar` component for consistent navigation

## Best Practices

1. **Type Safety**: All components and stores are typed with TypeScript
2. **Component Organization**:
   - Reusable components in `components/`
   - Page-level components in `views/`
3. **State Management**:
   - Centralized auth state
   - No direct component state mutation
4. **API Calls**:
   - All API calls through the auth store
   - Consistent error handling

## Deployment


---

This template is designed to be extended and customized for your specific needs while providing a solid foundation for Vue 3 applications with authentication requirements.
