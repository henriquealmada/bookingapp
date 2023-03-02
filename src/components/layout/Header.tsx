import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { AuthContext } from '../../context/auth-context'
const cookies = new Cookies()

type Props = {
  type?: boolean
}

const Navbar = ({ type }: Props) => {
  const { authState, onLogout } = useContext(AuthContext)
  const [token, setToken] = useState(cookies.get('TOKEN'))

  const handleLogout = () => {
    cookies.remove('TOKEN')
    onLogout()
    setToken(null)
  }

  return (
    <header className={`bg-blue-800 pt-4 ${type ? 'pb-[6rem]' : 'pb-[3rem]'}`}>
      <nav className="px-8 max-w-[1400px] mx-auto text-white">
        <div className="flex justify-between items-center mb-8">
          <a className="sm:text-[1.4rem]" href="/">
            lamabooking
          </a>
          {!token && (
            <div className="text-blue-800">
              <NavLink to="/register" className="mr-4 bg-white py-1 px-2">
                Register
              </NavLink>
              <NavLink to="/login" className="bg-white py-1 px-2">
                Login
              </NavLink>
            </div>
          )}
          {token && (
            <div>
              <span className="mr-4">{authState.user?.username}</span>
              <button
                className="text-blue-800 mr-4 bg-white py-1 px-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-[3rem] flex-col md:flex-row lg:text-[1.4rem] items-start md:items-center">
          <div className="flex items-center border-[2px] px-3 py-2 rounded-[2rem]">
            <i className="fa-solid fa-bed"></i>
            <a href="#" className="ml-2">
              Stays
            </a>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-plane"></i>
            <a href="#" className="ml-2">
              Flights
            </a>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-car"></i>
            <a href="#" className="ml-2">
              Car rentals
            </a>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-bed"></i>
            <a href="#" className="ml-2">
              Attractions
            </a>
          </div>
          <div className="flex items-center">
            <i className="fa-solid fa-taxi"></i>
            <a href="#" className="ml-2">
              Airport taxis
            </a>
          </div>
        </div>

        {type && (
          <div>
            <h1 className="text-[1.5rem] sm:text-[2.5rem] font-bold mt-8 mb-4">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="mb-8 sm:text-[1.3rem]">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            {!token && (
              <NavLink to="/login" className="bg-blue-600 py-3 px-2">
                Sign in / Register
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
