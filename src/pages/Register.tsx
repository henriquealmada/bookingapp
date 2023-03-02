import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/requests'
import { useForm, SubmitHandler } from 'react-hook-form'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import useHttp from '../hooks/useHttp'
const cookies = new Cookies()

const Input = styled.input`
  padding: 1rem 0.5rem;
  border-radius: 0.125rem;
  margin-top: 0.75rem;
  display: block;
  width: 100%;
  border: 1px solid black;
`

type Inputs = {
  username: string
  email: string
  password: string
  country: string
  city: string
  phone: string
}

const Register = () => {
  const token = cookies.get('TOKEN')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const navigate = useNavigate()

  const { makeRequest, loading, error } = useHttp()

  useEffect(() => {
    if (token) navigate('/')
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const config = {
      method: 'post',
      url: `${BASE_URL}/auth/register`,
      data: data
    }

    const resultData: any = await makeRequest(config)
    if (resultData) {
      navigate('/login')
    }
  }

  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80')] h-[100vh] bg-no-repeat bg-cover flex justify-center items-center">
      <div className="absolute w-full h-full bg-white opacity-[0.4]"></div>
      <form className="w-[250px] z-10" onSubmit={handleSubmit(onSubmit)}>
        <Link to="/" className="block text-center">
          lamabooking
        </Link>
        <Input
          {...register('username', {
            required: 'Username is required',
            maxLength: { value: 30, message: 'Length must be less than 30' },
            minLength: { value: 3, message: 'Length must be greater than 2' }
          })}
          type="text"
          placeholder="username"
        />
        {errors.username && (
          <span className="text-red-600">{errors.username?.message}</span>
        )}
        <Input
          {...register('email', {
            required: 'Email is required'
          })}
          type="email"
          placeholder="email"
        />
        {errors.email && (
          <span className="text-red-600">{errors.email?.message}</span>
        )}
        <Input
          {...register('password', { required: 'Password is required' })}
          type="password"
          placeholder="password"
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
        <Input
          {...register('country', { required: 'Country is required' })}
          type="text"
          placeholder="country"
        />
        {errors.country && (
          <span className="text-red-600">{errors.country?.message}</span>
        )}
        <Input
          {...register('city', { required: 'City is required' })}
          type="text"
          placeholder="city"
        />
        {errors.city && (
          <span className="text-red-600">{errors.city?.message}</span>
        )}

        <Input
          {...register('phone', { required: 'Phone is required' })}
          type="text"
          placeholder="phone"
        />
        {errors.phone && (
          <span className="text-red-600">{errors.phone?.message}</span>
        )}
        <button
          className="bg-blue-600 text-white w-full py-3 rounded-lg mt-3"
          disabled={loading}
        >
          Register
        </button>
        {error && (
          <span className="text-red-600 font-semibold block text-center">
            {error}
          </span>
        )}
        <div className="text-center text-[0.9rem]">
          <span>Already have an account? </span>
          <Link className="font-bold" to="/login">
            Sign-in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
