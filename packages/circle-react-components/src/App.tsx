import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './layout/Layout';
import { Home } from './pages/Home';
import { Overview } from './pages/Overview';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="overview" element={<Overview />} />
        </Route>
      </Routes>
    </Router>
  );
}
