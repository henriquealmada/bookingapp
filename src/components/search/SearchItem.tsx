import { Link } from 'react-router-dom'
import { Hotel } from '../../types'

type Props = {
  hotel: Hotel
}

const ListItem = ({ hotel }: Props) => {
  return (
    <li className="flex flex-col xl:flex-row justify-between border-[1px] py-4 px-3 mb-8 rounded-lg">
      <img
        className="w-full xl:max-w-[300px]"
        src={hotel.images[0]}
        alt={hotel.name}
      />
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-[1.5rem] font-bold text-blue-600">{hotel.name}</h2>
        <p>{`${hotel.distance}m from center`}</p>
        <span className="bg-green-800 text-white p-1 rounded-md">
          Free airport taxi
        </span>
        <h3 className="font-bold">{hotel.title}</h3>
        <p>
          {hotel.description.length > 200
            ? hotel.description.slice(0, 200).concat('...')
            : hotel.description}
        </p>
        <span className="text-green-800 font-bold">Free cancellation</span>
        <p className="text-green-800 mb-8 xl:mb-0">
          You can cancel later, so lock in this great price today!
        </p>
      </div>
      <div className="flex flex-col justify-between xl:items-end">
        <div className="flex items-center">
          <span>Excellent</span>
          <span className="bg-blue-600 py-1 w-[32px] text-center text-white font-bold ml-3">
            {hotel.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex flex-col gap-2 items-start xl:items-end">
          <span className="font-semibold text-[1.5rem]">{`$${hotel.cheapestPrice}`}</span>
          <p>Includes taxes and fees</p>
          <Link
            to={`/hotels/${hotel._id}`}
            className="text-white bg-blue-600 py-3 px-2 rounded-md"
          >
            See availability
          </Link>
        </div>
      </div>
    </li>
  )
}

export default ListItem
