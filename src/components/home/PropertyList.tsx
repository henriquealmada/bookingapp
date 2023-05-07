import PropertyItem from './PropertyItem'
import hotel from '../../assets/hotel.jpg'
import apartment from '../../assets/apartment.jpg'
import resort from '../../assets/resort.jpg'
import villa from '../../assets/villa.jpg'
import cabin from '../../assets/cabin.jpg'

type Props = {
  types: { type: string; count: number }[]
}

const PropertyList = ({ types }: Props) => {
  const images = [hotel, apartment, resort, villa, cabin]

  return (
    <div>
      <h2 className="text-[1.7rem] font-bold mb-8">Browse by property type</h2>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:justify-between gap-6 justify-center">
        {types.map((type, index) => (
          <PropertyItem key={index} type={type} image={images[index]} />
        ))}
      </ul>
    </div>
  )
}

export default PropertyList
