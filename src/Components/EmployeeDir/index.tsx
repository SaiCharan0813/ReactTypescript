import React,{useEffect,useState} from "react";
import { Link,useSearchParams } from "react-router-dom";
import AddEmp from "../AddEmp";
import Employee_card from "../EmployeeCard";
import FullEmployee from "../FullempDetails";
import '../EmployeeDir/style.css'
import {ReactComponent as Person} from'../assets/person-fill.svg'

import Iemployee from "../Interface/Interface";
const EmployeeDir:React.FC = () => {
  // All the variable initialisation and usestate hooks declaration
  const [openEmp,setopenEmp] = useState(false);
  const employees:Iemployee[] = JSON.parse(
    localStorage.getItem("employees") || "[]");
    const [filteremp, setfilteremp] = useState<Iemployee[]>(employees || []);
    const [search, setsearch] = useState<string>("");
    const [searchCategory, setsearchCategory] = useState<string>("First_Name");
    const [category, setcategory] = useState<string>("");
    const [value, setvalue] = useState<string>("");
    let [searchParams] = useSearchParams();

    function usable(){
      if (category=="starts_with"){
        setfilteremp(
          employees.filter((emp : Iemployee) => {
            {
              if (emp.First_Name.toLowerCase().startsWith(value.toLowerCase())) {
                return emp;
              }
            }
          })
        );
      }
      if (category=="Department"){
        setfilteremp(
          employees.filter((emp:Iemployee) => {
            {
              if (emp.Dept_Name.toLowerCase() == value.toLowerCase()){
                return emp;
              }
            }
          })
        );
      }
      if (category=="Office"){
        setfilteremp(
          employees.filter((emp:Iemployee) => {
            {
              if (emp.Office_Details.toLowerCase() == value.toLowerCase()){
                return emp
              }
            }
          })
        );
      }
      if(category=="Job_Title"){
        setfilteremp(
          employees.filter((emp:Iemployee)=>{
            {
              if(emp.Title.toLowerCase() == value.toLowerCase()){
                return emp;
              }
            }
          })
        );
      }
    }
    function filterBy(){
      if (searchCategory == "First_Name") {
        setfilteremp(
          employees.filter((emp: Iemployee) => {
            {
              if (emp.First_Name.toLowerCase().startsWith(search.toLowerCase())) {
                return emp;
              }
            }
          })
        );
      }
      if (searchCategory == "Last_Name") {
        setfilteremp(
          employees.filter((emp: Iemployee) => {
            {
              if (emp.Last_Name.toLowerCase().startsWith(search.toLowerCase())) {
                return emp;
              }
            }
          })
        );
      }
      if (searchCategory == "Prefered_Name") {
        setfilteremp(
          employees.filter((emp: Iemployee) => {
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
    window.addEventListener("storage",() => {
      setfilteremp(JSON.parse(localStorage.getItem("employees") || "[]"))
    });
  },[]);

  //To retrive the search parameters from the URL for the sake of filtering the employee directory

  useEffect(() => {
    if(searchParams){
      setcategory(searchParams.get("category")!);
      setvalue(searchParams.get("value")!);
    }
  },[searchParams]);

  
   //Filtering the employee directory based on the starting alphabet from the alphabet filter bar
  // //Filtering the employee directory based on the department name from the side bar 
// //Filtering the employee directory based on the office name from the side bar 
// //Filtering the employee directory based on the job title from the side bar
   useEffect(() => {
     usable()
   },[value,category]);
  
  //Filtering the employee directory based on the search catogery first name from the search input field
  //Filtering the employee directory based on the search catogery last name from the search input field
//Filtering the employee directory based on the search catogery preffered name from the search input field
  useEffect(() => {
    filterBy()
  }, [search, searchCategory]);
  //Creating Alphabets useing char chode numbers for displaying in the alphabet filter bar
  const alphabets:string[] =[];
  for(let i=65;i<91;i++){
    alphabets.push(String.fromCharCode(i));
  }
//To show no employees message when there are no employees to show
if (filteremp.length == 0) {
  return (
    <>

      {/* Home div starts here it has all the alpha filter functionalities and search functionalities */ }
      <div className="home ">
        <div className="flex-container alpha-search">
          <div className="alpha" style={{ backgroundColor: "#3399ff" }}>
            <Person
             style={{
              color: "white",
          
              top: "0.6vh",
              padding: "4px",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="34"
            fill="currentColor"
            className="bi bi-person-fill  human"
            viewBox="0 0 16 16"/>
          </div>
          {alphabets.map((alpha) => {
            return (
              <Link
                className="alpha"
                key={alpha}
                to={`/filter?category=starts_with&value=${alpha}`}
              >
                <p className="alphabets">{alpha}</p>
              </Link>
            );
          })}
        </div>

        <div className="employe_form flex-container2">
          <div className="emp-elm elm-dst1">
            <p className="form-text font-family3 position-relative">Search</p>
          </div>
          <div className="emp-elm elm-dst2">
            <input
              className="input-frm position-relative"
              type="text"
              value={search}
              key={search}
              placeholder="&#128269;Enter any keyword"
              onChange={(event) => {
                setsearch(event.target.value);
              }}
            />
          </div>
          <div className="emp-elm elm-dst3">
            <button
              onClick={() => {
                setsearch("");
                setfilteremp(employees || []);
              }}
              className="button btn1 font-family3 position-relative"
            >
              Clear
            </button>
          </div>
          <div className="emp-elm elm-dst4">
            <p
              className=" filter-by font-family3 position-relative"
            >
              Filter By
            </p>
          </div>
          <div className="emp-elm elm-dst5">
            <select
              className="input-frm2 position-relative"
              onChange={(event) => {
                setsearchCategory(event.target.value);
              }}
            >
              <option value="First_Name">First Name</option>
              <option value="Last_Name">Last Name</option>
              <option value="Prefered_Name">Preffered Name</option>
            </select>
          </div>
          <div className="emp-elm elm-dst6">
              <button
                className="button btn2  font-family3 position-relative"
                onClick={() => {
                  setopenEmp(true)
                }}
              >
                Add Employee
              </button>
              {openEmp && <AddEmp closeEmp = {setopenEmp}/>}
          </div>
        </div>
        <p className="note-user  font-family3 list-elm-color">
          <b>Note:</b> Please use your advanced options to search the results.
        </p>
      </div>
      <div className="emp-dir flex-container3 ">
        <div
        
        >
          {/* No employees message displayed here */ }

          <p className="head-text">There are no employees</p>
        </div>
      </div>
    </>
  );
}

  return (
    <>
    
      {/* Home div starts here it has all the alpha filter functionalities and search functionalities */ }

      <div className="home ">
        <div className="flex-container alpha-search">
          <div className="alpha" style={{ backgroundColor: "#3399ff" }}>
            <Person
              style={{
                color: "white",
          
                top: "0.6vh",
                padding: "4px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="33"
              height="34"
              fill="currentColor"
              className="bi bi-person-fill  human"
              viewBox="0 0 16 16"/>
          </div>
          {alphabets.map((alpha) => {
            return (
              <Link
                className="alpha"
                key={alpha}
                to={`/filter?category=starts_with&value=${alpha}`}
              >
                <p className="alphabets">{alpha}</p>
              </Link>
            );
          })}
        </div>

        <div className="employe_form flex-container2">
          <div className="emp-elm elm-dst1">
            <p className="form-text font-family3 position-relative">Search</p>
          </div>
          <div className="emp-elm elm-dst2">
            <input
              className="input-frm position-relative"
              type="text"
              value={search}
              key={search}
              placeholder="&#128269;Enter any keyword"
              onChange={(event) => {
                setsearch(event.target.value);
              }}
            />
          </div>
          <div className="emp-elm elm-dst3">
            <button
              onClick={() => {
                setsearch("");
                setfilteremp(employees || []);
              }}
              className="button btn1 font-family3 position-relative"
            >
              Clear
            </button>
          </div>
          <div className="emp-elm elm-dst4">
            <p
              className=" filter-by font-family3 position-relative"
            >
              Filter By
            </p>
          </div>
          <div className="emp-elm elm-dst5">
            <select
              className="input-frm2 position-relative"
              onChange={(event) => {
                setsearchCategory(event.target.value);
              }}
            >
              <option value="First_Name">First Name</option>
              <option value="Last_Name">Last Name</option>
              <option value="Prefered_Name">Preffered Name</option>
            </select>
          </div>
          <div className="emp-elm elm-dst6">
              <button
                className="button btn2  font-family3 position-relative"
                onClick={() => {
                  setopenEmp(true)
                }}
              >
                Add Employee
              </button>
              {openEmp && <AddEmp closeEmp = {setopenEmp}/>}
          </div>
        </div>
        <p className="note-user  font-family3 list-elm-color">
          <b>Note:</b> Please use your advanced options to search the results.
        </p>
      </div>
      {/* Employee directory starts here */}


      <div className="emp-dir flex-container3 ">
        {filteremp.map((emp) => {
          return (
            <Employee_card
              key={emp._id}
              _id={emp._id}
              Employee_Img ={emp.Employee_Img}
              Preffered_Name={emp.Preffered_Name}
              Department={emp.Dept_Name}
              Designation={emp.Title}
            />
            
          );
        })}
      </div>
      
    </>
  );
}


export default EmployeeDir