import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'
import { jwtDecode } from 'jwt-decode'

import type { tipoToken, tipoTokenInfo } from '../types/tiposUsuario'
import type { tipoAuthContext } from '../types/tipoContext'

const AuthContext = createContext<tipoAuthContext | undefined>(undefined)

export function AuthProvider ({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<tipoTokenInfo | null>(null)
  const [, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      try {
        const decoded = jwtDecode<tipoToken>(token)

        if (Number(decoded.exp) > Math.floor(Date.now() / 1000)) {
          setToken(token)
          setUsuario({
            id: decoded.sub,
            area: decoded.area,
            acessibilidade: decoded.acessibilidade,
            modulosConcluidos: decoded.modulosConcluidos,
            tempoPlataformaDias: decoded.tempoPlataformaDias
          } as tipoTokenInfo)
        } else {
          localStorage.removeItem('token')
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error)
        }
        localStorage.removeItem('token')
      }
    }
  }, [])

  const login = (token: string) => {
    try {
      const decoded = jwtDecode<tipoToken>(token)
      if (!decoded) return

      setToken(token)
      setUsuario({
        id: decoded.sub,
        area: decoded.area,
        acessibilidade: decoded.acessibilidade,
        modulosConcluidos: decoded.modulosConcluidos,
        tempoPlataformaDias: decoded.tempoPlataformaDias
      } as tipoTokenInfo)

      localStorage.setItem('token', token)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error)
      }
    }
  }

  const logout = () => {
    setToken(null)
    setUsuario(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): tipoAuthContext => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth precisa estar dentro de um AuthProvider')
  }

  return context
}