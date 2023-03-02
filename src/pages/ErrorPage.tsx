import { useRouteError } from 'react-router-dom'
import Layout from '../components/layout'

const ErrorPage = () => {
  const error: any = useRouteError()

  return (
    <Layout>
      <div className="flex flex-col items-center gap-8 mt-[20rem]">
        <h1 className="text-[2rem] font-bold">Oops!</h1>
        <p className="text-[1.5rem] text-center">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-[1.2rem]">
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Layout>
  )
}

export default ErrorPage
