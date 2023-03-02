import axios from 'axios'
import { useState } from 'react'

const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const makeRequest = async (config: {
    method: string
    url: string
    data?: any
  }) => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios(config)
      setLoading(false)
      return res.data
    } catch (err: any) {
      setError(err.response.data.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return {
    makeRequest,
    loading,
    error,
    setLoading,
    setError
  }
}

export default useHttp
