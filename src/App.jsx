import { Outlet } from 'react-router'
import './App.css'
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'
import { FaCircleArrowUp } from 'react-icons/fa6'

function App() {

    const top = () => window.scrollTo(0, 0);

  return (
    <>
      <Navbar></Navbar>
      <div className='mx-10 sm:mx-20'>
        <Outlet></Outlet>
      </div>
      <button onClick={top} className='fixed z-10 bottom-10 right-10 text-5xl text-blue-600'>
        <FaCircleArrowUp />
      </button>
      <Footer></Footer>
    </>
  )
}

export default App
