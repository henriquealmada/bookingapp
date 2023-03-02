import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { Room } from '../../types'
import { SearchContext } from '../../context/search-context'
import axios from 'axios'
import { BASE_URL } from '../../utils/requests'
import { useNavigate } from 'react-router-dom'
import Alert from '../ui/Alert'

type Props = {
  rooms: Room[]
  setOpenRooms: Dispatch<SetStateAction<boolean>>
}

const RoomsModal = ({ rooms, setOpenRooms }: Props) => {
  const navigate = useNavigate()
  const { searchState } = useContext(SearchContext)
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  const [alert, setAlert] = useState<null | string>(null)

  const getDates = (start: Date, end: Date) => {
    const date = new Date(start.getTime())

    let datesList = []

    while (date <= end) {
      datesList.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }

    return datesList
  }

  const allDates = getDates(searchState.date.start, searchState.date.end)

  const isAvailable = (roomNumber: {
    _id: string
    number: number
    unavailableDates: Date[]
  }) => {
    const isFound = roomNumber.unavailableDates.some(date =>
      allDates.includes(new Date(date).getTime())
    )
    return !isFound
  }

  const handleSelect = async (event: any) => {
    const checked = event.target.checked
    const value = event.target.value
    setSelectedRooms(prev => {
      if (checked) {
        return [...prev, value]
      } else {
        return prev.filter(item => item !== value)
      }
    })
  }

  const handleReserve = async () => {
    if (selectedRooms.length === 0) {
      setAlert('Select a room')
      return
    }
    try {
      setLoading(true)
      await Promise.all(
        selectedRooms.map(roomId => {
          const res = axios.put(`${BASE_URL}/rooms/availability/${roomId}`, {
            dates: allDates
          })
          return res
        })
      )
      setOpenRooms(false)
      navigate('/')
    } catch (error) {
      setAlert('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className="bg-black opacity-[0.5] fixed top-0 left-0 w-full min-h-[100vh] z-[99]"
        onClick={() => setOpenRooms(false)}
      ></div>
      <div className="fixed z-[999] left-0 right-0 ml-auto mr-auto top-[10%] lg:top-[7rem] bg-white p-6 w-[90%] sm:max-w-[550px] max-h-[80%] md:max-h-[90%] overflow-y-auto overflow-x-hidden">
        <button
          className="text-white bg-black rounded-[50%] w-[20px] h-[20px] absolute top-[-4px] right-[-3px] flex justify-center items-center"
          onClick={() => setOpenRooms(false)}
        >
          x
        </button>
        <h3 className="mb-5 font-[600] text-[1.4rem]">Select your rooms:</h3>
        {rooms.map(room => (
          <div className="flex justify-between mb-10 px-6 gap-8" key={room._id}>
            <div>
              <span className="text-[1.4rem] font-semibold">{room.title}</span>
              <p className="text-[1.2rem]">{room.description}</p>
              <p className="font-[600]">
                Max people: <span className="font-bold">{room.maxPeople}</span>
              </p>
              <span className="font-bold text-[1.2rem]">{`$${room.price}`}</span>
            </div>
            <div className="flex flex-wrap gap-[5px]">
              {room.roomNumbers.map((item, index) => (
                <div key={index} className="flex flex-col">
                  <label
                    className="block text-[0.5rem] text-gray-500"
                    htmlFor={`room${item.number}`}
                  >
                    {item.number}
                  </label>
                  <input
                    type="checkbox"
                    id={`room${item.number}`}
                    value={item._id}
                    disabled={!isAvailable(item)}
                    onChange={handleSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          className="bg-blue-600 text-white py-2 w-full rounded-md"
          onClick={handleReserve}
          disabled={loading}
        >
          Reserve Now!
        </button>
      </div>
      {alert && <Alert setAlert={setAlert}>{alert}</Alert>}
    </div>
  )
}

export default RoomsModal
