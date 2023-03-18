import axios from "axios";
import { Console } from "console";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import '../AddEmp/style.css'
import IEmployee from '../IEmployee/IEmployee';
interface props {
  closeEmp: any
}

var image_url: any
var file: string
function AddEmp({ closeEmp }: props) {
  // All the variable initialisation and usestate hooks declaration
  var employees: IEmployee[] = JSON.parse(
    localStorage.getItem("employees") || "[]"
  );
  var [employeeImage, setemployeeImage] = useState<string>("");
  const [employeeFirstname, setemployeeFirstname] = useState<string>("");
  const [employeeLastname, setemployeeLastname] = useState<string>("");
  const [employeePrefferedname, setemployeePrefferedname] = useState<string>(employeeFirstname + employeeLastname);
  const [employeeJobtitle, setemployeeJobtitle] = useState<string>("Select");
  const [employeeOffice, setemployeeOffice] = useState<string>("Select");
  const [employeeDepartment, setemployeeDepartment] = useState<string>("Select");
  const [employeeSkypeid, setemployeeSkypeid] = useState<string>("");
  const [employeeEmail, setemployeeEmail] = useState<string>("");
  const [employeePhonenumber, setemployeePhonenumber] = useState<number>(0);
  const [alert, setalert] = useState<string>("");

  //Function to validate employee details from add employee form
  function validateEmp(): boolean {
    if (employeeFirstname.length == 0) {
      setalert("please enter your first name");
      return false;
    }
    if (employeeLastname.length == 0) {
      setalert("please enter your last name");
      return false;
    }

    if (employeeDepartment == "Select") {
      setalert("please select the department");
      return false;
    }
    if (employeeJobtitle == "Select") {
      setalert("please select the job title");
      return false;
    }
    if (employeeOffice == "Select") {
      setalert("please select the employeeOffice");
      return false;
    }
    if (employeeSkypeid.length == 0) {
      setalert("please enter employeeSkypeid");
      return false;
    }
    if (employeePhonenumber?.toString().length != 10) {
      setalert("please enter the valid phone number");
      return false;
    }


    var x = employeeEmail;
    var employeeEmail_regex: RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (employeeEmail_regex.test(x) == false) {
      setalert("Please enter a valid employeeEmail ID !");

      return false;
    }

    return true;
  }

  function previewFile(event: any) {
    var file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (e) => {
      image_url = reader.result;

    }
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const addEmpBackend = async () => {
    //console.log("charan")
    let validate_res: boolean = validateEmp();
    if (validate_res) {
      employeeImage = image_url;
      await axios.post('https://localhost:7055/api/Values',
        {
          "employeeId": uuid().toString(),
          "firstName": employeeFirstname,
          "lastName": employeeLastname,
          "prefferedName": employeePrefferedname,
          "email": employeeEmail,
          "jobTitleId": employeeJobtitle,
          "officeId": employeeOffice,
          "departmentId": employeeDepartment,
          "phoneNumber": employeePhonenumber,
          "skypeId": employeeSkypeid,
          "image": employeeImage.toString()

        }

      )
        .then(e => console.log(e))
        .catch(error => console.log(error))
      closeEmp(false)
      window.location.reload();
      //console.log(JSON.stringify(obj))
    }
  }


  return (
    <div id="add-emp-list" className="adding-employee position-absolute">
      <button className="close-form position-relative" onClick={() => closeEmp(false)}>Close Form</button>
      <h1 className="form-title position-relative">ADD EMPLOYEE</h1>
      <form action="POST">

        <label htmlFor="select_img" className="form-field position-relative"><b>Select Image</b></label>
        <input type="file" className="form-control form-field-value" id="image-input" name="imageurl" onChange={(event) => previewFile(event)} accept="image/jpeg, image/png, image/jpg" />

        <label htmlFor="First_name" className="form-field position-relative"><b>First Name</b></label>
        <input type="text" name="First_name" className="form-field-value" value={employeeFirstname}
          onChange={(event) => {
            setemployeeFirstname(event.target.value);
          }} />

        <label htmlFor="Last_name" className="form-field position-relative" ><b>Last Name</b></label>
        <input type="text" name="Last_name" className="form-field-value" value={employeeLastname}
          onChange={(event) => setemployeeLastname(event.target.value)} />

        <label htmlFor="Prefrd_name" className="form-field position-relative"><b>Preferred Name</b></label>
        <input type="text" name="employeePrefferedname" className="form-field-value" value={employeeFirstname + employeeLastname}
          onMouseOver={() => setemployeePrefferedname(employeeFirstname + employeeLastname)} />

        <label htmlFor="Job_title" className="form-field position-relative"><b>Job Title</b></label>
        <select name="Job_title" id="jb-title" className="form-field-value" value={employeeJobtitle}
          onChange={(event) => setemployeeJobtitle(event.target.value)} >
          <option className="dropdown-options" value="Select">Select</option>
          <option className="dropdown-options" value="SharePoint Practice Head">
            SharePoint Practice Head
          </option>
          <option className="dropdown-options" value="Recruiting Expert">
            Recruiting Expert
          </option>
          <option className="dropdown-options" value=".Net Development Lead">
            .Net Development Lead
          </option>
          <option className="dropdown-options" value="Business Analyst">
            Business Analyst
          </option>
          <option className="dropdown-options" value="BI Developer">
            BI Developer
          </option>
          <option className="dropdown-options" value="Project Lead">
            Project Lead
          </option>
          <option className="dropdown-options" value="Summer Analyst">
            Summer Analyst
          </option>
          <option className="dropdown-options" value="Manager">
            Manager
          </option>
        </select>

        <label htmlFor="employeeOffice" className="form-field position-relative"><b>employeeOffice</b></label>
        <select name="employeeOffice" id="employeeOffice" className="form-field-value" value={employeeOffice}
          onChange={(event) => setemployeeOffice(event.target.value)} >
          <option className="dropdown-options" value="Select">Select</option>
          <option value="Seattle">Seattle</option>
          <option value="India">India</option>
        </select>

        <label htmlFor="employeeDepartment" className="form-field position-relative"><b>Department</b></label>
        <select name="employeeDepartment" id="employeeDepartment" className="form-field-value" value={employeeDepartment}
          onChange={(event) => setemployeeDepartment(event.target.value)}>
          <option className="dropdown-options" value="Select">Select</option>
          <option value="IT">IT</option>
          <option value="Human resources">Human Resources</option>
          <option value="MD">MD</option>
          <option value="Sales">Sales</option>
        </select>

        <label htmlFor="Skype" className="form-field position-relative"><b>Skype ID</b></label>
        <input type="text" name="Skype" className="form-field-value" value={employeeSkypeid}
          onChange={(event) => setemployeeSkypeid(event.target.value)} />
        <label htmlFor="employeeEmail" className="form-field"><b>employeeEmail</b></label>
        <input type="email" name="employeeEmail" className="form-field-value" value={employeeEmail}
          onChange={(event) => setemployeeEmail(event.target.value)} />
        <label htmlFor="Phn_no" className="form-field"><b>Phone No</b></label>
        <input
          type="number"
          name="Phn_no"
          className="form-field-value"
          pattern="[0-9]{2}[0-9]{10}"
          placeholder="91xxxxxxxxxx"
          value={employeePhonenumber}
          onChange={(event) => setemployeePhonenumber(event.target.valueAsNumber)}
        />
        <p id="alert-msg" className="alert-message font-styles">{alert}</p>
        <input
          type="button"
          className="button font-styles employee-submit-button"
          onClick={() => {
            //addEmp()
            addEmpBackend()
          }}
          value="Add Employee"
        />
      </form>
    </div>
  )
}
export default AddEmp