import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import styles from "./App.module.css";
import MainNav from "./components/MainNav";
import AppLayout from './pages/AppLayout';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PricingPage from "./pages/PricingPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import CountryList from './components/CountryList';
import ProtectedRoute from './components/ProtectedRoute';
import AppFrom from './components/AppFrom';
import CityList from './components/CityList';
import City from './components/City';
import { useEffect } from 'react';
export default function App() {

  const location = useLocation()
  const navigate = useNavigate()

  const isApp = location.pathname.includes("app")
  useEffect(() => {
    //   const userID = localStorage.getItem("userID")
    // if (userID) {
    //   navigate("/app/cities")
  
    //   }
    
  }, [])
  
  return (
    <>
      <main className={!isApp ? styles.main : `${styles.main} ${styles["main-m"]}`}>
  {!isApp && <MainNav />}
     <Routes>
                <Route index element={<HomePage />} />
                <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>} >
                <Route  index element={<Navigate replace to='cities'/>} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City/>} />

                <Route path="countries" element={<CountryList/>} />
                <Route path="form" element={<AppFrom/>} />

          </Route>
                      
            
            
                <Route path="/product" element={<ProductPage />} />
                <Route path="/price" element={<PricingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFoundPage />} />

              </Routes>
            </main>
    </>
  )
}

