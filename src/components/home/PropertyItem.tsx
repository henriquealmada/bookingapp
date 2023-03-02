type Props = {
  type: { type: string; count: number }
  image: string
}

const PropertyItem = ({ type, image }: Props) => {
  return (
    <li className="rounded-2xl overflow-hidden h-[270px]">
      <img className="w-full h-[65%]" src={image} alt="madrid" />
      <div>
        <span className="text-[1.6rem] font-bold block capitalize">
          {type.type}
        </span>
        <span className="text-[1.3rem] font-semibold text-gray-600">{`${type.count} ${type.type}`}</span>
      </div>
    </li>
  )
}

export default PropertyItem
