// import de ferramentas
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import de estrutura
import './index.css'
import App from './App.tsx'
import ErrorPage from './routes/ErrorPage/index.tsx'

// import de rotas
import Cadastro from './routes/Cadastro/index.tsx'
import Contato from './routes/Contato/index.tsx'
import Faq from './routes/Faq/index.tsx'
import Home from './routes/Home/index.tsx'
import LandingPage from './routes/LandingPage/index.tsx'
import Login from './routes/Login/index.tsx'
import Modulo from './routes/Modulo/index.tsx'
import Sobre from './routes/Sobre/index.tsx'
import Trilhas from './routes/Trilhas/index.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import AuthRoute from './contexts/AuthRoute.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/criar-perfil',
        element: (
          <AuthRoute publico>
            <Cadastro />
          </AuthRoute>
        )
      },
      { path: '/contato', element: <Contato /> },
      { path: '/perguntas-frequentes', element: <Faq /> },
      {
        path: '/dashboard',
        element: (
          <AuthRoute publico={false}>
            <Home />
          </AuthRoute>
        )
      },
      { path: '/', element: <LandingPage /> },
      {
        path: '/entrar',
        element: (
          <AuthRoute publico>
            <Login />
          </AuthRoute>
        )
      },
      { path: '/sobre-nos', element: <Sobre /> },
      {
        path: '/trilhas',
        element: (
          <AuthRoute publico={false}>
            <Trilhas />
          </AuthRoute>
        )
      },
      {
        path: '/trilhas/:trilha/:modulo',
        element: (
          <AuthRoute publico={false}>
            <Modulo />
          </AuthRoute>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
)
