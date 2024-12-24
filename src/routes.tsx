import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetailsPage from './pages/MovieDetailpages';
// import About from './pages/About';
// import Dashboard from './pages/Dashboard';
// import NotFound from './pages/NotFound';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

// App Component with Unified Routes
const App = () => (
  <Router>
    <Routes>
      {/* Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
        {/* <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} /> */}
      </Route>
      {/* Catch-All Route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </Router>
);

// Layout Component for Consistent UI
const Layout = () => (
  <div>
    <Header/>
    <main>
      <Outlet /> {/* Nested routes will render here */}
    </main>
  </div>
);

export default App;
