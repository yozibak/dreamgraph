import { createContext } from "react"

export const AuthContext = createContext<AuthManager>({} as AuthManager)

export type AuthManager = {
  isAuthenticated: boolean
  /**
   * sign in when not authenticated
   * sign out when authenticated
   */
  switchAuth: () => void
}
