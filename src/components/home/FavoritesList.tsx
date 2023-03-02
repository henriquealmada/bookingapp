import FavoriteItem from './FavoriteItem'
import { Hotel } from '../../types'

type Props = {
  favorites: Hotel[]
}

const FavoritesList = ({ favorites }: Props) => {
  return (
    <div>
      <h2 className="text-[1.7rem] font-bold mb-8">Homes guests love</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {favorites.map((favorite, index) => (
          <FavoriteItem key={index} favorite={favorite} />
        ))}
      </ul>
    </div>
  )
}

export default FavoritesList
