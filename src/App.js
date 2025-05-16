import logo from './logo.svg';
import './App.css';
import NavBar from './components/navBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from './pages/about';
import NoPage from './pages/NoPage';
import Movies from "./pages/Movies";
import Series from './pages/series';
import MovieDetails from './pages/MovieDetails';
import SeriesDetails from './pages/SeriesDetails';
import SearchResults from './pages/SearchResults';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/series" element={<Series/>} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
