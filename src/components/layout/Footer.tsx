const Footer = () => {
  return (
    <footer>
      <div className="bg-blue-800  text-white flex  py-[4rem] px-4">
        <div className="max-w-[500px] m-auto text-center">
          <h2 className="text-[1.5rem] sm:text-[2.5rem] font-bold">
            Save time, save money!
          </h2>
          <p className="my-4 md:text-[1.2rem]">
            Sign up and we'll send the best deals to you
          </p>
          <div className="flex justify-between gap-2">
            <input
              className="px-2 py-3 rounded-md w-2/3"
              type="text"
              placeholder="Your Email"
            />
            <button className="px-2 py-3 rounded-md bg-blue-600 w-1/3">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] m-auto px-2 pt-8 pb-4">
        <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-y-16 gap-x-4 justify-center mb-[4rem]">
          <ul className="leading-8">
            <li>Countries</li>
            <li>Regions</li>
            <li>Cities</li>
            <li>Districts</li>
            <li>Airports</li>
            <li>Hotels</li>
          </ul>
          <ul className="leading-8">
            <li>Homes</li>
            <li>Apartments</li>
            <li>Resorts</li>
            <li>Villas</li>
            <li>Hostels</li>
            <li>Guest houses</li>
          </ul>
          <ul className="leading-8">
            <li>Unique places to stay</li>
            <li>Reviews</li>
            <li>Unpacked: Travel articles</li>
            <li>Travel communities</li>
            <li>Seasonal and holiday deals</li>
          </ul>
          <ul className="leading-8">
            <li>Car rental</li>
            <li>Flight Finder</li>
            <li>Restaurant reservations</li>
            <li>Travel Agents</li>
          </ul>
          <ul className="leading-8 flex flex-col justify-end">
            <li>Customer Service</li>
            <li>Partner Help</li>
            <li>Careers</li>
            <li>Sustainability</li>
            <li>Press center</li>
            <li>Safety Resource Center</li>
            <li>Investor relations</li>
            <li>Terms & conditions</li>
          </ul>
        </div>
        <p>Copyright &copy; 2023 Lamabooking. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
