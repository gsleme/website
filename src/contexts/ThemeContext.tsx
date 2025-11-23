import type { Tema, tipoThemeContext } from '../types/tipoContext'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const ThemeContext = createContext<tipoThemeContext | undefined>(undefined)

export function ThemeProvider ({ children }: { children: ReactNode }) {
	const [tema, setTemaState] = useState<Tema>('light')
	
	useEffect(() => {
    try {
      const temaSalvo = localStorage.getItem('tema') as Tema | null

      if (temaSalvo == 'light' || temaSalvo == 'dark') {
        setTemaState(temaSalvo)
        document.documentElement.classList.toggle('dark', temaSalvo == 'dark')
        return
      }

      const prefereDark =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches

      const preferencia = prefereDark ? 'dark' : 'light'
      setTemaState(preferencia)
      document.documentElement.classList.toggle('dark', preferencia == 'dark')

    } catch {
      document.documentElement.classList.remove('dark')
    }
  }, [])

	const setTema = (tema: Tema) => {
    try {
      setTemaState(tema)
      localStorage.setItem('tema', tema)
      document.documentElement.classList.toggle('dark', tema === 'dark')

    } catch {
      document.documentElement.classList.toggle('dark', tema === 'dark')
    }
  }

  return (
		<ThemeContext.Provider value={{tema, setTema }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = (): tipoThemeContext => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme precisa estar dentro de um ThemeProvider')
  }

  return context
}
