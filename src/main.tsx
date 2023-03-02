import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home, { loader as homeLoader } from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import { SearchContextProvider } from './context/search-context'
import { AuthContextProvider } from './context/auth-context'

const HotelDetails = lazy(() => import('./pages/HotelDetails'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Search = lazy(() => import('./pages/Search'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: homeLoader
  },
  {
    path: '/hotels/:id',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <HotelDetails />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    loader: ({ params }) =>
      import('./pages/HotelDetails').then(module => module.loader({ params }))
  },
  {
    path: '/hotels/search',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <Search />
      </Suspense>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <Register />
      </Suspense>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<p>Loading...</p>}>
        <Login />
      </Suspense>
    ),
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <RouterProvider router={router} />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
