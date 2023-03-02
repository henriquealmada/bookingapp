import React, { useEffect } from 'react'
import { User } from '../types'

const initialState = {
  user: JSON.parse(localStorage.getItem('user') || '{}')
}

enum AuthActionKind {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

interface AuthState {
  user: User | string
}

interface AuthAction {
  type: AuthActionKind
  payload: any
}

export const AuthContext = React.createContext({
  authState: initialState,
  onLogout: () => {},
  onLogin: (user: User) => {}
})

const authReducer = (state: AuthState, action: AuthAction) => {
  const { type, payload } = action
  if (type === AuthActionKind.LOGIN) {
    return {
      user: payload
    }
  }
  if (type === AuthActionKind.LOGOUT) {
    return {
      user: ''
    }
  }
  return state
}

type Props = {
  children?: React.ReactNode
}

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  const handleLogout = () => {
    dispatch({ type: AuthActionKind.LOGOUT, payload: null })
  }

  const handleLogin = (user: User) => {
    dispatch({ type: AuthActionKind.LOGIN, payload: user })
  }

  return (
    <AuthContext.Provider
      value={{
        authState: {
          user: state.user
        },
        onLogout: handleLogout,
        onLogin: handleLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
