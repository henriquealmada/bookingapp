import madrid from '../../assets/madrid.jpg'
import london from '../../assets/london.jpg'
import austin from '../../assets/austin.jpg'

const featuredItems = [
  {
    image: madrid,
    name: 'Madrid'
  },
  {
    image: london,
    name: 'London'
  },
  {
    image: austin,
    name: 'Austin'
  }
]

type Props = {
  citiesCount: number[]
}

const FeaturedList = ({ citiesCount }: Props) => {
  return (
    <ul className="flex flex-col md:justify-between items-center gap-4 lg:flex-row mb-8">
      {featuredItems.map((item, index) => (
        <li
          key={index}
          className="rounded-2xl overflow-hidden relative max-w-[450px]"
        >
          <img src={item.image} alt={item.name} />
          <div className="text-white absolute bottom-5 left-5">
            <span className="text-[2.2rem] font-bold block">{item.name}</span>
            <span className="text-[1.8rem] font-bold">{`${citiesCount[index]} properties`}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default FeaturedList
