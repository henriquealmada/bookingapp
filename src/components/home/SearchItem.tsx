import { useContext, useState } from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/search-context'

const SearchItem = () => {
  const searchCtx = useContext(SearchContext)
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [adult, setAdult] = useState(1)
  const [children, setChildren] = useState(0)
  const [room, setRoom] = useState(1)

  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value)
  }

  const handleSearch = () => {
    if (destination.trim().length === 0) {
      return
    }
    const searchOptions = {
      date: { start: date.startDate, end: date.endDate },
      destination,
      adult,
      children,
      room
    }
    searchCtx.onChangeSearch(searchOptions)
    navigate(
      `hotels/search?destination=${destination}&minDate=${date.startDate}&maxDate=${date.endDate}&adult=${adult}&children=${children}&room=${room}`
    )
  }

  return (
    <div className="border-4 border-yellow-200 flex flex-col md:flex-row justify-between gap-2 mt-[-6rem] mb-8 bg-white py-2 px-12 text-[0.8rem] sm:text-[0.9rem] md:text-[0.8rem] lg:text-[1rem]">
      <div className="flex items-center justify-center">
        <i className="fa-solid fa-bed"></i>
        <input
          className="ml-3 p-2 outline-none border-[2px] md:border-none"
          type="text"
          placeholder="Where are you going?"
          onChange={handleChange}
        />
      </div>

      <div className="relative flex items-center justify-center">
        <i className="fa-solid fa-calendar-days"></i>
        <span
          className="cursor-pointer ml-3"
          onClick={() => setOpenCalendar(!openCalendar)}
        >{`${format(date.startDate, 'MM/dd/yyyy')} to ${format(
          date.endDate,
          'MM/dd/yyyy'
        )}`}</span>
        {openCalendar && (
          <div className="absolute top-[1.2rem] md:left-0 md:top-[3.4rem] z-20">
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

      <div className="relative flex items-center justify-center">
        <i className="fa-solid fa-person"></i>
        <span
          className="cursor-pointer ml-3"
          onClick={() => setOpenOptions(!openOptions)}
        >{`${adult} adult - ${children} children - ${room} room`}</span>
        {openOptions && (
          <div className="absolute top-[1.2rem] md:left-0 md:top-[3.4rem] z-20  w-[230px] p-3 bg-white rounded-[5px] shadow-black shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span>Adult</span>
              <div>
                <button
                  className="w-[26px] h-full border-[1px] border-blue-600"
                  onClick={() =>
                    setAdult(prev => (prev === 1 ? prev : prev - 1))
                  }
                >
                  -
                </button>
                <span className="mx-2">{adult}</span>
                <button
                  className="w-[26px] h-full] border-[1px] border-blue-600"
                  onClick={() => setAdult(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Children</span>
              <div>
                <button
                  className="w-[26px] h-full border-[1px] border-blue-600"
                  onClick={() =>
                    setChildren(prev => (prev === 0 ? prev : prev - 1))
                  }
                >
                  -
                </button>
                <span className="mx-2">{children}</span>
                <button
                  className="w-[26px] h-full border-[1px] border-blue-600"
                  onClick={() => setChildren(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Room</span>
              <div>
                <button
                  className="w-[26px] h-full border-[1px] border-blue-600"
                  onClick={() =>
                    setRoom(prev => (prev === 1 ? prev : prev - 1))
                  }
                >
                  -
                </button>
                <span className="mx-2">{room}</span>
                <button
                  className="w-[26px] h-full border-[1px] border-blue-600"
                  onClick={() => setRoom(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button className="bg-blue-600 text-white p-2" onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

export default SearchItem
