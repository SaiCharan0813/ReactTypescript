import React, { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import '../SideBar/style.css'
import IEmployee from "../IEmployee/IEmployee";
import { MyContext } from "../Context/MyContext";
import { useSearchParams } from "react-router-dom";
import { Link, } from "react-router-dom";
import AddEmp from "../AddEmp";
import Employee_card from "../EmployeeCard";
import { Modal } from 'react-bootstrap';
import { ReactComponent as Person } from '../assets/person-fill.svg'
import axios from "axios";
interface props {
  show_sidebar: boolean
}

const SideBar: React.FC<props> = (show_sidebar) => {
  const { filterEmployees, setfilterEmployees } = useContext(MyContext);
  const [allEmployees, setallEmployees] = useState([]);
  const [filterEmployeesByDepartment, setfilterEmployeesByDepartment] = useState([]);
  const [filterEmployeesByOffice, setfilterEmployeesByOffice] = useState([]);
  const [filterEmployeesByJobTitle, setfilterEmployeesByJobTitle] = useState([]);
  const [openEmp, setopenEmp] = useState(false);
  //const [allEmployees,setallEmployees] = useContext(MyContext);
  const handleShow = () => setopenEmp(true);
  const handleClose = () => setopenEmp(false);
  //////////////////////////////////////////////////////////
  //To get all employees from database
  useEffect(() => {
    const getEmployesDetails = async () => {
      await axios.get('https://localhost:7055/api/Values/api/Values')
        .then((response) => {
          setfilterEmployees(response.data)
          setallEmployees(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    getEmployesDetails();

  }, [])

  //////////////////////////////////////////////
  //////details for count of Departments
  useEffect(() => {
    const getEmployesDetails = async () => {
      await axios.get('https://localhost:7055/api/Values/api/Values/EmployeesDepartment')
        .then((response) => {
          setfilterEmployeesByDepartment(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    getEmployesDetails();

  }, [])

  //////details for count of Offices
  useEffect(() => {
    const getEmployesDetails = async () => {
      await axios.get('https://localhost:7055/api/Values/api/Values/EmployeesOffice')
        .then((response) => {
          setfilterEmployeesByOffice(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    getEmployesDetails();

  }, [])

  //////details for count of JobTitles
  useEffect(() => {
    const getEmployesDetails = async () => {
      await axios.get('https://localhost:7055/api/Values/api/Values/EmployeesJobTitle')
        .then((response) => {
          setfilterEmployeesByJobTitle(response.data)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    getEmployesDetails();

  }, [])
  const [search, setsearch] = useState<string>("");
  const [searchCategory, setsearchCategory] = useState<string>("First_Name");

  const [moreItems, setmoreItems] = useState(false);
  const { filterbyDepartment, filterbyOffice, filterbyJobtitle } = useContext(MyContext);
  function alpha_filter(alpha: string) {
    {
      setfilterEmployees(
        allEmployees.filter((emp: IEmployee) => {
          {
            if (emp.firstName.toLowerCase().startsWith(alpha.toLowerCase())) {
              return emp;
            }
          }
        })
      );
    }
  }


  function filterBy() {
    if (searchCategory == "First_Name") {
      setfilterEmployees(
        allEmployees.filter((emp: IEmployee) => {
          {
            if (emp.firstName.toLowerCase().startsWith(search.toLowerCase())) {
              return emp;
            }
          }
        })
      );
    }
    console.log("asd", filterEmployees);

    if (searchCategory == "Last_Name") {
      setfilterEmployees(
        allEmployees.filter((emp: IEmployee) => {
          {
            if (emp.lastName.toLowerCase().startsWith(search.toLowerCase())) {
              return emp;
            }
          }
        })
      );
    }
    if (searchCategory == "Prefered_Name") {
      setfilterEmployees(
        allEmployees.filter((emp: IEmployee) => {
          {
            if (
              emp.prefferedName.toLowerCase().startsWith(search.toLowerCase())
            ) {
              return emp;
            }
          }
        })
      );
    }
  }
  //Filtering the employee directory based on the search catogery first name from the search input field
  //Filtering the employee directory based on the search catogery last name from the search input field
  //Filtering the employee directory based on the search catogery preffered name from the search input field
  useEffect(() => {
    filterBy()
  }, [search, searchCategory]);
  //Creating Alphabets useing char chode numbers for displaying in the alphabet filter bar
  const alphabets: string[] = [];
  for (let i = 65; i < 91; i++) {
    alphabets.push(String.fromCharCode(i));
  }
  ///function for Employees departments////
  function displayDepartments() {
    var str = [];
    for (const [k, v] of Object.entries(filterEmployeesByDepartment)) {
      console.log(k,v)
      str.push(<li id="it" className="font-styles filtertype-color" onClick={() => { console.log("Department Filter"); filterbyDepartment(k) }}>{k}({(v)})</li>)
    }
    return str;
  }
  //function for Employees offices///
  function displayOffices() {
    var strr = [];
    for (const [k, v] of Object.entries(filterEmployeesByOffice)) {
      console.log(k,v)
      strr.push( <li id="seattle" className="font-styles filtertype-color" onClick={() => { filterbyOffice(k) }}>{k}({(v)})</li>)
    }
    return strr;
  }
 ///function for Employee JobTitles///
 function displayJobTitles() {
  var strrr = [];
  for (const [k, v] of Object.entries(filterEmployeesByJobTitle)) {
    console.log(k,v)
    strrr.push(<li id="share-pnt" className="font-styles filtertype-color" onClick={() => { filterbyJobtitle(k) }}>{k}({(v)})</li>)
  }
  return strrr;
}
  return (
    <>
      <div className="primary">
        <Row className="row">
          <Col sm={2}>
            <div className="employee-filter">
              
              <ul className="filter-types">
                <li className="filterby-type font-styles" onClick={() => { }}>Departments</li>
                {displayDepartments()}
              </ul>
              <ul className="filter-types">
                <li className="filterby-type font-styles">Offices</li>
                {displayOffices()}
              </ul>
              <ul className="filter-types">
                <li className="filterby-type font-styles">Job Titles</li>
                {displayJobTitles()}
              </ul>
            </div>


          </Col>
          <Col sm={10}>

            <div className="home ">

              <Row>
                <div className="flex-container alphabets-bar">
                  <div className="alphabets" style={{ backgroundColor: "#3399ff" }}>
                    <Person onClick={() => {
                      setsearch("");
                      setfilterEmployees(allEmployees || []);
                    }}
                      style={{
                        color: "white",

                        top: "0.6vh",
                        padding: "4px",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="34"
                      fill="currentColor"
                      className="bi bi-person-fill  all-employees"
                      viewBox="0 0 16 16" />
                  </div>
                  {alphabets.map((alpha) => {
                    return (
                      <Link
                        className="alphabets"
                        key={alpha} to={""}
                      >
                        <p className="all-alphabets" onClick={() => { alpha_filter(alpha) }}>{alpha}</p>
                      </Link>
                    );
                  })}
                </div>
              </Row>
              <Row>
                <div className="filter-bars">
                  <Col sm={1}>
                    <div className="filterby-search">
                      <p className="searchby font-styles position-relative">Search</p>
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="search-field">
                      <input
                        className="input-field position-relative"
                        type="text"
                        value={search}
                        key={search}
                        placeholder="&#128269;Enter any keyword"
                        onChange={(event) => {
                          setsearch(event.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col sm={1}>
                    <div className="clear-search">
                      <button
                        onClick={() => {
                          setsearch("");
                          setfilterEmployees(allEmployees || []);
                        }}
                        className="button clear-button font-styles position-relative"
                      >
                        Clear
                      </button>
                    </div>
                  </Col>
                  <Col sm={1}>
                    <div className="filter-employees">
                      <p
                        className=" filter-by font-styles position-relative"
                      >
                        Filter By
                      </p>
                    </div>
                  </Col>
                  <Col sm={3}>
                    <div className="filterby-names">
                      <select
                        className="filter-options position-relative"
                        onChange={(event) => {
                          setsearchCategory(event.target.value);
                        }}
                      >
                        <option value="First_Name">First Name</option>
                        <option value="Last_Name">Last Name</option>
                        <option value="Prefered_Name">Preffered Name</option>
                      </select>
                    </div>
                  </Col>
                  <Col sm={2}>
                    <div className="add-employee">
                      <button
                        className="button addemployee-button font-styles position-relative"
                        onClick={() => {
                          handleShow()
                        }}
                      >
                        Add Employee
                      </button>
                      <Modal show={openEmp} onHide={handleClose}>
                        <Modal.Body>
                          <AddEmp closeEmp={setopenEmp} />
                        </Modal.Body>
                      </Modal>
                    </div>
                  </Col>


                </div>
              </Row>
              <Row>

                <p className="note font-styles">
                  <b>Note:</b> Please use your advanced options to search the results.
                </p>
              </Row>
              <Row>

                <div className="total-employees display-employees ">
                  {filterEmployees.map((emp: any, index: number) => {
                    return (
                      <Employee_card
                        key={index}
                        employeeId={emp.employeeId}
                        image={emp.image}
                        prefferedName={emp.prefferedName}
                        departmentId={emp.departmentId}
                        jobTitleId={emp.jobTitleId}
                      />
                    );
                  })}
                </div>
              </Row>

            </div>
          </Col>


        </Row>
      </div>



    </>
  );
}
export default SideBar 
