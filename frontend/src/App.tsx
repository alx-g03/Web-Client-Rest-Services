import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import View from './components/View';
import Edit from './components/Edit';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
