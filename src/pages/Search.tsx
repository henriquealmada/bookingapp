import { lazy, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BASE_URL } from '../utils/requests'
import { Hotel } from '../types'
import SearchBox from '../components/search/SearchBox'
import SearchList from '../components/search/SearchList'
import Layout from '../components/layout'
import useHttp from '../hooks/useHttp'

const Search = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const [destination, setDestination] = useState(
    searchParams.get('destination') || ''
  )
  const [adult, setAdult] = useState(searchParams.get('adult') || '')
  const [children, setChildren] = useState(searchParams.get('children') || '')
  const [room, setRoom] = useState(searchParams.get('room') || '')

  const [searchList, setSearchList] = useState<Hotel[]>([])

  const { makeRequest, loading, error, setLoading, setError } = useHttp()

  useEffect(() => {
    const search = async () => {
      const list = await makeRequest({
        method: 'GET',
        url: `${BASE_URL}/hotels?city=${destination}`
      })
      setSearchList(list)
    }
    search()
  }, [])

  const searchParamsProp = {
    destination,
    setDestination,
    adult,
    setAdult,
    children,
    setChildren,
    room,
    setRoom
  }

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-8 py-8">
        <SearchBox
          setSearchList={setSearchList}
          searchParams={searchParamsProp}
          setLoading={setLoading}
          setError={setError}
        />
        {loading && <p>Loading...</p>}
        {error && (
          <p className="text-red-500 text-[1.4rem] col-span-4 sm:col-span-2 xl:col-span-3 text-center">
            Something went wrong!
          </p>
        )}
        {!error && searchList && !searchList.length && (
          <span className="font-bold text-[1.2rem] col-span-4 sm:col-span-2 xl:col-span-3 text-center">
            Destination Not Found!
          </span>
        )}
        {!loading && !error && searchList.length > 0 && (
          <SearchList searchList={searchList} />
        )}
      </div>
    </Layout>
  )
}

export default Search
