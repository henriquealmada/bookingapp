import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth-context'
import { BASE_URL } from '../utils/requests'
import { User } from '../types'
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
  password: string
}

const Login = () => {
  const token = cookies.get('TOKEN')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const navigate = useNavigate()

  const { makeRequest, loading, error } = useHttp()

  const { onLogin } = useContext(AuthContext)

  useEffect(() => {
    if (token) navigate('/')
  }, [])

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const config = {
      method: 'post',
      url: `${BASE_URL}/auth/login`,
      data
    }

    const resultData: any = await makeRequest(config)
    if (resultData) {
      onLogin(resultData.user)
      cookies.set('TOKEN', resultData.token, { path: '/' })
      navigate('/')
    }
  }

  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80')] h-[100vh] bg-no-repeat bg-cover flex justify-center items-center">
      <div className="absolute w-full h-full bg-white opacity-[0.4]"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[220px] z-10">
        <Link to="/" className="block text-center mb-4">
          lamabooking
        </Link>
        <Input
          {...register('username', { required: 'Username is required' })}
          type="text"
          placeholder="username"
        />
        {errors.username && (
          <span className="text-red-600">{errors.username?.message}</span>
        )}
        <Input
          {...register('password', { required: 'Password is required' })}
          type="password"
          placeholder="password"
        />
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
        <button
          className="bg-blue-600 text-white w-full py-3 rounded-lg mb-1 mt-3"
          disabled={loading}
        >
          Login
        </button>
        {error && (
          <span className="text-red-600 font-semibold block text-center">
            {error}
          </span>
        )}
        <div className="text-center text-[0.9rem]">
          <span>No account yet? </span>
          <Link className="font-bold" to="/register">
            Sign-up
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
