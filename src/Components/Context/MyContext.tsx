import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import IEmployee from "../IEmployee/IEmployee";

type MyContextType = {
  allEmployees: any;
  filterEmployees: any;
  setfilterEmployees: any;
  filterbyDepartment: (department: string) => void;
  filterbyOffice: (filterbyOffice: string) => void;
  filterbyJobtitle: (jobtitle: string) => void;
}
//JSON.parse(localStorage.getItem("employees") || "[]"),
const initialState = {
  allEmployees: [],
  filterEmployees: [],
  setfilterEmployees: [],
  filterbyDepartment: (department: string) => { },
  filterbyOffice: (filterbyOffice: string) => { },
  filterbyJobtitle: (filterbyJobtitle: string) => { }
}

export const MyContext = createContext<MyContextType>(initialState);

type Props = {
  children: React.ReactNode;
}

export const MyContextProvider = ({ children }: Props) => {
  const employee: IEmployee[] = JSON.parse(localStorage.getItem("employees") || "[]")
  const [filterEmployees, setfilterEmployees] = useState(employee)
  const [allEmployees, setallEmployees] = useState([])
 // const [allEmployeesList, setallEmployeesList] = useState<any>([])
  //console.log(filterEmployees)
 useEffect(() => {
    const getEmployesDetails=async ()=>{
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
   },[])
  //  console.log("aabbcc",allEmployees);
  function filterbyDepartment(department: string) {
    console.log("inside context")
    setfilterEmployees(allEmployees.filter((emp: IEmployee) => {
      if (emp.departmentId.toLowerCase() == department.toLowerCase()) {
        return emp;
      }
    })
    );
  }

  function filterbyOffice(filterbyOffice: string) {
    console.log(filterbyOffice,allEmployees);
    
    setfilterEmployees(allEmployees.filter((emp: IEmployee) => {
      if (emp.officeId.toLowerCase() == filterbyOffice.toLowerCase()) {
        return emp;
      }
    })
    );
  }

  function filterbyJobtitle(jobtitle: string) {
    setfilterEmployees(allEmployees.filter((emp: IEmployee) => {
      if (emp.jobTitleId.toLowerCase() == jobtitle.toLowerCase()) {
        return emp;
      }
    })
    );
  }
  return <MyContext.Provider value={{ allEmployees, filterEmployees, setfilterEmployees, filterbyDepartment, filterbyOffice, filterbyJobtitle }}>{children}</MyContext.Provider>

};

