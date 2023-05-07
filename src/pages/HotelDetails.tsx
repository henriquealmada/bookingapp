import axios from 'axios'
import { lazy, useContext, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Layout from '../components/layout'
import { SearchContext } from '../context/search-context'
import { Hotel } from '../types'
import { BASE_URL } from '../utils/requests'
// import CarouselModal from '../components/details/CarouselModal'
// import RoomsModal from '../components/details/RoomsModal'
import Cookies from 'universal-cookie'
import Alert from '../components/ui/Alert'
const cookies = new Cookies()

const CarouselModal = lazy(() => import('../components/details/CarouselModal'))
const RoomsModal = lazy(() => import('../components/details/RoomsModal'))

export async function loader({ params }: any) {
  const hotel: Hotel = await (
    await axios(`${BASE_URL}/hotels/${params.id}`)
  ).data
  return {
    hotel
  }
}

const HotelDetails = () => {
  const token = cookies.get('TOKEN')
  const navigate = useNavigate()
  const { searchState } = useContext(SearchContext)
  const { hotel } = useLoaderData() as any

  const [openCarousel, setOpenCarousel] = useState(false)
  const [selectedItem, setSelectedItem] = useState(0)

  const [openRooms, setOpenRooms] = useState(false)

  const [alert, setAlert] = useState<null | string>(null)

  const getDays = () => {
    const date1Time = searchState.date.start
    const date2Time = searchState.date.end

    const diff = date2Time.getTime() - date1Time.getTime()

    const days = diff / (1000 * 3600 * 24)

    return days
  }

  const days = getDays()

  const handleOpenCarousel = (index: number) => {
    setOpenCarousel(true)
    setSelectedItem(index)
  }

  const handleOpenRooms = () => {
    if (days < 1) {
      setAlert('Select a date')
      return
    }
    if (!token) navigate('/login')
    setOpenRooms(true)
  }

  return (
    <Layout>
      <div className="pt-8 pb-16">
        <div className="md:flex justify-between items-start">
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.8rem] font-bold">{hotel.name}</h2>
            <div>
              <i className="fa-solid fa-location-dot"></i>
              <span className="ml-2">{hotel.address}</span>
            </div>
            <p className="text-blue-600 font-semibold">{`Excellent location - ${hotel.distance}m from center`}</p>
            <p className="text-green-700 font-semibold mb-3">{`Book a stay over $${hotel.cheapestPrice} at this property and get a free airport taxi`}</p>
          </div>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
            onClick={handleOpenRooms}
          >
            Reserve or Book Now!
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-[3rem]">
          {hotel.images.map((img: string, index: number) => (
            <div className="max-h-[300px] cursor-pointer" key={index}>
              <img
                className="w-full h-full"
                src={img}
                alt="hotel"
                onClick={() => handleOpenCarousel(index)}
              />
            </div>
          ))}
        </div>

        <div className="md:flex justify-between gap-6">
          <div className="mb-4">
            <h3 className="text-[1.5rem] lg:text-[2rem] font-bold mb-4">
              Experience World-class Service
            </h3>
            <p className="text-[1.2rem]">{hotel.description}</p>
          </div>
          <div className="p-6 bg-blue-200 flex flex-col gap-8 max-w-[360px]">
            <h4 className="text-[1.4rem] font-bold">
              {`Perfect for a ${days}-night stay!`}
            </h4>
            <p>{`Located in the real heart of ${hotel.city}, this property has an excellent location score of ${hotel.rating}!`}</p>
            <div className="text-[1.8rem]">
              <span className="font-bold">{`$${
                hotel.cheapestPrice * days * searchState.room
              } `}</span>
              <span>{`(${days} nights)`}</span>
            </div>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
              onClick={handleOpenRooms}
            >
              Reserve or Book Now!
            </button>
          </div>
        </div>
        {alert && <Alert setAlert={setAlert}>{alert}</Alert>}
        {openCarousel && (
          <CarouselModal
            images={hotel.images}
            setOpenCarousel={setOpenCarousel}
            selectedItem={selectedItem}
          />
        )}
        {token && openRooms && (
          <RoomsModal rooms={hotel.rooms} setOpenRooms={setOpenRooms} />
        )}
      </div>
    </Layout>
  )
}

export default HotelDetails
