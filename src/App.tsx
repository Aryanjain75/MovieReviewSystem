// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieReviewPage from '@/pages/MovieDetailpages'; // Example page for individual movie reviews
// import MovieDetailsPage from './pages/MovieDetailpages';
// import About from './pages/About';
// import Dashboard from './pages/Dashboard';
// import NotFound from './pages/NotFound';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Review from './pages/Review';
import ForgetPassword from './components/ForgetPassword';
const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/review/:id" element={<MovieReviewPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

      </Route>
    </Routes>
  </Router>
);
const Layout = () => (
  <div className=''>
    <Header/>
    <main>
      <Outlet />
    </main>
  </div>
);

export default App;
