import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormLayout from './pages/Form/FormLayout';
import Tables from './pages/Tables';
import AdminLogin from './pages/Pages/AdminLogin';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path='/dashboard'
          index
          element={
            <>
              <PageTitle title="Dashboard" />
              <ECommerce />
            </>
          }
          />
         
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="Product Page" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users | Traffic" />
              <Tables />
            </>
          }
        />
        
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | Admin Dashboard" />
              <Chart />
            </>
          }
        />
       
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Admin Login" />
              <AdminLogin />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
