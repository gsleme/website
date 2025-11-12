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
import Login from './routes/Login/index.tsx'
import Home from './routes/Home/index.tsx'
import Contato from './routes/Contato/index.tsx'
import Faq from './routes/Faq/index.tsx'
import Sobre from './routes/Sobre/index.tsx'
import Trilhas from './routes/Trilhas/index.tsx'
import Modulo from './routes/Modulo/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      { path: '/cadastrar', element: <Cadastro/> },
      { path: '/contato', element: <Contato/> },
      { path: '/perguntas-frequentes', element: <Faq/> },
      { path: '/', element: <Home/> },
      { path: '/entrar', element: <Login/> },
      { path: '/sobre-nos', element: <Sobre/> },
      { path: '/trilhas', element: <Trilhas/> },
      { path: '/trilhas/:trilha/:modulo', element: <Modulo/> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
