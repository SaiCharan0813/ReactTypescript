import { type } from '@testing-library/user-event/dist/type';
import React, { createContext, useState } from 'react';
import IEmployee from "../IEmployee/IEmployee";

type MyContextType = {
  allEmployees: any;
  filterEmployees: any;
  setfilterEmployees: any;
  filterbyDepartment: (department: string) => void;
  filterbyOffice: (filterbyOffice: string) => void;
  filterbyJobtitle: (jobtitle: string) => void;
}
const initialState = {
  allEmployees: JSON.parse(localStorage.getItem("employees") || "[]"),
  filterEmployees: JSON.parse(localStorage.getItem("employees") || "[]"),
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
  const [allEmployees, setallEmployees] = useState(employee)
  console.log(filterEmployees)
  function filterbyDepartment(department: string) {
    console.log("inside context")
    setfilterEmployees(allEmployees.filter((emp: IEmployee) => {
      if (emp.Dept_Name.toLowerCase() == department.toLowerCase()) {
        return emp;
      }
    })
    );
  }

  function filterbyOffice(filterbyOffice: string) {
    setfilterEmployees(allEmployees.filter((emp: IEmployee) => {
      if (emp.Office_Details.toLowerCase() == filterbyOffice.toLowerCase()) {
        return emp;
      }
    })
    );
  }

  function filterbyJobtitle(jobtitle: string) {
    setfilterEmployees(allEmployees.filter((emp: IEmployee) => {
      if (emp.Title.toLowerCase() == jobtitle.toLowerCase()) {
        return emp;
      }
    })
    );
  }
  return <MyContext.Provider value={{ allEmployees, filterEmployees, setfilterEmployees, filterbyDepartment, filterbyOffice, filterbyJobtitle }}>{children}</MyContext.Provider>

};

