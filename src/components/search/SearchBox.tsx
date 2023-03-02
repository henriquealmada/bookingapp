import axios from 'axios'
import format from 'date-fns/format'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { DateRange } from 'react-date-range'
import { Hotel } from '../../types'
import { BASE_URL } from '../../utils/requests'
import { SearchContext } from '../../context/search-context'

type Props = {
  setSearchList: Dispatch<SetStateAction<Hotel[]>>
  searchParams: {
    destination: string
    setDestination: Dispatch<SetStateAction<string>>
    adult: string
    setAdult: Dispatch<SetStateAction<string>>
    children: string
    setChildren: Dispatch<SetStateAction<string>>
    room: string
    setRoom: Dispatch<SetStateAction<string>>
  }
  setLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<null | string>>
}

const SearchBox = ({
  setSearchList,
  searchParams,
  setLoading,
  setError
}: Props) => {
  const { searchState, onChangeSearch } = useContext(SearchContext)

  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [openCalendar, setOpenCalendar] = useState(false)

  const [date, setDate] = useState({
    startDate: searchState.date.start,
    endDate: searchState.date.end,
    key: 'selection'
  })

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault()
    onChangeSearch({
      date: { start: date.startDate, end: date.endDate },
      destination: searchParams.destination,
      adult: +searchParams.adult,
      children: +searchParams.children,
      room: +searchParams.room
    })
    try {
      setLoading(true)
      setError(null)
      const res = await axios(
        `${BASE_URL}/hotels?city=${searchParams.destination}&min=${
          minPrice || 0
        }&max=${maxPrice || 9999}`
      )
      const list: Hotel[] = res.data
      setSearchList(list)
    } catch (err: any) {
      setError('Something went wrong!')
      setSearchList([])
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="bg-yellow-400 py-4 px-3 rounded-xl col-span-4 sm:col-span-2 xl:col-span-1 max-h-[600px] flex flex-col justify-between"
    >
      <h2 className="font-bold text-[1.4rem]">Search</h2>
      <div>
        <label className="block font-medium mb-1" htmlFor="destination">
          Destination
        </label>
        <input
          className="w-full py-3 px-2"
          type="text"
          id="destination"
          defaultValue={searchParams.destination}
          onChange={event => searchParams.setDestination(event.target.value)}
        />
      </div>
      <div>
        <label className="block font-medium mt-2 mb-1" htmlFor="date">
          Check-in-date
        </label>
        <div className="relative bg-white py-3 px-2">
          <span
            className="cursor-pointer"
            onClick={() => setOpenCalendar(!openCalendar)}
          >{`${format(date.startDate, 'MM/dd/yyyy')} to ${format(
            date.endDate,
            'MM/dd/yyyy'
          )}`}</span>
          {openCalendar && (
            <div className="absolute top-[3.2rem] left-0 z-20">
              <DateRange
                ranges={[date]}
                onChange={(ranges: any) => setDate(ranges.selection)}
                editableDateInputs={true}
                minDate={new Date()}
                moveRangeOnFirstSelection={false}
              />
            </div>
          )}
        </div>
      </div>
      <p className="font-medium mt-2 mb-3">Options</p>
      <div className="flex justify-between mb-4">
        <label htmlFor="min">Min price (per night)</label>
        <input
          className="w-[80px] border-gray-500 border-[1px] rounded-[3px] p-1"
          type="number"
          id="min"
          onChange={event => setMinPrice(event.target.value)}
        />
      </div>
      <div className="flex justify-between mb-4">
        <label htmlFor="max">Max price (per night)</label>
        <input
          className="w-[80px] border-gray-500 border-[1px] rounded-[3px] p-1"
          type="number"
          id="max"
          onChange={event => setMaxPrice(event.target.value)}
        />
      </div>
      <div className="flex justify-between mb-4">
        <label htmlFor="adult">Adult</label>
        <input
          className="w-[80px] border-gray-500 border-[1px] rounded-[3px] p-1"
          type="number"
          id="adult"
          min={1}
          defaultValue={searchParams.adult}
          onChange={event => searchParams.setAdult(event.target.value)}
        />
      </div>
      <div className="flex justify-between mb-4">
        <label htmlFor="children">Children</label>
        <input
          className="w-[80px] border-gray-500 border-[1px] rounded-[3px] p-1"
          type="number"
          id="children"
          defaultValue={searchParams.children}
          min={0}
          onChange={event => searchParams.setChildren(event.target.value)}
        />
      </div>
      <div className="flex justify-between mb-4">
        <label htmlFor="room">Room</label>
        <input
          className="w-[80px] border-gray-500 border-[1px] rounded-[3px] p-1"
          type="number"
          id="room"
          defaultValue={searchParams.room}
          min={1}
          onChange={event => searchParams.setRoom(event.target.value)}
        />
      </div>

      <button className="bg-blue-600 w-full text-white py-2 mt-3">
        Search
      </button>
    </form>
  )
}

export default SearchBox
