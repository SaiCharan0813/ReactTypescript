import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../FullempDetails/style.css'
import IEmployee from "../IEmployee/IEmployee";
import { ReactComponent as Xoctagon } from '../assets/x-octagon.svg'
import { ReactComponent as Phone } from '../assets/phone.svg'
import { ReactComponent as Envolop } from '../assets/gmail-logo.svg'
import { ReactComponent as Skype } from '../assets/icons8-skype.svg'
import { ReactComponent as Edit } from '../assets/edit-button.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import { MyContext } from "../Context/MyContext";

interface props {
  id: string
  closeEditform: any
}
var employees: IEmployee[] = JSON.parse(
  localStorage.getItem("employees") || "[]"
);
var current: number
var image_url: any
const FullEmployee: React.FC<props> = ({ id, closeEditform }) => {
  //To retrieve the id from the url
  let { _id } = useParams();
  //To retrieve the employee details from local storage
  let ee: IEmployee[] = JSON.parse(localStorage.getItem("employees") || "[]");
  //To find the employee details from the id sent in the url
  let current_emp: IEmployee = ee.find((emp) => emp._id == id)!
  current = ee.findIndex((emp) => emp == current_emp)!
  //Declaring the all useState hooks needed below
  const [edit, setedit] = useState<boolean>(false)
  var [emp_img, setemp_img] = useState<string>("");
  image_url = current_emp.Employee_Img
  const [employeeFirstname, setemployeeFirstname] = useState<string>(current_emp.First_Name)
  const [employeeLastname, setemployeeLastname] = useState<string>(current_emp.Last_Name)
  const [employeePrefferedname, setemployeePrefferedname] = useState<string>(current_emp.Preffered_Name)
  const [employeeJobtitle, setemployeeJobtitle] = useState<string>(current_emp.Title)
  const [employeeOffice, setemployeeOffice] = useState<string>(current_emp.Office_Details)
  const [employeeDepartment, setemployeeDepartment] = useState<string>(current_emp.Dept_Name)
  const [employeeSkypeid, setemployeeSkypeid] = useState<string>(current_emp.Skype_Id)
  const [employeeEmail, setemployeeEmail] = useState<string>(current_emp.Email_id)
  const [employeePhonenumber, setemployeePhonenumber] = useState<string>(current_emp.phone_no.toString())
  const [alert, setalert] = useState<string>("")
  const { filterEmployees, setfilterEmployees } = useContext(MyContext)

  //Function used to validate the employee details when edited the particular employee
  //To re render the employee directory when local storage is updated
  useEffect(() => {
    window.addEventListener("storage", () => {
      setfilterEmployees(JSON.parse(localStorage.getItem("employees") || "[]"))
    });
  }, []);
  function validateEmp(): boolean {
    if (employeeFirstname.length == 0) {
      setalert("Please enter your first name!");
      return false;
    }
    if (employeeLastname.length == 0) {
      setalert("Please enter your last name!");
      return false;
    }
    if (employeePrefferedname.length == 0) {
      setalert("Please enter your preffered name!");
      return false;
    }
    if (employeeDepartment == "Select") {
      setalert("Please select a deartment name!");
      return false;
    }
    if (employeeOffice == "Select") {
      setalert("Please select your office details!");
      return false;
    }
    if (employeeJobtitle == "Select") {
      setalert("Please select a job title!");
      return false;
    }
    if (employeeSkypeid.length == 0) {
      setalert("Please enter your skype ID!");
      return false;
    }
    if (employeePhonenumber.length != 12) {
      setalert("Please enter a valid phone number!");
      return false;
    }

    var x = employeeEmail;
    var email_regex: RegExp =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email_regex.test(x) == false) {
      setalert("Please enter a valid Email ID !");

      return false;
    }

    return true;
  }
  function deleteEmpoloyee() {
    console.log(current)
    ee.splice(current, 1)
    console.log(ee)
    localStorage.setItem("employees", JSON.stringify(ee));
  }

  function previewFile(event: any) {
    console.log('hi', event);
    var file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (e) => {
      image_url = reader.result;

    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  //Function used to save the details of the employee to the local storage

  function saveDetails(): void {
    let val_res: boolean = validateEmp()
    if (val_res) {
      emp_img = image_url;
      //current_emp.Employee_Img = emp_img;
      current_emp._id = current_emp._id;
      current_emp.First_Name = employeeFirstname;
      current_emp.Last_Name = employeeLastname;
      current_emp.Preffered_Name = employeePrefferedname;
      current_emp.Title = employeeJobtitle;
      current_emp.Office_Details = employeeOffice;
      current_emp.Dept_Name = employeeDepartment;
      current_emp.Skype_Id = employeeSkypeid;
      current_emp.Email_id = employeeEmail;
      current_emp.phone_no = employeePhonenumber
      closeEditform(false)
      //window.alert(`Employee ${employeeFirstname} details updated succesfully`)
      setalert('')
      setedit(false)
      localStorage.setItem("employees", JSON.stringify(ee))

      //To dispatch an event to let know for employee directory that the local storage has been updated

      window.dispatchEvent(new Event('storage'));
    }

  }

  return (
    <>{
      <div id="employee-full-details " className={`employee-fulldetails edit-employee-backgroundcolor position-relative $(edits:""?"display-hidden")`}>
        <Xoctagon
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="close position-relative bi bi-x"
          viewBox="0 0 16 16"
          onClick={() => { closeEditform(false) }}

        />
        {/* <button className="close position-relative" onClick={() => { closeEditform(false) }}>Close Popup</button> */}
        <img
          src={current_emp.Employee_Img}
          alt="employee"
          className={`emp-image-fulldetails position-relative ${edit ? 'content-editable-hidden' : 'image-edit'} `}
        />

        <div className="details-editing position-relative">
          <label htmlFor="select_img" className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Select Image</b></label>
          <input type="file" className={`  editing-part form-control edit-employee-backgroundcolor form-field-values  ${edit ? 'content-editable' : 'content-editable-hidden'} `} id="image-input" name="imageurl" onChange={(event) => previewFile(event)} accept="image/jpeg, image/png, image/jpg" />
        </div>

        <div className="details-editing position-relative">
          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>First Name : </b></p>
          <p className={`form-fields form-fields-color ${edit ? 'content-editable-hidden' : 'content-tohide position-relative'} `}>{current_emp.First_Name}</p>
          <input
            type="text"
            className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}
            onChange={event => setemployeeFirstname(event.target.value)}
            defaultValue={current_emp.First_Name}
          />
        </div>

        <div className="details-editing position-relative">
          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Last Name : </b></p>
          <p className={`form-fields form-fields-color ${edit ? 'content-editable-hidden' : 'content-tohide position-relative'} `}>{current_emp.Last_Name}</p>
          <input
            type="text"
            className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}
            onChange={event => setemployeeLastname(event.target.value)}
            defaultValue={current_emp.Last_Name}
          />
        </div>

        <div className="details-editing position-relative">

          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Preffered Name : </b></p>
          <p className={`form-fields form-fields-color ${edit ? 'content-editable-hidden' : 'content employee-name-edit position-relative'} `}>{current_emp.Preffered_Name}</p>
          <input
            type="text"
            className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}
            onMouseOver={event => setemployeePrefferedname(employeeFirstname + employeeLastname)}
            defaultValue={current_emp.Preffered_Name}
          />
        </div>

        <div className="details-editing position-relative">
          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Office : </b></p>
          <p className={`form-fields form-fields-color ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>{current_emp.Office_Details}</p>
          <select className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `} defaultValue={current_emp.Office_Details} onChange={event => setemployeeOffice(event.target.value)}>
            <option className="drop-options" value="Select">Select</option>
            <option value="Seattle">Seattle</option>
            <option value="India">India</option>
          </select>
        </div>

        <div className="details-editing position-relative">
          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Job Title : </b></p>
          <p className={`form-fields form-fields-color ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>{current_emp.Title}</p>
          <select className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `} defaultValue={current_emp.Title} onChange={event => setemployeeJobtitle(event.target.value)}>
            <option className="drop-options" value="Select">Select</option>
            <option className="drop-options" value="SharePoint Practice Head">
              SharePoint Practice Head
            </option>
            <option className="drop-options" value="Recruiting Expert">
              Recruiting Expert
            </option>
            <option className="drop-options" value=".Net Development Lead">
              .Net Development Lead
            </option>
            <option className="drop-options" value="Business Analyst">
              Business Analyst
            </option>
            <option className="drop-options" value="BI Developer">
              BI Developer
            </option>
            <option className="drop-options" value="Project Lead">
              Project Lead
            </option>
            <option className="drop-options" value="Summer Analyst">
              Summer Analyst
            </option>
            <option className="drop-options" value="Manager">
              Manager
            </option>
          </select>
        </div>

        <div className="details-editing position-relative">
          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Department : </b></p>
          <p className={`form-fields form-fields-color ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>{current_emp.Dept_Name}</p>
          <select className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `} defaultValue={current_emp.Dept_Name} onChange={event => setemployeeDepartment(event.target.value)}>
            <option className="drop-options" value="Select">Select</option>
            <option value="IT">IT</option>
            <option value="Human resources">Human Resources</option>
            <option value="MD">MD</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div className="details-editing position-relative">
          <p className={`form-fields form-fields-color edit-display ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>skype name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Skype /> </p>
          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Skype ID : </b></p>
          <p className={`form-fields form-fields-color editing-part-color ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>{current_emp.Skype_Id}</p>
          <input
            type="text"
            className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}
            onChange={event => setemployeeSkypeid(event.target.value)}
            defaultValue={current_emp.Skype_Id}
          />
        </div>

        <div className="details-editing position-relative">
          <p className={`form-fields form-fields-color edit-display  ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Envolop /></p>
          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Email ID : </b></p>
          <p className={`form-fields editing-part-color ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>{current_emp.Email_id}</p>
          <input
            type="text"
            className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}
            onChange={event => setemployeeEmail(event.target.value)}
            defaultValue={current_emp.Email_id}
          />
        </div>

        <div className="details-editing position-relative">
          <p className={`form-fields form-fields-color edit-display  ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>mobile &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Phone /></p>
          <p className={`form-fields  editing-part form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}><b>Phone Number : </b></p>
          <p className={`form-fields editing-part-color ${edit ? 'content-editable-hidden' : 'content position-relative'} `}>{current_emp.phone_no}</p>

          <input
            type="tel"
            className={`form-fields form-fields-color ${edit ? 'content-editable' : 'content-editable-hidden'} `}
            onChange={event => setemployeePhonenumber(event.target.value)}
            defaultValue={current_emp.phone_no}
          />

        </div>
        <p id="alert_msg" className="alert-text">{alert}</p>
        <div className="details-editing position-relative">
          <button
            onClick={() => { setedit(true) }}
            className={`button edit-button position-relative ${edit ? ' content-editable-hidden' : 'edit-btn'}`}
            style={{ color: "white" }}

          >
            <Edit />
          </button>
          <button
            onClick={() => { saveDetails() }}
            className={`button edit-button position-relative ${edit ? 'edit-btn' : 'content-editable-hidden'}`}
            style={{ color: "white", backgroundColor: "#0b8300" }}
          >
            Save Details
          </button>
          <button className="delete-employee position-relative" onClick={() => { deleteEmpoloyee() }}><Delete /></button>

        </div>
      </div>
    }
    </>
  )
}

export default FullEmployee

