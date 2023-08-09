import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styles from "./App.module.css";
import MainNav from "./components/MainNav";
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const CountryList = lazy(() => import('./components/CountryList'));
const CityList = lazy(() => import('./components/CityList'));
const City = lazy(() => import('./components/City'));
const AppFrom = lazy(() => import('./components/AppFrom'));

export default function App() {
  const location = useLocation()
  const isApp = location.pathname.includes("app")

  return (
    <>
      <main className={!isApp ? styles.main : `${styles.main} ${styles["main-m"]}`}>
        {!isApp && <MainNav />}
        <Routes>
          <Route index element={<Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>} />
          <Route path="/app" element={<ProtectedRoute><Suspense fallback={<div>Loading...</div>}><AppLayout /></Suspense></ProtectedRoute>} >
            <Route index element={<Navigate replace to='cities' />} />
            <Route path="cities" element={<Suspense fallback={<div>Loading...</div>}><CityList /></Suspense>} />
            <Route path="cities/:id" element={<Suspense fallback={<div>Loading...</div>}><City /></Suspense>} />
            <Route path="countries" element={<Suspense fallback={<div>Loading...</div>}><CountryList /></Suspense>} />
            <Route path="form" element={<Suspense fallback={<div>Loading...</div>}><AppFrom /></Suspense>} />
          </Route>
          <Route path="/product" element={<Suspense fallback={<div>Loading...</div>}><ProductPage /></Suspense>} />
          <Route path="/price" element={<Suspense fallback={<div>Loading...</div>}><PricingPage /></Suspense>} />
          <Route path="/login" element={<Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense>} />
          <Route path="/register" element={<Suspense fallback={<div>Loading...</div>}><RegisterPage /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<div>Loading...</div>}><NotFoundPage /></Suspense>} />
        </Routes>
      </main>
    </>
  )
}

