import { useLoaderData } from 'react-router-dom'
import FavoritesList from '../components/home/FavoritesList'
import FeaturedList from '../components/home/FeaturedList'
import PropertyList from '../components/home/PropertyList'
import { BASE_URL } from '../utils/requests'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import SearchItem from '../components/home/SearchItem'
import Layout from '../components/layout'

export async function loader() {
  const [citiesCount, types, favorites] = await Promise.all([
    fetch(`${BASE_URL}/hotels/countByCity?cities=madrid,london,austin`).then(
      res => res.json()
    ),
    fetch(`${BASE_URL}/hotels/countByType`).then(res => res.json()),
    fetch(`${BASE_URL}/hotels?featured=true&limit=4`).then(res => res.json())
  ])

  return {
    citiesCount: citiesCount,
    types: types,
    favorites: favorites
  }
}

const Home = () => {
  const { citiesCount, types, favorites } = useLoaderData() as any

  return (
    <Layout type={true}>
      <div className="py-[4rem]">
        <SearchItem />
        <FeaturedList citiesCount={citiesCount} />
        <PropertyList types={types} />
        <FavoritesList favorites={favorites} />
      </div>
    </Layout>
  )
}

export default Home
