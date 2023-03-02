import Header from './Header'
import Footer from './Footer'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  type?: boolean
}

const Layout = ({ children, type }: Props) => {
  return (
    <>
      <Header type={type} />
      <main className="min-h-[80vh] max-w-[1400px] m-auto px-8">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
