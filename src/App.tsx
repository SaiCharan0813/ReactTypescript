import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; 
import Navbar from './Components/NavBar';
import Sidebar from './Components/SideBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employee_dir from './Components/EmployeeDir';
import Add_emp from './Components/AddEmp';
import Fullemp_details from './Components/FullempDetails';
import Showmore from './Components/ShowMore';
import ShowSideBar from './Components/ShowSidebar';
function App() {
  const [openEmp,setopenEmp] = useState(false);
  return (
    
    <>
      <Router>
        <Routes>
          {/* default path to diaplay the employee directory and default components   */}

          <Route
            path="/"
            element={
              <div className="App">
                <Navbar />
                <hr />
                <Sidebar show_sidebar={false}/>
                <Employee_dir />
            
                
              </div>
            }
          />

          {/* path to display a single employee full details based on their id     */}

          <Route
            path="/employee/:_id"
            element={
              <div className="App">
                <Navbar />
                <hr />
                <Sidebar show_sidebar={false} />
                <Employee_dir />
                <Fullemp_details />
               
              </div>
            }
          />

          {/* Path to diaplay the add employee form  */}
          <Route
            path="/show_more"
            element={
              <div className="App">
                <Navbar />
                <hr />
                <Showmore show_sidebar={false} />
                <Employee_dir />
                
              </div>
            }
          />

          {/* Path to filter employees and show them in the direactory */}

          <Route
            path="/filter"
            element={
              <div className="App">
                <Navbar />
                <hr />
                <Sidebar show_sidebar={false} />
                <Employee_dir />
              
              </div>
            }
          />
           {/* Path to display the side bar in responsive mobile mode  */}

           <Route
            path="/show_sidebar"
            element={
              <div className="App">
                <hr />
                <ShowSideBar show_sidebar={false} />
                <Employee_dir />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
} 
export default App;