import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './Components/NavBar';
import Sidebar from './Components/SideBar';

//context
import { MyContextProvider } from './Components/Context/MyContext';
const App = () => (
  <MyContextProvider>
    <Router>
      <Routes>
        {/* default path to diaplay the employee directory and default components   */}

        <Route
          path="/"
          element={
            <div className="App">
              <Navbar />
              <hr />
              <Sidebar show_sidebar={false} />

            </div>
          }
        />
      </Routes>
    </Router>
  </MyContextProvider>
)

export default App;