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
interface props {
  show_sidebar: boolean
}

const SideBar: React.FC<props> = (show_sidebar) => {
  //retrieving data from local storage
  const employee: IEmployee[] = JSON.parse(localStorage.getItem("employees") || "[]")
  var departments: string[] = ["IT", "Human resources", "MD", "Sales",];
  var offices: string[] = ["Seattle", "India"];
  var job_titles: string[] = [
    "SharePoint Practice Head",
    ".Net Development Lead",
    "Recruiting Expert",
    "BI Developer",
    "Business Analyst",
    "Project Lead",
    "Summer Analyst",
    "Manager"
  ];

  const { filterEmployees, setfilterEmployees } = useContext(MyContext)
  const [openEmp, setopenEmp] = useState(false);
  const handleShow = () => setopenEmp(true);
  const handleClose = () => setopenEmp(false);
  const employees: IEmployee[] = JSON.parse(
    localStorage.getItem("employees") || "[]");
  const [search, setsearch] = useState<string>("");
  const [searchCategory, setsearchCategory] = useState<string>("First_Name");

  const [moreItems, setmoreItems] = useState(false);
  const { filterbyDepartment, filterbyOffice, filterbyJobtitle } = useContext(MyContext);
  //initialising empty arrays to store the count of each category
  var departments_count: number[] = [];
  var offices_count: number[] = [];
  var jbtitle_count: number[] = [];

  //loops to count the count of employees of each catogery(3 catogeries of side bar) and push them to the array

  departments.forEach((element) => {
    var cnt: IEmployee[] = employee.filter((emp) => emp.Dept_Name == element);
    departments_count.push(cnt.length);
  });
  offices.forEach((element) => {
    var cnt: IEmployee[] = employee.filter((emp) => emp.Office_Details == element);
    offices_count.push(cnt.length);
  });
  job_titles.forEach((element) => {
    var cnt: IEmployee[] = employee.filter((emp) => emp.Title == element);
    jbtitle_count.push(cnt.length);
  });
  function alpha_filter(alpha: string) {
    {
      setfilterEmployees(
        employees.filter((emp: IEmployee) => {
          {
            if (emp.First_Name.toLowerCase().startsWith(alpha.toLowerCase())) {
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
        employees.filter((emp: IEmployee) => {
          {
            if (emp.First_Name.toLowerCase().startsWith(search.toLowerCase())) {
              return emp;
            }
          }
        })
      );
    }

    if (searchCategory == "Last_Name") {
      setfilterEmployees(
        employees.filter((emp: IEmployee) => {
          {
            if (emp.Last_Name.toLowerCase().startsWith(search.toLowerCase())) {
              return emp;
            }
          }
        })
      );
    }
    if (searchCategory == "Prefered_Name") {
      setfilterEmployees(
        employees.filter((emp: IEmployee) => {
          {
            if (
              emp.Preffered_Name.toLowerCase().startsWith(search.toLowerCase())
            ) {
              return emp;
            }
          }
        })
      );
    }
  }
  //To re render the employee directory when local storage is updated
  useEffect(() => {
    window.addEventListener("storage", () => {
      setfilterEmployees(JSON.parse(localStorage.getItem("employees") || "[]"))
    });
  }, []);
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

  return (
    <>
      <div className="primary">
        <Row className="row">
          <Col sm={2}>
            <div className="employee-filter">
              <ul className="filter-types">
                <li className="filterby-type font-styles">Departments</li>
                <li id="it" className="font-styles filtertype-color" onClick={() => { console.log("Department Filter"); filterbyDepartment("IT") }}>IT{`(${departments_count[0]})`}</li>
                <li id="hr" className="font-styles filtertype-color" onClick={() => { filterbyDepartment("Human Resources") }}>Human Resources{`(${departments_count[1]})`}</li>
                <li id="md" className="font-styles filtertype-color" onClick={() => { filterbyDepartment("MD") }}>MD{`(${departments_count[2]})`}</li>
                <li id="sales" className="font-styles filtertype-color" onClick={() => { filterbyDepartment("Sales") }}>Sales{`(${departments_count[3]})`}</li>
              </ul>
              <ul className="filter-types">
                <li className="filterby-type font-styles">Offices</li>
                <li id="seattle" className="font-styles filtertype-color" onClick={() => { filterbyOffice("Seattle") }}>Seattle{`(${offices_count[0]})`}</li>
                <li id="india" className="font-styles filtertype-color" onClick={() => { filterbyOffice("India") }}>India{`(${offices_count[1]})`}</li>
              </ul>
              <ul className="filter-types">
                <li className="filterby-type font-styles">Job Titles</li>
                <li id="share-pnt" className="font-styles filtertype-color" onClick={() => { filterbyJobtitle("SharePoint Practice Head") }}>SharePoint Practice Head{`(${jbtitle_count[0]})`}</li>
                <li id="net-dev" className="font-styles filtertype-color" onClick={() => { filterbyJobtitle(".Net Development Lead") }}>.Net Development Lead{`(${jbtitle_count[1]})`}</li>
                <li id="rectr-exp" className="font-styles filtertype-color" onClick={() => { filterbyJobtitle("Recruiting Expert") }}>Recruiting Expert{`(${jbtitle_count[2]})`}</li>
                <li id="bi-dev" className="font-styles filtertype-color" onClick={() => { filterbyJobtitle("BI Developer") }}>BI Developer{`(${jbtitle_count[3]})`}</li>
                <li id="b-anlys" className="font-styles filtertype-color" onClick={() => { filterbyJobtitle("Business Analyst") }}>Business Analyst{`(${jbtitle_count[4]})`}</li>
                <div>
                  {moreItems && <><li id="p-l" className="hide-department font-styles filtertype-color" onClick={() => { filterbyJobtitle("Project Lead") }}>Project Lead{`(${jbtitle_count[5]})`}</li>
                    <li id="s-a" className="hide-department font-styles filtertype-color" onClick={() => { filterbyJobtitle("Summer Analyst") }}>Summer Analyst{`(${jbtitle_count[6]})`}</li>
                    <li id="mgr" className="hide-department font-styles filtertype-color" onClick={() => { filterbyJobtitle("Manager") }}>Manager{`(${jbtitle_count[7]})`}</li></>}
                </div>
                <div>
                  {!moreItems && <li className="blue font-styles filtertype-color" id="view-more">
                    <a href="#" className="view-color font-styles filtertype-color" onClick={() => { setmoreItems(true) }}>View More</a>
                  </li>}
                </div>
                <div>
                  {moreItems && <li className="blue  font-styles filtertype-color" id="view-less">
                    <a href="#" className="hide-less view-color font-styles filtertype-color" onClick={() => setmoreItems(false)} >View Less</a>
                  </li>}
                </div>

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
                      setfilterEmployees(employees || []);
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
                          setfilterEmployees(employees || []);
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
                  {filterEmployees.map((emp: any) => {
                    return (
                      <Employee_card
                        key={emp._id}
                        _id={emp._id}
                        Employee_Img={emp.Employee_Img}
                        Preffered_Name={emp.Preffered_Name}
                        Department={emp.Dept_Name}
                        Designation={emp.Title}
                      />
                    );
                  })}
                </div>
              </Row>

            </div>
            {/* Employee directory starts here */}
          </Col>


        </Row>
      </div>



    </>
  );
}
export default SideBar 
