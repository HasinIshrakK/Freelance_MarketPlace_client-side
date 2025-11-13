import { Outlet, useNavigation } from 'react-router'
import './App.css'
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'
import { FaCircleArrowUp } from 'react-icons/fa6'
import ThemeProvider from './Contexts/Theme'
import AuthProvider from './Contexts/AuthProvider'
import Loader from './Components/Loader'

function App() {

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const top = () => window.scrollTo(0, 0);

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <Navbar></Navbar>
          <div className='mx-10 sm:mx-20'>
            {
              isLoading ?
                <Loader></Loader>
                :
                <Outlet></Outlet>
            }
          </div>
          <button onClick={top} className='fixed z-10 bottom-10 right-10 text-5xl text-blue-600'>
            <FaCircleArrowUp />
          </button>
          <Footer></Footer>
        </ThemeProvider>
      </AuthProvider>
    </>
  )
}

export default App
