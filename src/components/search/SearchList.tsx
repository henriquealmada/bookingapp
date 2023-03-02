import { Hotel } from '../../types'
import SearchItem from './SearchItem'

type Props = {
  searchList: Hotel[]
}

const SearchList = ({ searchList }: Props) => {
  return (
    <ul className="col-span-4 sm:col-span-2 xl:col-span-3">
      {searchList.map(item => (
        <SearchItem key={item._id} hotel={item} />
      ))}
    </ul>
  )
}

export default SearchList
