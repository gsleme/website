import type { tipoTokenInfo } from "./tiposUsuario"

export interface tipoAuthContext {
  usuario: tipoTokenInfo | null
  login: (token: string) => void
  logout: () => void
}

export type Tema = 'light' | 'dark'

export interface tipoThemeContext {
    tema: Tema;
    setTema: (tema: Tema) => void;
}