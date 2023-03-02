import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'

type Props = {
  children?: ReactNode
  setAlert: Dispatch<SetStateAction<null | string>>
}

const Alert = ({ children, setAlert }: Props) => {
  useEffect(() => {
    const time = setTimeout(() => {
      setAlert(null)
    }, 3000)
    return () => {
      clearTimeout(time)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 bg-[#FDEDED] text-red-700  w-full p-4 text-[1.5rem] z-[99999]`}
    >
      {children}
    </div>
  )
}

export default Alert
