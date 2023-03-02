import React from 'react'

const initialState = {
  date: { start: new Date(), end: new Date() },
  destination: '',
  adult: 1,
  children: 0,
  room: 1
}

enum SearchActionKind {
  SEARCH = 'SEARCH'
}

interface SearchState {
  date: { start: Date; end: Date }
  destination: string
  adult: number
  children: number
  room: number
}

interface SearchAction {
  type: SearchActionKind
  payload: SearchState
}

export const SearchContext = React.createContext({
  searchState: initialState,
  onChangeSearch: (searchOptions: SearchState) => {}
})

const searchReducer = (state: SearchState, action: SearchAction) => {
  const { type, payload } = action
  if (type === SearchActionKind.SEARCH) {
    return payload
  }
  return state
}

type Props = {
  children?: React.ReactNode
}

export const SearchContextProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(searchReducer, initialState)

  const handleChangeSearch = (searchOptions: SearchState) => {
    dispatch({ type: SearchActionKind.SEARCH, payload: searchOptions })
  }

  return (
    <SearchContext.Provider
      value={{
        searchState: state,
        onChangeSearch: handleChangeSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
