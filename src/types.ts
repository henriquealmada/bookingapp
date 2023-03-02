export type Room = {
  _id: string
  title: string
  price: number
  maxPeople: number
  description: string
  roomNumbers: { _id: string; number: number; unavailableDates: Date[] }[]
}

export type Hotel = {
  _id: string
  images: string[]
  type: string
  title: string
  address: string
  price: number
  name: string
  city: string
  distance: number
  description: string
  featured: boolean
  rooms: Room[] | string[]
  cheapestPrice: number
  rating: number
}

export type User = {
  _id: string
  username: string
  email: string
  password: string
  country: string
  city: string
  phone: string
  image?: string
  isAdmin: boolean
}
