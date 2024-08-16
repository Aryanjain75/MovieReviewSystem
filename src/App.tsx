// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieReviewPage from '@/pages/MovieDetailpages'; // Example page for individual movie reviews

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/review/:id" element={<MovieReviewPage />} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

export default App;
