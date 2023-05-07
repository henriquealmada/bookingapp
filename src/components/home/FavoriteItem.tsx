import { Link } from 'react-router-dom'
import { Hotel } from '../../types'

type Props = {
  favorite: Hotel
}

const FavoriteItem = ({ favorite }: Props) => {
  return (
    <li>
      <Link
        className="min-h-[430px] flex flex-col"
        to={`/hotels/${favorite._id}`}
      >
        <img
          src={favorite.images[0]}
          className="w-full flex-1"
          alt={favorite.name}
        />
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-[1.4rem] font-bold block capitalize">
            {favorite.name}
          </span>
          <span className="text-[1.2rem] font-semibold text-gray-500 capitalize">
            {favorite.city}
          </span>
          <span className="font-semibold">{`Starting from $${favorite.cheapestPrice}`}</span>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 py-1 w-[32px] text-center text-white font-bold">
              {favorite.rating.toFixed(1)}
            </span>
            <span>Excellent</span>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default FavoriteItem
