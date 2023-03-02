import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  images: string[]
  setOpenCarousel: Dispatch<SetStateAction<boolean>>
  selectedItem: number
}

const CarouselModal = ({ images, setOpenCarousel, selectedItem }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="bg-black opacity-[0.5] fixed top-0 left-0 w-full min-h-[100vh] z-[99]"
        onClick={() => setOpenCarousel(false)}
      ></div>
      <div className="fixed z-[999] left-0 right-0 ml-auto mr-auto top-[30%] lg:top-[7rem] flex justify-center w-[90%] lg:w-[65%] xl:w-[60%]">
        <Carousel selectedItem={selectedItem} showThumbs={false}>
          {images.map((img, index) => (
            <img
              className="h-[290px] sm:h-[400px] md:h-[500px] xl:h-[700px]"
              key={index}
              src={img}
              alt="hotel"
            />
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default CarouselModal
