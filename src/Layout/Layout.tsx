import { Header } from '../components/Header/Header'
import './Layout.scss'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'

export const Layout = () => {

  return (
    <>
      <div className='app'>
        <Header />

        <div className='page'>

          <Outlet />

        </div>

        <Footer />

      </div>
    </>
  )
}