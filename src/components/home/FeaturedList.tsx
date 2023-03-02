type Props = {
  citiesCount: number[]
}

const FeaturedList = ({ citiesCount }: Props) => {
  const featuredItems = [
    {
      image:
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Madrid'
    },
    {
      image:
        'https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      name: 'London'
    },
    {
      image:
        'https://images.unsplash.com/photo-1588993608283-7f0eda4438be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      name: 'Austin'
    }
  ]

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
