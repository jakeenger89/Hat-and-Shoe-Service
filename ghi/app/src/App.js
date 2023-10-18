import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

// Import your HatForm and HatList components here
import HatForm from './Hatform';
import HatList from './hatlist';
import ShoeForm from './ShoeForm';
import ShoeList from './ShoeList ';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* Define a route for HatForm */}
          <Route path="/hats/new" element={<HatForm />} />
          {/* Define a route for HatList */}
          <Route path="/hats" element={<HatList />} />
          <Route path="/shoes/new" element={<ShoeForm />} />
          <Route path="/shoes" element={<ShoeList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
